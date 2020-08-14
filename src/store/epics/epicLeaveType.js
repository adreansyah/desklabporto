import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestLeaveType = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_LIST_LEAVE_TYPE',
            'REQUEST_CREATE_LEAVE_TYPE',
            'REQUEST_UPDATE_LEAVE_TYPE',
            'REQUEST_DELETE_LEAVE_TYPE'
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_LIST_LEAVE_TYPE':
                        const rawResponse = await Services().get(`/services/eofemp/api/leave-types/search`,action.payload.params);
                        
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_LEAVE_TYPE',
                                payload: {
                                    data: rawResponse.data.content ? rawResponse.data.content : rawResponse.data,
                                    params:action.payload.params,
                                    totalPages:rawResponse.data.totalPages ? rawResponse.data.totalPages : 0
                                },
                            })
                        }
                    case 'REQUEST_CREATE_LEAVE_TYPE':
                        await Services().post('/services/eofemp/api/leave-types', action.payload.data);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Create Leave Type Success" } });
                            dispatch({ 
                              type: "REQUEST_LIST_LEAVE_TYPE", 
                              payload: {
                                params:store.value.leaveType.params
                              } 
                            })
                        }
                    case 'REQUEST_UPDATE_LEAVE_TYPE':
                      await Services().put(`/services/eofemp/api/leave-types`, action.payload.data);
            
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Update Leave Type Success" } });
                            dispatch({ 
                              type: "REQUEST_LIST_LEAVE_TYPE", 
                              payload: {
                                params:store.value.leaveType.params
                              } 
                            })
                        }
                    case 'REQUEST_DELETE_LEAVE_TYPE':
                      await Services().delete(`/services/eofemp/api/leave-types/${action.payload.id}`);
            
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Delete Leave Type Success" } });
                            dispatch({ 
                              type: "REQUEST_LIST_LEAVE_TYPE", 
                              payload: {
                                params:store.value.leaveType.params
                              } 
                            })
                        }
                    default:
                        break
                }
            } catch (e) {
                const { title } = e
                return dispatch => {
                    dispatch({ type: "LEAVE_TYPE_STAFF_FAILED" })
                    dispatch({ type: 'ALERT_TOAST_ERROR', payload: { message: title } });
                }
            }
        }),
    )
