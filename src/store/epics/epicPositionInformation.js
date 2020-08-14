import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestPositionInformation = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_LIST_CURRENT_POSITION',
            'REQUEST_LIST_PREVIOUS_POSITION',
            "REQUEST_CREATE_POSITION",
            "REQUEST_UPDATE_POSITION"
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_LIST_CURRENT_POSITION':
                        const rawResponseCurrentPosition = await Services().get(`/services/eofemp/api/employees/${action.payload.id}/positions`);
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_CURRENT_POSITION',
                                payload: {
                                    data: rawResponseCurrentPosition.data,
                                }
                            });
                        }
                    case 'REQUEST_LIST_PREVIOUS_POSITION':
                        const rawResponsePreviousPosition = await Services().get(`/services/eofemp/api/employees/${action.payload.id}/position-histories`);
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_PREVIOUS_POSITION',
                                payload: {
                                    data: rawResponsePreviousPosition.data.content,
                                }
                            });
                        }
                    case 'REQUEST_CREATE_POSITION':
                        await Services().post('/services/eofemp/api/employees/positions', action.payload.batch);
                        return dispatch => {
                            const { id } = action.payload
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Create Position Information Success" } });
                            dispatch({ type: "REQUEST_LIST_CURRENT_POSITION", payload: { id } })
                            dispatch({ type: "REQUEST_LIST_PREVIOUS_POSITION", payload: { id } })
                        }
                    case 'REQUEST_UPDATE_POSITION':
                        await Services().put(`/services/eofemp/api/employees/${action.payload.empid}/positions`, action.payload.batch);
                        return dispatch => {
                            const { empid } = action.payload
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Update Position Information Success" } });
                            dispatch({ type: "REQUEST_LIST_CURRENT_POSITION", payload: { id: empid } })
                            dispatch({ type: "REQUEST_LIST_PREVIOUS_POSITION", payload: { id: empid } })
                        }
                    default:
                        break
                }
            } catch (e) {
                const { message } = e
                return dispatch => {
                    dispatch({ type: "POSITION_INFORMATION_FAILED" })
                    dispatch({ type: 'ALERT_TOAST_ERROR', payload: { message: "Personal Information " + message } });
                }
            }
        }),
    )
