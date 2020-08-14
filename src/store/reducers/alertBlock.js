import React from 'react'
import { Ribbon, AlertBox } from '@elevenia/master-ui/components/Atom';

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

export const setAlerts = (state = InitialStateAlerts, action) => {
    switch (action.type) {
        case 'ALERT_ERROR':
            return {
                ...state,
                notify: {
                    status: true,
                    componentMessage: {
                        ribbon: (
                            <Ribbon
                                type="error"
                                className="u-ps-fixed"
                                style={{ zIndex: 1030, width: '100%' }}
                            >
                                {action.payload.message}
                            </Ribbon>
                        ),
                        block: (
                            <AlertBox type="error" dismiss={() => console.log("a")} p={20} mb={10} responsive={true}>
                                {action.payload.message}
                            </AlertBox>
                        )
                    },
                    statName: 'error',
                    message: action.payload.message
                },
            }
        case 'ALERT_SUCCESS':
            return {
                ...state,
                notify: {
                    status: true,
                    componentMessage: {
                        ribbon: (
                            <Ribbon
                                type="success"
                                className="u-ps-fixed"
                                style={{ zIndex: 1030, width: '100%' }}
                            >
                                {action.payload.message}
                            </Ribbon>
                        ),
                        block: (
                            <AlertBox type="success" dismiss={() => console.log("a")} p={20} mb={10} responsive={true}>
                                {action.payload.message}
                            </AlertBox>
                        )
                    },
                    statName: 'success',
                    message: action.payload.message
                },
            }
        case 'ALERT_WARNING':
            return {
                ...state,
                notify: {
                    status: true,
                    componentMessage: {
                        ribbon: (
                            <Ribbon
                                type="warning"
                                className="u-ps-fixed"
                                style={{ zIndex: 1030, width: '100%' }}
                            >
                                {action.payload.message}
                            </Ribbon>
                        ),
                        block: (
                            <AlertBox type="warning" dismiss={() => console.log("a")} p={20} mb={10} responsive={true}>
                                {action.payload.message}
                            </AlertBox>
                        )
                    },
                    statName: 'warning',
                    message: action.payload.message
                },
            }
        case 'ALERT_ERROR_SESSION':
            return {
                ...state,
                notify: {
                    status: true,
                    componentMessage: {
                        ribbon: (
                            <Ribbon
                                type="error"
                                className="u-ps-fixed"
                                style={{ zIndex: 1030, width: '100%' }}
                            >
                                {action.payload.message}
                            </Ribbon>
                        ),
                        block: (
                            <AlertBox type="error" dismiss={() => console.log("a")} p={20} mb={10} responsive={true}>
                                {action.payload.message}
                            </AlertBox>
                        )
                    },
                    statName: 'error-session',
                    message: action.payload.message
                },
            }
        case 'ALERT_CLEARS':
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
