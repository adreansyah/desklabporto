export const requestListCategory = (isObject) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_LIST_CATEGORY",
            payload: isObject
        })
    }
}

export const requestCreateCategory = (params) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_CREATE_CATEGORY",
            payload: {
                categoryName: params.category,
                status: "1"
            }
        })
    }
}

export const requestUpdateCategory = (id, params) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_UPDATE_CATEGORY",
            payload: {
                status: params.status,
                id,
                categoryName: params.category
            }
        })
    }
}

export const requestDeleteCategory = (id) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_DELETE_CATEGORY",
            payload: {
                id
            }
        })
    }
}