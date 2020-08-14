import React from 'react';
import { Segment, FormControl, Textfield, ButtonGroup, Button } from '@elevenia/master-ui/components/Atom';
import { useInput, useAction } from 'hooks';
import { validateForm } from 'helper';
import { requestUpdateCategory } from 'store/actions/category';
import { useSelector } from 'react-redux';

const UpdateCategory = ({ onClose, id }) => {
    const { hasFetch } = useAction();
    const payload = useSelector(state => {
        return {
            data: state.category.data,
        }
    });
    const getData = payload.data.filter(val => val.id === id);
    const { value, bindChange } = useInput({
        initialObjects: {
            category: getData[0].categoryName,
            status: getData[0].status
        },
        identity: "categoryId"
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const valid = validateForm(e.target.id, true, false);
        // console.log(value)
        valid && hasFetch(requestUpdateCategory(id, value));
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
                    <Segment my={8} className="u-tx-right">
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
export default UpdateCategory;