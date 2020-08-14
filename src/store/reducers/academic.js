const initialState = {
  data: [],
  isLoading: false,
  totalPages: 0,
  params: null
  
}

export const academic = (state = initialState, action) => {
  switch (action.type) {
      case 'REQUEST_READ_ACADEMIC_GRADE':
          return {
              ...state,
              isLoading: true,
          }
      case 'GET_LIST_ACADEMIC':
          return {
              ...state,
              data: action.payload.data,
              isLoading: false,
              totalPages: action.payload.totalPages,
              params: action.payload.params
          }
      case "ACADEMIC_FAILED":
          return {
              ...state,
              isLoading: false,
          }
        
      default:
          return state
  }
}