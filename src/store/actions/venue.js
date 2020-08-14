export const requestListVenue = (isObject) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_LIST_VENUE",
            payload: isObject
        })
    }
}

export const requestCreateVenue = (params) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_CREATE_VENUE",
            payload: {
                trainingLocationName: params.venue,
                address: params.address,
                status: "1"
            }
        })
    }
}

export const requestUpdateVenue = (id, params) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_UPDATE_VENUE",
            payload: {
                trainingLocationName: params.venue,
                address: params.address,
                id,
                status: "1"
            }
        })
    }
}

export const requestDeleteVenue = (id) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_DELETE_VENUE",
            payload: {
                id
            }
        })
    }
}