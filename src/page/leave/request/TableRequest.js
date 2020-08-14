import React, { useState, useEffect, useRef } from 'react';
import { useAction } from 'hooks';
import { useSelector } from 'react-redux';
import DataTable from 'component/DataTable';
import { RequestLeaveList } from 'store/actions/leaveList';
import { Badge, ButtonGroup, Button, Segment, Icon, DatePicker } from '@elevenia/master-ui/components/Atom'
import moment from 'moment';


const TabelRequest = ({ showModalAction }) => {
  const { hasFetch } = useAction();
  const [filterDate, setFilterDate] = useState(new Date());
  const link = useRef(null)
  const [isTable, setTable] = useState({
    page: 0,
    size: 5,
    search: "",
    sort: "leaveDateStart,desc",
    date: moment(filterDate).format('YYYY-MM')
  });
  const payload = useSelector(state => {
    return {
      data: state.leaveList.data,
      isLoading: state.leaveList.isLoading,
      totalPages: state.leaveList.totalPages,
      params: state.leaveList.params
    }
  });
  useEffect(() => {
    hasFetch(RequestLeaveList(isTable));
  }, [hasFetch, isTable]);

  

  const handleFilterDate = (date) => {
    setFilterDate(date)
    const query = {
      ...payload.params,
      date:moment(date).format('YYYY-MM')
    }
    hasFetch(RequestLeaveList(query));
  }



  return (
    <>
      <DataTable
        defaultSize={isTable.size}
        defaultSortActive="leaveDateStart"
        tableConsume={[
          {
            field: 'Employee ID',
            rowField: 'nik',
            //sortField: 'nik'
          },
          {
            field: 'Employee Name',
            rowField: 'employeeName',
            sortField: 'employeeName'
          },
          {
            field: 'Delegation',
            rowField: 'delegationEmpName',
            //sortField: 'delegationEmpName'
          },
          {
            field: 'Unit Name',
            rowField: 'unitName',
            sortField: 'unitName'
          },
          {
            field: 'Leave Type',
            rowField: 'leaveTypeName',
            sortField: 'leaveTypeName'
          },
          {
            field: 'Description',
            rowField: 'reason',
            sortField: 'reason'
          },
          {
            field: 'File',
            isCustomRow: (id,entity) => {
              return entity.attachmentUrl ? <a
                                            ref={link}
                                            
                                            download
                                            target="_blank"
                                            href={entity.attachmentUrl}
                                            //href={`data:${entity.attachmentContentType};base64,` + encodeURI(entity.attachment)}
                                            rel="noopener noreferrer"
                                          ><Icon name={'document'} size={'small'} fillColor={'#115488'} /></a> : '-'
            }
            //rowField: 'attachment'
          },
          {
            field: 'Leave Start',
            sortField: 'leaveDateStart',
            isCustomRow: (id, entity) => {
              return entity.leaveDateStart ? moment(entity.leaveDateStart,'YYYY-MM-DD').format('DD MMM YYYY') : '-'
            }
          },
          {
            field: 'Leave End',
            sortField: 'leaveDateEnd',
            isCustomRow: (id, entity) => {
              return entity.leaveDateEnd ? moment(entity.leaveDateEnd,'YYYY-MM-DD').format('DD MMM YYYY') : '-'
            }
          },
          {
            field: 'Status',
            isCustomRow: (id, entity) => {
              return (
                <Segment className="u-tx-left">
                  {entity.status === 'APPROVED' && <Badge bg="success">Accepted</Badge>}
                  {entity.status === 'REQUESTED' && <Badge bg="warning">Waiting</Badge>}
                  {entity.status === 'REJECTED' && <Badge bg="error">Decline</Badge>}
                  {entity.status === 'CANCELED' && <Badge bg="error">Cancel</Badge>}
                  {entity.status === '' && "-"}
                </Segment>
              )
            },
            entityFilters: "id",
            sortField: 'status'
          },
          {
            field: 'Action',
            isCustomRow: (id, entity) => {
              const { status } = entity
              return (
                <>
                  <ButtonGroup>
                    <Button disabled={status === "REQUESTED" ? false : true} size={'small'} type="button" onClick={() => showModalAction(id, entity, 'Accept')} style={{ backgroundColor: '#115488', minWidth: 80 }}>
                      Accept
                    </Button>
                    <Button disabled={status === "REQUESTED" ? false : true} size={'small'} type="button" onClick={() => showModalAction(id, entity, 'Reject')} style={{ backgroundColor: '#ED1651', minWidth: 80 }}>
                      Reject
                    </Button>
                    <Button disabled={status === "CANCELED" ? true : false} variant="secondary-alt" size={'small'} type="button" onClick={() => showModalAction(id, entity, 'Cancel')} style={{ minWidth: 80 }}>
                      Cancel
                    </Button>
                  </ButtonGroup>
                </>
              )

            }

          }]}
        dataConsume={payload.data}
        isLoading={payload.isLoading}
        totalPages={payload.totalPages}
        showCustomFilter={true}
        customFilter={<Segment width='200px'>
          <DatePicker
            selected={filterDate}
            onChange={(date)=>handleFilterDate(date)}
            showMonthYearPicker
            dateFormat='MMMM yyyy'
          />
        </Segment>}
        createShowPerSize={(size) => setTable(prev => {
          return {
            ...payload.params,
            size: size.value
          }
        })}
        showPagination={true}
        createPaginations={(page) => setTable(prev => {
            return {
                ...prev,
                ...payload.params,
                page
            }
        })}
        showSize={true}
        showSearch={true}
        createSearchAbles={(e) => {
          const query = {
            ...payload.params,
            search: e.target.value
          }
          e.target.value.length > 3 && hasFetch(RequestLeaveList(query));
          e.target.value.length === 0 && hasFetch(RequestLeaveList(query));
        }}
        callSorted={(val, sort) => {
          const query = {
            ...payload.params,
            sort: `${val},${sort}`
          }
          hasFetch(RequestLeaveList(query));
        }}

      />


    </>
  )
}

export default TabelRequest;