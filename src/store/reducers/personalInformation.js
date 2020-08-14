const initialState = {
    identity: [],
    data: {
        address: "",
        birthDate: new Date(),
        birthDateInMillis: 0,
        birthPlace: "",
        bloodType: "O",
        employeeId: "",
        gender: "",
        id: 0,
        idNumber: "",
        idType: 0,
        idTypeName: "",
        maritalStatus: "",
        phone: "",
        religion: ""
    },
    personalData: [{
        birthDate: "",
        birthDateInMillis: 0,
        companyId: null,
        companyName: null,
        departmentId: null,
        departmentName: null,
        divisionId: null,
        divisionName: null,
        durationOfServiceInMillis: 0,
        email: null,
        firstName: null,
        gender: null,
        haveImage: false,
        id: null,
        imageUrl: null,
        joinedDateInMillis: 0,
        lastName: null,
        maritalStatus: null,
        nik: null,
        phone: null,
        position: null,
        positionTitleId: 0,
        religion: null,
        status: "INACTIVE",
        unitId: null,
        unitName: null,
    }],
    isLoading: false
}

export const personalInformation = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_LIST_PERSONAL_INFORMATION':
            return {
                ...state,
                isLoading: true,
            }
        case 'REQUEST_CREATE_PERSONAL_INFORMATION':
            return {
                ...state,
                isLoading: true,
            }
        case 'REQUEST_UPDATE_PERSONAL_INFORMATION':
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_LIST_PERSONAL_IDENTITY_TYPE':
            return {
                ...state,
                identity: action.payload.data
            }
        case 'GET_LIST_PERSONAL_INFORMATION':
            return {
                ...state,
                data: action.payload.data,
                isLoading: false,
            }
        case 'GET_LIST_PERSONAL_INFORMATION_STAFF':
            return {
                ...state,
                personalData: action.payload.data,
                isLoading: false,
            }
        case 'RESET_GET_LIST_PERSONAL_INFORMATION':
            return {
                ...state,
                data: {
                    address: "",
                    birthDate: new Date(),
                    birthDateInMillis: 0,
                    birthPlace: "",
                    bloodType: "O",
                    employeeId: "",
                    gender: "",
                    id: 0,
                    idNumber: "",
                    idType: 0,
                    idTypeName: "",
                    maritalStatus: "",
                    phone: "",
                    religion: ""
                }
            }
        case "PERSONAL_INFORMATION_FAILED":
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
}