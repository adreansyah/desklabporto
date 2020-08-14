import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestEducationStaff = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_LIST_FORMAL_EDUCATION_BY_ID',
            'REQUEST_CREATE_EMPLOYEE_FORMAL_EDUCATION',
            'REQUEST_UPDATE_EMPLOYEE_FORMAL_EDUCATION',
            'REQUEST_DELETE_EMPLOYEE_FORMAL_EDUCATION',
            'REQUEST_LIST_INFORMAL_EDUCATION_BY_ID',
            'REQUEST_CREATE_INFORMAL_EDUCATION',
            'REQUEST_UPDATE_INFORMAL_EDUCATION',
            'REQUEST_DELETE_INFORMAL_EDUCATION'
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_LIST_FORMAL_EDUCATION_BY_ID':
                        const rawResponse = await Services().get(`/services/eofemp/api/employees/${action.payload}/education-histories`);
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_FORMAL_EDUCATION_BY_ID',
                                payload: {
                                    data: rawResponse.data.content
                                },
                            })
                        }
                    case 'REQUEST_CREATE_EMPLOYEE_FORMAL_EDUCATION':
                        await Services().post('/services/eofemp/api/employees/education-histories', action.payload.data);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Create Education Formal Success" } });
                            dispatch({ type: "REQUEST_LIST_FORMAL_EDUCATION_BY_ID", payload: action.payload.data.employeeId })
                        }
                    case 'REQUEST_UPDATE_EMPLOYEE_FORMAL_EDUCATION':
                      await Services().put(`/services/eofemp/api/employees/education-histories/${action.payload.idEdit}`, action.payload.data);
            
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Update Education Formal Success" } });
                            dispatch({ type: "REQUEST_LIST_FORMAL_EDUCATION_BY_ID", payload: action.payload.employeeId })
                        }
                    case 'REQUEST_DELETE_EMPLOYEE_FORMAL_EDUCATION':
                      await Services().delete(`/services/eofemp/api/employees/education-histories/${action.payload.id}`);
            
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Delete Education Formal Success" } });
                            dispatch({ type: "REQUEST_LIST_FORMAL_EDUCATION_BY_ID", payload: action.payload.employeeid })
                        }
                    case 'REQUEST_LIST_INFORMAL_EDUCATION_BY_ID':
                      const emergency = await Services().get(`/services/eofemp/api/employees/${action.payload}/informal-education-histories`);
                      return dispatch => {
                          dispatch({
                              type: 'GET_LIST_INFORMAL_EDUCATION_BY_ID',
                              payload: {
                                  data: emergency.data.content
                              },
                          })
                      }
                    case 'REQUEST_CREATE_INFORMAL_EDUCATION':
                      await Services().post('/services/eofemp/api/employees/informal-education-histories', action.payload.data);
                      return dispatch => {
                          dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Create Informal Education Success" } });
                          dispatch({ type: "REQUEST_LIST_INFORMAL_EDUCATION_BY_ID", payload: action.payload.data.employeeId })
                      }
                    case 'REQUEST_UPDATE_INFORMAL_EDUCATION':
                      await Services().put(`/services/eofemp/api/employees/informal-education-histories/${action.payload.idEdit}`, action.payload.data);
                      return dispatch => {
                          dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Update Informal Education Success" } });
                          dispatch({ type: "REQUEST_LIST_INFORMAL_EDUCATION_BY_ID", payload: action.payload.employeeId })
                      }
                    case 'REQUEST_DELETE_INFORMAL_EDUCATION':
                      await Services().delete(`/services/eofemp/api/employees/informal-education-histories/${action.payload.id}`);
            
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Delete Informal Education Success" } });
                            dispatch({ type: "REQUEST_LIST_INFORMAL_EDUCATION_BY_ID", payload: action.payload.employeeid })
                        }
                    default:
                        break
                }
            } catch (e) {
                const { message } = e
                return dispatch => {
                    dispatch({ type: "FORMAL_EDUCATION_STAFF_FAILED" })
                    dispatch({ type: 'ALERT_TOAST_ERROR', payload: { message: message } });
                }
            }
        }),
    )
