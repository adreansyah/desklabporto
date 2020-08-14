import React from 'react';
import { Segment, FormControl, Textfield, ButtonGroup, Button, Textarea } from '@elevenia/master-ui/components/Atom';
import { useInput, useAction } from 'hooks';
import { useSelector } from 'react-redux';
import { requestUpdateVenue } from 'store/actions/venue';

const UpdateVenue = ({ onClose, id }) => {
    const { hasFetch } = useAction()
    const payload = useSelector(state => {
        return {
            data: state.venue.data
        }
    });
    const getData = payload.data.filter(val => val.id === id);
    const { value, bindChange } = useInput({
        initialObjects: {
            venue: getData[0].trainingLocationName,
            address: getData[0].address
        },
        identity: "venueId"
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        hasFetch(requestUpdateVenue(id, value));
        onClose('update');
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
                                autoComplete: "off"
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
export default UpdateVenue;