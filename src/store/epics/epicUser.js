import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestUser = (action$, store) =>
    action$.pipe(
        ofType(
          "REQUEST_GET_LIST_USERS",
          "REQUEST_GET_LIST_ROLE",
          "REQUEST_REGISTER_USER",
          "REQUEST_DELETE_USER",
          "REQUEST_UPDATE_USER"
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_GET_LIST_USERS':
                        const rawResponse = await Services().get(`/services/eofemp/api/employees/company-admins`,action.payload.params);
                        
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_USER',
                                payload: {
                                    data: rawResponse.data.content ? rawResponse.data.content : rawResponse.data,
                                    params:action.payload.params,
                                    totalPages:rawResponse.data.totalPages ? rawResponse.data.totalPages : 0
                                },
                            })
                        }
                    case 'REQUEST_REGISTER_USER':
                        await Services().post('/services/eofemp/api/employees/company-admins', action.payload.data);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Create User Success" } });
                            dispatch({ 
                              type: "REQUEST_GET_LIST_USERS", 
                              payload: {
                                params:action.payload.params
                              } 
                            })
                        }
                    case 'REQUEST_UPDATE_USER':
                      await Services().put(`/services/eofemp/api/employees/company-admins/${action.payload.id}`, action.payload.data);
            
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Update Leave Approver Success" } });
                            dispatch({ 
                              type: "REQUEST_GET_LIST_USERS", 
                              payload: {
                                params:action.payload.params
                              } 
                            })
                        }
                    case 'REQUEST_DELETE_USER':
                      await Services().delete(`/services/eofemp/api/employees/company-admins/${action.payload.id}`);
            
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Delete Leave Approver Success" } });
                            dispatch({ 
                              type: "REQUEST_GET_LIST_USERS", 
                              payload: {
                                params:action.payload.params
                              } 
                            })
                        }
                    default:
                        break
                }
            } catch (e) {
                const { message } = e
                return dispatch => {
                    dispatch({ type: "USER_FAILED" })
                    dispatch({ type: 'ALERT_TOAST_ERROR', payload: { message: message } });
                }
            }
        }),
    )
