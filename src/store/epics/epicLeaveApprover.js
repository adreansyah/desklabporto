import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestLeaveApprover = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_LIST_LEAVE_APPROVER',
            'REQUEST_CREATE_LEAVE_APPROVER',
            'REQUEST_UPDATE_LEAVE_APPROVER',
            'REQUEST_DELETE_LEAVE_APPROVER',
            'REQUEST_LIST_EMPLOYEE_BY_ID_TITLE',
            'REQUEST_LIST_POSITION_TITLE_APPROVER'
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_LIST_LEAVE_APPROVER':
                        const rawResponse = await Services().get(`/services/eofemp/api/leave-approvers/search`,action.payload.params);
                        
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_LEAVE_APPROVER',
                                payload: {
                                    data: rawResponse.data.content ? rawResponse.data.content : rawResponse.data,
                                    params:action.payload.params,
                                    totalPages:rawResponse.data.totalPages ? rawResponse.data.totalPages : 0
                                },
                            })
                        }
                    case 'REQUEST_LIST_EMPLOYEE_BY_ID_TITLE':
                      const getResponse = await Services().get(`/services/eofemp/api/employees/lite/position-title/${action.payload}`);
                      
                      return dispatch => {
                          dispatch({
                              type: 'GET_LIST_EMPLOYEE_BY_ID_TITLE',
                              payload: {
                                  listEmployee:getResponse.data
                              },
                          })
                      }
                    case 'REQUEST_CREATE_LEAVE_APPROVER':
                        await Services().post('/services/eofemp/api/leave-approvers', action.payload.data);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Create Leave Approver Success" } });
                            dispatch({ 
                              type: "REQUEST_LIST_LEAVE_APPROVER", 
                              payload: {
                                params:action.payload.params
                              } 
                            })
                        }
                    case 'REQUEST_UPDATE_LEAVE_APPROVER':
                      await Services().put(`/services/eofemp/api/leave-approvers`, action.payload.data);
            
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Update Leave Approver Success" } });
                            dispatch({ 
                              type: "REQUEST_LIST_LEAVE_APPROVER", 
                              payload: {
                                params:action.payload.params
                              } 
                            })
                        }
                    case 'REQUEST_DELETE_LEAVE_APPROVER':
                      await Services().delete(`/services/eofemp/api/leave-approvers/${action.payload.id}`);
            
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Delete Leave Approver Success" } });
                            dispatch({ 
                              type: "REQUEST_LIST_LEAVE_APPROVER", 
                              payload: {
                                params:action.payload.params
                              } 
                            })
                        }
                    case 'REQUEST_LIST_POSITION_TITLE_APPROVER':
                        const rawAppoverPosition = await Services().get(`/services/eofemp/api/leave-approvers/position-title/distinct`,action.payload.params);
                        return dispatch => {
                            dispatch({ 
                                type: "GET_LIST_APPROVER_POSTITION_TITLE", 
                                payload: {
                                    listApproverTitle:rawAppoverPosition?.data
                                } 
                              })
                        }
                    default:
                        break
                }
            } catch (e) {
                const { title } = e
                return dispatch => {
                    dispatch({ type: "LEAVE_APPROVER_STAFF_FAILED" })
                    dispatch({ type: 'ALERT_TOAST_ERROR', payload: { message: title } });
                }
            }
        }),
    )
