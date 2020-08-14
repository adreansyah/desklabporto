const initialState = {
    data: [],
    isLoading: false,
    totalPages: 0,
    parameter: null
}

export const unitResources = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_LIST_UNIT_RESOURCES':
            return {
                ...state,
                isLoading: true,
            }
        case 'REQUEST_CREATE_UNIT_RESOURCES':
            return {
                ...state,
                isLoading: true,
            }
        case 'REQUEST_UPDATE_UNIT_RESOURCES':
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_LIST_UNIT_RESOURCES':
            return {
                ...state,
                data: action.payload.data,
                isLoading: false,
                totalPages: action.payload.totalPages,
                parameter: action.payload.parameter
            }
        case "UNIT_RESOURCES_FAILED":
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
}