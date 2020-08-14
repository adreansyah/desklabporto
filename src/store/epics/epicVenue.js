import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestVenue = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_LIST_VENUE',
            'REQUEST_CREATE_VENUE',
            "REQUEST_UPDATE_VENUE",
            "REQUEST_DELETE_VENUE"
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_LIST_VENUE':
                        const rawResponse = await Services().get('/services/eofevt/api/all-mst-training-locations-page', action.payload);
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_VENUE',
                                payload: {
                                    parameter: action.payload,
                                    data: rawResponse.data.content,
                                    totalPages: rawResponse.data.totalPages
                                },
                            })
                        }
                    case 'REQUEST_CREATE_VENUE':
                        await Services().post('/services/eofevt/api/mst-training-locations', action.payload);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Create Venue Success" } });
                            dispatch({ type: "REQUEST_LIST_VENUE", payload: store.value.venue.parameter })
                        }
                    case 'REQUEST_UPDATE_VENUE':
                        await Services().put('/services/eofevt/api/mst-training-locations', action.payload);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Update Venue Success" } });
                            dispatch({ type: "REQUEST_LIST_VENUE", payload: store.value.venue.parameter })
                        }
                    case 'REQUEST_DELETE_VENUE':
                        await Services().delete('/services/eofevt/api/mst-training-locations/' + action.payload.id);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Delete Venue Success" } });
                            dispatch({ type: "REQUEST_LIST_VENUE", payload: store.value.venue.parameter })
                        }
                    default:
                        break
                }
            } catch (e) {
                const { message } = e
                return dispatch => {
                    dispatch({ type: "VENUE_FAILED" })
                    dispatch({ type: 'ALERT_TOAST_ERROR', payload: { message: message } });
                }
            }
        }),
    )
