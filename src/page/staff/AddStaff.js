import React, { useState } from 'react';
import { Segment, FormControl, Text, Textfield, ButtonGroup, Button, Img, DatePicker, OptionBox, Textarea, RadioButton, Icon, CheckBox } from '@elevenia/master-ui/components/Atom';
import { useInput, useAction } from 'hooks';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { validateForm } from 'helper';
import { requestCreateStaff } from 'store/actions/staff';
import { religionlist, maritalstatuslist, genderlist, bloodtypelist } from './listOfselects';

const AddStaff = ({ onClose }) => {
    const { hasFetch } = useAction();
    const [selectedAgree, setSelectedAgree] = useState(false);
    const { value, bindChange, bindUploadPhoto, bindSelectDate, bindSelect } = useInput({
        initialObjects: {
            barcode: "",
            nik: "",
            firstname: "",
            lastname: "",
            email: "",
            upload: null,
            identity: 0,
            birthplace: "",
            birthdate: "",
            bloodtype: "",
            address: "",
            phone: "",
            religion: "",
            maritalstatus: "",
            gender: "",
            title: "",
            joindate: "",
            division: "",
            departement: "",
            unit: "",
            level: "",
            reportTo: "",
        },
        identity: "staffId"
    })
    const payload = useSelector(state => {
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
    const handleSubmit = (e) => {
        e.preventDefault();
        const valid = validateForm(e.target.id, true, false);
        valid && hasFetch(requestCreateStaff(value));
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
            <form id="companyId" onSubmit={handleSubmit}>
                <Segment justifyContent={'space-between'}>
                    <Segment flex={'1 1 0px'} width={0} mr={16} p={16} boxShadow borderRadius={4}>
                        <Text H14 mb={16}>Employee</Text>
                        <FormControl label="First Name" mb={8}>
                            <Textfield
                                inputProps={{
                                    ...bindChange,
                                    name: "firstname",
                                    value: value.firstname,
                                    className: "validate[required]",
                                    autoComplete: "off",
                                    placeholder: "First Name..."
                                }}
                            />
                        </FormControl>
                        <FormControl label="Last Name" mb={8}>
                            <Textfield
                                inputProps={{
                                    ...bindChange,
                                    name: "lastname",
                                    value: value.lastname,
                                    className: "validate[required]",
                                    autoComplete: "off",
                                    placeholder: "Last Name..."
                                }}
                            />
                        </FormControl>
                        <Segment justifyContent={'space-between'} mb={8}>
                            <Segment width={'50%'}>
                                <FormControl label="Barcode" mr={16}>
                                    <Textfield
                                        inputProps={{
                                            ...bindChange,
                                            name: "barcode",
                                            value: value.barcode,
                                            autoComplete: "off",
                                            placeholder: "Barcode..."
                                        }}
                                    />
                                </FormControl>
                            </Segment>
                            <Segment width={'50%'}>
                                <FormControl label="NIK">
                                    <Textfield
                                        inputProps={{
                                            ...bindChange,
                                            name: "nik",
                                            value: value.nik,
                                            className: "validate[required]",
                                            autoComplete: "off",
                                            autoFocus: true,
                                            placeholder: "Nik..."
                                        }}
                                    />
                                </FormControl>
                            </Segment>
                        </Segment>
                        <FormControl label="Email" mb={8}>
                            <Textfield
                                inputProps={{
                                    ...bindChange,
                                    name: "email",
                                    value: value.email,
                                    className: "validate[required,email]",
                                    autoComplete: "off",
                                    placeholder: "Email..."
                                }}
                            />
                        </FormControl>
                        <FormControl mb={8}>
                            <>
                                <Segment m={'0 auto'} maxWidth={75}>
                                    {
                                        value.upload !== null
                                            ?
                                            <Img width='100%' src={value.upload.uris} style={{ borderRadius: 8, marginBottom: 16 }} />
                                            :
                                            <Icon name={'profile'} size={'100%'} />
                                    }
                                </Segment>
                                <Textfield
                                    inputProps={{
                                        ...bindUploadPhoto,
                                        type: "file",
                                        name: "upload",
                                    }}
                                />
                            </>
                        </FormControl>
                    </Segment>
                    <Segment flex={'1 1 0px'} mr={16} p={16} boxShadow borderRadius={4}>
                        <Text H14 mb={16}>Personal Data</Text>
                        <Segment justifyContent={'space-between'} mb={8}>
                            <Segment maxWidth={'50%'}>
                                <FormControl label="Birth Place" mr={16}>
                                    <Textfield
                                        inputProps={{
                                            ...bindChange,
                                            name: "birthplace",
                                            value: value.birthplace,
                                            className: "validate[required]",
                                            autoComplete: "off",
                                            placeholder: "Birth Place...",
                                        }}
                                    />
                                </FormControl>
                            </Segment>
                            <FormControl label="Birth Date">
                                <DatePicker
                                    name="birthdate"
                                    placeholderText="BirthDate"
                                    selected={value.birthdate}
                                    onChange={Data => bindSelectDate.onChange("birthdate", Data)}
                                    className="validate[required]"
                                    autoComplete="off"
                                    startYearRange={'1970'}
                                />
                            </FormControl>
                        </Segment>
                        <Segment justifyContent={'space-between'} mb={8}>
                            <Segment width={'50%'}>
                                <FormControl label="Blood Type" mr={16}>
                                    <OptionBox
                                        {...bindSelect}
                                        name="bloodtype"
                                        options={bloodtypelist}
                                        inputClassName="sample-class-in-input validate[required]"
                                    />
                                </FormControl>
                            </Segment>
                            <Segment width={'50%'}>
                                <FormControl label="Religion">
                                    <OptionBox
                                        {...bindSelect}
                                        name="religion"
                                        options={religionlist}
                                        inputClassName="sample-class-in-input validate[required]"
                                    />
                                </FormControl>
                            </Segment>
                        </Segment>
                        <FormControl label="Address" mb={8}>
                            <Textarea
                                inputProps={{
                                    ...bindChange,
                                    name: "address",
                                    value: value.address,
                                    className: "validate[required]",
                                    autoComplete: "off",
                                    placeholder: "Address...",
                                    rows: "5"
                                }}
                            />
                        </FormControl>
                        <FormControl label="Phone" mb={8}>
                            <Textfield
                                inputProps={{
                                    ...bindChange,
                                    name: "phone",
                                    value: value.phone,
                                    className: "validate[required,phone]",
                                    autoComplete: "off",
                                    placeholder: "Phone..."
                                }}
                            />
                        </FormControl>
                        <FormControl label="Marital Status" mb={8}>
                            <RadioButton
                                radioProps={{
                                    ...bindChange,
                                    name: "maritalstatus",
                                    id: "maritalstatus",
                                    className: 'validate[required]',
                                }}
                                radioItems={maritalstatuslist}
                                selected={value.maritalstatus}
                            />
                        </FormControl>
                        <FormControl label="Gender" b={8}>
                            <RadioButton
                                radioProps={{
                                    ...bindChange,
                                    name: "gender",
                                    id: "gender",
                                    className: 'validate[required]',
                                }}
                                radioItems={genderlist}
                                selected={value.gender}
                            />
                        </FormControl>
                    </Segment>
                    <Segment flex={'1 1 0px'} width={0} p={16} boxShadow borderRadius={4}>
                        <Text H14 mb={16}>Position</Text>
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
                                showYearDropdown
                                dateFormatCalendar="MMMM"
                                yearDropdownItemNumber={15}
                                scrollableYearDropdown
                                startYearRange={'2015'}
                            />
                        </FormControl>
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
                        <Segment justifyContent={'space-between'} alignItems={'center'}>
                            <Segment width={'60%'}>
                                <FormControl label="Report To" mr={16}>
                                    <OptionBox
                                        {...bindSelect}
                                        name="reportTo"
                                        options={payload.staff}
                                        inputClassName="sample-class-in-input validate[required]"
                                        isDisabled={selectedAgree}
                                        value={payload.staff.filter(isApproval => isApproval.value === value.reportTo)}
                                    />
                                </FormControl>
                            </Segment>
                            <Segment width={'40%'}>
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
                            </Segment>
                        </Segment>
                    </Segment>
                </Segment>
                <Segment className="u-tx-right" mt={16}>
                    <ButtonGroup>
                        <Button type="button" variant="secondary-alt" onClick={onClose} >Cancel</Button>
                        <Button type="submit" variant="primary">Save</Button>
                    </ButtonGroup>
                </Segment>
            </form>
        </Segment >
    )
}
export default AddStaff;