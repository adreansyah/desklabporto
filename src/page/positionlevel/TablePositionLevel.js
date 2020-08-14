import React, { useState, useEffect } from 'react';
import { useAction, useMultiToogle } from 'hooks';
import { useSelector } from 'react-redux';
import { ButtonGroup, Button, Text } from '@elevenia/master-ui/components/Atom';
import UpdateCategory from './UpdatePositionLevel';
import ModalSmall from 'component/ModalCustom/modalSmall';
import DataTable from 'component/DataTable';
import { requestListPositionLevel, requestDeletePositionLevel } from 'store/actions/positionlevel';
const TablePositionLevel = () => {
    const { hasFetch } = useAction();
    const [passId, setPassId] = useState('');
    const [deleteInfo, setDeleteInfo] = useState('');
    const { isToogle, toogler, onClose } = useMultiToogle({
        update: false,
        delete: false
    });
    const [isTable, setTable] = useState({
        page: 0,
        size: 5,
        sort: "asc",
        keyword: ""
    });
    const payload = useSelector(state => {
        return {
            data: state.positionLevel.data,
            isLoading: state.positionLevel.isLoading,
            totalPages: state.positionLevel.totalPages,
            parameter: state.positionLevel.parameter
        }
    });
    const handleRemove = () => {
        hasFetch(requestDeletePositionLevel(passId))
        onClose('delete');
    }

    useEffect(() => {
        hasFetch(requestListPositionLevel(isTable));
    }, [hasFetch, isTable]);

    return (
        <>
            <DataTable
                defaultSize={isTable.size}
                tableConsume={[{
                    field: 'Position Level',
                    rowField: 'name'
                }, {
                    field: 'Action',
                    isEdit: true,
                    isDelete: true,
                    entityFilters: "id"
                }]}
                totalPages={payload.totalPages}
                dataConsume={payload.data}
                isLoading={payload.isLoading}
                createCustomEdit={(entity) => {
                    const isEvent = { target: { id: 'update' } }
                    const { onClick } = toogler;
                    onClick(isEvent);
                    setPassId(entity);
                }}
                createCustomDelete={(entity, item) => {
                    const isEvent = { target: { id: 'delete' } }
                    const { onClick } = toogler;
                    onClick(isEvent);
                    setPassId(entity);
                    setDeleteInfo(item.name);
                }}
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
                createSearchAbles={(e) => {
                    const query = {
                        ...payload.parameter,
                        size: isTable.size,
                        keyword: e.target.value,
                    }
                    e.target.value.length > 3 && hasFetch(requestListPositionLevel(query));
                    e.target.value.length === 0 && hasFetch(requestListPositionLevel(query));
                }}
            />
            <ModalSmall
                isOpen={isToogle.update}
                onClose={() => onClose('update')}
                title={<Text className="u-tx-center">Update Position Level</Text>}
                content={<UpdateCategory id={passId} onClose={() => onClose('update')} />}
            />
            <ModalSmall
                isOpen={isToogle.delete}
                onClose={() => onClose('delete')}
                title={<Text className="u-tx-center">Delete Position Level</Text>}
                content={`Are you sure want to delete data '${deleteInfo}' ?`}
                ButtonFooter={
                    <ButtonGroup reponsive>
                        <Button variant="secondary-alt" onClick={() => onClose('delete')}>
                            <Text>Cancel</Text>
                        </Button>
                        <Button style={{ backgroundColor: 'red' }} onClick={handleRemove}>
                            <Text>Delete</Text>
                        </Button>
                    </ButtonGroup>
                }
            />
        </>
    )
}

export default TablePositionLevel;