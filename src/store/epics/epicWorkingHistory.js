import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestWorkingHistoryStaff = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_LIST_WORKING_HISTORY_BY_ID',
            'REQUEST_CREATE_EMPLOYEE_WORKING_HISTORY',
            'REQUEST_UPDATE_EMPLOYEE_WORKING_HISTORY',
            'REQUEST_DELETE_EMPLOYEE_WORKING_HISTORY'
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_LIST_WORKING_HISTORY_BY_ID':
                        const rawResponse = await Services().get(`/services/eofemp/api/employees/${action.payload.id}/working-histories`,action.payload.params);
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_WORKING_HISTORY_BY_ID',
                                payload: {
                                    data: rawResponse.data.content,
                                    params:action.payload.params
                                },
                            })
                        }
                    case 'REQUEST_CREATE_EMPLOYEE_WORKING_HISTORY':
                        await Services().post('/services/eofemp/api/employees/working-histories', action.payload.data);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Create Working History Success" } });
                            dispatch({ type: "REQUEST_LIST_WORKING_HISTORY_BY_ID", payload: {id : action.payload.data.employeeId,params:action.payload.params} })
                        }
                    case 'REQUEST_UPDATE_EMPLOYEE_WORKING_HISTORY':
                      await Services().put(`/services/eofemp/api/employees/working-histories/${action.payload.idEdit}`, action.payload.data);
            
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Update Working History Success" } });
                            dispatch({ type: "REQUEST_LIST_WORKING_HISTORY_BY_ID", payload: {id : action.payload.employeeId,params:action.payload.params} })
                        }
                    case 'REQUEST_DELETE_EMPLOYEE_WORKING_HISTORY':
                      await Services().delete(`/services/eofemp/api/employees/working-histories/${action.payload.id}`);
            
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Delete Working History Success" } });
                            dispatch({ type: "REQUEST_LIST_WORKING_HISTORY_BY_ID", payload: {id : action.payload.employeeid,params:action.payload.params} })
                        }
                    default:
                        break
                }
            } catch (e) {
                const { message } = e
                return dispatch => {
                    dispatch({ type: "WORKING_HISTORY_STAFF_FAILED" })
                    dispatch({ type: 'ALERT_TOAST_ERROR', payload: { message: message } });
                }
            }
        }),
    )
