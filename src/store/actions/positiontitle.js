export const requestListPositionTitle = (isObject) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_LIST_POSITION_TITLE",
            payload: isObject
        })
    }
}

export const requestCreatePositionTitle = (params) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_CREATE_POSITION_TITLE",
            payload: {
                name: params.title
            }
        })
    }
}

export const requestUpdatePositionTitle = (id, params) => {
    console.log(id,params);
    return dispatch => {
        dispatch({
            type: "REQUEST_UPDATE_POSITION_TITLE",
            payload: {
                id,
                name: params.title
            }
        })
    }
}

export const requestDeletePositionTitle = (id) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_DELETE_POSITION_TITLE",
            payload: {
                id
            }
        })
    }
}