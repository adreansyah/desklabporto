import moment from "moment";
export const requestListHoliday = (isObject) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_LIST_HOLIDAY",
            payload: isObject
        })
    }
}

export const requestCreateHoliday = (output, currentParams) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_CREATE_HOLIDAY",
            payload: {
                isOutput: {
                    "holidayDate": moment(output.singleDate, 'YYYY-MM-DD HH:mm:ss').utc(true),
                    "holidayDesc": output.description,
                    "holidayStatus": true,
                },
                currentParams
            }
        })
    }
}

export const requestUpdateHoliday = (output, currentParams) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_UPDATE_HOLIDAY",
            payload: {
                isOutput: {
                    "id": output.id,
                    "holidayDate": moment(output.singleDate, 'YYYY-MM-DD HH:mm:ss').utc(true),
                    "holidayDesc": output.description,
                    "holidayStatus": true,
                },
                currentParams
            }
        })
    }
}

export const requestDeleteHoliday = (id, currentParams) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_DELETE_HOLIDAY",
            payload: {
                id
            }
        })
    }
}