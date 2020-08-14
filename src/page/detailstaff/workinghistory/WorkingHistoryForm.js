import React from 'react';
import { 
  Button,
  ButtonGroup,
  Col,
  DatePicker,
  FormControl,
  Row,
  Textfield,
  Segment } from '@elevenia/master-ui/components/Atom';
import { useInput, useAction  } from 'hooks';
import { RequestSubmitEmployeeWorkingHistory, RequestUpdateEmployeeWorkingHistory } from 'store/actions/workingHistory';
import { validateForm } from 'helper';
import moment from 'moment';


const From = ({employeeId,onClose,dataEdit,params}) =>{
  const { hasFetch } = useAction();
  
  const { value, bindChange, bindSelectDate } = useInput({
      initialObjects: {
        companyName: dataEdit ? dataEdit.companyName : '',
        position: dataEdit ? dataEdit.position : '',
        startDate: dataEdit ? new Date(dataEdit.startDateInMillis) : '',
        endDate: dataEdit ? new Date(dataEdit.endDateInMillis) : ''
          
      },
      identity: "workingForm"
  })
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataSubmit = {
      ...value,
      employeeId,
      startDate:moment(value.startDate).format("DD-MM-YYYY HH:mm:ssZ"),
      endDate:moment(value.endDate).format("DD-MM-YYYY HH:mm:ssZ")
    }
    const valid = validateForm(e.target.id, true, false);
    if(dataEdit){
      valid && hasFetch(RequestUpdateEmployeeWorkingHistory(dataSubmit,employeeId,dataEdit.id,params))
    }else{
      valid && hasFetch(RequestSubmitEmployeeWorkingHistory(dataSubmit,params))
    }
    valid && onClose();
  }
  
  return(
    <Segment>
        <form id="workingForm" onSubmit={handleSubmit}>
          <Row>
              <Col wide={12} pr={8} py={4}>
                  <FormControl label="Company Name">
                      <Textfield
                          inputProps={{
                              ...bindChange,
                              name: "companyName",
                              value: value.companyName,
                              autoComplete: "off",
                              placeholder: "Company Name...",
                              className:'validate[required,minLength[3],maxLength[100]]'
                          }}
                      />
                  </FormControl>
              </Col>
              <Col wide={12} pr={8} py={4}>
                  <FormControl label="Position">
                      <Textfield
                          inputProps={{
                              ...bindChange,
                              name: "position",
                              value: value.position,
                              autoComplete: "off",
                              placeholder: "Position...",
                              className:'validate[required,minLength[3],maxLength[100]]'
                          }}
                      />
                  </FormControl>
              </Col>
              <Col wide={12} pr={8} py={4}>
                  <FormControl label="Start Date">
                    <DatePicker
                        name="startDate"
                        maxDate={moment().toDate()}
                        placeholderText="Start Date"
                        selected={value.startDate}
                        onChange={Data => bindSelectDate.onChange("startDate", Data)}
                        className="validate[required]"
                        autoComplete="off"
                        startYearRange={'1990'}
                    />
                  </FormControl>
              </Col>
              <Col wide={12} pr={8} py={4}>
                  <FormControl label="End Date" mb={24}>
                    <DatePicker
                          name="endDate"
                          maxDate={moment().toDate()}
                          placeholderText="End Date"
                          selected={value.endDate}
                          onChange={Data => bindSelectDate.onChange("endDate", Data)}
                          className="validate[required]"
                          autoComplete="off"
                          startYearRange={'1990'}
                      />
                  </FormControl>
              </Col>
          </Row>
          
          <Segment className="u-tx-right">
              <ButtonGroup>
                  <Button type="button" variant="secondary-alt" onClick={onClose} >Cancel</Button>
                  <Button type="submit" variant="primary">Save</Button>
              </ButtonGroup>
          </Segment>
        </form>
    </Segment>
  )
}

export default From;