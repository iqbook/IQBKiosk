import React, { useEffect } from 'react'
import style from './JoinQueuePage.module.css';
import { useSelector } from 'react-redux';
import { useGlobal } from '../../context/GlobalContext';
import { formatMinutesToHrMin } from '../../utils/formatMinutesToHrMin';
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice';
import { useJoinQueueKioskMutation } from '../JoinQueue/joinqueueApiSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { useGetDefaultSalonByKioskMutation } from '../public/publicApiSlice';

const JoinQueuePage = () => {

    const adminInfo = useSelector(selectCurrentAdminInfo);

    const navigate = useNavigate()

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
    const { colors } = useSelector(state => state.theme);

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

    const [
        getDefaultSalonByAdmin,
        {
            data: getDefaultSalonByAdmindata
        }
    ] = useGetDefaultSalonByKioskMutation();

    

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

            localStorage.setItem("joinQueue", JSON.stringify(false))
            navigate("/kiosk")

        }
    }, [joinQueueKioskisSuccess])

    const joinHandler = () => {
        const joinqueuedata = {
            salonId: adminInfo?.salonId,
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

    return (
        <main
            className={style.container}
            style={{
                backgroundColor: colors.color4,
            }}
        >
            <p
                style={{
                    fontSize: "5rem",
                    fontWeight: "600",
                    marginTop: "7rem"
                }}
            >Preview</p>

            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem"
            }}>
                <h3>Selected Barber</h3>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: "1.4rem"
                    }}
                >
                    <div
                        className={style.barberCard}
                        style={{
                            backgroundColor: colors.color4,
                            border: `0.1rem solid ${colors.borderColor}`
                        }}
                    >
                        <div>
                            <img src={selectBarber?.profile?.[0]?.url} alt="" style={{ border: "0.1rem solid #efefef" }} />
                            <h4>{selectBarber?.name}</h4>
                            <p style={{
                                fontSize: "1.4rem",
                                textAlign: "center"
                            }}>~{formatMinutesToHrMin(selectBarber?.barberEWT)}</p>
                        </div>

                    </div>


                </div>
            </div>


            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem"
            }}>
                <h3>Selected Services</h3>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: "1.4rem"
                    }}
                >
                    {
                        selectedServices.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={style.serviceCard}
                                    style={{
                                        backgroundColor: colors.color4,
                                        border: `0.1rem solid ${colors.borderColor}`
                                    }}
                                >
                                    <div>
                                        <div>
                                            <img src={item?.serviceIcon?.url} alt="" style={{ border: "0.1rem solid #efefef" }} />
                                        </div>
                                        <h4>{item.serviceName}</h4>
                                        <p>~{formatMinutesToHrMin(item.serviceEWT)}</p>
                                        <h3>
                                            {getDefaultSalonByAdmindata?.response?.currency} {item.servicePrice}
                                        </h3>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            </div>

            {
                joinQueueKioskloading ? (
                    <button
                        className={style.btn}><ColorRing
                            visible={true}
                            height="4.5rem"
                            width="4.5rem"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                        /></button>
                ) : (
                    <button
                        onClick={joinHandler}
                        className={style.btn}
                    >Join Queue</button>
                )
            }



            <div className={style.wavebg}>
            </div>

        </main >
    )
}

export default JoinQueuePage