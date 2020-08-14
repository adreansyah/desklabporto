import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestPositionLevel = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_LIST_POSITION_LEVEL',
            'REQUEST_CREATE_POSITION_LEVEL',
            "REQUEST_UPDATE_POSITION_LEVEL",
            "REQUEST_DELETE_POSITION_LEVEL"
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_LIST_POSITION_LEVEL':
                        const rawResponse = await Services().get('/services/eofemp/api/position-levels', action.payload);
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_POSITION_LEVEL',
                                payload: {
                                    parameter: action.payload,
                                    data: rawResponse.data.content,
                                    totalPages: rawResponse.data.totalPages
                                },
                            })
                        }
                    case 'REQUEST_CREATE_POSITION_LEVEL':
                        await Services().post('/services/eofemp/api/position-levels', action.payload);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Create Position Level Success" } });
                            dispatch({ type: "REQUEST_LIST_POSITION_LEVEL", payload: store.value.positionLevel.parameter })
                        }
                    case 'REQUEST_UPDATE_POSITION_LEVEL':
                        await Services().put('/services/eofemp/api/position-levels/' + action.payload.id, action.payload.body);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Update Position Level Success" } });
                            dispatch({ type: "REQUEST_LIST_POSITION_LEVEL", payload: store.value.positionLevel.parameter })
                        }
                    case 'REQUEST_DELETE_POSITION_LEVEL':
                        await Services().delete('/services/eofemp/api/position-levels/' + action.payload.id);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Delete Position Level Success" } });
                            dispatch({ type: "REQUEST_LIST_POSITION_LEVEL", payload: store.value.positionLevel.parameter })
                        }
                    default:
                        break
                }
            } catch (e) {
                const { message } = e
                return dispatch => {
                    dispatch({ type: "POSITION_LEVEL_FAILED" })
                    dispatch({ type: 'ALERT_TOAST_ERROR', payload: { message: message } });
                }
            }
        }),
    )
