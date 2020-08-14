import React, { useState, useEffect } from 'react';
import { useAction, useMultiToogle } from 'hooks';
import { useSelector } from 'react-redux';
import { ButtonGroup, Button, Text } from '@elevenia/master-ui/components/Atom';
import { requestDeleteCategory, requestListCategory } from 'store/actions/category';
import UpdateCategory from './UpdateCategory';
import ModalSmall from 'component/ModalCustom/modalSmall';
import DataTable from 'component/DataTable';
const TableCompany = () => {
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
        eventCategory: "",
        sort: ""
    });
    const payload = useSelector(state => {
        return {
            data: state.category.data,
            isLoading: state.category.isLoading,
            totalPages: state.category.totalPages,
            parameter: state.category.parameter
        }
    });
    const handleRemove = () => {
        hasFetch(requestDeleteCategory(passId))
        onClose('delete');
    }
    useEffect(() => {
        hasFetch(requestListCategory(isTable));
    }, [hasFetch, isTable]);
    return (
        <>
            <DataTable
                defaultSize={isTable.size}
                tableConsume={[{
                    field: 'Category Name',
                    rowField: 'categoryName'
                }, {
                    field: 'Action',
                    isEdit: true,
                    isDelete: true,
                    entityFilters: "id"
                }]}
                totalPages={payload.totalPages}
                dataConsume={payload.data}
                isLoading={payload.isLoading}
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
                    const { onClick } = toogler;
                    onClick(isEvent);
                    setPassId(entity);
                }}
                createCustomDelete={(entity, item) => {
                    const isEvent = { target: { id: 'delete' } }
                    const { onClick } = toogler;
                    onClick(isEvent);
                    setPassId(entity);
                    setDeleteInfo(item.categoryName);
                }}
                createSearchAbles={(e) => {
                    const query = {
                        ...payload.parameter,
                        size: isTable.size,
                        eventCategory: e.target.value,
                    }
                    e.target.value.length > 3 && hasFetch(requestListCategory(query));
                    e.target.value.length === 0 && hasFetch(requestListCategory(query));
                }}
            />
            <ModalSmall
                isOpen={isToogle.update}
                onClose={() => onClose('update')}
                title={<Text className="u-tx-center">Update Category</Text>}
                content={<UpdateCategory id={passId} onClose={() => onClose('update')} />}
            />
            <ModalSmall
                isOpen={isToogle.delete}
                onClose={() => onClose('delete')}
                title={<Text className="u-tx-center">Delete Category</Text>}
                content={`Are you sure want to delete data '${deleteInfo}' ?`}
                ButtonFooter={
                    <ButtonGroup>
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

export default TableCompany;