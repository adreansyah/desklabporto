export const requestListCalendar = (date) => {
    const getParamDate = date.split('-');
    return dispatch => {
        dispatch({
            type: "REQUEST_LIST_CALENDAR",
            payload: { date: `${getParamDate[0]}-${getParamDate[1]}` }
        })
    }
}