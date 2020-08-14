const initialState = {
  data: [],
  isLoading:false,
  totalPages:0,
  params:null
}

export const appVersioning = (state = initialState, action) => {
  switch (action.type) {
      case 'REQUEST_LIST_APP_VERISIONING':
          return {
              ...state,
              isLoading: true,
          }
      case 'GET_LIST_APP_VERSIONING':
          return {
              ...state,
              data: action.payload.data,
              isLoading: false,
              params:action.payload.params,
              totalPages:action.payload.totalPages
          }
      case "APP_VERISIONING_FAILED":
          return {
              ...state,
              isLoading: false
          }
        
      default:
          return state
  }
}