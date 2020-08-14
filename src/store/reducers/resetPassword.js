const initialState = {
  
  isLoading: false,
  data:null,
  isLoadingSubmit:false,
  statusResetPassword:null
}

export const resetPassword = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_CHECK_KEY_RESET_PASSWORD':
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_CHECK_KEY_RESET_PASSWORD':
            return {
                ...state,
                isLoading: false,
                data: action.payload.data
            }
        case "CHECK_KEY_RESET_PASSWORD_FAILED":
            return {
                ...state,
                isLoading: false,
            }
        case "REQUEST_SUBMIT_RESET_PASSWORD":
            return {
                ...state,
                isLoadingSubmit: true,
            }
        case "REQUEST_RESET_PASSWORD_SUCCESS":
            return {
                ...state,
                isLoadingSubmit: false,
                statusResetPassword: true
            }
        case "REQUEST_RESET_PASSWORD_FAILED":
            return {
                ...state,
                isLoadingSubmit: false,
                statusResetPassword: false
            }    
        default:
            return state
    }
}