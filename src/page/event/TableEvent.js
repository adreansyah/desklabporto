import React, { useEffect, useState } from 'react'
import DataTable from 'component/DataTable'
import { Text, Button, ButtonGroup, Badge, Segment } from '@elevenia/master-ui/components/Atom'
import { useAction, useMultiToogle } from 'hooks'
import { requestEventList, requestActionsEventList } from 'store/actions/event'
import { useSelector } from 'react-redux'
import moment from 'moment'
import ModalSmall from 'component/ModalCustom/modalSmall'
const TableEvent = (props) => {
    const { hasFetch } = useAction();
    const [passId, setPassId] = useState('');
    const { isToogle, toogler, onClose } = useMultiToogle({
        approved: false,
        rejected: false
    })
    const [isTable, setTable] = useState({
        page: 0,
        size: 5,
        search: "",
        sort: "CreatedDate,asc",
        eventName: ""
    });
    const payload = useSelector(state => {
        return {
            data: state.event.data,
            isLoading: state.event.isLoading,
            totalPages: state.event.totalPages,
            parameter: state.event.parameter
        }
    });
    useEffect(() => {
        hasFetch(requestEventList(isTable));
    }, [isTable, hasFetch])
    return (
        <>
            <DataTable
                defaultSortActive={isTable.sort}
                defaultSize={isTable.size}
                isLoading={payload.isLoading}
                dataConsume={payload.data}
                totalPages={payload.totalPages}
                tableConsume={[{
                    field: 'Event',
                    sortField: 'trainingName',
                    rowField: "trainingName"
                }, {
                    field: 'Alamat',
                    rowField: 'address'
                }, {
                    field: 'kategori',
                    rowField: 'categoryName'
                }, {
                    field: 'Tipe',
                    rowField: 'typeOfEventName'
                }, {
                    field: 'Jadwal',
                    sortField: 'CreatedDate',
                    isCustomRow: (id, entity) => {
                        const startDate = moment(entity['startDate']).format("dddd, M MMM Y")
                        return (
                            <Text>
                                {startDate} | {entity['startTime']} - {entity['endTime']}
                            </Text>
                        )
                    },
                    entityFilters: "id"
                }, {
                    field: 'Status',
                    isCustomRow: (id, entity) => {
                        return (
                            <Segment className="u-tx-left">
                                {entity.statusName === 'Approved' && <Badge bg="success">Approved</Badge>}
                                {entity.statusName === 'Requested' && <Badge bg="info">Requested</Badge>}
                                {entity.statusName === 'Rejected' && <Badge bg="error">Rejected</Badge>}
                                {entity.statusName === 'Finish' && <Badge bg="primary">Finished</Badge>}
                                {entity.statusName === 'On Going' && <Badge bg="warning">On Going</Badge>}
                                {entity.statusName === '' && "-"}
                            </Segment>
                        )
                    },
                    entityFilters: "id"
                }, {
                    isCustomRow: (id, entity) => {
                        return (
                            (entity.statusName === "Approved" || entity.statusName === "Rejected" || entity.statusName === 'Finish' || entity.statusName === 'On Going' || entity.statusName === '')
                                ? <Text className="u-tx-right">{`Action ${entity.statusName}`}</Text>
                                :
                                <ButtonGroup responsive>
                                    <Button onClick={() => {
                                        const e = { target: { id: 'approved' } }
                                        toogler.onClick(e);
                                        setPassId(id)
                                    }} size="small" variant="primary-alt">
                                        Approved
                                    </Button>
                                    <Button onClick={() => {
                                        const e = { target: { id: 'rejected' } }
                                        toogler.onClick(e);
                                        setPassId(id)
                                    }} size="small" style={{ backgroundColor: "red", color: "white" }}>
                                        Rejected
                                    </Button>
                                </ButtonGroup>
                        )
                    },
                    entityFilters: "id"
                }]}
                callSorted={(val, sort) => {
                    const query = {
                        ...isTable,
                        ...payload.parameter,
                        sort: `${val},${sort}`
                    }
                    hasFetch(requestEventList(query));
                }}
                createSearchAbles={(e) => {
                    const query = {
                        ...isTable,
                        ...payload.parameter,
                        eventName: e.target.value
                    }
                    e.target.value.length > 3 && hasFetch(requestEventList(query));
                    e.target.value.length === 0 && hasFetch(requestEventList(query));
                }}
                createPaginations={(page) => setTable(prev => {
                    return {
                        ...prev,
                        page,
                        ...payload.parameter
                    }
                })}
                createShowPerSize={(size) => setTable(prev => {
                    return {
                        ...prev,
                        ...payload.parameter,
                        size: size.value
                    }
                })}
            />
            <ModalSmall
                isOpen={isToogle.approved}
                onClose={() => onClose('approved')}
                title=""
                content={<Text className="u-tx-center">Are You Sure Want To Approved ? </Text>}
                ButtonFooter={
                    <ButtonGroup responsive>
                        <Button variant="secondary-alt" size="small" onClick={() => onClose('approved')}>
                            <Text>No</Text>
                        </Button>
                        <Button variant="primary-alt" size="small" onClick={() => {
                            hasFetch(requestActionsEventList(passId, '201'))
                            onClose('approved');
                        }}>
                            <Text>Yes</Text>
                        </Button>
                    </ButtonGroup>
                }
            />
            <ModalSmall
                isOpen={isToogle.rejected}
                onClose={() => onClose('rejected')}
                title=""
                content={<Text className="u-tx-center">Are You Sure Want To Rejected ? </Text>}
                ButtonFooter={
                    <ButtonGroup responsive>
                        <Button variant="secondary-alt" size="small" onClick={() => onClose('rejected')}>
                            <Text>No</Text>
                        </Button>
                        <Button variant="primary-alt" size="small" onClick={() => {
                            hasFetch(requestActionsEventList(passId, 'B01'))
                            onClose('rejected');
                        }}>
                            <Text>Yes</Text>
                        </Button>
                    </ButtonGroup>
                }
            />
        </>
    )
}
export default TableEvent