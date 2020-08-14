import React from 'react'
import { Segment, Text, Button, Icon } from '@elevenia/master-ui/components/Atom'
import { useAlertToast, useMultiToogle } from 'hooks';
import TableLeaveSetting from './TableLeaveSetting';
import ModalXlarge from 'component/ModalCustom/modalXlarge';
import CreateLeaveSetting from './CreateLeaveSetting';

const LeaveSetting = (props) => {
    document.title = props.title;
    const { toogler, isToogle, onClose } = useMultiToogle({
        create: false
    })
    const { ToastComponent } = useAlertToast({
        timeout: 3000,
        placement: 'right',
        space: 10,
        animate: 'slide',
        m: 20,
    });
    return (
        <Segment>
            {ToastComponent}
            <Segment justifyContent={'space-between'} alignItems={'center'} mb={32}>
                <Text H28>{document.title}</Text>
                <Button size="medium" id="create" {...toogler} >
                    <Icon fillColor="white" size={16} name="plus" mr={4} />
                    Create
                </Button>
            </Segment>
            <TableLeaveSetting />
            <ModalXlarge
                isOpen={isToogle.create}
                onClose={() => onClose('create')}
                title={<Text className="u-tx-center">Create Leave Setting</Text>}
                content={<CreateLeaveSetting  {...props} onClose={() => onClose('create')} />}
            />
            <Segment p={16} my={16} border="1px solid #115488" bg="#94C9EB" borderRadius={4}>
                <Text H16 mb={12}>Annual Leave :</Text>
                <ul className={'list'}>
                    <li>Jatah cuti akan dapat setiap tanggal 25 dibulan berjalan.</li>
                    <li>Jika join date sebelum tanggal 15 maka berhak mendapatkan jatah 1 hari di tanggal 25 bulan tersebut.</li>
                    <li>Contoh : join date 12 maret 2020 maka ditanggal 25 maret karyawan tersebut berhak mendapatkan 1 cuti.</li>
                    <li>Jika join date sesudah tanggal 15 atau bertepatan pada tanggal 15 maka hanya berhak medapatkan cuti 0.5 hari di tanggal 25 bulan tersebut.</li>
                    <li>Contoh : join date 16 maret 2020 maka ditanggal 25 maret karyawan tersebut berhak mendapatkan 0.5 cuti.</li>
                </ul>
            </Segment>
        </Segment>
    )
}
export default LeaveSetting