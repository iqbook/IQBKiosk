import React, { useEffect, useState } from 'react'
import style from './SalonBarbers.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGlobal } from '../../context/GlobalContext';
import { useGetDefaultSalonByKioskMutation } from '../public/publicApiSlice';
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice';
import { formatMinutesToHrMin } from '../../utils/formatMinutesToHrMin';
import { useGetBarberByServicesKioskMutation } from './salonBarbersApiSlice';
import { Box, Modal, Skeleton, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import { BarberIcon, CheckIcon, LeftArrowIcon, NextQueueIcon } from '../../icons';
import { useJoinQueueKioskMutation } from '../JoinQueue/joinqueueApiSlice';
import { ColorRing } from 'react-loader-spinner';

const SalonBarbers = () => {

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
        joinQueueKiosk,
        {
            data: joinQueueKioskdata,
            isSuccess: joinQueueKioskisSuccess,
            isError: joinQueueKioskisError,
            isLoading: joinQueueKioskloading,
            error: joinQueueKioskerror
        }
    ] = useJoinQueueKioskMutation()

    useEffect(() => {
        if (joinQueueKioskisSuccess) {

            toast.success("Join queue successfully", {
                duration: 3000,
                style: {
                    fontSize: "var(--list-modal-header-normal-font)",
                    borderRadius: "0.3rem",
                    background: "#333",
                    color: "#fff",
                },
            });

            setSelectedServices([])
            setSelectedBarber("")
            setCustomerName("")
            setCustomerEmail("")
            setMobileNumber("")
            setCountryFlag("gb")
            setMobileCountryCode("")
            setPreviewModal(false)
            navigate("/joinQueueSuccess")

        }
    }, [joinQueueKioskisSuccess])


    const joinHandler = () => {
        const joinqueuedata = {
            salonId: connectedSalonId,
            name: customerName,
            customerEmail: customerEmail,
            joinedQType: "Single-Join",
            methodUsed: "Walk-In",
            mobileNumber: Number(mobileNumber),
            mobileCountryCode: Number(mobileCountryCode),
            barberName: selectBarber?.name,
            barberId: selectBarber?.barberId,
            services: selectedServices
        }

        // console.log(joinqueuedata)

        joinQueueKiosk(joinqueuedata)
        // joinQueueKiosk(joinqueueModalOpen.data)
    }


    const adminInfo = useSelector(selectCurrentAdminInfo);

    const navigate = useNavigate()
    const { colors } = useSelector(state => state.theme);

    const totalPrice = selectedServices.reduce((acc, service) => acc + service.servicePrice, 0);
    const totalTime = selectedServices.reduce((acc, service) => acc + service.serviceEWT, 0);
    const totalServices = selectedServices.length;

    const [
        getDefaultSalonByAdmin,
        {
            data: getDefaultSalonByAdmindata
        }
    ] = useGetDefaultSalonByKioskMutation();



    useEffect(() => {
        if (adminInfo?.email) {
            const salondata = {
                email: adminInfo.email,
                role: adminInfo.role,
                salonId: connectedSalonId
            };
            getDefaultSalonByAdmin(salondata);
        }
    }, [adminInfo]);


    const [
        getBarberByServicesKiosk,
        {
            data: getBarberByServicesKioskData,
            isLoading: getBarberByServicesKioskisLoading
        }
    ] = useGetBarberByServicesKioskMutation();


    useEffect(() => {
        if (selectedServices.length > 0 && connectedSalonId) {
            getBarberByServicesKiosk({ salonId: connectedSalonId, selectedServices })
        }

    }, [])


    const [previewModal, setPreviewModal] = useState(false)
    const { currentTheme } = useSelector(state => state.theme);
    const { modecolors } = useSelector(state => state.modeColor)

    return (
        <>
            <main
                className={style.container}
                style={{
                    backgroundColor: colors.color4,
                }}
            >
                <div>
                    <button onClick={() => navigate("/salonServices")}><LeftArrowIcon /></button>
                    <p>Select {getDefaultSalonByAdmindata?.response?.salonType === "Barber Shop" ? "Barber" : "Stylist"}</p>
                </div>

                <div style={{
                    // marginBottom: "7rem"
                }}>
                    {
                        getBarberByServicesKioskisLoading ? (
                            <>
                                <Skeleton variant="rectangular" className={style.barberCardLoader} />
                                <Skeleton variant="rectangular" className={style.barberCardLoader} />
                                <Skeleton variant="rectangular" className={style.barberCardLoader} />
                                {/* <Skeleton variant="rectangular" className={style.barberCardLoader} /> */}
                            </>
                        ) : getBarberByServicesKioskData?.response?.length > 0 ? (
                            getBarberByServicesKioskData?.response?.map((item, index) => {
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

                                    <h2>No Stylists</h2>
                                    <p style={{
                                        color: colors.secondaryText
                                    }}>Unfortunately, there are no available stylists for the selected services at the moment.</p>
                                    <button
                                        style={{
                                            backgroundColor: modecolors.color1,
                                            color: modecolors?.color2
                                        }}
                                        onClick={() => {
                                            navigate("/salonServices")
                                        }}
                                    >Choose Services Again</button>
                                </div>
                            </div>
                        )

                    }
                </div>


            </main>

            {
                selectedServices.length > 0 && (
                    <div
                        className={style.bottomContainer}
                        style={{
                            backgroundColor: colors.cardColor,
                            borderTop: `0.1rem solid ${colors.queueBorder}`
                        }}
                    >
                        <div>
                            <h3>{getDefaultSalonByAdmindata?.response?.currency} {totalPrice.toFixed(2)}</h3>
                            <p>{totalServices} {totalServices === 1 ? "service" : "services"} |{" "}
                                {formatMinutesToHrMin(totalTime)}</p>
                        </div>

                        <button
                            style={{
                                backgroundColor: modecolors.color1,
                                color: modecolors?.color2
                            }}
                            onClick={() => {
                                if (!selectBarber) {
                                    toast.error("Please select a barber", {
                                        duration: 3000,
                                        style: {
                                            fontSize: "var(--list-modal-header-normal-font)",
                                            borderRadius: "0.3rem",
                                            background: "#333",
                                            color: "#fff",
                                        },
                                    });
                                    return
                                }
                                setPreviewModal(true)
                                // navigate("/joinQueuePage")
                            }}
                            className={style.btn}>Continue</button>
                    </div>
                )
            }

            <Modal
                open={previewModal}
                onClose={() => setPreviewModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "60%",
                    bgcolor: colors.color4,
                    borderRadius: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                    boxShadow: 5,
                    p: 2,
                    backgroundColor: colors.cardColor,
                    borderColor: colors.queueBorder
                }}>
                    <div className={style.modalHeader}>
                        <div
                            style={{
                                background: colors.tabBackground
                            }}
                        >
                            <CheckIcon color={currentTheme === "Dark" ? "#F4F4F5" : "#09090B"} />
                        </div>
                        <h3>Please Confirm</h3>
                    </div>

                    <p>Are you sure you want to proceed ?</p>

                    <div
                        className={style.modalBody}
                        style={{
                            background: colors.tabBackground
                        }}
                    >
                        <h4>{selectBarber?.name}</h4>
                        <div>
                            <h3>{getDefaultSalonByAdmindata?.response?.currency} {totalPrice.toFixed(2)}</h3>
                            <p>( {totalServices} {totalServices === 1 ? "service" : "services"} |{" "}
                                {formatMinutesToHrMin(totalTime)} )</p>
                        </div>
                    </div>

                    <div className={style.modalBtnGroup}>
                        <div />
                        <div>
                            <button
                                onClick={() => setPreviewModal(false)}
                            >No</button>

                            {
                                joinQueueKioskloading ? (
                                    <button
                                        style={{
                                            backgroundColor: modecolors.color1,
                                        }}
                                    ><ColorRing
                                            visible={true}
                                            height="2.4rem"
                                            width="2.4rem"
                                            ariaLabel="color-ring-loading"
                                            wrapperStyle={{}}
                                            wrapperClass="color-ring-wrapper"
                                            colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                                        /></button>
                                ) : (
                                    <button
                                        style={{
                                            backgroundColor: modecolors.color1,
                                            color: modecolors?.color2
                                        }}
                                        onClick={joinHandler}
                                    >Yes</button>
                                )
                            }
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default SalonBarbers