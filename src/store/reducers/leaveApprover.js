const initialState = {
  data: [],
  isLoading:false,
  totalPages:0,
  params:null,
  listEmployee:[],
  listApproverTitle:[]
}

export const leaveApprover = (state = initialState, action) => {
  switch (action.type) {
        case 'REQUEST_LIST_LEAVE_APPROVER':
            return {
                ...state,
                isLoading: true,
            }
        case 'RESET_LIST_APPROVER_NAME':
            return {
                ...state,
                listEmployee: [],
            }
        case 'GET_LIST_LEAVE_APPROVER':
            return {
                ...state,
                data: action.payload.data,
                isLoading: false,
                params:action.payload.params,
                totalPages:action.payload.totalPages
            }
        case 'GET_LIST_EMPLOYEE_BY_ID_TITLE':
        return {
            ...state,
            isLoading: false,
            listEmployee:action.payload.listEmployee
        }
        case 'GET_LIST_APPROVER_POSTITION_TITLE':
        return {
            ...state,
            isLoading: false,
            listApproverTitle:action.payload.listApproverTitle
        }
        case "LEAVE_APPROVER_FAILED":
            return {
                ...state,
                isLoading: false
            }

        default:
            return state
  }
}