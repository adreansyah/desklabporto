import moment from "moment";
export const requestIdentityType = () => {
    return dispatch => {
        dispatch({
            type: "REQUEST_LIST_PERSONAL_IDENTITY_TYPE"
        })
    }
}
export const requestPersonalInformation = (id) => {
    return dispatch => {
        dispatch({ type: "REQUEST_LIST_PERSONAL_INFORMATION", payload: { id } })
        dispatch({ type: "REQUEST_LIST_PERSONAL_INFORMATION_STAFF", payload: { id } })
    }
}

export const requestCreatePersonalInformation = (id, params) => {
    const image = params.upload !== null ? params.upload.base64.substr(params.upload.base64.indexOf(',') + 1) : "";
    const imageContentType = params.upload !== null ? params.upload.filesImage.type : "";
    return dispatch => {
        let payload = {};
        if (params.upload !== null) {
            payload = {
                address: params.address,
                birthPlace: params.birthplace,
                birthDate: moment(params.birthdate).format("DD-MM-YYYY HH:mm:ssZ"),
                bloodType: params.bloodtype,
                employeeId: id,
                idNumber: params.identityNumber,
                idType: params.identity,
                gender: params.gender,
                maritalStatus: params.maritalstatus,
                phone: params.phone,
                religion: params.religion,
                employeeUpdate: {
                    firstName: params.firstname,
                    lastName: params.lastname,
                    image,
                    imageContentType,
                }
            }
        }
        else {
            payload = {
                address: params.address,
                birthPlace: params.birthplace,
                birthDate: moment(params.birthdate).format("DD-MM-YYYY HH:mm:ssZ"),
                bloodType: params.bloodtype,
                employeeId: id,
                idNumber: params.identityNumber,
                idType: params.identity,
                gender: params.gender,
                maritalStatus: params.maritalstatus,
                phone: params.phone,
                religion: params.religion,
                employeeUpdate: {
                    firstName: params.firstname,
                    lastName: params.lastname
                }
            }
        }
        dispatch({
            type: "REQUEST_CREATE_PERSONAL_INFORMATION",
            payload
        });
    }
}

export const requestUpdatePersonalInformation = (id, params) => {
    const image = params.upload !== null ? params.upload.base64.substr(params.upload.base64.indexOf(',') + 1) : "";
    const imageContentType = params.upload !== null ? params.upload.filesImage.type : "";
    return dispatch => {
        let payloadUpdate = {};
        if (params.upload !== null) {
            payloadUpdate = {
                address: params.address,
                birthPlace: params.birthplace,
                birthDate: moment(params.birthdate).format("DD-MM-YYYY HH:mm:ssZ"),
                bloodType: params.bloodtype,
                employeeId: id,
                idNumber: params.identityNumber,
                idType: params.identity,
                gender: params.gender,
                maritalStatus: params.maritalstatus,
                phone: params.phone,
                religion: params.religion,
                employeeUpdate: {
                    firstName: params.firstname,
                    lastName: params.lastname,
                    image,
                    imageContentType,
                }
            }
        }
        else {
            payloadUpdate = {
                address: params.address,
                birthPlace: params.birthplace,
                birthDate: moment(params.birthdate).format("DD-MM-YYYY HH:mm:ssZ"),
                bloodType: params.bloodtype,
                employeeId: id,
                idNumber: params.identityNumber,
                idType: params.identity,
                gender: params.gender,
                maritalStatus: params.maritalstatus,
                phone: params.phone,
                religion: params.religion,
                employeeUpdate: {
                    firstName: params.firstname,
                    lastName: params.lastname
                }
            }
        }
        dispatch({
            type: "REQUEST_UPDATE_PERSONAL_INFORMATION",
            payload: {
                data: payloadUpdate,
                id
            }
        });
    }
}

export const resignActionPopUp = (id) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_RESIGN_EMPLOYEE_ACTIVE",
            payload: {
                id,
                date: {
                    resignDate: moment(new Date()).format("DD-MM-YYYY HH:mm:ssZ")
                }
            }
        })
    }
}