import moment from 'moment';

export const requestCurrentPosition = (id) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_LIST_CURRENT_POSITION",
            payload: { id }
        })
    }
}

export const requestPreviousPosition = (id) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_LIST_PREVIOUS_POSITION",
            payload: { id }
        })
    }
}

export const requestCreatePosition = (params) => {
    return dispatch => {
        const batch = {
            "departmentId": params.departement,
            "divisionId": params.division,
            "employeeId": params.employee,
            "levelId": params.level,
            "positionTitleId": params.title,
            "startDate": moment(params.joindate).format("DD-MM-YYYY HH:mm:ssZ"),
            "unitId": params.unit,
            "managerId": params.reportTo
        }
        dispatch({
            type: "REQUEST_CREATE_POSITION",
            payload: {
                id: params.employee,
                batch
            }
        })
    }
}

export const requestUpdatePosition = (id, params) => {
    return dispatch => {
        const batch = {
            "departmentId": params.departement,
            "divisionId": params.division,
            "employeeId": params.employee,
            "levelId": params.level,
            "positionTitleId": params.title,
            "startDate": moment(params.joindate).format("DD-MM-YYYY HH:mm:ssZ"),
            "unitId": params.unit,
            "managerId": params.reportTo
        }
        dispatch({
            type: "REQUEST_UPDATE_POSITION",
            payload: {
                id,
                empid: params.employee,
                batch
            }
        })
    }
}