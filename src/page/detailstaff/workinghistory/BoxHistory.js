import React from 'react';
import { 
  Segment, 
  Button, 
  ButtonGroup, 
  Table } from '@elevenia/master-ui/components/Atom';
import moment from 'moment';

const BoxHistory = ({data,onEdit,onDelete}) => {
  return (
    <>  
      <Segment boxShadow borderRadius={4} p={16}>
        <Table responsive round>
            <tbody>
                <tr>
                    <td width="20%">Company Name</td>
                    <td width="1%">:</td>
                    <td>{data.companyName ? data.companyName : '-'}</td>

                </tr>
                <tr>
                    <td>Position</td>
                    <td>:</td>
                    <td>{data.position ? data.position : '-'}</td>

                </tr>
                <tr>
                    <td>Start Date</td>
                    <td>:</td>
                    <td>{data.startDate ? moment(data.startDate,"DD-MM-YYYY HH:mm:ssZ").format('DD MMMM YYYY') : '-'}</td>
                </tr>
                <tr>
                    <td>End Date</td>
                    <td>:</td>
                    <td>{data.endDate ? moment(data.endDate,"DD-MM-YYYY HH:mm:ssZ").format('DD MMMM YYYY') : '-'}</td>
                </tr>
                <tr>
                    <td colSpan="3"></td>
                </tr>
            </tbody>
        </Table>
        <Segment justifyContent={'flex-end'}>
          <ButtonGroup>
            <Button onClick={() =>onDelete(data)} style={{backgroundColor:'#EE2B2E'}} type="button">
                Delete
            </Button>
            <Button variant="primary" type="button" onClick={() => onEdit(data)}>
                Update
            </Button>
          </ButtonGroup>    
        </Segment>
      </Segment>
    </>
  )
}

export default BoxHistory;