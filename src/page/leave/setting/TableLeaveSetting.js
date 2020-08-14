import React, { useEffect, useState } from 'react';
import DataTable from 'component/DataTable';
import { useAction, useMultiToogle } from 'hooks';
import { requestListLeaveSetting, requestLeaveSettingUtilities, requestDeleteLeaveSetting } from 'store/actions/leavesetting';
import { requestLeaveType } from 'store/actions/leaveType';
import { useSelector } from 'react-redux';
import { Text, ButtonGroup, Button, Spinner } from '@elevenia/master-ui/components/Atom';
import ModalXlarge from 'component/ModalCustom/modalXlarge';
import UpdateLeaveSetting from './UpdateLeaveSetting';
import ModalSmall from 'component/ModalCustom/modalSmall';
import Segment from '@elevenia/master-ui/components/Atom/Segment';
const TableLeaveSetting = (props) => {

    const { hasFetch } = useAction();
    const { toogler, isToogle, onClose } = useMultiToogle({
        update: false,
        delete: false
    })
    const [passId, setPassId] = useState('');
    const [deleteInfo, setDeleteInfo] = useState('');
    const [isTable, setTable] = useState({
        page: 0,
        size: 5,
        sort: "leaveTypeName,asc"
    });
    useEffect(() => {
        hasFetch(requestListLeaveSetting(isTable))
        hasFetch(requestLeaveType({unpaged:true}))
        hasFetch(requestLeaveSettingUtilities());
    }, [hasFetch, isTable]);
    const handleRemoveLeaveSetting = () => {
        hasFetch(requestDeleteLeaveSetting(passId.toString()))
        onClose('delete')
    }
    const payload = useSelector(state => {
        return {
            data: state.leaveSetting.data,
            isLoading: state.leaveSetting.isLoading,
            isUtilitiesLoading: state.leaveSetting.isUtilitiesLoading,
            totalPages: state.leaveSetting.totalPages,
            parameter: state.leaveSetting.parameter,
            resetInTheEndOf: state.leaveSetting.resetInTheEndOf,
            insideCity: state.leaveSetting.insideCity,
            medicalLetter: state.leaveSetting.medicalLetter,
            eligibleNumberList: state.leaveSetting.eligibleNumberList,
            eligibleNumberOperatorList: state.leaveSetting.eligibleNumberOperatorList,
            eligibleForYearList: state.leaveSetting.eligibleForYearList
        }
    })
    return (
        <Segment>
            <DataTable
                defaultSortActive={isTable.sort}
                defaultSize={isTable.size}
                tableConsume={[{
                    field: 'Leave Type',
                    rowField: 'leaveTypeName',
                    sortField: 'leaveTypeName'
                }, {
                    field: 'Total Day',
                    rowField: 'totalDay'
                }, {
                    field: 'Given Date',
                    rowField: 'givenDate'
                }, {
                    field: 'Max Taken In A Row',
                    rowField: 'maxTakenInRow'
                }, {
                    field: 'Reset',
                    isCustomRow: (id, entity) => {
                        const isResetFlag = payload.resetInTheEndOf.filter(isResetState => isResetState.key === entity.resetInEndOf);
                        return payload.isUtilitiesLoading ?
                            <Text><Spinner width={15} height={15} /></Text>
                            :
                            <Text>{isResetFlag[0] !== undefined && isResetFlag[0].value}</Text>
                    },
                    sortField: 'resetInEndOf'
                }, {
                    field: 'In City',
                    isCustomRow: (id, entity) => {
                        const isInsideCity = payload.insideCity.filter(isInsideCityState => isInsideCityState.key === entity.insideCity);
                        return payload.isUtilitiesLoading ?
                            <Text><Spinner width={15} height={15} /></Text>
                            :
                            <Text>{isInsideCity[0] !== undefined && isInsideCity[0].value}</Text>
                    },
                    sortField: 'insideCity'
                }, {
                    field: 'Med Letter',
                    isCustomRow: (id, entity) => {
                        const isMedicalLetter = payload.medicalLetter.filter(isMedicalLetterState => isMedicalLetterState.key === entity.medicalLetter);
                        return payload.isUtilitiesLoading ?
                            <Text><Spinner width={15} height={15} /></Text>
                            :
                            <Text>{isMedicalLetter[0] !== undefined && isMedicalLetter[0].value}</Text>
                    }
                }, {
                    field: 'Eligible',
                    isCustomRow: (id, entity) => {
                        const isELigibleForYearList = payload.eligibleForYearList.filter(isYear => isYear.key === entity.eligibleForYear)
                        const isEligibleNumberOperatorList = payload.eligibleNumberOperatorList.filter(isOperator => isOperator.key === entity.eligibleForOperator);
                        const isEligibleNumberList = payload.eligibleNumberList.filter(isEligibleNumberListState => isEligibleNumberListState.key === entity.eligibleForNumber);
                        const isOperator = isEligibleNumberOperatorList[0] !== undefined && isEligibleNumberOperatorList[0].value;
                        const isNumber = isEligibleNumberList[0] !== undefined && isEligibleNumberList[0].value;
                        const isYear = isELigibleForYearList[0] !== undefined && isELigibleForYearList[0].value;
                        return payload.isUtilitiesLoading ?
                            <Text><Spinner width={15} height={15} /></Text>
                            :
                            <Text>{isOperator} {isNumber} {isYear}</Text>
                    },
                    sortField: 'eligibleForNumber'
                }, {
                    field: 'Approver',
                    isCustomRow: (id, entity) => {
                        return (
                            <>
                                {
                                    entity.approvers.map((item, index) => {
                                        return (
                                            <Text key={index}>
                                                - {item.positionTitle}
                                            </Text>
                                        )
                                    })
                                }
                            </>
                        )
                    }
                }, {
                    field: 'Action',
                    isEdit: true,
                    isDelete: true,
                    entityFilters: "id"
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
                createCustomEdit={(entity) => {
                    const isEvent = { target: { id: 'update' } }
                    toogler.onClick(isEvent);
                    setPassId(entity);
                }}
                createCustomDelete={(entity, item) => {
                    const isEvent = { target: { id: 'delete' } }
                    toogler.onClick(isEvent);
                    setPassId(entity);
                    setDeleteInfo(item.name);
                }}
                callSorted={(val, sort) => {
                    const query = {
                        ...isTable,
                        ...payload.parameter,
                        sort: `${val},${sort}`
                    }
                    hasFetch(requestListLeaveSetting(query));
                }}
                createSearchAbles={(e) => {
                    const query = {
                        ...isTable,
                        ...payload.parameter,
                        keyword: e.target.value
                    }
                    e.target.value.length > 3 && hasFetch(requestListLeaveSetting(query));
                    e.target.value.length === 0 && hasFetch(requestListLeaveSetting(query));
                    console.log(query)
                }}
            />
            <ModalXlarge
                isOpen={isToogle.update}
                onClose={() => onClose('update')}
                title={<Text className="u-tx-center">Update Leave Setting</Text>}
                content={<UpdateLeaveSetting id={passId} {...props} onClose={() => onClose('update')} />}
            />
            <ModalSmall
                isOpen={isToogle.delete}
                onClose={() => onClose('delete')}
                title={<Text className="u-tx-center">Delete Leave Setting</Text>}
                content={`Are you sure want to delete data '${deleteInfo}' ?`}
                ButtonFooter={
                    <ButtonGroup reponsive>
                        <Button variant="secondary-alt" onClick={() => onClose('delete')}>
                            <Text>Cancel</Text>
                        </Button>
                        <Button type="button" style={{ backgroundColor: 'red' }} onClick={handleRemoveLeaveSetting}>
                            <Text>Delete</Text>
                        </Button>
                    </ButtonGroup>
                }
            />
        </Segment>
    )
}
export default TableLeaveSetting