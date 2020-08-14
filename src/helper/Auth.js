import Cookies from 'js-cookie'

const TOKEN = 'ACCESS_TOKEN'
const REFRESHTOKEN = 'REFRESHTOKEN'
export const setToken = (tokenId) => {
    Cookies.set(TOKEN, tokenId, { expires: 365 })
    window.location.replace('/')
}

export const refreshToken = (newToken, refreshToken) => {
    Cookies.set(TOKEN, newToken, { expires: 365 })
    Cookies.set(REFRESHTOKEN, refreshToken, { expires: 365 })
    window.location.reload();
}

export const getToken = () => {
    return Cookies.get(TOKEN)
}
export const getRefreshToken = (newToken) => {
    Cookies.remove(TOKEN)
    return Cookies.get(REFRESHTOKEN)
}

export const isLoggedIn = () => {
    return !!getToken() || !!getRefreshToken()
}
export const removeToken = () => {
    Cookies.remove(TOKEN)
}
export const logout = () => {
    Cookies.remove(TOKEN)
    Cookies.remove(REFRESHTOKEN)
    window.location.replace('/login')
}
