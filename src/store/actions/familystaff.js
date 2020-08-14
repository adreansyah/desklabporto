export const requestListFamilyById = (id) => {
  return dispatch => {
      dispatch({
          type: "REQUEST_LIST_FAMILY_BY_ID",
          payload: id
      })
  }
}

export const RequestSubmitEmployeeFamily = ( data = {} ) => {
  return {
      type: "REQUEST_CREATE_EMPLOYEE_FAMILY",
      payload: { 
        data
      }
  }
}

export const RequestUpdateEmployeeFamily = (data = {},employeeId, idEdit) => {
  return {
      type: "REQUEST_UPDATE_EMPLOYEE_FAMILY",
      payload: {
        data,
        employeeId,
        idEdit
      }
  }
}

export const RequestDeleteEmployeeFamily = (id,employeeid='') => {
  return {
      type: "REQUEST_DELETE_EMPLOYEE_FAMILY",
      payload: {
          id,
          employeeid
      }
  }
}

export const requestListEmergencyContactById = (id) => {
  return dispatch => {
      dispatch({
          type: "REQUEST_LIST_EMERGENCY_CONTACT_BY_ID",
          payload: id
      })
  }
}

export const RequestSubmitEmergencyContact = ( data = {} ) => {
  return {
      type: "REQUEST_CREATE_EMERGENCY_CONTACT",
      payload: { 
        data
      }
  }
}

export const RequestUpdateEmergencyContact = (data = {},employeeId, idEdit) => {
  return {
      type: "REQUEST_UPDATE_EMERGENCY_CONTACT",
      payload: {
        data,
        employeeId,
        idEdit
      }
  }
}

export const RequestDeleteEmergencyContact = (id,employeeid='') => {
  return {
      type: "REQUEST_DELETE_EMERGENCY_CONTACT",
      payload: {
          id,
          employeeid
      }
  }
}



