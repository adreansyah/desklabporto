import axios from 'axios';
import {
    getToken, getRefreshToken, refreshToken, removeToken, logout
} from 'helper'

const Axios = (url = null) => {
    const TOKEN = getToken()
    let instance = axios.create();
    if (url) {
        instance.defaults.baseURL = url
    } else {
        if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
            instance.defaults.baseURL = process.env.REACT_APP_API_URL
        }
    }
    instance.defaults.timeout = 1000 * process.env.REACT_APP_API_TIMEOUT;
    instance.defaults.headers.common['Content-Type'] = 'application/json';
    if (TOKEN) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;
    }
    instance.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        let code, status, message, title = '';
        if (error.response) {
            code = error.response.status;
            status = error.response.statusText;
            message = (error.response.data.detail) ? error.response.data.detail : (error.response.data.message) ? error.response.data.message : error.response.statusText;
            title = error.response.data.title
        } else {
            code = status = message = error.message;
        }
        const REFRESHTOKEN = getRefreshToken();
        if (code === 401 && REFRESHTOKEN) {
            removeToken();
            Services().post('/auth/refresh-token', {
                "refreshToken": REFRESHTOKEN
            }).then(getNewToken => {
                const newToken = getNewToken.data.access_token
                const isRefreshToken = getNewToken.data.refresh_token
                refreshToken(newToken, isRefreshToken)
            }).catch(e => {
                logout();
            })
        }
        let errorData = {
            code,
            status,
            message,
            title
        };
        throw (errorData)
    });
    return instance;
}

export const Services = (url) => ({
    get: (endpointName, params = null, config = null) => {
        let data = {};
        if (params) { data['params'] = params; }
        if (config) { data = { ...data, ...config }; }
        return Axios(url).get(endpointName, data);
    },
    getRequest: (endpointName, params = null, config = null) => {
        return Axios().get(endpointName, params, config)
    },
    post: (endpointName, params = null, config = null) => {
        return Axios(url).post(endpointName, params, config);
    },
    put: (endpointName, params = null, config = null) => {
        return Axios(url).put(endpointName, params, config);
    },
    delete: (endpointName, params = null, config = null) => {
        let data = {};
        if (params) { data['params'] = params; }
        if (config) { data = { ...data, ...config }; }
        return Axios(url).delete(endpointName, data);
    }
})