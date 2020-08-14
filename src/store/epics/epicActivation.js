import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestActivation = action$ =>
    action$.pipe(
        ofType(
            'REQUEST_CHECK_KEY_ACTIVATION',
            'REQUEST_SUBMIT_ACTIVATION'
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {              
                    case 'REQUEST_CHECK_KEY_ACTIVATION':
                        try {
                            const checkKey = await Services().get('/services/elvuaa/api/checkActivateKey',action.payload)
                      
                            return dispatch => {
                                dispatch({
                                    type: 'GET_CHECK_KEY_ACTIVATION',
                                    payload: {
                                        data: checkKey.data,
                                    },
                                })
                            }
                        } catch (error) {
                            const err = {
                                type:'CHECK_KEY_ACTIVATION_FAILED',
                                message:error.title??error.message
                            }
                            throw err
                        }
                        
                    case 'REQUEST_SUBMIT_ACTIVATION':
                        try {
                            const rawResponse = await Services().post('/services/elvuaa/api/change-password-activation', action.payload.params)
                            return dispatch => {
                                dispatch({
                                    type: 'REQUEST_ACTIVATION_SUCCESS',
                                    payload: {
                                        data: rawResponse.data,
                                    },
                                })
                            }
                        } catch (error) {
                            const err = {
                                type:'REQUEST_ACTIVATION_FAILED',
                                message:error.title??error.message
                            }
                            throw err;
                        }
                        
                    default:
                        break
                }
            } catch (e) {
                const { type,message } = e;
                
                return dispatch => {
                    dispatch({ type: type })
                    dispatch({ type: 'ALERT_ERROR', payload: { message: message } })
                }
            }
        }),
    )
