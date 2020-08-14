import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestCompany = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_LIST_COMPANY',
            'REQUEST_CREATE_COMPANY',
            "REQUEST_UPDATE_COMPANY",
            "REQUEST_DELETE_COMPANY"
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_LIST_COMPANY':
                        const rawResponse = await Services().get('/services/eofemp/api/companies', action.payload);
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_COMPANY',
                                payload: {
                                    parameter: action.payload,
                                    data: rawResponse.data.content,
                                    totalPages: rawResponse.data.totalPages
                                },
                            })
                        }
                    case 'REQUEST_CREATE_COMPANY':
                        await Services().post('/services/eofemp/api/companies', action.payload);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Create Company Success" } });
                            dispatch({ type: "REQUEST_LIST_COMPANY", payload: store.value.company.parameter })
                        }
                    case 'REQUEST_UPDATE_COMPANY':
                        await Services().put('/services/eofemp/api/companies', action.payload);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Update Company Success" } });
                            dispatch({ type: "REQUEST_LIST_COMPANY", payload: store.value.company.parameter })
                        }
                    case 'REQUEST_DELETE_COMPANY':
                        await Services().delete('/services/eofemp/api/companies/' + action.payload.id);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Delete Company Success" } });
                            dispatch({ type: "REQUEST_LIST_COMPANY", payload: store.value.company.parameter })
                        }
                    default:
                        break
                }
            } catch (e) {
                const { message } = e
                return dispatch => {
                    dispatch({ type: "FAILED_COMPANY" })
                    dispatch({ type: 'ALERT_TOAST_ERROR', payload: { message: message } });
                }
            }
        }),
    )
