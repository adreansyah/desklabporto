import React, { Fragment, useState } from 'react';
import { Table, Button, ButtonGroup, Segment, Text, Icon } from '@elevenia/master-ui/components/Atom';
import { capitalize } from 'helper/Generics';
import ModalLarge from 'component/ModalCustom/modalLarge';
import { useMultiToogle, useAction } from 'hooks';
import EditMenu from './EditMenu';
import ModalSmall from 'component/ModalCustom/modalSmall';
import { requestDeleteMenuList } from 'store/actions/menu';
import { useSelector } from 'react-redux';

const TableMenu = () => {
    const { hasFetch } = useAction();
    const [batch, getBatch] = useState("");
    const { toogler, isToogle, onClose } = useMultiToogle({
        update: false,
        delete: false
    })
    const isUpdate = ({ id }) => {
        const evt = { target: { id: 'update' } }
        toogler.onClick(evt);
        getBatch({ id });
    }
    const isDelete = ({ id }) => {
        const evt = { target: { id: 'delete' } }
        toogler.onClick(evt);
        getBatch({ id });
    }
    const pushDelete = () => {
        hasFetch(requestDeleteMenuList(batch.id))
        onClose('delete')
    }
    const isMenu = useSelector(state => state.menuList.isMenu)
    const data = isMenu.filter(val => val.id !== null);
    return (
        <Segment mb={16}>
            <Table responsive boxShadow>
                <thead>
                    <tr>
                        <th>Parent</th>
                        <th>Children</th>
                        <th>Role Authorities</th>
                        <th width="100"><Text className='u-tx-center'>Action</Text></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) => {
                            const isKey = Object.keys(item.authorities);
                            const isValue = item.authorities;
                            const authorPrevillage = isKey.filter(item => isValue[item] === true);
                            return (
                                <Fragment key={index}>
                                    <tr>
                                        <td>{capitalize(item.label)}</td>
                                        <td></td>
                                        <td>{authorPrevillage.join(' - ').toUpperCase()}</td>
                                        <td className="u-tx-center">
                                            <ButtonGroup>
                                                <Button id='update' onClick={() => isUpdate({ id: item.id })} size="small" variant="primary" style={{ minWidth: 'auto' }}>
                                                    <Icon name={'edit'} size={'small'} />
                                                </Button>
                                                <Button id="delete" onClick={() => isDelete({ id: item.id })} size="small" style={{ background: "red", color: "white", minWidth: 'auto' }}>
                                                    <Icon name={'delete'} size={'small'} />
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                    {
                                        item.children.map((child, index) => {
                                            const isKey = Object.keys(child.authorities);
                                            const isValue = child.authorities;
                                            const authorPrevillage = isKey.filter(child => isValue[child] === true);
                                            return (
                                                <tr key={index}>
                                                    <td></td>
                                                    <td colSpan={1}>{capitalize(child.label)}</td>
                                                    <td>{authorPrevillage.join(' - ').toUpperCase()}</td>
                                                    <td className="u-tx-right">
                                                        <ButtonGroup>
                                                            <Button id='update' onClick={() => isUpdate({ id: child.menuId })} size="small" variant="primary" style={{ minWidth: 'auto' }}>
                                                                <Icon name={'edit'} size={'small'} />
                                                            </Button>
                                                            <Button id="delete" onClick={() => isDelete({ id: child.menuId })} size="small" style={{ background: "red", color: "white", minWidth: 'auto' }}>
                                                                <Icon name={'delete'} size={'small'} />
                                                            </Button>
                                                        </ButtonGroup>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </Fragment>
                            )
                        })
                    }
                </tbody>
            </Table>
            <ModalSmall
                isOpen={isToogle.delete}
                onClose={() => onClose('delete')}
                title={<Text className="u-tx-center">Delete Menu</Text>}
                content={"Are you sure want to delete this data ?"}
                ButtonFooter={
                    <ButtonGroup>
                        <Button onClick={() => onClose('delete')} variant={'secondary-alt'}>
                            <Text>cancel</Text>
                        </Button>
                        <Button onClick={pushDelete} variant="primary">
                            <Text>Save</Text>
                        </Button>
                    </ButtonGroup>
                }
            />
            <ModalLarge
                isOpen={isToogle.update}
                onClose={() => onClose('update')}
                title={<Text className="u-tx-center">Update Menu</Text>}
                content={<EditMenu batch={batch} onClose={() => onClose('update')} />}
            />
        </Segment>
    )
}
export default TableMenu;