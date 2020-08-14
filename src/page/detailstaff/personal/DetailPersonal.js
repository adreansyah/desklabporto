import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from '@elevenia/master-ui/components/Atom';
import { capitalize } from 'helper/Generics';
import moment from 'moment';
import { syscode } from './listOfselects';

const DetailPersonal = () => {
    const payload = useSelector(state => {
        return {
            data: state.personalInformation.data,
            personalData: state.personalInformation.personalData,
            isLoading: state.personalInformation.isLoading
        }
    });
    const date = payload.data.birthDate && moment(payload.data.birthDate, 'DD/MM/YYYY').format('DD/MM/YYYY');
    return (
        <>
            <Table responsive round>
                <tbody>
                    <tr>
                        <th>First Name</th>
                        <td>:</td>
                        <td>{capitalize(payload.personalData[0].firstName || "-")}</td>
                    </tr>
                    <tr>
                        <th>Last Name</th>
                        <td>:</td>
                        <td>{capitalize(payload.personalData[0].lastName || "-")}</td>
                    </tr>
                    <tr>
                        <th>NIK</th>
                        <td>:</td>
                        <td>{payload.personalData[0].nik || "-"}</td>
                    </tr>
                    <tr>
                        <th>Birth Place & Date</th>
                        <td>:</td>
                        <td>{payload.data.birthPlace}, {date}</td>
                    </tr>
                    <tr>
                        <th>Blood Type</th>
                        <td>:</td>
                        <td>{syscode.bloodType[payload.data.bloodType] || "-"}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>:</td>
                        <td>{payload.personalData[0].email || "-"}</td>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <td>:</td>
                        <td>{payload.data.address || "-"}</td>
                    </tr>
                    <tr>
                        <th>Tlp/Hp</th>
                        <td>:</td>
                        <td>{payload.data.phone || "-"}</td>
                    </tr>
                    <tr>
                        <th>Religion</th>
                        <td>:</td>
                        <td>{syscode.religion[payload.data.religion] || "-"}</td>
                    </tr>
                    <tr>
                        <th>Marital Status</th>
                        <td>:</td>
                        <td>{syscode.maritalStatus[payload.data.maritalStatus] || "-"}</td>
                    </tr>
                    <tr>
                        <th>Gender</th>
                        <td>:</td>
                        <td>{syscode.gender[payload.data.gender] || "-"}</td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default DetailPersonal;