import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestUnitResources = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_LIST_UNIT_RESOURCES',
            'REQUEST_CREATE_UNIT_RESOURCES',
            "REQUEST_UPDATE_UNIT_RESOURCES",
            "REQUEST_DELETE_UNIT_RESOURCES"
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_LIST_UNIT_RESOURCES':
                        const rawResponse = await Services().get('/services/eofemp/api/units/search', action.payload);
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_UNIT_RESOURCES',
                                payload: {
                                    parameter: action.payload,
                                    data: rawResponse.data.content,
                                    totalPages: rawResponse.data.totalPages
                                },
                            })
                        }
                    case 'REQUEST_CREATE_UNIT_RESOURCES':
                        await Services().post('/services/eofemp/api/units', action.payload);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Create Unit Resources Success" } });
                            dispatch({ type: "REQUEST_LIST_UNIT_RESOURCES", payload: store.value.unitResources.parameter })
                        }
                    case 'REQUEST_UPDATE_UNIT_RESOURCES':
                        await Services().put('/services/eofemp/api/units/' + action.payload.id, action.payload.body);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Update Unit Resources Success" } });
                            dispatch({ type: "REQUEST_LIST_UNIT_RESOURCES", payload: store.value.unitResources.parameter })
                        }
                    case 'REQUEST_DELETE_UNIT_RESOURCES':
                        await Services().delete('/services/eofemp/api/units/' + action.payload.id);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Delete Unit Resources Success" } });
                            dispatch({ type: "REQUEST_LIST_UNIT_RESOURCES", payload: store.value.unitResources.parameter })
                        }
                    default:
                        break
                }
            } catch (e) {
                const { message } = e
                return dispatch => {
                    dispatch({ type: "UNIT_RESOURCES_FAILED" })
                    dispatch({ type: 'ALERT_TOAST_ERROR', payload: { message: message } });
                }
            }
        }),
    )
