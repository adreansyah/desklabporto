import React, { useState, useEffect } from 'react';
import { useAction, useMultiToogle } from 'hooks';
import { useSelector } from 'react-redux';
import { ButtonGroup, Button, Text } from '@elevenia/master-ui/components/Atom';
import ModalSmall from 'component/ModalCustom/modalSmall';
import DataTable from 'component/DataTable';
import { requestListVenue, requestDeleteVenue } from 'store/actions/venue';
import UpdateVenue from './UpdateVenue';
const TableVenue = () => {
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
        locationName: "",
        sort: "CreatedDate,asc",
    });
    const payload = useSelector(state => {
        return {
            data: state.venue.data,
            isLoading: state.venue.isLoading,
            totalPages: state.venue.totalPages,
            parameter: state.venue.parameter
        }
    });
    const handleRemove = () => {
        hasFetch(requestDeleteVenue(passId))
        onClose('delete');
    }
    useEffect(() => {
        hasFetch(requestListVenue(isTable));
    }, [hasFetch, isTable]);
    return (
        <>
            <DataTable
                defaultSize={isTable.size}
                tableConsume={[{
                    field: 'Venue',
                    rowField: 'trainingLocationName'
                }, {
                    field: 'Address',
                    rowField: 'address'
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
                createSearchAbles={(e) => {
                    const query = {
                        ...payload.parameter,
                        size: isTable.size,
                        locationName: e.target.value,
                    }
                    e.target.value.length > 3 && hasFetch(requestListVenue(query));
                    e.target.value.length === 0 && hasFetch(requestListVenue(query));
                }}
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
                    setDeleteInfo(item.trainingLocationName);
                }}
            />
            <ModalSmall
                isOpen={isToogle.update}
                onClose={() => onClose('update')}
                title={<Text className="u-tx-center">Update Venue</Text>}
                content={<UpdateVenue id={passId} onClose={() => onClose('update')} />}
            />
            <ModalSmall
                isOpen={isToogle.delete}
                onClose={() => onClose('delete')}
                title={<Text className="u-tx-center">Delete Venue</Text>}
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

export default TableVenue;