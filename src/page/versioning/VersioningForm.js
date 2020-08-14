import React from 'react';
import { 
  Col,
  FormControl,
  Textfield,
  Row,
  Button,
  ButtonGroup,
  Segment,
  OptionBox,
  DatePicker,
  Textarea
} from '@elevenia/master-ui/components/Atom'
import { useInput, useAction  } from 'hooks';
import { RequestSubmitAppVersioning, RequestUpdateAppVersioning } from 'store/actions/appVersioning'
import { validateForm } from 'helper';
import { useSelector } from 'react-redux';
import moment from 'moment';

const From = ({dataEdit,onClose}) => {
  const { hasFetch } = useAction();
  
  const { value, bindChange, bindSelect, bindSelectDate } = useInput({
      initialObjects: {
        version: dataEdit ? dataEdit.version : '',
        device: dataEdit ? dataEdit.device : '',
        newFeature: dataEdit ? dataEdit.newFeature : '',
        updateDate: dataEdit ? new Date(dataEdit.updateDate) : '',
        updateType: dataEdit ? dataEdit.updateType : '',
        bugList: dataEdit ? dataEdit.bugList : '',
        description: dataEdit ? dataEdit.description : ''
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
    const dataSubmit = {
      ...value,
      updateDate:moment(value.updateDate).format("YYYY-MM-DD")
    }
    const valid = validateForm(e.target.id, true, false);
    if(dataEdit){
      valid && hasFetch(RequestUpdateAppVersioning({...dataSubmit,id:dataEdit.id},payload.params))
    }else{
      valid && hasFetch(RequestSubmitAppVersioning(dataSubmit,payload.params))
    }
    valid && onClose();
  }
  // option update type
  const updateTypeOptions = [
    { value: "Normal", label: "Normal" },
    { value: "Critical", label: "Critical" }
  ];

  const updateDeviceOptions = [
    { value: "Android", label: "Android" },
    { value: "IOS", label: "IOS" }
  ];
  
  return (
    <>
      <Segment>
          <form id="leaveTypeForm" onSubmit={handleSubmit}>
            <Row>
              <Col wide={6} pr={8}>
                <Row>
                  <Col wide={12} pr={8} py={4}>
                      <FormControl label="Version">
                          <Textfield
                              inputProps={{
                                  ...bindChange,
                                  name: "version",
                                  value: value.version,
                                  autoComplete: "off",
                                  placeholder: "Version...",
                                  className:'validate[required,minLength[5],maxLength[100]]'
                              }}
                          />
                      </FormControl>
                  </Col>
                </Row>
                <Row>
                  <Col wide={12} pr={8} py={4}>
                      <FormControl label="Release Type">
                        <OptionBox
                            {...bindSelect}
                            name='updateType'
                            value={updateTypeOptions.map(({label,value})=>({label,value})).find(val=>val.value===value.updateType)}
                            options={updateTypeOptions}
                            inputClassName={"sample-class-in-input validate[required]"}
                        />
                      </FormControl>
                  </Col>
                </Row>
                <Row>
                  <Col wide={12} pr={8} py={4}>
                      <FormControl label="Release Date">
                        <DatePicker
                          placeholderText="Masukkan tanggal"
                          selected={value.updateDate}
                          onChange={Data => bindSelectDate.onChange("updateDate", Data)}
                          className="validate[required]"
                        />
                      </FormControl>
                  </Col>
                </Row>
                <Row>
                  <Col wide={12} pr={8} py={4}>
                      <FormControl label="Device">
                        <OptionBox
                            {...bindSelect}
                            name='device'
                            value={updateDeviceOptions.map(({label,value})=>({label,value})).find(val=>val.value===value.device)}
                            options={updateDeviceOptions}
                            inputClassName={"sample-class-in-input validate[required]"}
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
                                  //className:'validate[required,minLength[3],maxLength[100]]'
                              }}
                          />
                      </FormControl>
                  </Col>
                </Row>
                
              </Col>
              <Col wide={6} pl={8}>
                <Row>
                  <Col wide={12} pr={8} py={4}>
                      <FormControl label="Bug(s) Fixing">
                          <Textarea
                              inputProps={{
                                  ...bindChange,
                                  rows: "5",
                                  name: "bugList",
                                  value: value.bugList,
                                  autoComplete: "off",
                                  placeholder: "Bugs Fixing...",
                                  //className:'validate[required,minLength[3],maxLength[100]]'
                              }}
                          />
                      </FormControl>
                  </Col>
                </Row>
                <Row>
                  <Col wide={12} pr={8} py={4}>
                      <FormControl label="New Feature(s)">
                          <Textarea
                              inputProps={{
                                  ...bindChange,
                                  rows: "5",
                                  name: "newFeature",
                                  value: value.newFeature,
                                  autoComplete: "off",
                                  placeholder: "New Features...",
                                  //className:'validate[required,minLength[3],maxLength[100]]'
                              }}
                          />
                      </FormControl>
                  </Col>
                </Row>
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

export default From;