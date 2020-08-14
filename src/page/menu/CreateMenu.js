import React from 'react';
import { Segment, Text, Row, Col, FormControl, Textfield, CheckBox, ButtonGroup, Button, OptionBox } from '@elevenia/master-ui/components/Atom';
import { useInput, useAction } from 'hooks';
import { useSelector } from 'react-redux';
import { validateForm } from 'helper';
import { requestCreateMenuList } from 'store/actions/menu';
import { capitalize } from 'helper/Generics';

const CreateMenu = () => {
    const { hasFetch } = useAction();
    const isObject = useSelector(state => {
        let transform = [];
        state.menuList.listMenu.forEach(arr => {
            transform = [...transform, {
                value: arr.id,
                label: capitalize(arr.menuName)
            }]
        });
        return {
            parent: transform
        }
    });
    const { value, bindChange, bindChecked, bindSelect, bindCheckedBatch } = useInput({
        initialObjects: {
            authorities: [],
            menuName: "",
            isParent: true,
            iconName: "",
            selectParent: "",
            sortOrder: '',
            pageUri: ""
        },
        identity: "formMenus"
    })
    const handleSUbmit = (e) => {
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
            "isParent": value.isParent,
            "isUse": true,
            "menuIcon": value.isParent ? value.iconName : '',
            "menuName": value.menuName,
            "menuParentId": value.selectParent,
            "pageUri": value.pageUri,
            "sortOrder": value.sortOrder
        }
        valid && hasFetch(requestCreateMenuList(sendingParams));
    }
    return (
        <Segment boxShadow bg="white" pb={16}>
            <Segment borderBottom="1px solid #dcdee3ad">
                <Segment px={16}>
                    <Text H16 py={16}>Add Menu</Text>
                </Segment>
            </Segment>
            <form id="formMenus" onSubmit={handleSUbmit}>
                <Col wide={4} mx={16}>
                    <FormControl my={16}>
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
                <Segment px={16} pt={8}>
                    <FormControl label={`${value.isParent ? "Parent Name" : "Child Name"}`} py={6}>
                        <Textfield inputProps={{
                            ...bindChange,
                            name: "menuName",
                            autoComplete: "off",
                            placeholder: `${value.isParent ? "Parent Name" : "Child Name"}`,
                            className: 'validate[required]',
                        }} />
                    </FormControl>
                    <Row>
                        <Col wide={4} pr={8}>
                            <FormControl label="Page Uri" py={6}>
                                <Textfield
                                    inputProps={{
                                        ...bindChange,
                                        name: "pageUri",
                                        placeholder: "Create Page Uri",
                                        autoComplete: "off",
                                    }}
                                />
                            </FormControl>
                        </Col>
                        <Col wide={4}>
                            {
                                !value.isParent &&
                                <FormControl label="Parent Relation" py={6}>
                                    <OptionBox
                                        {...bindSelect}
                                        options={isObject.parent}
                                        placeholder="Select Parent"
                                        inputClassName="sample-class-in-input validate[required]"
                                        name="selectParent"
                                    />
                                </FormControl>
                            }
                            {
                                value.isParent &&
                                <FormControl label="Icon Name" py={6}>
                                    <Textfield inputProps={{
                                        ...bindChange,
                                        name: "iconName",
                                        placeholder: "Icon Name",
                                        autoComplete: "off"
                                    }} />
                                </FormControl>
                            }
                        </Col>
                        <Col wide={4} pl={8}>
                            <FormControl label="Sort" py={6}>
                                <Textfield inputProps={{
                                    ...bindChange,
                                    name: "sortOrder",
                                    placeholder: "0",
                                    autoComplete: "off"
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
                                            { label: "Is Admin", value: "IsAdmin" }
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
                <Segment borderTop="1px solid #dcdee3ad" my={16}>
                    <Segment px={16} mt={16} >
                        <ButtonGroup>
                            <Button variant="primary">Submitted</Button>
                        </ButtonGroup>
                    </Segment>
                </Segment>
            </form>
        </Segment>
    )
}
export default CreateMenu;