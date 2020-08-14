export const requestAuthentication = properties => {
    return {
        type: "REQUEST_AUTH",
        payload: { properties }
    }
}

export const requestLoginInfo = () => {
    return {
        type: "REQUEST_LOGIN_INFO",
        payload: {}
    }
}
