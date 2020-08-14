import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestMasterAcademic = (action$, store) =>
    action$.pipe(
          ofType(
            "REQUEST_READ_ACADEMIC_GRADE",
            "REQUEST_CREATE_ACADEMIC_GRADE",
            "REQUEST_UPDATE_ACADEMIC_GRADE",
            "REQUEST_DELETE_ACADEMIC_GRADE",
            "REQUEST_SEARCH_ACADEMIC_GRADE"
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_READ_ACADEMIC_GRADE':
                        const rawResponse = await Services().get(`/services/eofemp/api/academic-grades`,action.payload.params);
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_ACADEMIC',
                                payload: {
                                    data: rawResponse.data.content,
                                    params:action.payload.params,
                                    totalPages:rawResponse.data.totalPages
                                },
                            })
                        }
                    case 'REQUEST_CREATE_ACADEMIC_GRADE':
                        await Services().post(`/services/eofemp/api/academic-grades`,action.payload.params);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Create Academic Success" } });
                            dispatch({ 
                              type: "REQUEST_READ_ACADEMIC_GRADE", 
                              payload: {
                                params:store.value.academic.params
                              } 
                            })
                        }
                    case 'REQUEST_UPDATE_ACADEMIC_GRADE':
                        await Services().put(`/services/eofemp/api/academic-grades`,action.payload.params);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Update Academic Success" } });
                            dispatch({ 
                              type: "REQUEST_READ_ACADEMIC_GRADE", 
                              payload: {
                                params:store.value.academic.params
                              } 
                            })
                        }
                    case 'REQUEST_DELETE_ACADEMIC_GRADE':
                        await Services().delete(`/services/eofemp/api/academic-grades/${action.payload.params}`);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Delete Academic Success" } });
                            dispatch({ 
                              type: "REQUEST_READ_ACADEMIC_GRADE", 
                              payload: {
                                params:store.value.academic.params
                              } 
                            })
                        }
                    default:
                        break
                }
            } catch (e) {
                const { message } = e
                return dispatch => {
                    dispatch({ type: "ACADEMIC_FAILED" })
                    dispatch({ type: 'ALERT_TOAST_ERROR', payload: { message: message } });
                }
            }
        }),
    )
