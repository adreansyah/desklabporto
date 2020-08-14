export const requestListUnitResources = (isObject) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_LIST_UNIT_RESOURCES",
            payload: isObject
        })
    }
}

export const requestCreateUnitResources = (params) => {
    console.log(params)
    return dispatch => {
        dispatch({
            type: "REQUEST_CREATE_UNIT_RESOURCES",
            payload: {
                departmentId: params.departement,
                name: params.unitName
            }
        })
    }
}

export const requestUpdateUnitResources = (id, params) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_UPDATE_UNIT_RESOURCES",
            payload: {
                id,
                body: {
                    departmentId: params.departement,
                    name: params.unitName
                }
            }
        })
    }
}

export const requestDeleteUnitResources = (id) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_DELETE_UNIT_RESOURCES",
            payload: {
                id
            }
        })
    }
}