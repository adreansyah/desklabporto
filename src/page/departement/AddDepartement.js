import React from 'react';
import { Segment, FormControl, Textfield, ButtonGroup, Button, OptionBox } from '@elevenia/master-ui/components/Atom';
import { useInput, useAction } from 'hooks';
import { validateForm } from 'helper';
import { useSelector } from 'react-redux';
import { requestCreateDepartement } from 'store/actions/departement';

const AddDepartement = ({ onClose }) => {
    const { hasFetch } = useAction();
    const { value, bindChange, bindSelect } = useInput({
        initialObjects: {
            departement: "",
            division: ""
        },
        identity: "divisionId"
    })
    const payload = useSelector(state => {
        let listDivision = [];
        state.division.data.forEach(element => {
            listDivision = [...listDivision, {
                value: element.id,
                label: element.name
            }]
        });
        return {
            listDivision
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const valid = validateForm(e.target.id, true, false);
        valid && hasFetch(requestCreateDepartement(value));
        valid && onClose();
    }
    return (
        <Segment>
            <form id="divisionId" onSubmit={handleSubmit}>
                <Segment>
                    <FormControl label="Departement Name" mb={16}>
                        <Textfield
                            inputProps={{
                                ...bindChange,
                                name: "departement",
                                value: value.departement,
                                className: "validate[required]",
                                autoComplete: "off",
                                autoFocus: true
                            }}
                        />
                    </FormControl>
                    <FormControl label="Division Name" mb={24}>
                        <OptionBox
                            {...bindSelect}
                            name="division"
                            options={payload.listDivision}
                            inputClassName="sample-class-in-input validate[required]"
                        />
                    </FormControl>
                    <Segment className="u-tx-right">
                        <ButtonGroup>
                            <Button type="button" variant="secondary-alt" onClick={onClose} >Cancel</Button>
                            <Button type="submit" variant="primary">Save</Button>
                        </ButtonGroup>
                    </Segment>
                </Segment>
            </form>
        </Segment >
    )
}
export default AddDepartement;