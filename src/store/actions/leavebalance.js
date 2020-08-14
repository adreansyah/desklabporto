export const requestListLeaveBalance = (isObject) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_LIST_LEAVE_BALANCE",
            payload: isObject
        })
    }
}