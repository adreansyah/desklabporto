import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestHoliday = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_LIST_HOLIDAY',
            'REQUEST_CREATE_HOLIDAY',
            "REQUEST_UPDATE_HOLIDAY",
            "REQUEST_DELETE_HOLIDAY"
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_LIST_HOLIDAY':
                        const rawResponse = await Services().get('/services/eofemp/api/public-holidays', action.payload);
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_HOLIDAY',
                                payload: {
                                    parameter: action.payload,
                                    data: rawResponse.data.content,
                                    totalPages: rawResponse.data.totalPages
                                },
                            })
                        }
                    case 'REQUEST_CREATE_HOLIDAY':
                        await Services().post('/services/eofemp/api/public-holidays', action.payload.isOutput);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Create Holiday Success" } });
                            dispatch({ type: "REQUEST_LIST_HOLIDAY", payload: store.value.holiday.parameter })
                        }
                    case 'REQUEST_UPDATE_HOLIDAY':
                        await Services().put('/services/eofemp/api/public-holidays', action.payload.isOutput);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Update Holiday Success" } });
                            dispatch({ type: "REQUEST_LIST_HOLIDAY", payload: store.value.holiday.parameter })
                        }
                    case 'REQUEST_DELETE_HOLIDAY':
                        await Services().delete('/services/eofemp/api/public-holidays/' + action.payload.id);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Delete Holiday Success" } });
                            dispatch({ type: "REQUEST_LIST_HOLIDAY", payload: store.value.holiday.parameter })
                        }
                    default:
                        break
                }
            } catch (e) {
                const { message } = e
                return dispatch => {
                    dispatch({ type: "FAILED_HOLIDAY" })
                    dispatch({ type: 'ALERT_TOAST_ERROR', payload: { message: message } });
                }
            }
        }),
    )
