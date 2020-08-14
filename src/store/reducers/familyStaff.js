const initialState = {
  dataFamily: [],
  dataEmergencyContact: [],
  
}

export const familyStaff = (state = initialState, action) => {
  switch (action.type) {
      case 'REQUEST_LIST_FAMILY_BY_ID':
          return {
              ...state,
              isLoading: true,
          }
      case 'GET_LIST_FAMILY_BY_ID':
          return {
              ...state,
              dataFamily: action.payload.data,
              isLoading: false,
          }
      case "FAMILY_STAFF_FAILED":
          return {
              ...state,
              isLoading: false,
          }
        case 'REQUEST_LIST_EMERGENCY_CONTACT_BY_ID':
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_LIST_EMERGENCY_CONTACT_BY_ID':
            return {
                ...state,
                dataEmergencyContact: action.payload.data,
                isLoading: false,
            }
        
      default:
          return state
  }
}