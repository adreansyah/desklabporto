import React from 'react';
import { 
  Button,
  ButtonGroup,
  DatePicker,
  FormControl,
  Textarea,
  Textfield,
  Segment } from '@elevenia/master-ui/components/Atom';
import { useInput, useAction  } from 'hooks';
import { RequestSubmitInformalEducation, RequestUpdateInformalEducation } from 'store/actions/education';
import { validateForm } from 'helper';
import moment from 'moment';


const From = ({employeeId,onClose,dataEdit,listAcademic}) =>{
  const { hasFetch } = useAction();
  
  const { value, bindChange, bindSelectDate } = useInput({
      initialObjects: {
        heldBy: dataEdit ? dataEdit.heldBy:'',
        name: dataEdit ? dataEdit.name : '',
        certificate: dataEdit ? dataEdit.certificate : '',
        description: dataEdit ? dataEdit.description : '',
        fee: dataEdit ? dataEdit.fee : '',
        startDate: dataEdit ? new Date(dataEdit.startDateInMillis) : '',
        endDate: dataEdit ? new Date(dataEdit.endDateInMillis) : ''
          
      },
      identity: "formalForm"
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
      valid && hasFetch(RequestUpdateInformalEducation(dataSubmit,employeeId,dataEdit.id))
    }else{
      valid && hasFetch(RequestSubmitInformalEducation(dataSubmit))
    }
    valid && onClose();
  }
  
  return(
    <Segment>
        <form id="formalForm" onSubmit={handleSubmit}>
            <Segment m={'0 -10px 24px'} justifyContent={'space-between'}>
                <Segment flex={1} m={'0 10px'}>
                    <FormControl label="Institution Name" mb={8}>
                        <Textfield
                            inputProps={{
                                ...bindChange,
                                name: "heldBy",
                                value: value.heldBy,
                                autoComplete: "off",
                                placeholder: "Institution Name...",
                                className:'validate[required,minLength[3],maxLength[100]]'
                            }}
                        />
                    </FormControl>
                    <FormControl label="Name" mb={8}>
                        <Textfield
                            inputProps={{
                                ...bindChange,
                                name: "name",
                                value: value.name,
                                autoComplete: "off",
                                placeholder: "Name...",
                                className:'validate[required,minLength[3],maxLength[100]]'
                            }}
                        />
                    </FormControl>
                    <FormControl label="Certificate" mb={8}>
                        <Textfield
                            inputProps={{
                                ...bindChange,
                                name: "certificate",
                                value: value.certificate,
                                autoComplete: "off",
                                placeholder: "Major...",
                                className:'validate[required,minLength[3],maxLength[100]]'
                            }}
                        />
                    </FormControl>
                    <FormControl label="Description" mb={8}>
                        <Textarea
                            inputProps={{
                                ...bindChange,
                                name: "description",
                                value: value.description,
                                autoComplete: "off",
                                placeholder: "description...",
                                className:''
                            }}
                        />
                    </FormControl>
                </Segment>
                <Segment flex={1} m={'0 10px'}>
                    <FormControl label="Fee" mb={8}>
                        <Textfield
                            inputProps={{
                                ...bindChange,
                                name: "fee",
                                value: value.fee,
                                autoComplete: "off",
                                placeholder: "Fee...",
                                className:'validate[required,minLength[1],maxLength[20]]'
                            }}
                        />
                    </FormControl>
                    <FormControl label="Start Date" mb={8}>
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
                    <FormControl label="End Date" mb={8}>
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
                </Segment>
            </Segment>

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