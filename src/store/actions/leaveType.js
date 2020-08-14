export const requestLeaveType = (params) => {
  return dispatch => {
      dispatch({
          type: "REQUEST_LIST_LEAVE_TYPE",
          payload: {params}
      })
  }
}

export const RequestSubmitLeaveType = ( data = {} ,params) => {
  return {
      type: "REQUEST_CREATE_LEAVE_TYPE",
      payload: { 
        data,
        params
      }
  }
}

export const RequestUpdateLeaveType = (data = {},employeeId, idEdit, params) => {
  return {
      type: "REQUEST_UPDATE_LEAVE_TYPE",
      payload: {
        data,
        employeeId,
        idEdit,
        params
      }
  }
}

export const RequestDeleteLeaveType = (id,params) => {
  return {
      type: "REQUEST_DELETE_LEAVE_TYPE",
      payload: {
          id,
          params
      }
  }
}