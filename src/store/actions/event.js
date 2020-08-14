export const requestEventList = (params) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_EVENT_LIST",
            payload: params
        });
    }
}

export const requestActionsEventList = (id, status) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_ACTIONS_EVENT_LIST",
            payload: { id, status }
        })
    }
}
