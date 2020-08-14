import React, { useState } from 'react';
import { Segment, FormControl, OptionBox, ButtonGroup, Button, DatePicker, CheckBox } from '@elevenia/master-ui/components/Atom';
import { useInput, useAction } from 'hooks';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { validateForm } from 'helper';
import { requestCreatePosition } from 'store/actions/positioninformation';
const CreatePosition = ({ onClose, ...props }) => {
    const { id } = props.match.params;
    const { hasFetch } = useAction();
    const [selectedAgree, setSelectedAgree] = useState(false);
    const { value, bindSelect, bindSelectDate } = useInput({
        initialObjects: {
            joindate: "",
            employee: id,
            title: null,
            division: "",
            departement: "",
            unit: "",
            level: "",
            reportTo: "",
        },
        identity: "createPositionId"
    });
    const payload = useSelector(state => {
        console.log(state.staff.approverList)
        return {
            division: state.division.data.map((item) => ({
                value: item.id,
                label: item.name
            })),
            departement: state.departement.data.map((item) => ({
                value: item.id,
                label: item.name,
                divisionId: item.divisionId
            })),
            unit: state.unitResources.data.map((item) => ({
                value: item.id,
                label: item.name,
                divisionId: item.divisionId,
                departmentId: item.departmentId
            })),
            level: state.positionLevel.data.map((item) => ({
                value: item.id,
                label: item.name
            })),
            title: state.positionTitle.data.map((item) => ({
                value: item.id,
                label: item.name
            })),
            personalData: [{
                value: state.personalInformation.personalData[0].id,
                label: state.personalInformation.personalData[0].firstName + " " + state.personalInformation.personalData[0].lastName
            }],
            staff: state.staff.approverList.map((item) => ({
                value: item.approverEmpId,
                label: item.approverName
            }))
        }
    })
    const submitPosition = (e) => {
        e.preventDefault();
        const valid = validateForm(e.target.id, true, false);
        valid && hasFetch(requestCreatePosition(value));
        valid && onClose();
    }
    const getOptionsDepartementbyDivision = payload.departement.filter(getDivision => getDivision.divisionId === value.division);
    const getOptionsDepartementbyDivisionValue = getOptionsDepartementbyDivision.filter(departement => departement.value === value.departement);
    const getOptionsUnitbyDepartement = payload.unit.filter(getDepartement => getDepartement.departmentId === value.departement && getDepartement.divisionId === value.division);
    const getOptionsUnitbyDepartementValue = getOptionsUnitbyDepartement.filter(unit => unit.value === value.unit);
    const autoApprove = (e) => {
        setSelectedAgree(e.target.checked);
        value.reportTo = ""
    }
    return (
        <Segment>
            <form id="createPositionId" onSubmit={submitPosition}>
                <Segment m={'0 -10px 24px'} justifyContent={'space-between'}>
                    <Segment flex={1} m={'0 10px'}>
                        <FormControl label="Position Name" mb={8}>
                            <OptionBox
                                {...bindSelect}
                                status={'normal'}
                                name="title"
                                options={payload.title}
                                placeholder={'--Select Title'}
                                inputClassName="validate[required]"
                                autoFocus={true}
                            />
                        </FormControl>
                        <FormControl label="Join Date" mb={8}>
                            <DatePicker
                                name="joindate"
                                placeholderText={moment(new Date(), 'DD/MM/YYYY').format('DD/MM/YYYY')}
                                selected={value.joindate}
                                onChange={Data => bindSelectDate.onChange("joindate", Data)}
                                className="validate[required]"
                                autoComplete="off"
                                startYearRange={'2015'}
                            />
                        </FormControl>
                        <FormControl label="Report To" mb={8}>
                            <OptionBox
                                isDisabled={selectedAgree}
                                {...bindSelect}
                                name="reportTo"
                                options={payload.staff}
                                inputClassName="sample-class-in-input validate[required]"
                                value={payload.staff.filter(isApproval => isApproval.value === value.reportTo)}
                            />
                        </FormControl>
                        <FormControl label="" mt={16}>
                            <CheckBox
                                checkProps={{
                                    onChange: e => autoApprove(e),
                                    name: "color",
                                    id: "colorRed",
                                    checked: selectedAgree
                                }}
                                checkItems={[
                                    { label: "Auto Approve" }
                                ]}
                            />
                        </FormControl>
                        {/* <FormControl label="Employee Name" mb={8}>
                            <OptionBox
                                {...bindSelect}
                                status={'normal'}
                                name="employee"
                                options={payload.personalData}
                                value={payload.personalData[0]}
                                inputClassName="validate[required]"
                            />
                        </FormControl> */}
                    </Segment>
                    <Segment flex={1} m={'0 10px'}>
                        <FormControl label="Division" mb={8}>
                            <OptionBox
                                {...bindSelect}
                                status={'normal'}
                                name="division"
                                options={payload.division}
                                placeholder={'--Select Division'}
                                inputClassName="validate[required]"
                            />
                        </FormControl>
                        <FormControl label="Department" mb={8}>
                            <OptionBox
                                {...bindSelect}
                                status={'normal'}
                                name="departement"
                                options={getOptionsDepartementbyDivision}
                                value={getOptionsDepartementbyDivisionValue}
                                placeholder={'--Select Departement'}
                                inputClassName="validate[required]"
                            />
                        </FormControl>
                        <FormControl label="Unit" mb={8}>
                            <OptionBox
                                {...bindSelect}
                                status={'normal'}
                                name="unit"
                                options={getOptionsUnitbyDepartement}
                                value={getOptionsUnitbyDepartementValue}
                                placeholder={'--Select Unit Resources'}
                                inputClassName="validate[required]"
                            />
                        </FormControl>
                        <FormControl label="Level" mb={8}>
                            <OptionBox
                                {...bindSelect}
                                status={'normal'}
                                name="level"
                                options={payload.level}
                                placeholder={'--Select Position Level'}
                                inputClassName="validate[required]"
                            />
                        </FormControl>
                    </Segment>
                </Segment>
                <Segment className={'u-tx-right'}>
                    <ButtonGroup>
                        <Button type="button" variant="secondary-alt" onClick={onClose}>Cancel</Button>
                        <Button type="submit" variant="primary">Save</Button>
                    </ButtonGroup>
                </Segment>
            </form>
        </Segment>
    )
}

export default CreatePosition;