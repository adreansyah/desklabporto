const initialState = {
    data: [],
    isLoading: false,
    totalPages: 0,
    parameter: null
}

export const company = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_LIST_COMPANY':
            return {
                ...state,
                isLoading: true,
            }
        case 'REQUEST_CREATE_COMPANY':
            return {
                ...state,
                isLoading: true,
            }
        case 'REQUEST_UPDATE_COMPANY':
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_LIST_COMPANY':
            return {
                ...state,
                data: action.payload.data,
                isLoading: false,
                totalPages: action.payload.totalPages,
                parameter: action.payload.parameter
            }
        case 'FAILED_COMPANY':
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}