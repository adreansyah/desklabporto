const initialState = {
    data: [],
    isLoading: false,
    totalPages: 0,
    parameter: null
}

export const venue = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_LIST_VENUE':
            return {
                ...state,
                isLoading: true,
            }
        case 'REQUEST_CREATE_VENUE':
            return {
                ...state,
                isLoading: true,
            }
        case 'REQUEST_UPDATE_VENUE':
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_LIST_VENUE':
            return {
                ...state,
                data: action.payload.data,
                isLoading: false,
                totalPages: action.payload.totalPages,
                parameter: action.payload.parameter
            }
        case "VENUE_FAILED":
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
}