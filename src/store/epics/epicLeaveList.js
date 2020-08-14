import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestLeaveList = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_LEAVE_LIST',
            'REQUEST_CHANGE_STATUS_LEAVE'
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_LEAVE_LIST':
                        const rawResponse = await Services().get(`/services/eofemp/api/leave-requests`, action.payload.params);
                        return dispatch => {
                            dispatch({
                                type: 'GET_LEAVE_LIST',
                                payload: {
                                    data: rawResponse.data.content ? rawResponse.data.content : rawResponse.data,
                                    params: action.payload.params,
                                    totalPages: rawResponse.data.totalPages ? rawResponse.data.totalPages : 0
                                },
                            })
                        }
                    case 'REQUEST_CHANGE_STATUS_LEAVE':
                        await Services().post(`/services/eofemp/api/leave-requests/update/status`, action.payload.params)
                        console.log(store.value.leaveList.params)
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Success" } });
                            dispatch({ type: 'REQUEST_LEAVE_LIST', payload: { params: store.value.leaveList.params } })
                        }
                    default:
                        break
                }
            } catch (e) {
                const { message } = e
                return dispatch => {
                    dispatch({ type: "LEAVE_TYPE_STAFF_FAILED" })
                    dispatch({ type: 'ALERT_TOAST_ERROR', payload: { message: message } });
                }
            }
        }),
    )
