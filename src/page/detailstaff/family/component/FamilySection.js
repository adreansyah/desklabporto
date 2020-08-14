import React, { useState } from 'react';
import { 
    Button,
    ButtonGroup,
    Icon, 
    Segment,
    Text } from '@elevenia/master-ui/components/Atom';
import DataTable from 'component/DataTable';
import FamilyForm from './FamilyForm'
import ModalSmall from 'component/ModalCustom/modalSmall';
import { useMultiToogle, useAction } from 'hooks';
import { RequestDeleteEmployeeFamily } from 'store/actions/familystaff';
const FamilyInfo = ({payload,employeeId}) => {
    const { hasFetch } = useAction();
    const { isToogle, toogler, onClose } = useMultiToogle({
        form: false,
        delete: false
    });
    const [ dataEdit, setDataEdit ] = useState(null);

    const tabelFamily = [
        {
            field: 'Fullname',
            rowField: 'fullName'
        },
        {
            field: 'Gender',
            rowField: 'gender'
        },
        {
            field: 'Relationships',
            rowField: 'relationship'
        },
        {
            field: 'Action',
            rowField: 'relationship',
            isEdit: true,
            isDelete: true,
            entityFilters: "id"
        }
    ]
    const showFrom = () => {
        const isEvent = { target: { id: 'form' } }
        toogler.onClick(isEvent);
    }
    const onCloseFrom = () =>{
        onClose('form')
        setDataEdit(null);
    }

    const handleDelete = () => {
        hasFetch(RequestDeleteEmployeeFamily(dataEdit.id,employeeId));
        onClose('delete')
        setDataEdit(null);
    }
    
    return (
        <Segment mb={32}>
            <Segment display='flex' justifyContent='space-between' alignItems='center' mb={24}>
                <Text H16 color='black70'>Family Info</Text>
                <Button onClick={()=>showFrom()}>
                    <Icon fillColor="white" size={16} name="plus" mr={4} />
                    Create
                </Button> 
            </Segment>

            <DataTable
                tableConsume={tabelFamily}
                dataConsume={payload.dataFamily}
                showSearch={false}
                showSize={false}
                isLoading={payload.isLoading}
                showPagination={false}
                createCustomEdit={(entity) => {
                    const isEvent = { target: { id: 'form' } }
                    toogler.onClick(isEvent);
                    setDataEdit(payload.dataFamily.find(val=>val.id===entity))
                }}
                createCustomDelete={(entity) => {
                    const isEvent = { target: { id: 'delete' } }
                    toogler.onClick(isEvent);
                    setDataEdit(payload.dataFamily.find(val=>val.id===entity))
                }}
            />
            
            <ModalSmall
                isOpen={isToogle.form}
                onClose={() => onCloseFrom()}
                title={<Text className="u-tx-center">{dataEdit? 'Edit' : 'Create'} Family Info</Text>}
                content={<FamilyForm dataEdit={dataEdit}  employeeId={employeeId} onClose={()=>onCloseFrom()} />}
            />
            <ModalSmall
                isOpen={isToogle.delete}
                onClose={() => onClose('delete')}
                title={<Text className="u-tx-center">Delete Family Info</Text>}
                content={
                    <Segment>
                        <Text>Are You Sure Want To Delete <b>"{dataEdit && dataEdit.fullName}"</b> ?</Text>
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
export default FamilyInfo