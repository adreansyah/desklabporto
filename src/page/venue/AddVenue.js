import React from 'react';
import { Segment, FormControl, Textfield, ButtonGroup, Button, Textarea } from '@elevenia/master-ui/components/Atom';
import { useInput, useAction } from 'hooks';
import { requestCreateVenue } from 'store/actions/venue';
import { validateForm } from 'helper';

const AddVenue = ({ onClose }) => {
    const { hasFetch } = useAction();
    const { value, bindChange } = useInput({
        initialObjects: {
            venue: "",
            address: ""
        },
        identity: "venueId"
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const valid = validateForm(e.target.id, true, false);
        valid && hasFetch(requestCreateVenue(value));
        valid && onClose();
    }
    return (
        <Segment>
            <form id="venueId" onSubmit={handleSubmit}>
                <Segment>
                    <FormControl label="Venue Name" mb={16}>
                        <Textfield
                            inputProps={{
                                ...bindChange,
                                name: "venue",
                                value: value.venue,
                                className: "validate[required]",
                                autoComplete: "off",
                                autoFocus: true
                            }}
                        />
                    </FormControl>
                    <FormControl label="Address" mb={24}>
                        <Textarea
                            inputProps={{
                                ...bindChange,
                                rows: "5",
                                name: "address",
                                value: value.address,
                                className: "validate[required]",
                                autoComplete: "off",
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
export default AddVenue;