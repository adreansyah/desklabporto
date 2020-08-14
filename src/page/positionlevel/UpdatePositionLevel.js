import React from 'react';
import { Segment, FormControl, Textfield, ButtonGroup, Button } from '@elevenia/master-ui/components/Atom';
import { useInput, useAction } from 'hooks';
import { validateForm } from 'helper';
import { useSelector } from 'react-redux';
import { requestUpdatePositionLevel } from 'store/actions/positionlevel';

const UpdatePositionLevel = ({ onClose, id }) => {
    const { hasFetch } = useAction();
    const payload = useSelector(state => {
        return {
            data: state.positionLevel.data,
        }
    });
    const getData = payload.data.filter(val => val.id === id);
    const { value, bindChange } = useInput({
        initialObjects: {
            level: getData[0].name,
        },
        identity: "levelId"
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const valid = validateForm(e.target.id, true, false);
        // console.log(value)
        valid && hasFetch(requestUpdatePositionLevel(id, value));
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
export default UpdatePositionLevel;