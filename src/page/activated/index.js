import React, { useState, useEffect } from "react";

/** assets */
import Logo from "../../../src/assets/image/desklab.png";
import {
    Segment,
    Text,
    Button,
    Icon,
    ButtonLink,
    FormControl,
    Textfield,
    Spinner
} from "@elevenia/master-ui/components/Atom";
import { useInput, useAction, useAlertBlock } from 'hooks';
import { useSelector } from 'react-redux';
import { requestCheckKeyActivation, requestSubmitActivation } from 'store/actions/activation';
import Info from './component/Info'
import { validateForm } from 'helper';

const Activate = (props) => {
    document.title = props.title
    const [open, setOpen] = useState({
        password: false,
        confirm: false
    });
    const [hashKey] = useState(props.match.params.hashKey)

    const { hasFetch } = useAction();
    const { AlertBlockComponent } = useAlertBlock({ TimeOut: 3000 })
    const { bindChange, value } = useInput({
        initialObjects: {
            password: ''
        },
        identity: "activateForm"
    })
    useEffect(() => {
        hasFetch(requestCheckKeyActivation(hashKey))
    }, [hasFetch, hashKey])
    const payload = useSelector(state => {
        return {
            status: state.activation.data?.status,
            name: state.activation.data?.name,
            isLoading: state.activation.isLoading,
            isLoadingSubmit: state.activation.isLoadingSubmit,
            statusActivation: state.activation.statusActivation,
        }
    })

    const handleSetVisibelPass = name => {
        setOpen({
            ...open,
            [name]: !open[name]
        })
    }

    const handleActivation = () => {
        const dataActivation = {
            password: value.password,
            key: hashKey
        }

        const valid = validateForm('activateForm');
        valid && hasFetch(requestSubmitActivation(dataActivation));
    }

    if (payload.status === false) {
        return (
            <Info status={false} />
        )
    }
    if (payload.statusActivation === true) {
        return (
            <Info status={true} />
        )
    }
    return (
        <>
            {
                payload.isLoading && <Segment className="u-tx-center" width="100%" height={30}>
                    <Spinner />
                </Segment>
            }
            {
                payload.status &&
                <Segment className="wrapper-center">
                    <Segment>
                        <img width={190} src={Logo} alt={"DeskLab Logo"} />
                        <Segment boxShadow width={"550px"} px={25} py={22} mt={24} style={{ textAlign: "center" }}>
                            <Segment borderBottom={"1px solid #EFF3F6"} pb={23}>
                                <Text fontWeight={500} textAlign={"center"} style={{ fontSize: "22px" }}>
                                    Aktivasi Akun
                                </Text>
                            </Segment>

                            <Segment py={24} borderBottom={"1px solid #EFF3F6"}>
                                <div style={{ lineHeight: "35px", fontSize: "16px" }}>
                                    Selamat Datang,
                                    <Text fontWeight={500}>{payload.name}</Text>
                                    Silahkan masukan password baru untuk melakukan aktivasi akun.
                                </div>
                            </Segment>
                            {AlertBlockComponent}
                            <form id="activateForm" onSubmit={() => { }} autoComplete="false">
                                <Segment style={{ textAlign: "left" }} py={24} mb={23} borderBottom={"1px solid #EFF3F6"}>
                                    <FormControl label={"Password"} mb={16}>
                                        <Textfield
                                            inputProps={{
                                                ...bindChange,
                                                type: open.password ? "text" : "password",
                                                name: "password",
                                                className: "validate[required,minLength[6],maxLength[10]]",
                                                placeholder: "Masukan password anda",
                                                maxLength: 10
                                                // value: value.username
                                            }}
                                            right={
                                                <ButtonLink type="button" onClick={() => handleSetVisibelPass('password')}>
                                                    <Icon name={open.password ? "visible" : "invisible"} size={16} fillColor="#70727D" />
                                                </ButtonLink>
                                            }
                                            state="normal"
                                            model="default"
                                        />
                                    </FormControl>
                                    <FormControl label={"Ulangi Password"}>
                                        <Textfield
                                            inputProps={{
                                                ...bindChange,
                                                type: open.confirm ? "text" : "password",
                                                name: "confirmPassword",
                                                className: "validate[required,equals[password]]",
                                                placeholder: "Ulangi password anda",
                                                maxLength: 10
                                            }}
                                            right={
                                                <ButtonLink type="button" onClick={() => handleSetVisibelPass('confirm')}>
                                                    <Icon name={open.confirm ? "visible" : "invisible"} size={16} fillColor="#70727D" />
                                                </ButtonLink>
                                            }
                                            state="normal"
                                        />
                                    </FormControl>
                                </Segment>
                                <Button type='button' disabled={payload.isLoadingSubmit} onClick={() => handleActivation()} width={290}>{payload.isLoadingSubmit ? <Spinner /> : `Aktivasi Akun`}</Button>
                            </form>
                        </Segment>
                    </Segment>
                </Segment>
            }

        </>
    );
};

export default Activate;