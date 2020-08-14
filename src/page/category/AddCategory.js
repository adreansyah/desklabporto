import React from 'react';
import { Segment, FormControl, Textfield, ButtonGroup, Button } from '@elevenia/master-ui/components/Atom';
import { useInput, useAction } from 'hooks';
import { validateForm } from 'helper';
import { requestCreateCategory } from 'store/actions/category';

const AddCategory = ({ onClose }) => {
    const { hasFetch } = useAction();
    const { value, bindChange } = useInput({
        initialObjects: {
            category: ""
        },
        identity: "categoryId"
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const valid = validateForm(e.target.id, true, false);
        valid && hasFetch(requestCreateCategory(value));
        valid && onClose();
    }
    return (
        <Segment>
            <form id="categoryId" onSubmit={handleSubmit}>
                <Segment>
                    <FormControl label="Category Name" mb={24}>
                        <Textfield
                            inputProps={{
                                ...bindChange,
                                name: "category",
                                value: value.category,
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
export default AddCategory;