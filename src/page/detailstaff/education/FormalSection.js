import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAction, useMultiToogle } from 'hooks';
import BoxFormal from './BoxFormalEducation';
import { requestListFormalEducationById, RequestDeleteEmployeeFormalEducation } from 'store/actions/education';
import { requestListAcademic } from 'store/actions/academic';
import {
  Button,
  ButtonGroup,
  Icon,
  Segment,
  Spinner,
  Text
} from '@elevenia/master-ui/components/Atom'
import ModalLarge from 'component/ModalCustom/modalLarge';
import ModalSmall from 'component/ModalCustom/modalSmall';
import FormFormal from './FormFormalEducation';

const paramsGraded = {
  unpaged:true
}

const FormalSection = (props) =>{
  const { hasFetch } = useAction();
  const { id } = props.match.params;
  const [dataEdit, setDataEdit] = useState(null);
  const { isToogle, toogler, onClose } = useMultiToogle({
      form: false,
      delete: false
  });

  
  
  const payload = useSelector(state => {
      return {
          dataFormalEducations: state.educationStaff.dataFormalEducations,
          listAcademic:state.academic.data,
          isLoading: state.educationStaff.isLoading,
      }
  });
  
  useEffect(() => {
      hasFetch(requestListFormalEducationById(id));
      hasFetch(requestListAcademic(paramsGraded));
  }, [hasFetch,id])
  
  const showFrom = () => {
      const isEvent = { target: { id: 'form' } }
      toogler.onClick(isEvent);
  }
  const onCloseFrom = () =>{
      onClose('form')
      setDataEdit(null);
  }

  const handleEdit = (data) => {
    
    const isEvent = { target: { id: 'form' } }
    toogler.onClick(isEvent);
    setDataEdit(data)
  }

  const handleDeleteModal = (data) => {
    const isEvent = { target: { id: 'delete' } }
    toogler.onClick(isEvent);
    setDataEdit(data)
  }
  
  const handleDelete = () => {
    hasFetch(RequestDeleteEmployeeFormalEducation(dataEdit.id,id));
    onClose('delete')
    setDataEdit(null);
  }
  return (
    <Segment mb={32}>
      <Segment display='flex' justifyContent='space-between' alignItems='center' mb={24}>
          <Text H16 color='black70'>Formal Education</Text>
          <Button onClick={()=>showFrom()}>
              <Icon fillColor="white" size={16} name="plus" mr={4} />
              Create
          </Button> 
      </Segment>
      <Segment>
        {
          payload.isLoading && <Segment className="u-tx-center" width="100%" height={30}>
                                    <Spinner />
                                </Segment>
        }
        {
          !payload.isLoading && payload.dataFormalEducations.length === 0 && <Segment className="u-tx-center" width="100%" height={30}>
                                                                                  <Text H16>Data Not Found</Text>
                                                                              </Segment>
        }
        {
          !payload.isLoading && payload.dataFormalEducations.map((val,index)=>{
            return <BoxFormal onEdit={handleEdit} onDelete={handleDeleteModal} key={index} data={val}/>
          })
        }
      </Segment>
      <ModalLarge
          isOpen={isToogle.form}
          onClose={() => onCloseFrom()}
          title={<Text className="u-tx-center">{dataEdit? 'Edit' : 'Add'} Formal Education</Text>}
          content={<FormFormal dataEdit={dataEdit} listAcademic={payload.listAcademic} employeeId={id} onClose={()=>onCloseFrom()} />}
      />
      <ModalSmall
          isOpen={isToogle.delete}
          onClose={() => onClose('delete')}
          title={<Text className="u-tx-center">Delete Formal Education</Text>}
          content={
              <Segment>
                  <Text>Are You Sure Want To Delete <b>"{dataEdit && dataEdit.institutionName}"</b> ?</Text>
              </Segment>
          }
          ButtonFooter={
              <ButtonGroup>
                  <Button variant="secondary-alt" onClick={() => onClose('delete')}>
                      <Text>Cancel</Text>
                  </Button>
                  <Button style={{ backgroundColor: 'red' }} onClick={()=>handleDelete()}>
                      <Text>Delete</Text>
                  </Button>
              </ButtonGroup>
          }
      />
    </Segment>
  )
}

export default FormalSection;