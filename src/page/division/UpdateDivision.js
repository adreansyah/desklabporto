import React from 'react';
import { Segment, FormControl, Textfield, ButtonGroup, Button, Textarea } from '@elevenia/master-ui/components/Atom';
import { useInput, useAction } from 'hooks';
import { useSelector } from 'react-redux';
import { requestUpdateDivision } from 'store/actions/division';

const UpdateDivision = ({ onClose, id }) => {
    const { hasFetch } = useAction()
    const payload = useSelector(state => {
        return {
            data: state.division.data
        }
    });
    const getData = payload.data.filter(val => val.id === id);
    const { value, bindChange } = useInput({
        initialObjects: {
            division: getData[0].name,
            company: getData[0].companyName
        },
        identity: "divisionId"
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        hasFetch(requestUpdateDivision(id, value));
        onClose('update');
    }
    return (
        <Segment>
            <form id="divisionId" onSubmit={handleSubmit}>
                <Segment>
                    <FormControl label="Division" mb={16}>
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
                    <FormControl label="Company" mb={24}>
                        <Textarea
                            disabled
                            inputProps={{
                                ...bindChange,
                                rows: "5",
                                name: "company",
                                value: value.company,
                                className: "validate[required]",
                                autoComplete: "off",
                                readOnly: true
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
export default UpdateDivision;