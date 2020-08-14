import React, {
  // useState 
} from 'react';
import {
  Col,
  FormControl,
  Row,
  Button,
  ButtonGroup,
  Segment,
  // OptionBox,
  DatePicker,
  Textarea
} from '@elevenia/master-ui/components/Atom'
import { useInput, useAction } from 'hooks';
import { validateForm } from 'helper';
import { useSelector } from 'react-redux';
import { requestCreateHoliday, requestUpdateHoliday } from 'store/actions/holiday';
import moment from "moment"
const CreateHoliday = ({ dataEdit, onClose }) => {
  const { hasFetch } = useAction();

  const payload = useSelector(state => {
    return {
      params: state.holiday.params
    }
  });
  const time = dataEdit !== null ? moment(dataEdit.holidayDate, 'YYYY-MM-DD').utc(true) : new Date();
  const { value, bindChange, bindSelectDate } = useInput({
    initialObjects: {
      description: dataEdit ? dataEdit.holidayDesc : '',
      singleDate: dataEdit !== null ? new Date(moment(time).utc(true).format('YYYY-MM-DD')) : new Date()
    },
    identity: "leaveTypeForm"
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = validateForm(e.target.id, true, false);
    if (dataEdit) {
      valid && hasFetch(requestUpdateHoliday({ ...value, id: dataEdit.id }, payload.params))
    } else {
      valid && hasFetch(requestCreateHoliday(value, payload.params))
    }
    valid && onClose();
  }
  return (
    <>
      <Segment>
        <form id="leaveTypeForm" onSubmit={handleSubmit}>
          <Row>
            <Col wide={12} pr={8} py={4}>
              <FormControl label="Date">
                <DatePicker
                  placeholderText="Masukkan tanggal"
                  selected={value.singleDate}
                  onChange={Data => bindSelectDate.onChange("singleDate", Data)}
                  inputClassName={'sample-className validate[required]'}
                />
              </FormControl>
            </Col>
          </Row>
          <Row>
            <Col wide={12} pr={8} py={4}>
              <FormControl label="Description">
                <Textarea
                  inputProps={{
                    ...bindChange,
                    rows: "5",
                    name: "description",
                    value: value.description,
                    autoComplete: "off",
                    placeholder: "Description...",
                    className: 'validate[required,minLength[3],maxLength[100]]'
                  }}
                />
              </FormControl>
            </Col>
          </Row>
          <Row>
            <Col wide={12}>
              <Segment mt={16} className="u-tx-right">
                <ButtonGroup>
                  <Button type="button" variant="secondary-alt" onClick={onClose} >Cancel</Button>
                  <Button type="submit" variant="primary">Save</Button>
                </ButtonGroup>
              </Segment>
            </Col>
          </Row>
        </form>
      </Segment>
    </>
  )
}

export default CreateHoliday;