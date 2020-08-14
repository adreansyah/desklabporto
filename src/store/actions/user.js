export const GetListRole = () => {
  return {
      type: 'REQUEST_GET_LIST_ROLE',
  }
}

export const GetListCompanies = (params) => {
  return {
    type: 'REQUEST_LIST_COMPANY',
    payload:{params}
  }
}

export const GetDetailCompanyAdminById = (id) => {
  return { type: "REQUEST_LIST_PERSONAL_INFORMATION_STAFF", payload: { id } }
}

export const GetListUsers = (params) => {
  return {
      type: 'REQUEST_GET_LIST_USERS',
      payload: {params}
  }
}

export const RegisterUser = (data,params) => {
  return {
      type: 'REQUEST_REGISTER_USER',
      payload: {data, params}
  }
}

export const UpdateUser = (data,id,params) => {
  return {
      type: 'REQUEST_UPDATE_USER',
      payload: {id,data,params}
  }
}

export const DeleteUser = (id,params) => {
  return {
      type: 'REQUEST_DELETE_USER',
      payload: {id,params}
  }
}

export const SearchQueryUsers = (query = "", page = "") => {
  return {
      type: 'SEARCH_REQUEST_GET_LIST_USERS',
      payload: {
          query,
          page
      }
  }
}

