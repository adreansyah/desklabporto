import React, { useEffect } from 'react';
import { Segment, Row, FormControl, Textfield, Col, ButtonGroup, Button, Img } from '@elevenia/master-ui/components/Atom';
import { useInput, useAction } from 'hooks';
import { useSelector } from 'react-redux';
import { requestUpdateStaff } from 'store/actions/staff';
import { requestPersonalInformation } from 'store/actions/personalInformation';
import users from 'assets/image/user.png';

const UpdateStaff = ({ onClose, id }) => {
    const { hasFetch } = useAction()
    const payload = useSelector(state => {
        return {
            data: state.staff.data,
            personalData: state.personalInformation.personalData
        }
    });
    const getData = payload.data.filter(val => val.id === id);
    const { value, bindChange, bindUploadPhoto } = useInput({
        initialObjects: {
            firstname: getData[0].firstName,
            lastname: getData[0].lastName,
            email:getData[0].email,
            upload: null
        },
        identity: "updateStaffId"
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        hasFetch(requestUpdateStaff(id, value));
        onClose('update');
    }
    const loadCallback = function (e) {
        e.target.src = users;
    }
    useEffect(() => {
        hasFetch(requestPersonalInformation(id));
    }, [hasFetch, id]);
    return (
        <Segment>
            <form id="updateStaffId" onSubmit={handleSubmit}>
                <Row>
                    <Col wide={4} px={16}>
                        <FormControl mb={24}>
                            {
                                value.upload !== null ?
                                    <Img width={'100%'} src={value.upload.uris} style={{borderRadius: 8, marginBottom: 16}} />
                                    :
                                    <Img width={'100%'} onError={e => loadCallback(e)} src={payload.personalData.imageUrl || users} style={{borderRadius: 8, marginBottom: 16}} />
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
                    <Col wide={8}>
                        <FormControl label="First Name" mb={24}>
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
                        <FormControl label="Last Name" mb={24}>
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
                        <FormControl label="Email" mb={24}>
                            <Textfield
                                disabled={true}
                                inputProps={{
                                    ...bindChange,
                                    name: "email",
                                    value: value.email,
                                    className: "validate[required,email]",
                                    autoComplete: "off",
                                    placeholder: "Email...",
                                    disabled:true
                                }}
                            />
                        </FormControl>
                    </Col>
                </Row>
                <Segment className="u-tx-right">
                    <ButtonGroup>
                        <Button type="button" variant="secondary-alt" onClick={onClose}>Cancel</Button>
                        <Button type="submit" variant="primary">Submit</Button>
                    </ButtonGroup>
                </Segment>
            </form>
        </Segment >
    )
}
export default UpdateStaff;