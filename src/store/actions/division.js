export const requestListDivision = (isObject) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_LIST_DIVISION",
            payload: isObject
        })
    }
}

export const requestCreateDivision = (params) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_CREATE_DIVISION",
            payload: {
                name: params.division
            }
        })
    }
}

export const requestUpdateDivision = (id, params) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_UPDATE_DIVISION",
            payload: {
                id,
                name: params.division
            }
        })
    }
}

export const requestDeleteDivision = (id) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_DELETE_DIVISION",
            payload: {
                id
            }
        })
    }
}