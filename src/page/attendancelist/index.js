import React from 'react';
import { Segment, Text } from '@elevenia/master-ui/components/Atom';

const AttendanceList = (props) => {
    document.title = props.title
    return (
        <Segment>
            <Segment justifyContent={'space-between'} alignItems={'center'} mb={20}>
                <Text H28>{document.title}</Text>
            </Segment>
        </Segment>
    )
}

export default AttendanceList;