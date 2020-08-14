import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'
// import { getRefreshToken } from 'helper'
// import { requestRefreshToken } from 'store/actions/authentication'

export const RequestAuthentication = action$ =>
    action$.pipe(
        ofType('REQUEST_AUTH', 'REQUEST_LOGIN_INFO'),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_AUTH':
                        const rawResponseToken = await Services().post('/auth/login', action.payload.properties)
                        return dispatch => {
                            dispatch({
                                type: 'AUTH_SUCCESS',
                                payload: {
                                    token: rawResponseToken.data.access_token,
                                    refReshToken: rawResponseToken.data.refresh_token
                                },
                            })
                        }
                    case 'REQUEST_LOGIN_INFO':
                        const getInfo = await Services().get('/services/eofemp/api/accounts/me')
                        return dispatch => {
                            dispatch({
                                type: 'GET_LOGIN_INFO',
                                payload: {
                                    data: getInfo.data,
                                },
                            })
                        }
                    default:
                        break
                }
            } catch (e) {
                const { title, message } = e
                return dispatch => {
                    dispatch({ type: "AUTH_FAILED" })
                    dispatch({ type: 'ALERT_ERROR', payload: { message: title || message } })
                }
            }
        }),
    )
