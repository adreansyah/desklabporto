const initialState = {
    data: [],
    approversList: [],
    inYearList: [],
    resetInTheEndOf: [],
    insideCity: [],
    medicalLetter: [],
    eligibleNumberList: [],
    eligibleNumberOperatorList: [],
    eligibleForYearList: [],
    isLoading: false,
    isUtilitiesLoading: false,
    totalPages: 0,
    parameter: null
}

export const leaveSetting = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_LIST_LEAVE_SETTING':
            return {
                ...state,
                isLoading: true,
            }
        case 'REQUEST_LEAVE_SETTING_UTILITIES':
            return {
                ...state,
                isUtilitiesLoading: true
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
        case 'GET_LIST_LEAVE_SETTING':
            return {
                ...state,
                data: action.payload.data,
                isLoading: false,
                totalPages: action.payload.totalPages,
                parameter: action.payload.parameter
            }
        case 'GET_LIST_APPROVERS':
            return {
                ...state,
                approversList: action.payload,
                isUtilitiesLoading: false,
            }
        case 'GET_LIST_IN_YEARS':
            return {
                ...state,
                inYearList: action.payload,
                isUtilitiesLoading: false,
            }
        case 'GET_LIST_RESET_IN_THE_END_OF':
            return {
                ...state,
                resetInTheEndOf: action.payload,
                isUtilitiesLoading: false,
            }
        case 'GET_LIST_INSIDE_CITY':
            return {
                ...state,
                insideCity: action.payload,
                isUtilitiesLoading: false,
            }
        case 'GET_LIST_MEDICAL_LETTER':
            return {
                ...state,
                medicalLetter: action.payload,
                isUtilitiesLoading: false,
            }
        case 'GET_LIST_ELIGIBLE_NUMBER':
            return {
                ...state,
                eligibleNumberList: action.payload,
                isUtilitiesLoading: false,
            }
        case 'GET_LIST_ELIGIBLE_NUMBER_OPERATOR':
            return {
                ...state,
                eligibleNumberOperatorList: action.payload,
                isUtilitiesLoading: false,
            }
        case 'GET_LIST_ELIGIBLE_FOR_YEAR':
            return {
                ...state,
                eligibleForYearList: action.payload,
                isUtilitiesLoading: false,
            }
        case "LEAVE_SETTING_FAILED":
            return {
                ...state,
                isLoading: false,
                isUtilitiesLoading: false,
            }
        default:
            return state
    }
}