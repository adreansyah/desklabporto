import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestResetPassword = action$ =>
    action$.pipe(
        ofType(
            'REQUEST_CHECK_KEY_RESET_PASSWORD',
            'REQUEST_SUBMIT_RESET_PASSWORD'
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {              
                    case 'REQUEST_CHECK_KEY_RESET_PASSWORD':
                        try {
                            const checkKey = await Services().get('/services/elvuaa/api/check-reset-key',action.payload)
                      
                            return dispatch => {
                                dispatch({
                                    type: 'GET_CHECK_KEY_RESET_PASSWORD',
                                    payload: {
                                        data: checkKey.data,
                                    },
                                })
                            }
                        } catch (error) {
                            const err = {
                                type:'CHECK_KEY_RESET_PASSWORD_FAILED',
                                message:error.title??error.message
                            }
                            throw err
                        }
                        
                    case 'REQUEST_SUBMIT_RESET_PASSWORD':
                        try {
                            const rawResponse = await Services().post('/services/elvuaa/api/account/change-forgot-password', action.payload.params)
                            return dispatch => {
                                dispatch({
                                    type: 'REQUEST_RESET_PASSWORD_SUCCESS',
                                    payload: {
                                        data: rawResponse.data,
                                    },
                                })
                            }
                        } catch (error) {
                            const err = {
                                type:'REQUEST_RESET_PASSWORD_FAILED',
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
