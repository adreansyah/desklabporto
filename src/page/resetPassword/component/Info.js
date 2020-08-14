import React, { useState } from "react";

/** assets */
import Logo from "../../../../src/assets/image/desklab.png";
import { Segment, Text, Icon } from "@elevenia/master-ui/components/Atom";

const Info = ({ status }) => {
    const [activated] = useState(status);

    return (
        <>
            <Segment className="wrapper-center">
                <Segment>
                    <img width={190} src={Logo} alt={"DeskLab Logo"} />
                    <Segment boxShadow width={"530px"} px={25} py={22} mt={24} style={{ textAlign: "center" }}>
                        <Segment mb={60} mt={60}>
                            {activated ? (
                                <div className="cont-success">
                                    <Icon name={"check"} size={60} fillColor={"white"} />
                                </div>
                            ) : (
                                    <div className="cont-failed">
                                        <Icon name={"cancel"} size={60} fillColor={"white"} />
                                    </div>
                                )}
                        </Segment>
                        <Segment mb={35}>
                            <Text fontWeight={500} textAlign={"center"} style={{ fontSize: "22px" }}>
                                {activated ? `Kata sandi Anda berhasil diubah` : `Link Expired`}
                            </Text>
                            <Segment width={"75%"} pt={30} m={"0 auto"} lineHeight={20}>
                                <Text lineHeight={"20px"}>
                                    {activated ? `Kata sandi Anda berhasil diubah, silakan melakukan login melalui aplikasi desklab untuk melanjutkan.` : `Silahkan ulangi pengajuan lupa kata sandi.`}
                                </Text>
                            </Segment>
                        </Segment>
                    </Segment>
                </Segment>
            </Segment>
        </>
    );
};

export default Info;