import React from 'react';
import { Segment, Row, Col, FormControl, Textfield, CheckBox, ButtonGroup, Button, OptionBox } from '@elevenia/master-ui/components/Atom';
import { useInput, useAction } from 'hooks';
import { useSelector } from 'react-redux';
import { validateForm } from 'helper';
import { requestUpdateMenuList } from 'store/actions/menu';

const EditMenu = ({ batch, onClose }) => {
    const { hasFetch } = useAction();
    const isObject = useSelector(state => {
        let transform = [];
        state.menuList.listMenu.forEach(arr => {
            if (arr.isParent) {
                transform = [...transform, {
                    value: arr.id,
                    label: arr.menuName
                }]
            }
        });
        return {
            parent: transform,
            updateBatch: state.menuList.listMenu.filter(val => val.id === batch.id)
        }
    });
    const isKey = Object.keys(isObject.updateBatch[0].authorities);
    const isValue = isObject.updateBatch[0].authorities;
    const authorPrevillage = isKey.filter(item => isValue[item] === true);
    const { value, bindChange, bindChecked, bindSelect, bindCheckedBatch } = useInput({
        initialObjects: {
            authorities: authorPrevillage,
            menuName: isObject.updateBatch[0].menuName,
            isParent: isObject.updateBatch[0].isParent,
            iconName: isObject.updateBatch[0].menuIcon === null ? "" : isObject.updateBatch[0].menuIcon,
            selectParent: isObject.updateBatch[0].menuParentId,
            sortOrder: isObject.updateBatch[0].sortOrder === null ? "" : isObject.updateBatch[0].sortOrder,
            pageUri: isObject.updateBatch[0].pageUri === null ? "" : isObject.updateBatch[0].pageUri
        },
        identity: "formEditMenus"
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        const valid = validateForm(e.target.id, true, false);
        let author = { isCompanyAdmin: false, isUser: false, IsAdmin: false };
        value.authorities.forEach(item => {
            author = {
                ...author,
                [item]: true
            }
        })
        const sendingParams = {
            "authorities": author,
            "id": batch.id,
            "isParent": value.isParent,
            "isUse": true,
            "menuIcon": value.isParent ? value.iconName : '',
            "menuName": value.menuName,
            "menuParentId": value.selectParent,
            "pageUri": value.pageUri,
            "sortOrder": value.sortOrder
        }
        valid && hasFetch(requestUpdateMenuList(sendingParams));
        valid && onClose();
    }
    const isDefaultOptions = isObject.parent.filter(val => val.value === value.selectParent)[0];
    return (
        <Segment>
            <form id="formEditMenus" onSubmit={handleSubmit}>
                <Col wide={4} mb={16}>
                    <FormControl>
                        <CheckBox
                            checkProps={{
                                ...bindChecked,
                                name: "isParent",
                                id: "isParent",
                                checked: value.isParent
                            }}
                            checkItems={[
                                { label: "Choose Parent or Children", value: "agree" }
                            ]}
                        />
                    </FormControl>
                </Col>
                <Segment mb={16}>
                    <FormControl label={`${value.isParent ? "Parent Name" : "Children Name"}`} mb={16}>
                        <Textfield inputProps={{
                            ...bindChange,
                            name: "menuName",
                            autoComplete: "off",
                            placeholder: `${value.isParent ? "Parent Name" : "Children Name"}`,
                            value: value.menuName,
                            className: 'validate[required]',
                        }} />
                    </FormControl>
                    <Row mb={24}>
                        <Col wide={4} pr={8}>
                            <FormControl label="Page Uris">
                                <Textfield
                                    inputProps={{
                                        ...bindChange,
                                        name: "pageUri",
                                        placeholder: "Create Page Uri",
                                        autoComplete: "off",
                                        value: value.pageUri
                                    }}
                                />
                            </FormControl>
                        </Col>
                        <Col wide={4}>
                            {
                                !value.isParent &&
                                <FormControl label="Parent Relation">
                                    <OptionBox
                                        {...bindSelect}
                                        options={isObject.parent}
                                        placeholder="Select Parent"
                                        inputClassName="sample-class-in-input validate[required]"
                                        name="selectParent"
                                        value={isDefaultOptions !== undefined && isDefaultOptions}
                                    />
                                </FormControl>
                            }
                            {
                                value.isParent &&
                                <FormControl label="Icon Name">
                                    <Textfield inputProps={{
                                        ...bindChange,
                                        name: "iconName",
                                        placeholder: "Icon Name",
                                        autoComplete: "off",
                                        value: value.iconName
                                    }} />
                                </FormControl>
                            }
                        </Col>
                        <Col wide={4} pl={8} pt={8}>
                            <FormControl label="Sort">
                                <Textfield inputProps={{
                                    ...bindChange,
                                    name: "sortOrder",
                                    placeholder: "0",
                                    autoComplete: "off",
                                    value: value.sortOrder,
                                    type: "number"
                                }} />
                            </FormControl>
                        </Col>
                        <Col wide={4}>
                            <FormControl label="Authorities" py={6}>
                                <>
                                    <CheckBox
                                        checkProps={{
                                            ...bindCheckedBatch,
                                            name: "authorities",
                                            id: "isAdmin"
                                        }}
                                        checkItems={[
                                            { label: "Is Admin", value: "isAdmin" }
                                        ]}
                                        selected={value.authorities}
                                    />
                                    <CheckBox
                                        checkProps={{
                                            ...bindCheckedBatch,
                                            name: "authorities",
                                            id: "isCompanyAdmin"
                                        }}
                                        checkItems={[
                                            { label: "Is Company Admin", value: "isCompanyAdmin" }
                                        ]}
                                        selected={value.authorities}
                                    />
                                    <CheckBox
                                        checkProps={{
                                            ...bindCheckedBatch,
                                            name: "authorities",
                                            id: "isUser"
                                        }}
                                        checkItems={[
                                            { label: "Is User", value: "isUser" }
                                        ]}
                                        selected={value.authorities}
                                    />
                                </>
                            </FormControl>
                        </Col>
                    </Row>
                </Segment>
                <Segment className='u-tx-right'>
                    <ButtonGroup>
                        <Button type="button" variant={'secondary-alt'} onClick={onClose}>Cancel</Button>
                        <Button variant="primary">Submitted</Button>
                    </ButtonGroup>
                </Segment>
            </form>
        </Segment>
    )
}
export default EditMenu;