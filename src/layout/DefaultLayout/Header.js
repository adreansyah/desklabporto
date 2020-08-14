import React from 'react'
import {
    Icon,
    ButtonLink,
    Popover,
    Segment,
    Text
} from '@elevenia/master-ui/components/Atom'
import Box from '@elevenia/master-ui/components/Atom/Box'
import { logout } from 'helper'

const HeaderBlock = ({ click, userInfo }) => {
    return (
        <React.Fragment>
            <Segment bg={'white'} display={'flex'} justifyContent="space-between" alignItems="center" borderBottom="1px solid black30">
                <Segment px={16} onClick={click} style={{ cursor: 'pointer' }}>
                    <Icon name={'burgermenu'} size={'large'} fillColor={'black50'} />
                </Segment>
                <Segment p={16} borderLeft="1px solid black30" className={'m-hide'}>
                    <Popover popoverPosition="bottom-right">
                        <Popover.Trigger>
                            <ButtonLink>
                                <Text>Hi, {userInfo?.firstName} {userInfo?.lastName}</Text>
                                <Icon name="chevron-down" size="20px" mb={2} ml={8} fillColor={'black50'} />
                            </ButtonLink>
                        </Popover.Trigger>
                        <Popover.Content>
                            <Box style={{ minWidth: "200px", padding: 8, marginTop: 8, background: "white" }}>
                                <Segment flexDirection="column" style={{ textAlign: 'right', width: "100%" }}>
                                    <Segment borderBottomWidth={1} borderStyle={'solid'} borderColor={'#DCDEE3'} p={8}>
                                        <Text P12>Company :</Text>
                                        <Text>{userInfo?.companyName}</Text>
                                    </Segment>
                                    <Segment borderBottomWidth={1} borderStyle={'solid'} borderColor={'#DCDEE3'} p={8}>
                                        <Text P12>Email :</Text>
                                        <Text>{userInfo?.email}</Text>
                                    </Segment>
                                    <Segment p={8}>
                                        <ButtonLink style={{ width: "100%" }} type="button" onClick={() => logout()}>
                                            Logout
                                        </ButtonLink>
                                    </Segment>
                                </Segment>
                            </Box>
                        </Popover.Content>
                    </Popover>
                </Segment>
            </Segment>
        </React.Fragment>
    )
}

export default HeaderBlock