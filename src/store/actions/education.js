export const requestListFormalEducationById = (id) => {
  return dispatch => {
      dispatch({
          type: "REQUEST_LIST_FORMAL_EDUCATION_BY_ID",
          payload: id
      })
  }
}

export const RequestSubmitEmployeeFormalEducation = ( data = {} ) => {
  return {
      type: "REQUEST_CREATE_EMPLOYEE_FORMAL_EDUCATION",
      payload: { 
        data
      }
  }
}

export const RequestUpdateEmployeeFormalEducation = (data = {},employeeId, idEdit) => {
  return {
      type: "REQUEST_UPDATE_EMPLOYEE_FORMAL_EDUCATION",
      payload: {
        data,
        employeeId,
        idEdit
      }
  }
}

export const RequestDeleteEmployeeFormalEducation = (id,employeeid='') => {
  return {
      type: "REQUEST_DELETE_EMPLOYEE_FORMAL_EDUCATION",
      payload: {
          id,
          employeeid
      }
  }
}

export const requestListInformalEducationById = (id) => {
  return dispatch => {
      dispatch({
          type: "REQUEST_LIST_INFORMAL_EDUCATION_BY_ID",
          payload: id
      })
  }
}

export const RequestSubmitInformalEducation = ( data = {} ) => {
  return {
      type: "REQUEST_CREATE_INFORMAL_EDUCATION",
      payload: { 
        data
      }
  }
}

export const RequestUpdateInformalEducation = (data = {},employeeId, idEdit) => {
  return {
      type: "REQUEST_UPDATE_INFORMAL_EDUCATION",
      payload: {
        data,
        employeeId,
        idEdit
      }
  }
}

export const RequestDeleteInformalEducation = (id,employeeid='') => {
  return {
      type: "REQUEST_DELETE_INFORMAL_EDUCATION",
      payload: {
          id,
          employeeid
      }
  }
}



