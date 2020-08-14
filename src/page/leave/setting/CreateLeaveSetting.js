import React from 'react';
import { Segment, FormControl, OptionBox, Row, Col, ButtonGroup, Button, Text, CheckBox } from '@elevenia/master-ui/components/Atom';
import Textfield from '@elevenia/master-ui/components/Atom/Textfield';
import { useSelector } from 'react-redux';
import { validateForm } from 'helper';
import { useAction, useInput } from 'hooks';
import { requestCreateLeaveSetting } from 'store/actions/leavesetting';
import { employeStatus, gender, maritalStatus } from './setupListCheck';

const CreateLeaveSetting = ({ onClose, ...props }) => {
    const { hasFetch } = useAction();
    const payload = useSelector(state => {
        return {
            leaveType: state.leaveType.data.map(isLeaveType => ({ label: isLeaveType.name, value: isLeaveType.id })),
            resetInTheEndOf: state.leaveSetting.resetInTheEndOf.map(isResetInTheEndOf => ({ label: isResetInTheEndOf.value, value: isResetInTheEndOf.key })),
            insideCity: state.leaveSetting.insideCity.map(isInsideCity => ({ label: isInsideCity.value, value: isInsideCity.key })),
            medicalLetter: state.leaveSetting.medicalLetter.map(isMedicalLetter => ({ label: isMedicalLetter.value, value: isMedicalLetter.key })),
            eligibleNumberOperatorList: state.leaveSetting.eligibleNumberOperatorList.map(isEligibleNumberOperatorList => ({ label: isEligibleNumberOperatorList.value, value: isEligibleNumberOperatorList.key })),
            eligibleNumberList: state.leaveSetting.eligibleNumberList.map(isEligibleNumberList => ({ label: isEligibleNumberList.value, value: isEligibleNumberList.key })),
            eligibleForYearList: state.leaveSetting.eligibleForYearList.map(isEligibleForYearList => ({ label: isEligibleForYearList.value, value: isEligibleForYearList.key })),
            approversList: state.leaveSetting.approversList.map(isApproversList => ({ label: isApproversList.approverPositionTitle, value: isApproversList.approverPositionTitleId })),
            inYearList: state.leaveSetting.inYearList.map(IsInYearList => ({ label: IsInYearList.value, value: IsInYearList.key }))
        }
    })
    const { bindChange, bindSelect, bindSelectMultiple, bindCheckedBatch, value } = useInput({
        initialObjects: {
            leavetype: "",
            totalday: "",
            givendate: "",
            maxtakeninarow: "",
            reset: "",
            insidecity: "",
            inyear: "",
            medicalletter: "",
            operator: "",
            number: "",
            period: "",
            employeestatus: [],
            gender: [],
            maritalstatus: [],
            approver: []
        },
        identity: "leaveSettingId"
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const valid = validateForm(e.target.id, true, false);
        valid && hasFetch(requestCreateLeaveSetting(value, payload.leaveType));
        valid && onClose();
    }
    return (
        <Segment>
            <form id="leaveSettingId" onSubmit={handleSubmit}>
                <Row>
                    <Col wide={6} pr={8}>
                        <FormControl pb={8} label="Leave Type">
                            <OptionBox
                                {...bindSelect}
                                name="leavetype"
                                options={payload.leaveType}
                                placeholder='Please Select Leave Type'
                                inputClassName="validate[required]"
                            />
                        </FormControl>
                        <Row>
                            <Col wide={6} pr={8}>
                                <FormControl pb={8} label="Total Day">
                                    <Textfield
                                        inputProps={{
                                            ...bindChange,
                                            name: "totalday",
                                            placeholder: 'Total Day...',
                                            className: "validate[required,number,minLength[1],maxLength[2]]",
                                            autoComplete: "off"
                                        }}
                                    />
                                </FormControl>
                            </Col>
                            <Col wide={6} pl={8}>
                                <FormControl pb={8} label="Given Date">
                                    <Textfield
                                        inputProps={{
                                            ...bindChange,
                                            name: "givendate",
                                            placeholder: 'Given Date...',
                                            className: "validate[required,number,minLength[1],maxLength[2]]",
                                            autoComplete: "off"
                                        }}
                                    />
                                </FormControl>
                            </Col>
                        </Row>
                        <Row>
                            <Col wide={6} pr={8}>
                                <FormControl pb={8} label="Max Taken In A Row">
                                    <Textfield
                                        inputProps={{
                                            ...bindChange,
                                            name: "maxtakeninarow",
                                            placeholder: 'Max Taken In A Row...',
                                            className: "validate[required,number,minLength[1],maxLength[2]]",
                                            autoComplete: "off"
                                        }}
                                    />
                                </FormControl>
                            </Col>
                            <Col wide={6} pr={8}>
                                <FormControl pb={8} label="Reset In The End Of">
                                    <OptionBox
                                        {...bindSelect}
                                        name="reset"
                                        options={payload.resetInTheEndOf}
                                        placeholder='Please Select Date Reset'
                                        inputClassName="validate[required]"
                                    />
                                </FormControl>
                            </Col>
                        </Row>
                        <Row>
                            <Col wide={6} pr={8}>

                                <FormControl pb={8} label="Inside City">
                                    <OptionBox
                                        {...bindSelect}
                                        name="insidecity"
                                        options={payload.insideCity}
                                        placeholder='Select City'
                                        inputClassName="validate[required]"
                                    />
                                </FormControl>
                            </Col>
                            <Col wide={6} pl={8}>
                                <FormControl pb={8} label="In Year">
                                    <OptionBox
                                        {...bindSelect}
                                        name="inyear"
                                        options={payload.inYearList}
                                        placeholder='Select In Year'
                                        inputClassName="validate[required]"
                                    />
                                </FormControl>
                            </Col>
                        </Row>
                        <FormControl pb={8} label="Medical Letter">
                            <OptionBox
                                {...bindSelect}
                                name="medicalletter"
                                options={payload.medicalLetter}
                                placeholder='Please Select Medical Letter'
                                inputClassName="validate[required]"
                            />
                        </FormControl>
                    </Col>
                    <Col wide={6} pl={8}>
                        <Text style={{ lineHeight: 1.5 }}>Eligible For :</Text>
                        <Segment border="1px solid #dcdee3" p={8}>
                            <FormControl pb={8} label="Employment Duration">
                                <Row>
                                    <Col wide={4} pr={8}>
                                        <FormControl>
                                            <OptionBox
                                                {...bindSelect}
                                                name="operator"
                                                options={payload.eligibleNumberOperatorList}
                                                placeholder='Operator'
                                                inputClassName="validate[required]"
                                            />
                                        </FormControl>
                                    </Col>
                                    <Col wide={4} pr={8}>
                                        <FormControl>
                                            <OptionBox
                                                {...bindSelect}
                                                name="number"
                                                options={payload.eligibleNumberList}
                                                placeholder='Number'
                                                inputClassName="validate[required]"
                                            />
                                        </FormControl>
                                    </Col>
                                    <Col wide={4}>
                                        <FormControl>
                                            <OptionBox
                                                {...bindSelect}
                                                name="period"
                                                options={payload.eligibleForYearList}
                                                placeholder='Period'
                                                inputClassName="validate[required]"
                                            />
                                        </FormControl>
                                    </Col>
                                </Row>
                            </FormControl>
                            <FormControl pb={8} label="Employee Status" className='inline-checkbox'>
                                <CheckBox
                                    checkProps={{
                                        ...bindCheckedBatch,
                                        name: "employeestatus",
                                        id: "employeeStatus"
                                    }}
                                    checkItems={employeStatus}
                                    selected={value.employeestatus}
                                />
                            </FormControl>
                            <FormControl pb={8} label="Gender" className='inline-checkbox'>
                                <CheckBox
                                    checkProps={{
                                        ...bindCheckedBatch,
                                        name: "gender",
                                        id: "gender"
                                    }}
                                    checkItems={gender}
                                    selected={value.gender}
                                />
                            </FormControl>
                            <FormControl label="Marital Status" className='inline-checkbox'>
                                <CheckBox
                                    checkProps={{
                                        ...bindCheckedBatch,
                                        name: "maritalstatus",
                                        id: "maritalStatus"
                                    }}
                                    checkItems={maritalStatus}
                                    selected={value.maritalstatus}
                                />
                            </FormControl>
                        </Segment>
                        <FormControl py={8} label="Approver">
                            <OptionBox
                                {...bindSelectMultiple}
                                name="approver"
                                options={payload.approversList}
                                placeholder='Please Select Approver'
                                inputClassName="validate[required]"
                                isMulti={true}
                            />
                        </FormControl>
                    </Col>
                </Row>

                <Segment className={'u-tx-right'} pt={16}>
                    <ButtonGroup>
                        <Button size="medium" type="button" variant="secondary-alt" onClick={onClose} >Cancel</Button>
                        <Button size="medium" type="submit" variant="primary">Save</Button>
                    </ButtonGroup>
                </Segment>
            </form>
        </Segment>
    )
}
export default CreateLeaveSetting;