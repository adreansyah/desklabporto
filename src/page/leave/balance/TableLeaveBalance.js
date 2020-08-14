import React, { useEffect, useState } from 'react';
import DataTable from 'component/DataTable';
import { useAction } from 'hooks';
import { useSelector } from 'react-redux';
import Segment from '@elevenia/master-ui/components/Atom/Segment';
import { requestListLeaveBalance } from 'store/actions/leavebalance';
const TableLeaveBalance = (props) => {
    const { hasFetch } = useAction();
    const [isTable, setTable] = useState({
        page: 0,
        size: 5,
        sort: "employeeName,asc"
    });
    useEffect(() => {
        hasFetch(requestListLeaveBalance(isTable));
    }, [hasFetch, isTable]);
    const payload = useSelector(state => {
        return {
            data: state.leaveBalance.data,
            isLoading: state.leaveBalance.isLoading,
            totalPages: state.leaveBalance.totalPages,
            parameter: state.leaveBalance.parameter,
        }
    })
    return (
        <Segment>
            <DataTable
                defaultSortActive={isTable.sort}
                defaultSize={isTable.size}
                tableConsume={[{
                    field: 'Employee Id',
                    rowField: 'employeeId'
                }, {
                    field: 'Employee Name',
                    rowField: 'employeeName',
                    sortField: 'employeeName'
                }, {
                    field: 'Division Name',
                    rowField: 'divisionName',
                    sortField: 'divisionName'
                }, {
                    field: 'Total',
                    rowField: 'totalDay',
                    sortField: 'totalDay'
                }, {
                    field: 'Total Approve',
                    rowField: 'totalDayApp',
                    sortField: 'totalDayApp'
                }, {
                    field: 'Total Request',
                    rowField: 'totalDayReq',
                    sortField: 'totalDayReq'
                }, {
                    field: 'Taken',
                    rowField: 'takenLeave',
                    sortField: 'takenLeave'
                }]}
                dataConsume={payload.data}
                isLoading={payload.isLoading}
                totalPages={payload.totalPages}
                createShowPerSize={(size) => setTable(prev => {
                    return {
                        ...prev,
                        ...payload.parameter,
                        size: size.value
                    }
                })}
                createPaginations={(page) => setTable(prev => {
                    return {
                        ...prev,
                        page
                    }
                })}
                callSorted={(val, sort) => {
                    const query = {
                        ...isTable,
                        ...payload.parameter,
                        sort: `${val},${sort}`
                    }
                    hasFetch(requestListLeaveBalance(query));
                }}
                createSearchAbles={(e) => {
                    const query = {
                        ...isTable,
                        ...payload.parameter,
                        keyword: e.target.value
                    }
                    e.target.value.length > 3 && hasFetch(requestListLeaveBalance(query));
                    e.target.value.length === 0 && hasFetch(requestListLeaveBalance(query));
                }}
            />
        </Segment>
    )
}
export default TableLeaveBalance