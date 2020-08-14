import React from 'react';
import { Segment, FormControl, Textfield, ButtonGroup, Button } from '@elevenia/master-ui/components/Atom';
import { useInput, useAction } from 'hooks';
import { requestCreateCompany } from 'store/actions/company';
import { validateForm } from 'helper';

const AddCompany = ({ onClose }) => {
    const { hasFetch } = useAction();
    const { value, bindChange } = useInput({
        initialObjects: {
            company: ""
        },
        identity: "companyId"
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const valid = validateForm(e.target.id, true, false);
        valid && hasFetch(requestCreateCompany(value));
        valid && onClose();
    }
    return (
        <Segment>
            <form id="companyId" onSubmit={handleSubmit}>
                <Segment>
                    <FormControl label="Company Name" mb={24}>
                        <Textfield
                            inputProps={{
                                ...bindChange,
                                name: "company",
                                value: value.company,
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
export default AddCompany;