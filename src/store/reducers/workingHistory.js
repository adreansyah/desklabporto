const initialState = {
  data: [],
  isLoading:false,
  params:null
}

export const workingHistory = (state = initialState, action) => {
  switch (action.type) {
      case 'REQUEST_LIST_WORKING_HISTORY_BY_ID':
          return {
              ...state,
              isLoading: true,
          }
      case 'GET_LIST_WORKING_HISTORY_BY_ID':
          return {
              ...state,
              data: action.payload.data,
              isLoading: false,
              params:action.payload.params
          }
      case "WORKING_HISTORY_STAFF_FAILED":
          return {
              ...state,
              isLoading: false,
          }
        
      default:
          return state
  }
}