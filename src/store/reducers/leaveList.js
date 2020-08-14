const initialState = {
  data: [],
  isLoading:false,
  totalPages:0,
  params:null
}

export const leaveList = (state = initialState, action) => {
  switch (action.type) {
      case 'REQUEST_LEAVE_LIST':
          return {
              ...state,
              isLoading: true,
          }
      case 'GET_LEAVE_LIST':
          return {
              ...state,
              data: action.payload.data,
              isLoading: false,
              params:action.payload.params,
              totalPages:action.payload.totalPages
          }
      case "LEAVE_LIST_FAILED":
          return {
              ...state,
              isLoading: false
          }
        
      default:
          return state
  }
}