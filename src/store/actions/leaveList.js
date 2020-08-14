export const RequestLeaveList = (params) => {
  return dispatch => {
      dispatch({
          type: "REQUEST_LEAVE_LIST",
          payload: {params}
      })
  }
}

export const RequestChangeStatusLeave = (params) => {
  return dispatch => {
    dispatch({
      type:'REQUEST_CHANGE_STATUS_LEAVE',
      payload:{params}
    })
  }
}