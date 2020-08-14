import React, { useState, useCallback } from "react";
import { Text, Textfield, Icon, OptionBox, Spinner, ButtonLink, ButtonGroup, Button } from "@elevenia/master-ui/components/Atom";
import Table from "@elevenia/master-ui/components/Atom/Table";
import Segment from "@elevenia/master-ui/components/Atom/Segment";
import { Pagination } from "@elevenia/master-ui/components/Molecules";

const DataTable = ({
    defaultSortActive = "",
    defaultSize = 5,
    tableConsume = [],
    dataConsume = [],
    isLoading = false,
    createShowPerSize,
    callSorted,
    createSearchAbles,
    createPaginations,
    createCustomEdit,
    createCustomDelete,
    totalPages = 0,
    showSize = true,
    showPagination = true,
    showSearch = true,
    showCustomFilter = false,
    customFilter
}) => {
    const hasOptions = [
        { value: 5, label: "5", color: "#253858" },
        { value: 10, label: "10", color: "#666666" },
        { value: 20, label: "20", color: "#253858" },
        { value: 50, label: "50", color: "#253858" },
        { value: 100, label: "100", color: "#666666" }
    ];
    const isOrder = defaultSortActive.split(',')[1] === 'asc' ? true : false;
    const [isSort, setSort] = useState({
        [defaultSortActive.split(',')[0]]: isOrder,
        color: '#115488',
    });
    const [initPage, setInitpage] = useState(1);
    const handleSorted = useCallback((value, color) => {
        setSort(prev => {
            return {
                [value]: !isSort[value],
                color
            }
        });
        callSorted(value, isSort[value] ? "desc" : 'asc');
    }, [isSort, callSorted])
    const handleEdit = (id) => {
        createCustomEdit(id);
    }
    const handleDelete = (id, item) => {
        createCustomDelete(id, item);
    }
    const isSearch = (e) => {
        createSearchAbles(e);
        setInitpage(1);
    }
    return (
        <>
            {showSize || (showCustomFilter || customFilter) || showSearch === true ? <Segment boxShadow borderRadius={4} justifyContent={'space-between'} alignItems={'center'} bg={'white'} p={16} mb={24}>
                <Segment justifyContent={'flex-start'}>
                    {
                        showSize && <Segment width="95px" mr={8}>
                            <OptionBox
                                onChange={createShowPerSize}
                                inputClassName={"sample-class-in-input"}
                                options={hasOptions}
                                placeholder="show"
                                value={hasOptions.filter(isSize => isSize.value === defaultSize)}
                            />
                        </Segment>
                    }
                    {
                        showCustomFilter && customFilter
                    }
                </Segment>
                {
                    showSearch && <Segment>
                        <Textfield
                            inputProps={{
                                onChange: isSearch,
                                placeholder: "Search..."
                            }}
                            right={<Icon name={"search"} size={24} fillColor="black50" />}
                        />
                    </Segment>
                }
            </Segment> : null }

            <Table responsive boxShadow round>
                <thead>
                    <tr>
                        <th>#</th>
                        {
                            tableConsume.map((item, index) => {
                                return (
                                    <th key={index}>
                                        {
                                            item.isEdit || item.isDelete ?
                                                <Text className="u-tx-center">{item.field}</Text> :
                                                <Segment alignItems={'center'}>
                                                    {
                                                        item.sortField ?
                                                            <ButtonLink onClick={() => handleSorted(item.sortField, '#115488')}>
                                                                <Text H12 mr={8} color={isSort[item.sortField] !== undefined ? isSort.color : "#70727d"} style={{fontWeight: 700}}>{item.field}</Text>
                                                                <Icon size={16} fillColor={isSort[item.sortField] !== undefined ? isSort.color : "#70727d"} name={
                                                                    isSort[item.sortField] ? "chevron-up" : "chevron-down"
                                                                } />
                                                            </ButtonLink>
                                                            :
                                                            <Text mr={8} color={isSort[item.sortField] !== undefined ? isSort.color : "#70727d"}>{item.field}</Text>
                                                    }
                                                </Segment>
                                        }
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        isLoading ?
                            <tr>
                                <td colSpan={tableConsume.length + 1}>
                                    <Segment className="u-tx-center" width="100%" height={30}>
                                        <Spinner />
                                    </Segment>
                                </td>
                            </tr>
                            :
                            dataConsume.length === 0 ?
                                <tr>
                                    <td colSpan={tableConsume.length + 1}>
                                        <Segment className="u-tx-center" width="100%" height={30}>
                                            Data Not Found
                                        </Segment>
                                    </td>
                                </tr> :
                                dataConsume.map((item, index) => {
                                    const x = initPage
                                    return (
                                        <tr key={index}>
                                            <td>{((x - 1) * defaultSize) + index + 1}</td>
                                            {
                                                tableConsume.map((child, indexChild) => {
                                                    return (
                                                        <td key={indexChild}>
                                                            {
                                                                child.isEdit || child.isDelete ?
                                                                    <Segment className="u-tx-center">
                                                                        <ButtonGroup>
                                                                            {
                                                                                child.isEdit &&
                                                                                <Button onClick={() => handleEdit(item[child.entityFilters], item)} size="small" variant="primary" style={{ minWidth: 'auto' }}>
                                                                                    <Icon name={'edit'} size={16} fillColor={'white'} />
                                                                                </Button>
                                                                            }
                                                                            {
                                                                                child.isDelete &&
                                                                                <Button onClick={() => handleDelete(item[child.entityFilters], item)} size="small" style={{ backgroundColor: "#ED1651", minWidth: 'auto' }}>
                                                                                    <Icon name={'delete'} size={16} fillColor={'white'} />
                                                                                </Button>
                                                                            }
                                                                        </ButtonGroup>
                                                                    </Segment>
                                                                    :
                                                                    child.isCustomRow ? child.isCustomRow(item[child.entityFilters], item) : item[child.rowField]
                                                            }
                                                        </td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                })
                    }
                </tbody>
            </Table>
            {
                showPagination &&
                <Segment mt={32} justifyContent={'flex-end'}>
                    <Pagination
                        className="u-mb-20"
                        innerRange={2}
                        outerRange={1}
                        total={totalPages}
                        initialPage={initPage}
                        onChange={page => {
                            setInitpage(page);
                            createPaginations(page - 1);
                        }}
                    />
                </Segment>
            }
        </>
    )
}

export default DataTable