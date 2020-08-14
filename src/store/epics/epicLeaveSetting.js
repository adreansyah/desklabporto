import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestLeaveSetting = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_LIST_LEAVE_SETTING',
            'REQUEST_LEAVE_SETTING_UTILITIES',
            'REQUEST_CREATE_LEAVE_SETTING',
            "REQUEST_UPDATE_LEAVE_SETTING",
            "REQUEST_DELETE_LEAVE_SETTING"
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_LIST_LEAVE_SETTING':
                        const rawResponse = await Services().get('/services/eofemp/api/leave-settings', action.payload);
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_LEAVE_SETTING',
                                payload: {
                                    parameter: action.payload,
                                    data: rawResponse.data.content,
                                    totalPages: rawResponse.data.totalPages
                                },
                            });
                        }
                    case 'REQUEST_LEAVE_SETTING_UTILITIES':
                        const rawResponseApprovers = await Services().get('/services/eofemp/api/leave-settings/approver/list');
                        const rawResponseInYearList = await Services().get('/services/eofemp/api/leave-settings/in-year/list');
                        const rawResponseInTheEndOf = await Services().get('/services/eofemp/api/leave-settings/reset-in-the-end-of/list');
                        const rawResponseInsideCity = await Services().get('/services/eofemp/api/leave-settings/inside-city/list');
                        const rawResponseMedicalLetter = await Services().get('/services/eofemp/api/leave-settings/medical-letter/list');
                        const rawResponseEligibleNumberList = await Services().get('/services/eofemp/api/leave-settings/eligible-for-number/list');
                        const rawResponseEligibleNumberOperatorList = await Services().get('/services/eofemp/api/leave-settings/eligible-for-operator/list');
                        const rawResponseEligibleForYearList = await Services().get('/services/eofemp/api/leave-settings/eligible-for-year/list');
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_APPROVERS',
                                payload: rawResponseApprovers.data
                            })
                            dispatch({
                                type: 'GET_LIST_IN_YEARS',
                                payload: rawResponseInYearList.data
                            })
                            dispatch({
                                type: 'GET_LIST_RESET_IN_THE_END_OF',
                                payload: rawResponseInTheEndOf.data
                            })
                            dispatch({
                                type: 'GET_LIST_INSIDE_CITY',
                                payload: rawResponseInsideCity.data
                            })
                            dispatch({
                                type: 'GET_LIST_MEDICAL_LETTER',
                                payload: rawResponseMedicalLetter.data
                            })
                            dispatch({
                                type: 'GET_LIST_ELIGIBLE_NUMBER',
                                payload: rawResponseEligibleNumberList.data
                            })
                            dispatch({
                                type: 'GET_LIST_ELIGIBLE_NUMBER_OPERATOR',
                                payload: rawResponseEligibleNumberOperatorList.data
                            })
                            dispatch({
                                type: 'GET_LIST_ELIGIBLE_FOR_YEAR',
                                payload: rawResponseEligibleForYearList.data
                            })
                        }
                    case 'REQUEST_CREATE_LEAVE_SETTING':
                        await Services().post('/services/eofemp/api/leave-settings', action.payload);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Create Leave Setting Success" } });
                            dispatch({ type: 'REQUEST_LIST_LEAVE_SETTING', payload: store.value.leaveSetting.parameter })
                        }
                    case 'REQUEST_UPDATE_LEAVE_SETTING':
                        await Services().put('/services/eofemp/api/leave-settings', action.payload);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Update Leave Setting Success" } });
                            dispatch({ type: 'REQUEST_LIST_LEAVE_SETTING', payload: store.value.leaveSetting.parameter })
                        }
                    case 'REQUEST_DELETE_LEAVE_SETTING':
                        await Services().delete('/services/eofemp/api/leave-settings/' + action.payload.id);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Delete Leave Setting Success" } });
                            dispatch({ type: 'REQUEST_LIST_LEAVE_SETTING', payload: store.value.leaveSetting.parameter })
                        }
                    default:
                        break
                }
            } catch (e) {
                const { message } = e
                const customMessage = (message==='error.leaveTypeId') ? 'That leave type already used': message;
                return dispatch => {
                    dispatch({ type: "LEAVE_SETTING_FAILED" })
                    dispatch({ type: 'ALERT_TOAST_ERROR', payload: { message: customMessage } });
                }
            }
        }),
    )
