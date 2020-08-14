const initialState = {
    data: [],
    isLoading: false,
    totalPages: 0,
    parameter: null
}

export const departement = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_LIST_DEPARTEMENT':
            return {
                ...state,
                isLoading: true,
            }
        case 'REQUEST_CREATE_DEPARTEMENT':
            return {
                ...state,
                isLoading: true,
            }
        case 'REQUEST_UPDATE_DEPARTEMENT':
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_LIST_DEPARTEMENT':
            return {
                ...state,
                data: action.payload.data,
                isLoading: false,
                totalPages: action.payload.totalPages,
                parameter: action.payload.parameter
            }
        case "DEPARTEMENT_FAILED":
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
}