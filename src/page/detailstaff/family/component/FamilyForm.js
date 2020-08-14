import React from 'react';
import {
    Button,
    ButtonGroup,
    Col,
    FormControl,
    OptionBox,
    Row,
    Textfield,
    Segment,
    RadioButton
} from '@elevenia/master-ui/components/Atom';
import { useInput, useAction } from 'hooks';
import { RequestSubmitEmployeeFamily, RequestUpdateEmployeeFamily } from 'store/actions/familystaff';
import { validateForm } from 'helper';

const FromFamily = ({ employeeId, onClose, dataEdit }) => {
    const { hasFetch } = useAction();

    const { value: dataFromFamily, bindChange, bindSelect } = useInput({
        initialObjects: {
            fullName: dataEdit ? dataEdit.fullName : '',
            gender: dataEdit ? dataEdit.gender : '',
            relationship: dataEdit ? dataEdit.relationship : '',

        },
        identity: "familyForm"
    })
    const genderListing = [
        { id: "M", value: 'M', label: 'Male' },
        { id: "F", value: 'F', label: 'Female' }
    ];

    const relationshipListing = [
        { id: "Husband", value: 'Husband', label: 'Husband' },
        { id: "Wife", value: 'Wife', label: 'Wife' },
        { id: "Son", value: 'Son', label: 'Son' },
        { id: "Daughter", value: 'Daughter', label: 'Daughter' }
    ];


    const handleSubmit = (e) => {
        e.preventDefault();
        const valid = validateForm(e.target.id, true, false);
        if (dataEdit) {

            valid && hasFetch(RequestUpdateEmployeeFamily({ ...dataFromFamily, idNumber: '', idType: '' }, employeeId, dataEdit.id));
        } else {
            valid && hasFetch(RequestSubmitEmployeeFamily({ ...dataFromFamily, employeeId, idNumber: '', idType: '' }));
        }

        valid && onClose();
    }
    return (
        <Segment>
            <form id="familyForm" onSubmit={handleSubmit}>
                <Row>
                    <Col wide={12} pr={8} py={4}>
                        <FormControl label="Full Name">
                            <Textfield
                                inputProps={{
                                    ...bindChange,
                                    name: "fullName",
                                    value: dataFromFamily.fullName,
                                    autoComplete: "off",
                                    placeholder: "Full Name...",
                                    className: 'validate[required,minLength[3],maxLength[100]]'
                                }}
                            />
                        </FormControl>
                    </Col>
                    <Col wide={12} pr={8} py={4}>
                        <FormControl label={'Gender'}>
                            <RadioButton
                                radioProps={{
                                    ...bindChange,
                                    name: "gender",
                                    id: "gender",
                                    className: 'validate[required]',
                                }}
                                radioItems={genderListing}
                                selected={dataFromFamily.gender}
                            />
                        </FormControl>
                    </Col>
                    <Col wide={12} pr={8} py={4}>
                        <FormControl label="Choose Relationship">
                            <OptionBox
                                status={'normal'}
                                name="relationship"
                                value={relationshipListing.find(val => val.value === dataFromFamily.relationship)}
                                options={relationshipListing}
                                placeholder={'--Select Relationship'}
                                {...bindSelect}
                                inputClassName="validate[required]"

                            />
                        </FormControl>
                    </Col>
                </Row>
                <Segment mt={16} className="u-tx-right">
                    <ButtonGroup>
                        <Button type="button" variant="secondary-alt" onClick={onClose} >Cancel</Button>
                        <Button type="submit" variant="primary">Save</Button>
                    </ButtonGroup>
                </Segment>
            </form>
        </Segment>

    )
}

export default FromFamily