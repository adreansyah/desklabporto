import React from 'react';
import {
  FormControl,
  Textfield,
  Button,
  ButtonGroup,
  Segment
} from '@elevenia/master-ui/components/Atom'
import { useInput, useAction } from 'hooks';
import { RequestSubmitLeaveType, RequestUpdateLeaveType } from 'store/actions/leaveType'
import { validateForm } from 'helper';
import { useSelector } from 'react-redux';

const From = ({ dataEdit, onClose }) => {
  const { hasFetch } = useAction();

  const { value, bindChange } = useInput({
    initialObjects: {
      name: dataEdit ? dataEdit.name : '',
      colorCode: dataEdit ? dataEdit.colorCode : '#ffffff'
    },
    identity: "leaveTypeForm"
  })

  const payload = useSelector(state => {
    return {
      params: state.leaveType.params
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const valid = validateForm(e.target.id, true, false);
    if (dataEdit) {
      valid && hasFetch(RequestUpdateLeaveType({ ...value, id: dataEdit.id }, payload.params))
    } else {
      valid && hasFetch(RequestSubmitLeaveType(value, payload.params))
    }
    valid && onClose();
  }
  return (
    <>
      <Segment>
        <form id="leaveTypeForm" onSubmit={handleSubmit}>
          <Segment>
            <FormControl label="Leave Type" mb={16}>
              <Textfield
                inputProps={{
                  ...bindChange,
                  name: "name",
                  value: value.name,
                  autoComplete: "off",
                  placeholder: "Name...",
                  className: 'validate[required,minLength[3],maxLength[100]]'
                }}
              />
            </FormControl>
            <FormControl label="Color" mb={24}>
              <Textfield
                inputProps={{
                  ...bindChange,
                  name: "colorCode",
                  value: value.colorCode,
                  type: "color",
                  className: 'validate[required]'
                }}
              />
            </FormControl>
            <Segment className="u-tx-right">
              <ButtonGroup>
                <Button type="button" variant="secondary-alt" onClick={onClose}>Cancel</Button>
                <Button type="submit" variant="primary">Save</Button>
              </ButtonGroup>
            </Segment>
          </Segment>
        </form>
      </Segment>
    </>
  )
}

export default From;