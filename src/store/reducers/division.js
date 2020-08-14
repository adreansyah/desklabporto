const initialState = {
    data: [],
    isLoading: false,
    totalPages: 0,
    parameter: null
}

export const division = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_LIST_DIVISION':
            return {
                ...state,
                isLoading: true,
            }
        case 'REQUEST_CREATE_DIVISION':
            return {
                ...state,
                isLoading: true,
            }
        case 'REQUEST_UPDATE_DIVISION':
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_LIST_DIVISION':
            return {
                ...state,
                data: action.payload.data,
                isLoading: false,
                totalPages: action.payload.totalPages,
                parameter: action.payload.parameter
            }
        case "DIVISION_FAILED":
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
}