import React from 'react';
import { Text, Textarea } from '@elevenia/master-ui/components/Atom';
import Segment from '@elevenia/master-ui/components/Atom/Segment';

export default ({status , employeeName, notes, handleNotes}) =>{
  return (
    <Segment>
      <form id="formAction">
      <Text>
      {`Are you sure want to ${status} the Leave Request for ${employeeName} ? `}
      </Text>
      {
        status==='Reject' && <Textarea 
                                  inputProps={{
                                    name:"notes" ,
                                    value:notes, 
                                    onChange:(e)=>handleNotes(e),
                                    className:"validate[required,minLength[3]]"
                                }}
                              />
      }
      </form>
    </Segment>
  )
}