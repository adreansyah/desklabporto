import React from 'react'
import { Segment, Text } from '@elevenia/master-ui/components/Atom'

const Footer = () => {
   return (
      <Segment className="u-bd-top u-bd-light u-tx-center" position={'relative'} p={20}>
         <Text>2020 Desklab Back Office. All Right Reserved.</Text>
         <Segment position={'absolute'} top={`-25px`} left={8}><small>v{process.env.REACT_APP_VERSION} - {process.env.REACT_APP_ENVIRONMENT}</small></Segment>
      </Segment>
   )
}

export default Footer