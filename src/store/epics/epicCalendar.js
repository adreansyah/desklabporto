import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { Services } from 'service'

export const RequestCalendar = (action$) =>
    action$.pipe(
        ofType(
            'REQUEST_LIST_CALENDAR',
        ),
        mergeMap(async action => {
            try {
                switch (action.type) {
                    case 'REQUEST_LIST_CALENDAR':
                        const rawResponse = await Services().get('/services/eofemp/api/calendar', action.payload);
                        let calendar = []
                        rawResponse.data.forEach(getDate => {
                            getDate.details.forEach(isEmployee => {
                                calendar = [...calendar, { title: isEmployee.employeeName, eventDescription: isEmployee.typeName, eventDate: getDate.date, date: getDate.date, color: isEmployee.colorCode, display: isEmployee.typeName === 'Public Holiday' ? 'block' : 'list-item' }]
                            });
                        });
                        return dispatch => {
                            dispatch({
                                type: 'GET_LIST_CALENDAR',
                                payload: {
                                    data: calendar
                                },
                            })
                        }
                    default:
                        break
                }
            } catch (e) {
                const { message } = e
                return dispatch => {
                    dispatch({ type: "FAILED_CALENDAR" })
                    dispatch({ type: 'ALERT_TOAST_ERROR', payload: { message: message } });
                }
            }
        }),
    )
