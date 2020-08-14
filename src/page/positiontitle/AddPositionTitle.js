import React from 'react';
import { Segment, FormControl, Textfield, ButtonGroup, Button } from '@elevenia/master-ui/components/Atom';
import { useInput, useAction } from 'hooks';
import { validateForm } from 'helper';
import { requestCreatePositionTitle } from 'store/actions/positiontitle';

const AddPositionTitle = ({ onClose }) => {
    const { hasFetch } = useAction();
    const { value, bindChange } = useInput({
        initialObjects: {
            title: ""
        },
        identity: "titleId"
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const valid = validateForm(e.target.id, true, false);
        valid && hasFetch(requestCreatePositionTitle(value));
        valid && onClose();
    }
    return (
        <Segment>
            <form id="titleId" onSubmit={handleSubmit}>
                <Segment>
                    <FormControl label="Title Name" mb={24}>
                        <Textfield
                            inputProps={{
                                ...bindChange,
                                name: "title",
                                value: value.title,
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
export default AddPositionTitle;