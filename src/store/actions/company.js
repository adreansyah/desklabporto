export const requestListCompany = (isObject) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_LIST_COMPANY",
            payload: isObject
        })
    }
}

export const requestCreateCompany = (params) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_CREATE_COMPANY",
            payload: {
                name: params.company
            }
        })
    }
}

export const requestUpdateCompany = (id, params) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_UPDATE_COMPANY",
            payload: {
                id,
                name: params.company
            }
        })
    }
}

export const requestDeleteCompany = (id) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_DELETE_COMPANY",
            payload: {
                id
            }
        })
    }
}