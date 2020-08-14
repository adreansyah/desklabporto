import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestFamilyStaff = (action$, store) =>
    action$.pipe(
        ofType(
            'REQUEST_LIST_FAMILY_BY_ID',
            'REQUEST_CREATE_EMPLOYEE_FAMILY',
            'REQUEST_UPDATE_EMPLOYEE_FAMILY',
            'REQUEST_DELETE_EMPLOYEE_FAMILY',
            'REQUEST_LIST_EMERGENCY_CONTACT_BY_ID',
            'REQUEST_CREATE_EMERGENCY_CONTACT',
            'REQUEST_UPDATE_EMERGENCY_CONTACT',
            'REQUEST_DELETE_EMERGENCY_CONTACT'
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_LIST_FAMILY_BY_ID':
                        const rawResponse = await Services().get(`/services/eofemp/api/employees/${action.payload}/family-data`);
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_FAMILY_BY_ID',
                                payload: {
                                    data: rawResponse.data.content
                                },
                            })
                        }
                    case 'REQUEST_CREATE_EMPLOYEE_FAMILY':
                        await Services().post('/services/eofemp/api/employees/family-data', action.payload.data);
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Create Family Info Success" } });
                            dispatch({ type: "REQUEST_LIST_FAMILY_BY_ID", payload: action.payload.data.employeeId })
                        }
                    case 'REQUEST_UPDATE_EMPLOYEE_FAMILY':
                      await Services().put(`/services/eofemp/api/employees/family-data/${action.payload.idEdit}`, action.payload.data);
            
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Update Family Info Success" } });
                            dispatch({ type: "REQUEST_LIST_FAMILY_BY_ID", payload: action.payload.employeeId })
                        }
                    case 'REQUEST_DELETE_EMPLOYEE_FAMILY':
                      await Services().delete(`/services/eofemp/api/employees/family-data/${action.payload.id}`);
            
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Delete Family Info Success" } });
                            dispatch({ type: "REQUEST_LIST_FAMILY_BY_ID", payload: action.payload.employeeid })
                        }
                    case 'REQUEST_LIST_EMERGENCY_CONTACT_BY_ID':
                      const emergency = await Services().get(`/services/eofemp/api/employees/${action.payload}/emergency-contacts`);
                      return dispatch => {
                          dispatch({
                              type: 'GET_LIST_EMERGENCY_CONTACT_BY_ID',
                              payload: {
                                  data: emergency.data.content
                              },
                          })
                      }
                    case 'REQUEST_CREATE_EMERGENCY_CONTACT':
                      await Services().post('/services/eofemp/api/employees/emergency-contacts', action.payload.data);
                      return dispatch => {
                          dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Create Emergency Contact Success" } });
                          dispatch({ type: "REQUEST_LIST_EMERGENCY_CONTACT_BY_ID", payload: action.payload.data.employeeId })
                      }
                    case 'REQUEST_UPDATE_EMERGENCY_CONTACT':
                      await Services().put(`/services/eofemp/api/employees/emergency-contacts/${action.payload.idEdit}`, action.payload.data);
                      return dispatch => {
                          dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Update Emergency Contact Success" } });
                          dispatch({ type: "REQUEST_LIST_EMERGENCY_CONTACT_BY_ID", payload: action.payload.employeeId })
                      }
                    case 'REQUEST_DELETE_EMERGENCY_CONTACT':
                      await Services().delete(`/services/eofemp/api/employees/emergency-contacts/${action.payload.id}`);
            
                        return dispatch => {
                            dispatch({ type: 'ALERT_TOAST_SUCCESS', payload: { message: "Delete Emergency Success" } });
                            dispatch({ type: "REQUEST_LIST_EMERGENCY_CONTACT_BY_ID", payload: action.payload.employeeid })
                        }
                    default:
                        break
                }
            } catch (e) {
                const { message } = e
                return dispatch => {
                    dispatch({ type: "FAMILY_STAFF_FAILED" })
                    dispatch({ type: 'ALERT_TOAST_ERROR', payload: { message: message } });
                }
            }
        }),
    )
