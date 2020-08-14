const initialState = {
    data: [],
    isLoading: false,
}

export const calendar = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_LIST_CALENDAR':
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_LIST_CALENDAR':
            return {
                ...state,
                data: action.payload.data,
                isLoading: false
            }
        case "FAILED_CALENDAR":
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
}