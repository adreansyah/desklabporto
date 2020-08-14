export const requestListLeaveSetting = (isObject) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_LIST_LEAVE_SETTING",
            payload: isObject
        })
    }
}

export const requestLeaveSettingUtilities = () => {
    return dispatch => {
        dispatch({
            type: "REQUEST_LEAVE_SETTING_UTILITIES"
        })
    }
}

export const requestCreateLeaveSetting = (params, isLeave) => {
    const isLeaveType = isLeave.filter(isLeaveType => isLeaveType.value === params.leavetype);
    const payload = {
        approvers: params.approver.map(isApprovers => ({
            id: isApprovers.value,
            positionTitle: isApprovers.label,
            positionTitleId: isApprovers.value
        })),
        eligibleForNumber: params.number,
        eligibleForOperator: params.operator,
        eligibleForYear: params.period,
        givenDate: parseInt(params.givendate),
        inYear: params.inyear,
        insideCity: params.insidecity,
        leaveTypeId: params.leavetype,
        leaveTypeName: isLeaveType[0].label,
        maxTakenInRow: params.maxtakeninarow,
        medicalLetter: params.medicalletter,
        name: isLeaveType[0].label,
        resetInEndOf: params.reset,
        gender: params.gender,
        maritalStatus: params.maritalstatus,
        empStatus: params.employeestatus,
        totalDay: parseInt(params.totalday)
    }
    return dispatch => {
        dispatch({
            type: "REQUEST_CREATE_LEAVE_SETTING",
            payload
        })
    }
}

export const requestUpdateLeaveSetting = (id, params, isLeave) => {
    const isLeaveType = isLeave.filter(isLeaveType => isLeaveType.value === params.leavetype);
    const payload = {
        id,
        approvers: params.approver.map(isApprovers => ({
            id: isApprovers.value,
            positionTitle: isApprovers.label,
            positionTitleId: isApprovers.value
        })),
        eligibleForNumber: params.number,
        eligibleForOperator: params.operator,
        eligibleForYear: params.period,
        givenDate: parseInt(params.givendate),
        inYear: params.inyear,
        insideCity: params.insidecity,
        leaveTypeId: params.leavetype,
        leaveTypeName: isLeaveType[0].label,
        maxTakenInRow: params.maxtakeninarow,
        medicalLetter: params.medicalletter,
        name: isLeaveType[0].label,
        resetInEndOf: params.reset,
        gender: params.gender,
        maritalStatus: params.maritalstatus,
        empStatus: params.employeestatus,
        totalDay: parseInt(params.totalday)
    }
    return dispatch => {
        dispatch({
            type: "REQUEST_UPDATE_LEAVE_SETTING",
            payload
        })
    }
}

export const requestDeleteLeaveSetting = (id) => {
    return dispatch => {
        dispatch({
            type: "REQUEST_DELETE_LEAVE_SETTING",
            payload: { id }
        })
    }
}