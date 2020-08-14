import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestEvent = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_EVENT_LIST',
            'REQUEST_ACTIONS_EVENT_LIST'
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_EVENT_LIST':
                        const rawResponse = await Services().get('/services/eofevt/api/get-all-mst-trainings', action.payload);
                        return dispatch => {
                            dispatch({
                                type: 'GET_EVENT_LIST',
                                payload: {
                                    data: rawResponse.data.content,
                                    totalPages: rawResponse.data.totalPages,
                                    parameter: action.payload,
                                }
                            })
                        }
                    case 'REQUEST_ACTIONS_EVENT_LIST':
                        await Services().put('/services/eofevt/api/mst-trainings-approve-reject', action.payload);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Approved Success !!!" } })
                            dispatch({ type: "REQUEST_EVENT_LIST", payload: store.value.event.parameter })
                        }
                    default:
                        break
                }
            } catch (e) {
                const { message } = e
                return dispatch => {
                    dispatch({ type: "EVENT_LIST_FAILED" })
                    dispatch({ type: 'ALERT_TOAST_ERROR', payload: { message: message } })
                }
            }
        }),
    )
