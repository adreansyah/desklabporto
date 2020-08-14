export const requestCheckKeyResetPassword = (key) => {
  return {
      type: "REQUEST_CHECK_KEY_RESET_PASSWORD",
      payload: { key }
  }
}

export const requestSubmitResetPassword = (params) => {
  return {
      type: "REQUEST_SUBMIT_RESET_PASSWORD",
      payload: { params }
  }
}