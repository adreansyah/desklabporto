import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestPersonalInformation = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_LIST_PERSONAL_IDENTITY_TYPE',
            'REQUEST_LIST_PERSONAL_INFORMATION',
            'REQUEST_LIST_PERSONAL_INFORMATION_STAFF',
            'REQUEST_CREATE_PERSONAL_INFORMATION',
            'REQUEST_RESIGN_EMPLOYEE_ACTIVE',
            "REQUEST_UPDATE_PERSONAL_INFORMATION"
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_LIST_PERSONAL_IDENTITY_TYPE':
                        const rawResponseIdentity = await Services().get('/services/eofemp/api/identity-types', action.payload);
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_PERSONAL_IDENTITY_TYPE',
                                payload: {
                                    data: rawResponseIdentity.data.content,
                                }
                            });
                        }
                    case "REQUEST_RESIGN_EMPLOYEE_ACTIVE":
                        const { id } = action.payload
                        await Services().put(`/services/eofemp/api/employees/${id}/resign`, action.payload.date);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Employee Resign Success" } });
                            dispatch({ type: "REQUEST_LIST_PERSONAL_INFORMATION", payload: { id } })
                            dispatch({ type: "REQUEST_LIST_PERSONAL_INFORMATION_STAFF", payload: { id } })
                        }
                    case 'REQUEST_LIST_PERSONAL_INFORMATION_STAFF':
                        const rawResponseByStaff = await Services().get(`/services/eofemp/api/employees/lite/ids/${action.payload.id}`);
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_PERSONAL_INFORMATION_STAFF',
                                payload: {
                                    data: rawResponseByStaff.data
                                }
                            })
                        }
                    case 'REQUEST_LIST_PERSONAL_INFORMATION':
                        const rawResponse = await Services().get(`/services/eofemp/api/employees/${action.payload.id}/personal-data`);
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_PERSONAL_INFORMATION',
                                payload: {
                                    data: rawResponse.data,
                                },
                            })
                        }
                    case 'REQUEST_CREATE_PERSONAL_INFORMATION':
                        await Services().post('/services/eofemp/api/employees/personal-data', action.payload);
                        return dispatch => {
                            const id = action.payload.employeeId
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Create Personal Information Success" } });
                            dispatch({ type: "REQUEST_LIST_PERSONAL_INFORMATION", payload: { id } })
                            dispatch({ type: "REQUEST_LIST_PERSONAL_INFORMATION_STAFF", payload: { id } })
                        }
                    case 'REQUEST_UPDATE_PERSONAL_INFORMATION':
                        await Services().put(`/services/eofemp/api/employees/${action.payload.id}/personal-data`, action.payload.data);
                        return dispatch => {
                            const { id } = action.payload
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Update Personal Information Success" } });
                            dispatch({ type: "REQUEST_LIST_PERSONAL_INFORMATION", payload: { id } })
                            dispatch({ type: "REQUEST_LIST_PERSONAL_INFORMATION_STAFF", payload: { id } })
                        }
                    default:
                        break
                }
            } catch (e) {
                const { message } = e
                return dispatch => {
                    dispatch({ type: "RESET_GET_LIST_PERSONAL_INFORMATION" })
                    dispatch({ type: "PERSONAL_INFORMATION_FAILED" })
                    dispatch({ type: 'ALERT_TOAST_ERROR', payload: { message: "Personal Information " + message } });
                    e.code === 403 && window.location.replace('/employee/list-employee')
                }
            }
        }),
    )
