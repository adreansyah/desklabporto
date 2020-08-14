import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestDepartement = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_LIST_DEPARTEMENT',
            'REQUEST_CREATE_DEPARTEMENT',
            "REQUEST_UPDATE_DEPARTEMENT",
            "REQUEST_DELETE_DEPARTEMENT"
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_LIST_DEPARTEMENT':
                        const rawResponse = await Services().get('/services/eofemp/api/departments/search', action.payload);
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_DEPARTEMENT',
                                payload: {
                                    parameter: action.payload,
                                    data: rawResponse.data.content,
                                    totalPages: rawResponse.data.totalPages
                                },
                            })
                        }
                    case 'REQUEST_CREATE_DEPARTEMENT':
                        await Services().post('/services/eofemp/api/departments', action.payload);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Create Departement Success" } });
                            dispatch({ type: "REQUEST_LIST_DEPARTEMENT", payload: store.value.departement.parameter })
                        }
                    case 'REQUEST_UPDATE_DEPARTEMENT':
                        await Services().put('/services/eofemp/api/departments', action.payload);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Update Departement Success" } });
                            dispatch({ type: "REQUEST_LIST_DEPARTEMENT", payload: store.value.departement.parameter })
                        }
                    case 'REQUEST_DELETE_DEPARTEMENT':
                        await Services().delete('/services/eofemp/api/departments/' + action.payload.id);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Delete Departement Success" } });
                            dispatch({ type: "REQUEST_LIST_DEPARTEMENT", payload: store.value.departement.parameter })
                        }
                    default:
                        break
                }
            } catch (e) {
                const { message } = e
                return dispatch => {
                    dispatch({ type: "DEPARTEMENT_FAILED" })
                    dispatch({ type: 'ALERT_TOAST_ERROR', payload: { message: message } });
                }
            }
        }),
    )
