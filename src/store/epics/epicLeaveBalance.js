import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestLeaveBalance = (action$, store) =>
    action$.pipe(
        ofType('REQUEST_LIST_LEAVE_BALANCE'),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_LIST_LEAVE_BALANCE':
                        const rawResponse = await Services().get('/services/eofemp/api/leave-quotas/all-summary', action.payload);
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_LEAVE_BALANCE',
                                payload: {
                                    parameter: action.payload,
                                    data: rawResponse.data.content,
                                    totalPages: rawResponse.data.totalPages
                                },
                            })
                        }
                    default:
                        break
                }
            } catch (e) {
                const { message } = e
                return dispatch => {
                    dispatch({ type: "FAILED_LEAVE_BALANCE" })
                    dispatch({ type: 'ALERT_TOAST_ERROR', payload: { message: message } });
                }
            }
        }),
    )
