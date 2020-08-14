const initialState = {
  dataFormalEducations: [],
  dataInformalEducations: [],
  
}

export const educationStaff = (state = initialState, action) => {
  switch (action.type) {
      case 'REQUEST_LIST_FORMAL_EDUCATION_BY_ID':
          return {
              ...state,
              isLoading: true,
          }
      case 'GET_LIST_FORMAL_EDUCATION_BY_ID':
          return {
              ...state,
              dataFormalEducations: action.payload.data,
              isLoading: false,
          }
      case "FORMAL_EDUCATION_STAFF_FAILED":
          return {
              ...state,
              isLoading: false,
          }
      case 'REQUEST_LIST_INFORMAL_EDUCATION_BY_ID':
          return {
              ...state,
              isLoading: true,
          }
      case 'GET_LIST_INFORMAL_EDUCATION_BY_ID':
          return {
              ...state,
              dataInformalEducations: action.payload.data,
              isLoading: false,
          }
        
      default:
          return state
  }
}