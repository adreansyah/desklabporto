import React from 'react';
import { 
  Button,
  ButtonGroup,
  DatePicker,
  FormControl,
  OptionBox,
  Textfield,
  Segment } from '@elevenia/master-ui/components/Atom';
import { useInput, useAction  } from 'hooks';
import { RequestSubmitEmployeeFormalEducation, RequestUpdateEmployeeFormalEducation } from 'store/actions/education';
import { validateForm } from 'helper';
import moment from 'moment';


const From = ({employeeId,onClose,dataEdit,listAcademic}) =>{
  const { hasFetch } = useAction();
  
  const { value, bindChange, bindSelect, bindSelectDate } = useInput({
      initialObjects: {
        institutionName: dataEdit ? dataEdit.institutionName : '',
        major: dataEdit ? dataEdit.major : '',
        gradeId: dataEdit ? dataEdit.gradeId : '',
        score: dataEdit ? dataEdit.score : '',
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
      valid && hasFetch(RequestUpdateEmployeeFormalEducation(dataSubmit,employeeId,dataEdit.id))
    }else{
      valid && hasFetch(RequestSubmitEmployeeFormalEducation(dataSubmit))
    }
    valid && onClose();
  }
  
  return(
    <Segment>
        <form id="formalForm" onSubmit={handleSubmit}>
            <Segment m={'0 -10px 24px'} justifyContent={'space-between'}>
                <Segment flex={1} m={'0 10px'}>
                    <FormControl label="University Name" mb={8}>
                        <Textfield
                            inputProps={{
                                ...bindChange,
                                name: "institutionName",
                                value: value.institutionName,
                                autoComplete: "off",
                                placeholder: "Institution Name...",
                                className:'validate[required,minLength[3],maxLength[100]]'
                            }}
                        />
                    </FormControl>
                    <FormControl label="Major" mb={8}>
                        <Textfield
                            inputProps={{
                                ...bindChange,
                                name: "major",
                                value: value.major,
                                autoComplete: "off",
                                placeholder: "Major...",
                                className:'validate[required,minLength[3],maxLength[100]]'
                            }}
                        />
                    </FormControl>
                    <FormControl label="Degree" mb={8}>
                        <OptionBox
                            status={'normal'}
                            name="gradeId"
                            value={listAcademic.map(({name:label,id:value})=>({label,value})).find(val=>val.value===value.gradeId)}
                            options={listAcademic.map(({name:label,id:value})=>({label,value}))}
                            placeholder={'--Select Degree'}
                            {...bindSelect}
                            inputClassName="validate[required]"
                                
                        />
                    </FormControl>
                </Segment>
                <Segment flex={1} m={'0 10px'}>
                    <FormControl label="Grade" mb={8}>
                        <Textfield
                            inputProps={{
                                ...bindChange,
                                name: "score",
                                value: value.score,
                                autoComplete: "off",
                                placeholder: "Grade...",
                                className:'validate[required,numberColon,minLength[1],maxLength[4]]'
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
            <Segment mt={16} className="u-tx-right">
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