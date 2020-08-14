import React from 'react';
import { Segment, FormControl, Textfield, ButtonGroup, Button } from '@elevenia/master-ui/components/Atom';
import { useInput, useAction } from 'hooks';
import { validateForm } from 'helper';
import { requestCreatePositionLevel } from 'store/actions/positionlevel';

const AddPositionLevel = ({ onClose }) => {
    const { hasFetch } = useAction();
    const { value, bindChange } = useInput({
        initialObjects: {
            level: ""
        },
        identity: "levelId"
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const valid = validateForm(e.target.id, true, false);
        valid && hasFetch(requestCreatePositionLevel(value));
        valid && onClose();
    }
    return (
        <Segment>
            <form id="levelId" onSubmit={handleSubmit}>
                <Segment>
                    <FormControl label="Level Name" mb={24}>
                        <Textfield
                            inputProps={{
                                ...bindChange,
                                name: "level",
                                value: value.level,
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
export default AddPositionLevel;