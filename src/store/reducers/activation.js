const initialState = {
  
  isLoading: false,
  data:null,
  isLoadingSubmit:false,
  statusActivation:null
}

export const activation = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_CHECK_KEY_ACTIVATION':
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_CHECK_KEY_ACTIVATION':
            return {
                ...state,
                isLoading: false,
                data: action.payload.data
            }
        case "CHECK_KEY_ACTIVATION_FAILED":
            return {
                ...state,
                isLoading: false,
            }
        case "REQUEST_SUBMIT_ACTIVATION":
            return {
                ...state,
                isLoadingSubmit: true,
            }
        case "REQUEST_ACTIVATION_SUCCESS":
            return {
                ...state,
                isLoadingSubmit: false,
                statusActivation: true
            }
        case "REQUEST_ACTIVATION_FAILED":
            return {
                ...state,
                isLoadingSubmit: false,
                statusActivation: false
            }    
        default:
            return state
    }
}