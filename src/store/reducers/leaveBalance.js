const initialState = {
    data: [],
    isLoading: false,
    totalPages: 0,
    parameter: null
}

export const leaveBalance = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_LIST_LEAVE_BALANCE':
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_LIST_LEAVE_BALANCE':
            return {
                ...state,
                data: action.payload.data,
                isLoading: false,
                totalPages: action.payload.totalPages,
                parameter: action.payload.parameter
            }
        case 'FAILED_LEAVE_BALANCE':
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}