const initialState = {
    data: [],
    isLoading: false,
    totalPages: 0,
    parameter: null
}

export const positionLevel = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_LIST_POSITION_LEVEL':
            return {
                ...state,
                isLoading: true,
            }
        case 'REQUEST_CREATE_POSITION_LEVEL':
            return {
                ...state,
                isLoading: true,
            }
        case 'REQUEST_UPDATE_POSITION_LEVEL':
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_LIST_POSITION_LEVEL':
            return {
                ...state,
                data: action.payload.data,
                isLoading: false,
                totalPages: action.payload.totalPages,
                parameter: action.payload.parameter
            }
        case "POSITION_LEVEL_FAILED":
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
}