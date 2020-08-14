const initialState = {
    data: [],
    isLoading: false,
    totalPages: 0,
    parameter: null
}

export const holiday = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_LIST_HOLIDAY':
            return {
                ...state,
                isLoading: true,
            }
        case 'REQUEST_CREATE_HOLIDAY':
            return {
                ...state,
                isLoading: true,
            }
        case 'REQUEST_UPDATE_HOLIDAY':
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_LIST_HOLIDAY':
            return {
                ...state,
                data: action.payload.data,
                isLoading: false,
                totalPages: action.payload.totalPages,
                parameter: action.payload.parameter
            }
        case 'FAILED_HOLIDAY':
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}