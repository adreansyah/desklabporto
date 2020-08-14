const initialState = {
  data: [],
  isLoading:false,
  totalPages:0,
  params:null
}

export const leaveType = (state = initialState, action) => {
  switch (action.type) {
      case 'REQUEST_LIST_LEAVE_TYPE':
          return {
              ...state,
              isLoading: true,
          }
      case 'GET_LIST_LEAVE_TYPE':
          return {
              ...state,
              data: action.payload.data,
              isLoading: false,
              params:action.payload.params,
              totalPages:action.payload.totalPages
          }
      case "LEAVE_TYPE_FAILED":
          return {
              ...state,
              isLoading: false
          }
        
      default:
          return state
  }
}