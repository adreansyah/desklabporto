export const requestListDepartement = (isObject) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_LIST_DEPARTEMENT",
            payload: isObject
        })
    }
}

export const requestCreateDepartement = (params) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_CREATE_DEPARTEMENT",
            payload: {
                divisionId: params.division,
                name: params.departement
            }
        })
    }
}

export const requestUpdateDepartement = (id, params) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_UPDATE_DEPARTEMENT",
            payload: {
                id,
                divisionId: params.division,
                name: params.departement
            }
        })
    }
}

export const requestDeleteDepartement = (id) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_DELETE_DEPARTEMENT",
            payload: {
                id
            }
        })
    }
}