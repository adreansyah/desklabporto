export const requestListWorkingHistoryById = (id,params) => {
  return dispatch => {
      dispatch({
          type: "REQUEST_LIST_WORKING_HISTORY_BY_ID",
          payload: {id, params}
      })
  }
}

export const RequestSubmitEmployeeWorkingHistory = ( data = {} ,params) => {
  return {
      type: "REQUEST_CREATE_EMPLOYEE_WORKING_HISTORY",
      payload: { 
        data,
        params
      }
  }
}

export const RequestUpdateEmployeeWorkingHistory = (data = {},employeeId, idEdit, params) => {
  return {
      type: "REQUEST_UPDATE_EMPLOYEE_WORKING_HISTORY",
      payload: {
        data,
        employeeId,
        idEdit,
        params
      }
  }
}

export const RequestDeleteEmployeeWorkingHistory = (id,employeeid='',params) => {
  return {
      type: "REQUEST_DELETE_EMPLOYEE_WORKING_HISTORY",
      payload: {
          id,
          employeeid,
          params
      }
  }
}