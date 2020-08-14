import React from 'react';
import { Segment, Text, Icon, Img, FormControl, Textfield, Textarea, ButtonGroup, Button, DatePicker, OptionBox, RadioButton } from '@elevenia/master-ui/components/Atom';
import { useInput, useAction } from 'hooks';
import { validateForm } from 'helper';
import { requestCreatePersonalInformation } from 'store/actions/personalInformation';
import { useSelector } from 'react-redux';
import { religionlist, maritalstatuslist, genderlist, bloodtypelist } from './listOfselects';

const CreatePersonal = ({ onClose, ...props }) => {
    const { hasFetch } = useAction();
    const payload = useSelector(state => {
        return {
            identity: state.personalInformation.identity.map((element) => ({
                value: element.id,
                label: element.name
            })),
            personalData: state.personalInformation.personalData
        }
    })
    const { value, bindChange, bindUploadPhoto, bindSelectDate, bindSelect } = useInput({
        initialObjects: {
            firstname: payload.personalData[0].firstName || "",
            lastname: payload.personalData[0].lastName || "",
            email: payload.personalData[0].email || "",
            upload: null,
            imageUrl: payload.personalData[0].imageUrl || "",
            identity: 0,
            identityNumber: "",
            nik: payload.personalData[0].nik || "",
            birthplace: "",
            birthdate: "",
            bloodtype: "",
            address: "",
            phone: "",
            religion: "",
            maritalstatus: "",
            gender: ""
        },
        identity: "personalId"
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const valid = validateForm(e.target.id, true, false);
        valid && hasFetch(requestCreatePersonalInformation(props.match.params.id, value));
        valid && onClose();
    }
    return (
        <Segment pt={8}>
            <form id="personalId" onSubmit={handleSubmit}>
                <Segment justifyContent={'space-between'} mb={24}>
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
                                <FormControl label="NIK" mr={16}>
                                    <Textfield
                                        inputProps={{
                                            ...bindChange,
                                            name: "nik",
                                            value: value.nik,
                                            className: "validate[required]",
                                            autoComplete: "off",
                                            placeholder: "Nik..."
                                        }}
                                        disabled
                                    />
                                </FormControl>
                            </Segment>
                            <Segment width={'50%'}>
                                <FormControl label="Email">
                                    <Textfield
                                        inputProps={{
                                            ...bindChange,
                                            name: "email",
                                            value: value.email,
                                            className: "validate[required,email]",
                                            autoComplete: "off",
                                            placeholder: "Email..."
                                        }}
                                        disabled
                                    />
                                </FormControl>
                            </Segment>
                        </Segment>
                        <Segment justifyContent={'space-between'} mb={8}>
                            <Segment width={'50%'}>
                                <FormControl label="Identity" mr={16}>
                                    <OptionBox
                                        {...bindSelect}
                                        name="identity"
                                        options={payload.identity}
                                        inputClassName="sample-class-in-input validate[required]"
                                        value={payload.identity.filter(isIdentity => isIdentity.value === value.identity)}
                                    />
                                </FormControl>
                            </Segment>
                            <Segment width={'50%'}>
                                <FormControl label="Number">
                                    <Textfield
                                        inputProps={{
                                            ...bindChange,
                                            name: "identityNumber",
                                            value: value.identityNumber,
                                            className: "validate[required]",
                                            autoComplete: "off",
                                            placeholder: "Number...",
                                        }}
                                    />
                                </FormControl>
                            </Segment>
                        </Segment>
                        <FormControl mb={8}>
                            <>
                                <Segment m={'0 auto'} maxWidth={75}>
                                    {
                                        value.upload !== null || value.imageUrl
                                            ?
                                            <Img width='100%' src={value?.upload?.uris ? value.upload.uris : value.imageUrl} style={{ borderRadius: 8, marginBottom: 16 }} />
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
                            <Segment width={'50%'}>
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
                            <Segment width={'50%'}>
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
                                    rows: "6"
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
                        <Segment justifyContent={'space-between'} mb={8}>
                            <Segment width={'50%'}>
                                <FormControl label="Marital Status" mr={16}>
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
                            </Segment>
                            <Segment width={'50%'}>
                                <FormControl label={'Gender'}>
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
                        </Segment>
                    </Segment>
                </Segment>
                {/* <Row>
                    <Col wide={6} pr={8}>
                        <Row>
                            <Col pb={8} wide={3} pr={8}>
                                <FormControl label="Identity">
                                    <OptionBox
                                        {...bindSelect}
                                        name="identity"
                                        options={payload.identity}
                                        inputClassName="sample-class-in-input validate[required]"
                                    />
                                </FormControl>
                            </Col>
                            <Col pb={8} wide={9} pl={8}>
                                <FormControl label="Number">
                                    <Textfield
                                        inputProps={{
                                            ...bindChange,
                                            name: "nik",
                                            value: value.nik,
                                            className: "validate[required]",
                                            autoComplete: "off",
                                            placeholder: "Number...",
                                        }}
                                    />
                                </FormControl>
                            </Col>
                            <Col pb={8} wide={7} pr={8}>
                                <FormControl label="Birth Place">
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
                            </Col>
                            <Col pb={8} wide={5} pl={8}>
                                <FormControl label="Birth Date">
                                    <DatePicker
                                        name="birthdate"
                                        placeholderText="BirthDate"
                                        selected={value.birthdate}
                                        onChange={Data => bindSelectDate.onChange("birthdate", Data)}
                                        className="validate[required]"
                                        autoComplete="off"
                                    />
                                </FormControl>
                            </Col>
                            <Col pb={8} wide={12}>
                                <FormControl label="Blood Type">
                                    <Textfield
                                        inputProps={{
                                            ...bindChange,
                                            name: "bloodtype",
                                            value: value.bloodtype,
                                            className: "validate[required]",
                                            autoComplete: "off",
                                            placeholder: "Blood Type..."
                                        }}
                                    />
                                </FormControl>
                            </Col>
                            <Col pb={8} wide={12}>
                                <FormControl label="Address">
                                    <Textarea
                                        inputProps={{
                                            ...bindChange,
                                            name: "address",
                                            value: value.address,
                                            className: "validate[required]",
                                            autoComplete: "off",
                                            placeholder: "Address...",
                                            rows: "6"
                                        }}
                                    />
                                </FormControl>
                            </Col>
                        </Row>
                    </Col>
                    <Col wide={6} pl={8}>
                        <Row>
                            <Col pb={8} wide={12}>
                                <FormControl label="Phone">
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
                            </Col>
                            <Col pb={8} wide={12}>
                                <FormControl label="Religion">
                                    <OptionBox
                                        {...bindSelect}
                                        name="religion"
                                        options={religionlist}
                                        inputClassName="sample-class-in-input validate[required]"
                                    />
                                </FormControl>
                            </Col>
                            <Col pb={8} wide={12}>
                                <FormControl label="Marital Status">
                                    <OptionBox
                                        {...bindSelect}
                                        name="maritalstatus"
                                        options={maritalstatuslist}
                                        inputClassName="sample-class-in-input validate[required]"
                                    />
                                </FormControl>
                            </Col>
                            <Col pb={8} wide={12}>
                                <label>Gender</label>
                                <FormControl className="u-pt-8">
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
                            </Col>
                        </Row>
                    </Col>
                </Row> */}
                <Segment className="u-tx-right">
                    <ButtonGroup>
                        <Button variant={'secondary-alt'} onClick={onClose}>
                            cancel
                        </Button>
                        <Button variant="primary">
                            Save
                        </Button>
                    </ButtonGroup>
                </Segment>
            </form>
        </Segment>
    )
}

export default CreatePersonal;