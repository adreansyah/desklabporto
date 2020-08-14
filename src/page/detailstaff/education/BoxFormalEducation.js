import React from 'react';
import {
  Icon,
  Segment,
  Button,
  ButtonGroup,
  Table
} from '@elevenia/master-ui/components/Atom';
import moment from 'moment';

const BoxEducationEducation = ({ data, onEdit, onDelete }) => {
  return (
    <>      
      <Segment boxShadow borderRadius={4} p={16} mb={32}>
        <Segment justifyContent={'space-between'} m={'0 -10px'}>
          <Segment m={'auto 10px 32px'} flexGrow={1}>
            <Table responsive>
              <tbody>
                <tr>
                  <th width="20%">University</th>
                  <td width="1%">:</td>
                  <td>{data.institutionName ? data.institutionName : '-'}</td>
                </tr>
                <tr>
                  <th>Major</th>
                  <td>:</td>
                  <td>{data.major ? data.major : '-'}</td>
                </tr>
                <tr>
                  <th>Degree</th>
                  <td>:</td>
                  <td>{data.gradeName ? data.gradeName : '-'}</td>

                </tr>
              </tbody>
            </Table>
          </Segment>
          <Segment m={'auto 10px 32px'} flexGrow={1}>
            <Table responsive round>
              <tbody>
                <tr>
                  <th>Grade</th>
                  <td>:</td>
                  <td>{data.score ? data.score : '-'}</td>

                </tr>
                <tr>
                  <th>Start Date</th>
                  <td>:</td>
                  <td>{data.startDate ? moment(data.startDate, "DD-MM-YYYY HH:mm:ssZ").format('DD MMMM YYYY') : '-'}</td>
                </tr>
                <tr>
                  <th>End Date</th>
                  <td>:</td>
                  <td>{data.endDate ? moment(data.endDate, "DD-MM-YYYY HH:mm:ssZ").format('DD MMMM YYYY') : '-'}</td>
                </tr>
              </tbody>
            </Table>
          </Segment>
        </Segment>
        <Segment justifyContent={'flex-end'}>
          <ButtonGroup>
            <Button size={'small'} onClick={() => onDelete(data)} style={{ backgroundColor: '#EE2B2E', minWidth: 'auto' }} type="button">     
              <Icon name="delete" size="small" fillColor="white" />
            </Button>
            <Button size={'small'} variant="primary" style={{ minWidth: 'auto' }} type="button" onClick={() => onEdit(data)}>
              <Icon name="edit" size="small" fillColor="white" />
            </Button>
          </ButtonGroup>
        </Segment>
      </Segment>
    </>
  )
}

export default BoxEducationEducation;