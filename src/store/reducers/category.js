const initialState = {
    data: [],
    isLoading: false,
    totalPages: 0,
    parameter: null
}

export const category = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_LIST_CATEGORY':
            return {
                ...state,
                isLoading: true,
            }
        case 'REQUEST_CREATE_CATEGORY':
            return {
                ...state,
                isLoading: true,
            }
        case 'REQUEST_UPDATE_CATEGORY':
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_LIST_CATEGORY':
            return {
                ...state,
                data: action.payload.data,
                isLoading: false,
                totalPages: action.payload.totalPages,
                parameter: action.payload.parameter
            }
        case "CATEGORY_FAILED":
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
}