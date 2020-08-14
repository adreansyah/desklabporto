import React, { Fragment } from 'react';
import {
    Button,
    Segment,
    Text
} from '@elevenia/master-ui/components/Atom';
import logo from 'assets/image/desklab.png';
import imgNoConnection from 'assets/image/no-connection.png'
import imgMaintenace from 'assets/image/maintenance.png'
import img404 from 'assets/image/404.png'
import img403 from 'assets/image/403.png'
import img401 from 'assets/image/401.png'
import img400 from 'assets/image/400.png'

const customError = ({ props, status = 'DEFAULT' }) => {
    document.title = 'Page Not Found'
    const statusType = (statusError) => {
        switch (statusError) {
            case 'no_connection':
                return {
                    img: imgNoConnection,
                    title: 'Koneksi Bermasalah ?',
                    desc: 'Pastikan ponsel terhubung dengan koneksi internet untuk melanjutkan aktivitas',
                    action: 'MUAT ULANG'
                }
            case 'maintenance':
                return {
                    img: imgMaintenace,
                    title: 'Aplikasi Dalam Pemeliharaan',
                    desc: 'Aplikasi ini sedang dalam pemeliharaan, mohon kembali lagi nanti untuk melanjutkan aktivitas Anda',
                    action: 'COBA LAGI'
                }
            case '404':
                return {
                    img: img404,
                    title: '404 - Page Not Found',
                    desc: 'Halaman yang Anda tuju tidak ditemukan. Silahkan kembali untuk melanjutkan aktivitas Anda',
                    action: 'KEMBALI'
                }
            case '403':
                return {
                    img: img403,
                    title: '403 - Forbidden',
                    desc: 'Halaman yang Anda tuju tidak dapat diakses. Silahkan kembali untuk melanjutkan aktivitas Anda',
                    action: 'KEMBALI'
                }
            case '401':
                return {
                    img: img401,
                    title: '401 - Unauthenticated',
                    desc: 'Halaman yang Anda tuju tidak dapat diakses. Silahkan kembali untuk melanjutkan aktivitas Anda',
                    action: 'KEMBALI'
                }
            case '400':
                return {
                    img: img400,
                    title: '400 - The server could not understand the request',
                    desc: 'Halaman yang Anda tujut tidak dapat diakses. Silahkan kembali untuk melanjutkan aktivitas Anda',
                    action: 'KEMBALI'
                }
            default:
                return {
                    img: imgNoConnection,
                    title: 'Koneksi Bermasalah ?',
                    desc: 'Pastikan ponsel terhubung dengan koneksi internet untuk melanjutkan aktivitas',
                    action: 'MUAT ULANG'
                }
        }
    }
    const errorStatus = statusType(status)

    return (
        <Fragment>
            <Segment className={'error-information'}>
                <img src={logo} style={{ width: 196 }} alt="title" />
                <Segment>
                    <img src={errorStatus.img} style={{ width: 147 }} alt="title" />
                    <Text B14 fontWeight='500' pt={24}>{errorStatus.title}</Text>
                    <Text pt={16} color={'black50'}>{errorStatus.desc}</Text>
                </Segment>
                <Segment>
                    <Button type='button' variant='primary' onClick={() => props.goBack()}>{errorStatus.action}</Button>
                </Segment>
            </Segment>
        </Fragment>
    )
}

export default customError