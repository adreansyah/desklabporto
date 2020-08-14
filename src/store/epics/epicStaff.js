import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestStaff = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_LIST_STAFF',
            'REQUEST_CREATE_STAFF',
            "REQUEST_UPDATE_STAFF",
            "REQUEST_DELETE_STAFF",
            "REQUEST_CREATE_ACTIVATION_KEY",
            "REQUEST_APPROVER_STAFF"
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_LIST_STAFF':
                        const rawResponse = await Services().get('/services/eofemp/api/employees/lite/search', action.payload);
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_STAFF',
                                payload: {
                                    parameter: action.payload,
                                    data: rawResponse.data.content,
                                    totalPages: rawResponse.data.totalPages
                                },
                            })
                        }
                    case "REQUEST_CREATE_ACTIVATION_KEY":
                        await Services().post('/services/elvuaa/api/account/resend-activation-key', action.payload);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Resend Activation Key Success" } });
                            dispatch({ type: "REQUEST_LIST_STAFF", payload: store.value.staff.parameter })
                        }
                    case 'REQUEST_CREATE_STAFF':
                        await Services().post('/services/eofemp/api/employees/all', action.payload);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Create Employee Success" } });
                            dispatch({ type: "REQUEST_LIST_STAFF", payload: store.value.staff.parameter })
                        }
                    case 'REQUEST_UPDATE_STAFF':
                        await Services().put('/services/eofemp/api/employees/' + action.payload.id, action.payload.body);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Update Employee Success" } });
                            dispatch({ type: "REQUEST_LIST_STAFF", payload: store.value.staff.parameter })
                        }
                    case 'REQUEST_DELETE_STAFF':
                        await Services().delete('/services/eofemp/api/employees/' + action.payload.id);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Delete Employee Success" } });
                            dispatch({ type: "REQUEST_LIST_STAFF", payload: store.value.staff.parameter })
                        }
                    case 'REQUEST_APPROVER_STAFF':
                        const rawResponseGetApprover = await Services().get('/services/eofemp/api/leave-approvers/list', action.payload);
                        return dispatch => {
                            dispatch({
                                type: "GET_LIST_APPROVER_STAFF",
                                payload: rawResponseGetApprover.data
                            })
                        }
                    default:
                        break
                }
            } catch (e) {
                const { message } = e
                return dispatch => {
                    dispatch({ type: "STAFF_FAILED" })
                    dispatch({ type: 'ALERT_TOAST_ERROR', payload: { message: message } });
                }
            }
        }),
    )
