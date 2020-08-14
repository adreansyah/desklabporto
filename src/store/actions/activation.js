export const requestCheckKeyActivation = (key) => {
  return {
      type: "REQUEST_CHECK_KEY_ACTIVATION",
      payload: { key }
  }
}

export const requestSubmitActivation = (params) => {
  return {
      type: "REQUEST_SUBMIT_ACTIVATION",
      payload: { params }
  }
}