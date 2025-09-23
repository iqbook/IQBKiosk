import React, { useEffect, useState } from "react";
import style from "./SalonBarbers2.module.css"; // replace with actual file
import { Modal, Box, Skeleton } from "@mui/material";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BarberIcon, LeftArrowIcon } from "../../icons";
import { useGetDefaultSalonByKioskMutation } from "../public/publicApiSlice";
import { useGetAvailableBarbersForQKioskMutation } from "./salonBarbers2ApiSlice";
import { formatMinutesToHrMin } from "../../utils/formatMinutesToHrMin";
import { useGlobal } from "../../context/GlobalContext";
import { selectCurrentAdminInfo } from "../AdminSignin/adminauthSlice";

const SalonBarbers2 = () => {

    const {
        selectedServices,
        setSelectedServices,
        selectBarber,
        setSelectedBarber,
        customerName,
        setCustomerName,
        customerEmail,
        setCustomerEmail,
        mobileNumber,
        setMobileNumber,
        countryflag,
        setCountryFlag,
        mobileCountryCode,
        setMobileCountryCode
    } = useGlobal()


    const connectedSalonId = localStorage.getItem("ConnectedSalonId")


    const [
        getAvailableBarbersForQKiosk,
        {
            data: getAvailableBarbersForQKioskData,
            isLoading: getAvailableBarbersForQKiosksLoading
        }
    ] = useGetAvailableBarbersForQKioskMutation();

    useEffect(() => {
        if (connectedSalonId) {
            getAvailableBarbersForQKiosk(connectedSalonId)
        }

    }, [])

    const [
        getDefaultSalonByAdmin,
        {
            data: getDefaultSalonByAdmindata
        }
    ] = useGetDefaultSalonByKioskMutation();

     const adminInfo = useSelector(selectCurrentAdminInfo)

    useEffect(() => {
        if (adminInfo?.email) {
            const salondata = {
                email: adminInfo?.email,
                role: adminInfo?.role,
                salonId: connectedSalonId
            }
            getDefaultSalonByAdmin(salondata)
        }
    }, [adminInfo])



    const totalPrice = 120;
    const totalServices = 2;
    const totalTime = "1h 30m";

    const navigate = useNavigate()
    const { colors } = useSelector(state => state.theme);
    const { modecolors } = useSelector(state => state.modeColor)
    const { currentTheme } = useSelector(state => state.theme);

    const continueHandler = () => {
        navigate("/salonServices2")
    }

    return (
        <>
            <main
                className={style.container}
                style={{
                    backgroundColor: colors.color4,
                    height: selectBarber ? "calc(var(--primary-height) - 7rem)" : "var(--primary-height)"
                }}
            >
                <div>
                    <button onClick={() => navigate("/joinForm")}><LeftArrowIcon /></button>
                    <p>Select {getDefaultSalonByAdmindata?.response?.salonType === "Barber Shop" ? "Barber" : "Stylist"}</p>
                </div>

                {/* Dummy list of barbers */}
                <div>
                    {
                        getAvailableBarbersForQKiosksLoading ? (
                            <>
                                <Skeleton variant="rectangular" className={style.barberCardLoader} />
                                <Skeleton variant="rectangular" className={style.barberCardLoader} />
                                <Skeleton variant="rectangular" className={style.barberCardLoader} />
                                {/* <Skeleton variant="rectangular" className={style.barberCardLoader} /> */}
                            </>
                        ) : getAvailableBarbersForQKioskData?.response?.length > 0 ? (
                            getAvailableBarbersForQKioskData?.response?.map((item, index) => {
                                return (
                                    <button
                                        onClick={() => {
                                            setSelectedBarber(item)
                                        }}
                                        key={item?.barberId}
                                        className={style.barberCard}
                                        style={{
                                            backgroundColor: colors.cardColor,
                                            border: selectBarber?.barberId === item?.barberId && currentTheme === "Dark" && modecolors.color1 === "#000000" ?
                                                '0.2rem solid #fff' : selectBarber?.barberId === item?.barberId ? `0.2rem solid ${modecolors.color1}` : `0.1rem solid ${colors.queueBorder}`
                                        }}
                                    >
                                        <div>
                                            <img src={item?.profile?.[0]?.url} alt="" style={{ border: `0.1rem solid ${colors.borderColor}` }} />
                                            <h4>{item?.name}</h4>
                                            <p style={{
                                                fontSize: "1.4rem",
                                                textAlign: "center"
                                            }}>~{formatMinutesToHrMin(item?.barberEWT)}</p>
                                        </div>

                                    </button>
                                )
                            })
                        ) : (
                            <div className={style.noBarberContainer}>
                                <div
                                    className={style.successbody}
                                    style={{
                                        border: `0.1rem solid ${colors.queueBorder}`,
                                        backgroundColor: colors.cardColor
                                    }}
                                >
                                    <div
                                        style={{
                                            background: `${modecolors.color1}1A`
                                        }}
                                    >
                                        <BarberIcon
                                            style={{
                                                color: currentTheme === "Dark" && modecolors.color1 === "#000000" ? "#fff" : modecolors.color1
                                            }}
                                            size={"3.6rem"} /></div>

                                    <h2>No {getDefaultSalonByAdmindata?.response?.salonType === "Barber Shop" ? "Barbers" : "Stylists"}</h2>
                                    <p> No {getDefaultSalonByAdmindata?.response?.salonType === "Barber Shop" ? "barbers" : "stylists"} available</p>

                                </div>
                            </div>
                        )
                    }


                </div>
            </main>

            {/* Bottom Bar */}
            {
                selectBarber && (
                    <div
                        className={style.bottomContainer}
                        style={{
                            backgroundColor: colors.cardColor,
                            borderTop: `0.1rem solid ${colors.queueBorder}`
                        }}
                    >
                        {/* <div>
                    <h3>$ {totalPrice.toFixed(2)}</h3>
                    <p>
                        {totalServices} services | {totalTime}
                    </p>
                </div> */}
                        <div />

                        <button
                            style={{
                                backgroundColor: modecolors.color1,
                                color: modecolors?.color2
                            }}
                            onClick={continueHandler}
                            className={style.btn}
                        >
                            Continue
                        </button>
                    </div>
                )
            }

        </>
    );
};

export default SalonBarbers2;
