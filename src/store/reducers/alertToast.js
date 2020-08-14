const InitialStateAlerts = {
    notify: {
        status: false,
        componentMessage: {
            ribbon: "",
            block: ""
        },
        statName: '',
        message: "",
    },
}

export const setAlertsToast = (state = InitialStateAlerts, action) => {
    switch (action.type) {
        case 'ALERT_TOAST_ERROR':
            return {
                ...state,
                notify: {
                    status: true,
                    statName: 'error',
                    message: action.payload.message
                },
            }
        case 'ALERT_TOAST_SUCCESS':
            return {
                ...state,
                notify: {
                    status: true,
                    statName: 'success',
                    message: action.payload.message
                },
            }
        case 'ALERT_TOAST_WARNING':
            return {
                ...state,
                notify: {
                    status: true,
                    statName: 'warning',
                    message: action.payload.message
                },
            }
        case 'ALERT_TOAST_ERROR_SESSION':
            return {
                ...state,
                notify: {
                    status: true,
                    statName: 'error-session',
                    message: action.payload.message
                },
            }
        case 'ALERT_TOAST_CLEARS':
            return {
                notify: {
                    status: false,
                    componentMessage: {
                        ribbon: "",
                        block: ""
                    },
                    statName: 'get-all-clear',
                    message: ''
                },
            }
        default:
            return state
    }
}
