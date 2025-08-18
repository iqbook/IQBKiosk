import React, { useEffect, useState } from 'react'
import style from './Dashboard2.module.css'
import { selectCurrentBarberInfo, selectCurrentBarberToken } from '../barber/Signin/barberauthSlice'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { useChangeBarberClockedInStatusKioskMutation, useChangeBarberOnlineStatusKioskMutation, useChangeSalonOnlineStatusKioskMutation, useGetAttendenceByBarberIdKioskMutation } from './dashboardApiSlice'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { Skeleton } from '@mui/material'
import { EmailIcon, PhoneIcon } from '../../icons'
import Switch from "react-switch";

const Dashboard2 = () => {

    const connectedSalonId = localStorage.getItem("ConnectedSalonId")

    const { colors, currentTheme } = useSelector(state => state.theme);
    const { modecolors } = useSelector(state => state.modeColor)


    const selectCurrentBarberdata = useSelector(selectCurrentBarberInfo)
    const selectCurrentBarberTokendata = useSelector(selectCurrentBarberToken)
    const adminInfo = useSelector(selectCurrentAdminInfo)

    console.log("selectCurrentBarberdata?.foundUser?.salonId ", selectCurrentBarberdata?.foundUser?.salonId)

    const [
        changeBarberClockedInStatusKiosk,
        {
            data: barberclockonlinedata,
            isSuccess: barberclockonlineisSuccess,
            isError: barberclockonlineisError,
            error: barberclockonlineerror,
            isLoading: barberclockonlineisLoading
        }
    ] = useChangeBarberClockedInStatusKioskMutation()

    const [
        getAttendenceByBarberIdKiosk,
        {
            data: getAttendenceByBarberIdKioskdata,
            isSuccess: getAttendenceByBarberIdKioskisSuccess,
            isError: getAttendenceByBarberIdKioskisError,
            error: getAttendenceByBarberIdKioskerror,
            isLoading: getAttendenceByBarberIdKioskisLoading
        }
    ] = useGetAttendenceByBarberIdKioskMutation()


    const [barberbtnCheck, setBarberbtnCheck] = useState(selectCurrentBarberdata?.foundUser?.isClockedIn)


    useEffect(() => {
        if (barberclockonlineisError) {
            toast.error(barberclockonlineerror?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });

            if (barberclockonlineerror?.data?.message === "Cant clock you out as you have customers in the queue") {

            } else {
                setBarberbtnCheck(selectCurrentBarberdata?.foundUser?.isClockedIn)
            }

        }
    }, [barberclockonlineisError])


    useEffect(() => {
        if (barberclockonlineisSuccess) {
            toast.success(barberclockonlinedata?.message, {
                duration: 3000,
                style: {
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });

            setBarberbtnCheck((prev) => !prev)

            if (barberclockonlinedata?.response?.isClockedIn === false) {
                setBarberOnlineCheck(barberclockonlinedata?.response?.isClockedIn)
            }

            getAttendenceByBarberIdKiosk({
                salonId: selectCurrentBarberdata?.foundUser?.salonId,
                barberId: selectCurrentBarberdata?.foundUser?.barberId
            })
        }
    }, [barberclockonlineisSuccess, selectCurrentBarberdata])


    useEffect(() => {
        getAttendenceByBarberIdKiosk({
            salonId: selectCurrentBarberdata?.foundUser?.salonId,
            barberId: selectCurrentBarberdata?.foundUser?.barberId
        })
    }, [selectCurrentBarberdata])


    const clockHandler = () => {
        const confirm = window.confirm("Change Barber Clock Status ?")

        const barberdata = {
            salonId: connectedSalonId,
            barberId: selectCurrentBarberdata?.foundUser?.barberId,
            isClockedIn: !barberbtnCheck,
            barberToken: selectCurrentBarberTokendata
        }

        if (confirm) {
            changeBarberClockedInStatusKiosk(barberdata)
        }
    }


    const [barberOnlineCheck, setBarberOnlineCheck] = useState(selectCurrentBarberdata?.foundUser?.isOnline)

    const [
        changeBarberOnlineStatusKiosk,
        {
            data: barberonlinedata,
            isSuccess: barberonlineisSuccess,
            isError: barberonlineisError,
            error: barberonlineerror,
            isLoading: barberonlineisLoading
        }
    ] = useChangeBarberOnlineStatusKioskMutation()


    useEffect(() => {
        if (barberonlineisSuccess) {
            toast.success(barberonlinedata?.message, {
                duration: 3000,
                style: {
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });

            setBarberOnlineCheck(barberonlinedata?.response?.isOnline)
        }
    }, [barberonlineisSuccess])

    useEffect(() => {
        if (barberonlineisError) {
            toast.error(barberonlineerror?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });

            setBarberOnlineCheck(selectCurrentBarberdata?.foundUser?.isOnline)
        }
    }, [barberonlineerror, setBarberOnlineCheck])


    const barberOnlineHandler = () => {
        const confirm = window.confirm("Change Barber Online Status ?")


        const barberOnlinedata = {
            salonId: connectedSalonId,
            barberId: selectCurrentBarberdata?.foundUser?.barberId,
            isOnline: !barberOnlineCheck,
            barberToken: selectCurrentBarberTokendata
        }


        if (confirm) {
            changeBarberOnlineStatusKiosk(barberOnlinedata)
        }

    }

    const [clock, setClock] = useState(false)

    return (
        <section className={`${style.section}`}
            style={{
                backgroundColor: colors.color4
            }}
        >
            <div>
                <div>
                    <div>
                        <img src={selectCurrentBarberdata?.foundUser?.profile[0]?.url}
                            alt=""
                            style={{
                                border: `0.1rem solid ${colors.queueBorder}`
                            }}
                        />
                        <div>
                            <h2>{selectCurrentBarberdata?.foundUser?.name}</h2>
                            <p><span><EmailIcon /></span>{selectCurrentBarberdata?.foundUser?.email}</p>
                            <p><span><PhoneIcon /></span>{selectCurrentBarberdata?.foundUser?.mobileNumber}</p>
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                border: `0.1rem solid ${colors.queueBorder}`
                            }}
                        >
                            <button onClick={() => clockHandler()} disabled={barberbtnCheck} style={{ cursor: barberbtnCheck ? "not-allowed" : "pointer", color: barberbtnCheck && "#fff" }}>Clock In</button>
                            <button onClick={() => clockHandler()} disabled={!barberbtnCheck} style={{ cursor: !barberbtnCheck ? "not-allowed" : "pointer", color: !barberbtnCheck && "#fff" }}>Clock Out</button>
                            <div
                                style={{
                                    left: barberbtnCheck ? 0 : "calc(10rem + 2rem)",
                                    background: barberbtnCheck ? " #00A36C" : "rgb(244, 67, 54)"
                                }}
                            ></div>
                        </div>
                        <div>
                            <Switch
                                width={78}
                                handleDiameter={24}
                                offColor="#F44336"
                                onColor="#00A36C"
                                uncheckedIcon={
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "100%",
                                            fontSize: "1.2rem",
                                            color: "#F4F4F5",
                                            fontWeight: "bold",
                                            paddingRight: "6px"
                                        }}
                                    >
                                        Offline
                                    </div>
                                }
                                checkedIcon={
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "100%",
                                            fontSize: "1.2rem",
                                            color: "#F4F4F5",
                                            fontWeight: "bold",
                                            paddingLeft: "6px"
                                        }}
                                    >
                                        Online
                                    </div>
                                }
                                onChange={() => { barberOnlineHandler() }}
                                checked={barberOnlineCheck}
                                disabled={!barberbtnCheck}
                            />
                        </div>
                    </div>
                </div>

                {
                    getAttendenceByBarberIdKioskisLoading ? (
                        <div>
                            <Skeleton
                                variant="rectangular"
                                className={style.skeleton}
                                style={{
                                    backgroundColor: colors.inputColor
                                }}
                            />
                            <Skeleton
                                variant="rectangular"
                                className={style.skeleton}
                                style={{
                                    backgroundColor: colors.inputColor
                                }}
                            />
                            <Skeleton
                                variant="rectangular"
                                className={style.skeleton}
                                style={{
                                    backgroundColor: colors.inputColor
                                }}
                            />
                            <Skeleton
                                variant="rectangular"
                                className={style.skeleton}
                                style={{
                                    backgroundColor: colors.inputColor
                                }}
                            />
                            <Skeleton
                                variant="rectangular"
                                className={style.skeleton}
                                style={{
                                    backgroundColor: colors.inputColor
                                }}
                            />
                            <Skeleton
                                variant="rectangular"
                                className={style.skeleton}
                                style={{
                                    backgroundColor: colors.inputColor
                                }}
                            />
                            <Skeleton
                                variant="rectangular"
                                className={style.skeleton}
                                style={{
                                    backgroundColor: colors.inputColor
                                }}
                            />
                            <Skeleton
                                variant="rectangular"
                                className={style.skeleton}
                                style={{
                                    backgroundColor: colors.inputColor
                                }}
                            />
                        </div>
                    ) : getAttendenceByBarberIdKioskisSuccess && getAttendenceByBarberIdKioskdata?.response?.attendance?.length > 0 ? (
                        <div>
                            {getAttendenceByBarberIdKioskdata?.response?.attendance.map((item, index) => {
                                return (
                                    <div className={style.attendence_item} key={index}
                                        style={{
                                            backgroundColor: colors.cardColor,
                                            border: `0.1rem solid ${colors.queueBorder}`
                                        }}
                                    >
                                        <div>
                                            <p>{item?.date}</p>
                                            <div
                                                style={{
                                                    backgroundColor: colors.color4
                                                }}
                                            ><p>{item?.day}</p></div>
                                        </div>
                                        <div>
                                            <div>
                                                <p>Time in</p>
                                                <p>{item?.signInTime === "" ? "-" : item?.signInTime}</p>
                                            </div>

                                            <div>
                                                <p>Time out</p>
                                                <p>{item?.signOutTime === "" ? "-" : item?.signOutTime}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div style={{
                            display: "flex",
                            flexWrap: "nowrap",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <p>No attendance available</p>
                        </div>
                    )
                }

            </div>
        </section>
    )
}

export default Dashboard2







