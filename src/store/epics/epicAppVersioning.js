import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestAppVersioning = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_LIST_APP_VERSIONING',
            'REQUEST_CREATE_APP_VERSIONING',
            'REQUEST_UPDATE_APP_VERSIONING',
            'REQUEST_DELETE_APP_VERSIONING'
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_LIST_APP_VERSIONING':
                        const rawResponse = await Services().get(`/services/eofemp/api/app-versions`,action.payload.params);
                        
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_APP_VERSIONING',
                                payload: {
                                    data: rawResponse.data.content ? rawResponse.data.content : rawResponse.data,
                                    params:action.payload.params,
                                    totalPages:rawResponse.data.totalPages ? rawResponse.data.totalPages : 0
                                },
                            })
                        }
                    case 'REQUEST_CREATE_APP_VERSIONING':
                        await Services().post('/services/eofemp/api/app-versions', action.payload.data);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Create Versioning Success" } });
                            dispatch({ 
                              type: "REQUEST_LIST_APP_VERSIONING", 
                              payload: {
                                params:store.value.leaveType.params
                              } 
                            })
                        }
                    case 'REQUEST_UPDATE_APP_VERSIONING':
                      await Services().put(`/services/eofemp/api/app-versions`, action.payload.data);
            
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Update Versioning Success" } });
                            dispatch({ 
                              type: "REQUEST_LIST_APP_VERSIONING", 
                              payload: {
                                params:store.value.leaveType.params
                              } 
                            })
                        }
                    case 'REQUEST_DELETE_APP_VERSIONING':
                      await Services().delete(`/services/eofemp/api/app-versions/${action.payload.id}`);
            
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Delete Versioning Success" } });
                            dispatch({ 
                              type: "REQUEST_LIST_APP_VERSIONING", 
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
                    dispatch({ type: "APP_VERSIONING_FAILED" })
                    dispatch({ type: 'ALERT_TOAST_ERROR', payload: { message: title } });
                }
            }
        }),
    )
