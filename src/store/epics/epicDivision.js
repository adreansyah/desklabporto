import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestDivision = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_LIST_DIVISION',
            'REQUEST_CREATE_DIVISION',
            "REQUEST_UPDATE_DIVISION",
            "REQUEST_DELETE_DIVISION"
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_LIST_DIVISION':
                        const rawResponse = await Services().get('/services/eofemp/api/divisions/search', action.payload);
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_DIVISION',
                                payload: {
                                    parameter: action.payload,
                                    data: rawResponse.data.content,
                                    totalPages: rawResponse.data.totalPages
                                },
                            })
                        }
                    case 'REQUEST_CREATE_DIVISION':
                        await Services().post('/services/eofemp/api/divisions', action.payload);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Create Division Success" } });
                            dispatch({ type: "REQUEST_LIST_DIVISION", payload: store.value.division.parameter })
                        }
                    case 'REQUEST_UPDATE_DIVISION':
                        await Services().put('/services/eofemp/api/divisions', action.payload);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Update Division Success" } });
                            dispatch({ type: "REQUEST_LIST_DIVISION", payload: store.value.division.parameter })
                        }
                    case 'REQUEST_DELETE_DIVISION':
                        await Services().delete('/services/eofemp/api/divisions/' + action.payload.id);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Delete Division Success" } });
                            dispatch({ type: "REQUEST_LIST_DIVISION", payload: store.value.division.parameter })
                        }
                    default:
                        break
                }
            } catch (e) {
                const { message } = e
                return dispatch => {
                    dispatch({ type: "DIVISION_FAILED" })
                    dispatch({ type: 'ALERT_TOAST_ERROR', payload: { message: message } });
                }
            }
        }),
    )
