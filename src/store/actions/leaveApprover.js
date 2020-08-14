export const requestLeaveApprover = (params) => {
  return dispatch => {
      dispatch({
          type: "REQUEST_LIST_LEAVE_APPROVER",
          payload: {params}
      })
  }
}

export const requestPositionTitleApprover = () => {
  return dispatch => {
      dispatch({
          type: "REQUEST_LIST_POSITION_TITLE_APPROVER",
          payload:{}
      })
  }
}

export const requestEmployeeByIdTitle = (id) => {
  return dispatch => {
      dispatch({
          type: "REQUEST_LIST_EMPLOYEE_BY_ID_TITLE",
          payload: id
      })
  }
}

export const RequestSubmitLeaveApprover = ( data = {} ,params) => {
  return {
      type: "REQUEST_CREATE_LEAVE_APPROVER",
      payload: { 
        data,
        params
      }
  }
}

export const RequestUpdateLeaveApprover = (data = {},params) => {
  return {
      type: "REQUEST_UPDATE_LEAVE_APPROVER",
      payload: {
        data,
        params
      }
  }
}

export const RequestDeleteLeaveApprover = (id,params) => {
  return {
      type: "REQUEST_DELETE_LEAVE_APPROVER",
      payload: {
          id,
          params
      }
  }
}