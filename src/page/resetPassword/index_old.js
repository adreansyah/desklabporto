import React, { useState } from "react";

/** assets */
import Logo from "../../../src/assets/image/desklab.png";
import {
  Segment,
  Text,
  Button,
  Icon,
  ButtonLink,
  FormControl,
  Textfield
} from "@elevenia/master-ui/components/Atom";

const ResetPassword = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
          <Segment className="wrapper-center">
            <Segment>
                <img width={190} src={Logo} alt={"DeskLab Logo"} />
                <Segment boxShadow width={"530px"} px={25} py={22} mt={24} style={{ textAlign: "center" }}>
                    <Segment borderBottom={"1px solid #EFF3F6"} pb={23}>
                        <Text fontWeight={500} textAlign={"center"} style={{ fontSize: "22px" }}>
                            Aktivasi Akun Anda
                        </Text>
                    </Segment>
                    <Segment py={24} borderBottom={"1px solid #EFF3F6"}>
                        <div style={{ lineHeight: "35px", fontSize: "16px" }}>
                            Selamat Datang,
                            <Text fontWeight={500}>Jhon Doe</Text>
                            Silahkan klik button dibawah untuk mengaktifkan akun anda.
                        </div>
                    </Segment>
                    <form id="myForm" onSubmit={() => {}} autoComplete="false">
                        <Segment style={{textAlign:  "left"}} py={24} mb={23} borderBottom={"1px solid #EFF3F6"}>
                          <FormControl label={"Username"} mb={16}>
                              <Textfield
                                  inputProps={{
                                      type: "text",
                                      name: "username",
                                      className: "validate[required]",
                                      placeholder: "Masukan password anda",
                                      // value: value.username
                                  }}
                                  state="normal"
                                  model="default"
                              />
                          </FormControl>
                          <FormControl label={"Password"}>
                              <Textfield
                                  inputProps={{
                                      type: open ? "text" : "password",
                                      name: "password",
                                      className: "validate[required]",
                                      placeholder: "Ulangi password anda",
                                  }}
                                  right={
                                      <ButtonLink type="button" onClick={() => setOpen(!open)}>
                                          <Icon name={open ? "visible" : "invisible"} size={16} fillColor="#70727D" />
                                      </ButtonLink>
                                  }
                                  state="normal"
                              />
                          </FormControl>
                        </Segment>
                        <Button width={290}>Aktivasi Akun</Button>
                    </form>
                </Segment>
            </Segment>
          </Segment>
        </>
    );
};

export default ResetPassword;