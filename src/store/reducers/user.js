const initialState = {
  data: [],
  isLoading: false,
  totalPages: 0,
  params: null
  
}

export const users = (state = initialState, action) => {
  switch (action.type) {
      case 'REQUEST_GET_LIST_USERS':
          return {
              ...state,
              isLoading: true,
          }
      case 'GET_LIST_USER':
          return {
              ...state,
              data: action.payload.data,
              isLoading: false,
              totalPages: action.payload.totalPages,
              params: action.payload.params
          }
      case "USER_FAILED":
          return {
              ...state,
              isLoading: false,
          }
        
      default:
          return state
  }
}