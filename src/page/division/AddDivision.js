import React from 'react';
import { Segment, FormControl, Textfield, ButtonGroup, Button } from '@elevenia/master-ui/components/Atom';
import { useInput, useAction } from 'hooks';
import { validateForm } from 'helper';
import { requestCreateDivision } from 'store/actions/division';

const AddDivision = ({ onClose }) => {
    const { hasFetch } = useAction();
    const { value, bindChange } = useInput({
        initialObjects: {
            division: "",
            address: ""
        },
        identity: "divisionId"
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const valid = validateForm(e.target.id, true, false);
        valid && hasFetch(requestCreateDivision(value));
        valid && onClose();
    }
    return (
        <Segment>
            <form id="divisionId" onSubmit={handleSubmit}>
                <Segment>
                    <FormControl label="Division Name" mb={24}>
                        <Textfield
                            inputProps={{
                                ...bindChange,
                                name: "division",
                                value: value.division,
                                className: "validate[required]",
                                autoComplete: "off",
                                autoFocus: true
                            }}
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
export default AddDivision;