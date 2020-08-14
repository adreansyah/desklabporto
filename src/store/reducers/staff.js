const initialState = {
    data: [],
    approverList: [],
    isLoading: false,
    totalPages: 0,
    parameter: null
}

export const staff = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_LIST_STAFF':
            return {
                ...state,
                isLoading: true,
            }
        case 'REQUEST_CREATE_STAFF':
            return {
                ...state,
                isLoading: true,
            }
        case 'REQUEST_UPDATE_STAFF':
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_LIST_STAFF':
            return {
                ...state,
                data: action.payload.data,
                isLoading: false,
                totalPages: action.payload.totalPages,
                parameter: action.payload.parameter
            }
        case 'GET_LIST_APPROVER_STAFF':
            return {
                ...state,
                approverList: action.payload
            }
        case "STAFF_FAILED":
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
}