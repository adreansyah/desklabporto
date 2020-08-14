import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestPositionTitle = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_LIST_POSITION_TITLE',
            'REQUEST_CREATE_POSITION_TITLE',
            "REQUEST_UPDATE_POSITION_TITLE",
            "REQUEST_DELETE_POSITION_TITLE"
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_LIST_POSITION_TITLE':
                        const rawResponse = await Services().get('/services/eofemp/api/position-titles', action.payload);
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_POSITION_TITLE',
                                payload: {
                                    parameter: action.payload,
                                    data: rawResponse.data.content,
                                    totalPages: rawResponse.data.totalPages
                                },
                            })
                        }
                    case 'REQUEST_CREATE_POSITION_TITLE':
                        await Services().post('/services/eofemp/api/position-titles', action.payload);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Create Position Title Success" } });
                            dispatch({ type: "REQUEST_LIST_POSITION_TITLE", payload: store.value.positionTitle.parameter })
                        }
                    case 'REQUEST_UPDATE_POSITION_TITLE':
                        await Services().put('/services/eofemp/api/position-titles', action.payload);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Update Position Title Success" } });
                            dispatch({ type: "REQUEST_LIST_POSITION_TITLE", payload: store.value.positionTitle.parameter })
                        }
                    case 'REQUEST_DELETE_POSITION_TITLE':
                        await Services().delete('/services/eofemp/api/position-titles/' + action.payload.id);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Delete Position Title Success" } });
                            dispatch({ type: "REQUEST_LIST_POSITION_TITLE", payload: store.value.positionTitle.parameter })
                        }
                    default:
                        break
                }
            } catch (e) {
                const { message } = e
                return dispatch => {
                    dispatch({ type: "POSITION_TITLE_FAILED" })
                    dispatch({ type: 'ALERT_TOAST_ERROR', payload: { message: message } });
                }
            }
        }),
    )
