import React, { Fragment } from 'react'
import { Segment, Text } from '@elevenia/master-ui/components/Atom'

const Layout = props => {
    document.title = props.title
    return (
        <Fragment>
            <Segment justifyContent={'space-between'} alignItems={'center'} mb={20}>
                <Text H28>{document.title}</Text>
            </Segment>
            <Segment boxShadow bg='white' p={0} borderRadius={4} style={{ minHeight: '100vh', position: 'relative' }}>
                <iframe src={process.env.REACT_APP_GRAFANA_URL}
                    title="Grafana Dashboard" width="100%" style={{ position: 'absolute', height: '100%', border: 'none' }} frameBorder="0" />
            </Segment>
        </Fragment>
    )
}

export default Layout