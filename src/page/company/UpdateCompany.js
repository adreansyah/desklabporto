import React from 'react';
import { Segment, FormControl, Textfield, ButtonGroup, Button } from '@elevenia/master-ui/components/Atom';
import { useInput, useAction } from 'hooks';
import { useSelector } from 'react-redux';
import { requestUpdateCompany } from 'store/actions/company';

const UpdateCompany = ({ onClose, id }) => {
    const { hasFetch } = useAction()
    const payload = useSelector(state => {
        return {
            data: state.company.data
        }
    });
    const getData = payload.data.filter(val => val.id === id);
    const { value, bindChange } = useInput({
        initialObjects: {
            company: getData[0].name
        },
        identity: "companyId"
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        hasFetch(requestUpdateCompany(id, value));
        onClose('update');
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
                            <Button type="button" variant="secondary-alt" onClick={onClose}>Cancel</Button>
                            <Button type="submit" variant="primary">Submit</Button>
                        </ButtonGroup>
                    </Segment>
                </Segment>
            </form>
        </Segment >
    )
}
export default UpdateCompany;