import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Segment, Text, Button, Icon, ButtonGroup } from '@elevenia/master-ui/components/Atom';
import DataTable from 'component/DataTable';
import { useAction, useMultiToogle } from 'hooks';
import { requestListWorkingHistoryById, RequestDeleteEmployeeWorkingHistory } from 'store/actions/workingHistory'
// import BoxHistory from './BoxHistory'
import FormWorking from './WorkingHistoryForm'
import ModalSmall from 'component/ModalCustom/modalSmall'
import moment from 'moment';

const WorkingHistory = (props) => {
    const { id } = props.match.params;
    const { hasFetch }  = useAction();
    const [dataEdit, setDataEdit] = useState(null);
    const tabelWorkingHistory = [
        {
            field: 'Company Name',
            rowField: 'companyName'
        },
        {
            field: 'Position',
            rowField: 'position'
        },
        {
            field: 'Start Date',
            isCustomRow: (id, entity) => {
                return entity.startDate ? moment(entity.startDate,'DD-MM-YYYY').format('DD MMM YYYY') : '-'
            }
        },
        {
            field: 'End Date',
            isCustomRow: (id, entity) => {
                return entity.endDate ? moment(entity.endDate,'DD-MM-YYYY').format('DD MMM YYYY') : '-'
            }
        },
        {
            field: 'Action',
            rowField: 'position',
            isEdit: true,
            isDelete: true,
            entityFilters: "id"
        }
    ]
    const { isToogle, toogler, onClose } = useMultiToogle({
        form: false,
        delete: false
    });

    const [params] = useState(
        {
            sort:'id,desc'
        }
    )
    const payload = useSelector(state => {
        return {
            data: state.workingHistory.data,
            isLoading: state.workingHistory.isLoading,
            params:state.workingHistory.params
        }
    });
    console.log('payolad data', payload.data)
    useEffect(() => {
        hasFetch(requestListWorkingHistoryById(id,params));
    }, [hasFetch,id,params])
    
    const showFrom = () => {
        const isEvent = { target: { id: 'form' } }
        toogler.onClick(isEvent);
    }
    const onCloseFrom = () =>{
        onClose('form')
        setDataEdit(null);
    }
  
    // const handleEdit = (data) => {
      
    //   const isEvent = { target: { id: 'form' } }
    //   toogler.onClick(isEvent);
    //   setDataEdit(data)
    // }
  
    // const handleDeleteModal = (data) => {
    //   const isEvent = { target: { id: 'delete' } }
    //   toogler.onClick(isEvent);
    //   setDataEdit(data)
    // }
    
    const handleDelete = () => {
      hasFetch(RequestDeleteEmployeeWorkingHistory(dataEdit.id,id,payload.params));
      onClose('delete')
      setDataEdit(null);
    }
    return (
        <Segment mb={32}>
            <Segment display='flex' justifyContent='space-between' alignItems='center' mb={24}>
                <Text H16 color='black70'>Working History</Text>
                <Button onClick={()=>showFrom()}>
                    <Icon fillColor="white" size={16} name="plus" mr={4} />
                    Create
                </Button> 
            </Segment>

            <Segment>
                <DataTable
                    tableConsume={tabelWorkingHistory}
                    dataConsume={payload.data}
                    showSearch={false}
                    showSize={false}
                    isLoading={payload.isLoading}
                    showPagination={false}
                    createCustomEdit={(entity) => {
                        const isEvent = { target: { id: 'form' } }
                        toogler.onClick(isEvent);
                        setDataEdit(payload.data.find(val=>val.id===entity))
                    }}
                    createCustomDelete={(entity) => {
                        const isEvent = { target: { id: 'delete' } }
                        toogler.onClick(isEvent);
                        setDataEdit(payload.data.find(val=>val.id===entity))
                    }}
                />
            </Segment>
            
            {/* <Segment>
                {
                payload.isLoading && <Segment className="u-tx-center" width="100%" height={30}>
                                            <Spinner />
                                        </Segment>
                }
                {
                !payload.isLoading && payload.data.length === 0 && <Segment className="u-tx-center" width="100%" height={30}>
                                                                                        <Text H16>Data Not Found</Text>
                                                                                    </Segment>
                }
                {
                !payload.isLoading && payload.data.map((val,index)=>{
                    return <BoxHistory onEdit={handleEdit} data={val} key={index} onDelete={handleDeleteModal}/>
                })
                }
            </Segment> */}
            
             <ModalSmall
                isOpen={isToogle.form}
                onClose={() => onCloseFrom()}
                title={<Text className="u-tx-center">{dataEdit? 'Edit' : 'Add'} Working History</Text>}
                content={<FormWorking dataEdit={dataEdit}  employeeId={id} onClose={()=>onCloseFrom()} params={payload.params} />}
            />
            
            <ModalSmall
                isOpen={isToogle.delete}
                onClose={() => onClose('delete')}
                title={<Text className="u-tx-center">Delete Formal Education</Text>}
                content={
                    <Segment>
                        <Text>Are You Sure Want To Delete <b>"{dataEdit && dataEdit.companyName}"</b> ?</Text>
                    </Segment>
                }
                ButtonFooter={
                    <ButtonGroup reponsive>
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
export default WorkingHistory