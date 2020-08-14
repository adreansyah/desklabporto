import React from 'react';
import { Segment, Row, FormControl, Textfield, Col, ButtonGroup, Button, Img, ButtonLink, Icon } from '@elevenia/master-ui/components/Atom';
import { useInput, useAction, useMultiToogle } from 'hooks';
import { validateForm } from 'helper';
import { requestCreateStaff } from 'store/actions/staff';

const AddStaff = ({ onClose }) => {
    const { hasFetch } = useAction();
    const { isToogle, toogler } = useMultiToogle({
        password: false,
        equalspassword: false,
    });
    const { value, bindChange, bindUploadPhoto } = useInput({
        initialObjects: {
            barcode: "",
            nik: "",
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            equalpassword: "",
            upload: null
        },
        identity: "staffId"
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const valid = validateForm(e.target.id, true, false);
        valid && hasFetch(requestCreateStaff(value));
        valid && onClose();
    }
    return (
        <Segment>
            <form id="companyId" onSubmit={handleSubmit}>
                <Row>
                    <Col wide={4} pr={16}>
                        <FormControl>
                            {
                                value.upload !== null 
                                ? 
                                <Img width='100%' src={value.upload.uris} style={{borderRadius: 8, marginBottom: 16}} /> 
                                : 
                                <Icon name={'profile'} size={'100%'} />
                            }
                            <Textfield
                                inputProps={{
                                    ...bindUploadPhoto,
                                    type: "file",
                                    name: "upload",
                                }}
                            />
                        </FormControl>
                    </Col>
                    <Col wide={8} pl={4}>
                        <Segment justifyContent={'space-between'}>
                            <Segment width={'100%'} pr={4}>
                                <FormControl label="First Name" pb={16}>
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
                            </Segment>
                            <Segment width={'100%'} pl={4}>
                                <FormControl label="Last Name" pb={16}>
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
                            </Segment>
                        </Segment>
                        <Segment justifyContent={'space-between'}>
                            <Segment width={'100%'} pr={4}>
                                <FormControl label="Barcode" pb={16}>
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
                            <Segment width={'100%'} pl={4}>
                                <FormControl label="NIK" pb={16}>
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
                        <FormControl label="Email" pb={16}>
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
                        <Segment justifyContent={'space-between'}>
                            <Segment width={'100%'} pr={4}>
                                <FormControl label="Password" pb={16}>
                                    <Textfield
                                        inputProps={{
                                            ...bindChange,
                                            type: isToogle.password ? "text" : "password",
                                            name: "password",
                                            value: value.password,
                                            className: "validate[required]",
                                            autoComplete: "off",
                                            placeholder: "Password..."
                                        }}
                                        right={
                                            <ButtonLink id="password" type="button" {...toogler}>
                                                <Icon
                                                    name={isToogle.password ? 'visible' : 'invisible'}
                                                    size={16}
                                                    fillColor="#70727D"
                                                />
                                            </ButtonLink>
                                        }
                                    />
                                </FormControl>
                            </Segment>
                            <Segment width={'100%'} pl={4}>
                                <FormControl label="Confirm Password" pb={24}>
                                    <Textfield
                                        inputProps={{
                                            ...bindChange,
                                            type: isToogle.equalpassword ? "text" : "password",
                                            name: "equalpassword",
                                            value: value.equalpassword,
                                            className: "validate[required,equals[password]]",
                                            autoComplete: "off",
                                            placeholder: "Password..."
                                        }}
                                        right={
                                            <ButtonLink id="equalspassword" type="button" {...toogler}>
                                                <Icon
                                                    name={isToogle.equalspassword ? 'visible' : 'invisible'}
                                                    size={16}
                                                    fillColor="#70727D"
                                                />
                                            </ButtonLink>
                                        }
                                    />
                                </FormControl>
                            </Segment>
                        </Segment>
                        
                        <Segment className="u-tx-right">
                            <ButtonGroup>
                                <Button type="button" variant="secondary-alt" onClick={onClose} >Cancel</Button>
                                <Button type="submit" variant="primary">Save</Button>
                            </ButtonGroup>
                        </Segment>
                    </Col>
                </Row>
            </form>
        </Segment >
    )
}
export default AddStaff;