export const requestListPositionLevel = (isObject) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_LIST_POSITION_LEVEL",
            payload: isObject
        })
    }
}

export const requestCreatePositionLevel = (params) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_CREATE_POSITION_LEVEL",
            payload: {
                name: params.level
            }
        })
    }
}

export const requestUpdatePositionLevel = (id, params) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_UPDATE_POSITION_LEVEL",
            payload: {
                id,
                body: {
                    name: params.level
                }
            }
        })
    }
}

export const requestDeletePositionLevel = (id) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_DELETE_POSITION_LEVEL",
            payload: {
                id
            }
        })
    }
}