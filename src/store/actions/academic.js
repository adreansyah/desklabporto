export const requestListAcademic = (params) => {
  return dispatch => {
      dispatch({
          type: "REQUEST_READ_ACADEMIC_GRADE",
          payload: {params}
      })
  }
}

export const RequestCreateAcademic = (params) => {
  return dispatch => {
      dispatch(
        {
          type:'REQUEST_CREATE_ACADEMIC_GRADE',
          payload: { params }
        }
      )
  }
}

export const RequestUpdateAcademic = (params) => {
  return dispatch => {
      dispatch(
        {
          type:'REQUEST_UPDATE_ACADEMIC_GRADE',
          payload: { params }
        }
      )
  }
}

export const RequestDeleteAcademic = (params) => {
  return dispatch => {
      dispatch(
        {
          type:'REQUEST_DELETE_ACADEMIC_GRADE',
          payload: { params }
        }
      )
  }
}