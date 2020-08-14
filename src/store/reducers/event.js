const initialState = {
    data: [],
    isLoading: false,
    totalPages: 0,
    parameter: null
}

export const event = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_EVENT_LIST':
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_EVENT_LIST':
            return {
                ...state,
                data: action.payload.data,
                isLoading: false,
                totalPages: action.payload.totalPages,
                parameter: action.payload.parameter
            }
        case "EVENT_LIST_FAILED":
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
}