export const requestAppVersioning = (params) => {
  return dispatch => {
      dispatch({
          type: "REQUEST_LIST_APP_VERSIONING",
          payload: {params}
      })
  }
}

export const RequestSubmitAppVersioning = ( data = {} ,params) => {
  return {
      type: "REQUEST_CREATE_APP_VERSIONING",
      payload: { 
        data,
        params
      }
  }
}

export const RequestUpdateAppVersioning = (data = {},employeeId, idEdit, params) => {
  return {
      type: "REQUEST_UPDATE_APP_VERSIONING",
      payload: {
        data,
        employeeId,
        idEdit,
        params
      }
  }
}

export const RequestDeleteAppVersioning = (id,params) => {
  return {
      type: "REQUEST_DELETE_APP_VERSIONING",
      payload: {
          id,
          params
      }
  }
}