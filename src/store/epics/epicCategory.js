import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestCategory = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_LIST_CATEGORY',
            'REQUEST_CREATE_CATEGORY',
            "REQUEST_UPDATE_CATEGORY",
            "REQUEST_DELETE_CATEGORY"
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_LIST_CATEGORY':
                        const rawResponse = await Services().get('/services/eofevt/api/all-mst-categories-page', action.payload);
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_CATEGORY',
                                payload: {
                                    parameter: action.payload,
                                    data: rawResponse.data.content,
                                    totalPages: rawResponse.data.totalPages
                                },
                            })
                        }
                    case 'REQUEST_CREATE_CATEGORY':
                        await Services().post('/services/eofevt/api/mst-categories', action.payload);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Create Category Success" } });
                            dispatch({ type: "REQUEST_LIST_CATEGORY", payload: store.value.category.parameter })
                        }
                    case 'REQUEST_UPDATE_CATEGORY':
                        await Services().put('/services/eofevt/api/mst-categories', action.payload);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Update Category Success" } });
                            dispatch({ type: "REQUEST_LIST_CATEGORY", payload: store.value.category.parameter })
                        }
                    case 'REQUEST_DELETE_CATEGORY':
                        await Services().delete('/services/eofevt/api/mst-categories/' + action.payload.id);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Delete Category Success" } });
                            dispatch({ type: "REQUEST_LIST_CATEGORY", payload: store.value.category.parameter })
                        }
                    default:
                        break
                }
            } catch (e) {
                const { message } = e
                return dispatch => {
                    dispatch({ type: "CATEGORY_FAILED" })
                    dispatch({ type: 'ALERT_TOAST_ERROR', payload: { message: message } });
                }
            }
        }),
    )
