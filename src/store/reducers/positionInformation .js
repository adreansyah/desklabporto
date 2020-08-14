const initialState = {
    currentPosition: {
        "id": 41,
        "positionTitleId": 6,
        "positionTitleName": "Software Engineer (Back End)",
        "startDate": "17-05-2017 11:22:33+07:00",
        "startDateInMillis": 1494994953000,
        "employeeId": "4e4b4257-5bc4-41d6-89ec-24fff0b177ed",
        "unitId": "47787937-4fd0-4a1e-9282-01fe2227a1a5",
        "unitName": "UNIT III",
        "departmentId": "1bfb4d82-2157-48c9-89c2-6f1d73676fa0",
        "departmentName": "Business Inteligence",
        "divisionId": "b2c50058-66d1-4fed-8b54-44f40f5ed273",
        "divisionName": "Data",
        "levelId": 45,
        "levelName": "Gol III"
    },
    previousPosition: [],
    isLoading: false
}

export const positionInformation = (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_LIST_CURRENT_POSITION':
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_LIST_CURRENT_POSITION':
            return {
                ...state,
                currentPosition: action.payload.data,
                isLoading: false,
            }
        case 'REQUEST_LIST_PREVIOUS_POSITION':
            return {
                ...state,
                isLoading: true,
            }
        case 'GET_LIST_PREVIOUS_POSITION':
            return {
                ...state,
                previousPosition: action.payload.data,
                isLoading: false,
            }
        case "POSITION_INFORMATION_FAILED":
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
}