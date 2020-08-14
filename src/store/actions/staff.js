import moment from 'moment'
export const requestListStaff = (isObject) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_LIST_STAFF",
            payload: isObject
        })
    }
}

export const requestActivationKey = (email) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_CREATE_ACTIVATION_KEY",
            payload: {
                email
            }
        })
    }
}

export const requestCreateStaff = (params) => {
    const image = params.upload !== null ? params.upload.base64.substr(params.upload.base64.indexOf(',') + 1) : "";
    const imageContentType = params.upload !== null ? params.upload.filesImage.type : "";
    return dispatch => {
        dispatch({
            type: "REQUEST_CREATE_STAFF",
            payload: {
                "employee": {
                    barcode: params.barcode,
                    email: params.email,
                    firstName: params.firstname,
                    image,
                    imageContentType,
                    lastName: params.lastname,
                    nik: params.nik,
                    password: "edts123"
                },
                personalData: {
                    address: params.address,
                    birthDate: moment(params.birthdate).format("DD-MM-YYYY HH:mm:ssZ"),
                    birthPlace: params.birthplace,
                    bloodType: params.bloodtype,
                    gender: params.gender,
                    maritalStatus: params.maritalstatus,
                    phone: params.phone,
                    religion: params.religion
                },
                position: {
                    departmentId: params.departement,
                    divisionId: params.division,
                    levelId: params.level,
                    positionTitleId: params.title,
                    startDate: moment(params.joindate).format("DD-MM-YYYY HH:mm:ssZ"),
                    unitId: params.unit,
                    managerId: params.reportTo
                }
            }
        })
    }
}

export const requestUpdateStaff = (id, params) => {
    const image = params.upload !== null ? params.upload.base64.substr(params.upload.base64.indexOf(',') + 1) : "";
    const imageContentType = params.upload !== null ? params.upload.filesImage.type : "";
    return dispatch => {
        if (params.upload !== null) {
            dispatch({
                type: "REQUEST_UPDATE_STAFF",
                payload: {
                    id,
                    body: {
                        firstName: params.firstname,
                        lastName: params.lastname,
                        image,
                        imageContentType
                    }
                }
            })
        }
        else {
            dispatch({
                type: "REQUEST_UPDATE_STAFF",
                payload: {
                    id,
                    body: {
                        firstName: params.firstname,
                        lastName: params.lastname
                    }
                }
            })
        }
    }
}

export const requestDeleteStaff = (id) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_DELETE_STAFF",
            payload: {
                id
            }
        })
    }
}
export const requestLeaveApproverById = (empId) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_APPROVER_STAFF",
            payload: { empId }
        })
    }
}