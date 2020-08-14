export const requestMenuListByUser = () => {
    return dispatch => {
        dispatch({
            type: "REQUEST_MENU_LIST_BY_USER"
        })
    }
}


export const requestMenuList = () => {
    return dispatch => {
        dispatch({
            type: "REQUEST_MENU_LIST"
        })
    }
}

export const requestCreateMenuList = (params) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_CREATE_MENU_LIST",
            payload: {
                mMenuDTO: params
            }
        })
    }
}

export const requestUpdateMenuList = (params) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_UPDATE_MENU_LIST",
            payload: {
                mMenuDTO: params
            }
        })
    }
}

export const requestDeleteMenuList = (id) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_UPDATE_MENU_LIST",
            payload: {
                mMenuDTO: { id, isUse: false }
            }
        })
    }
}