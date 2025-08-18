import React, { useEffect, useState } from 'react'
import style from './CommonHeader.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { ClickAwayListener } from '@mui/material';
import { AccountIcon, BackIconNew, DarkIcon, JoinIcon, LightIcon, LogoutIcon, PersonIcon, QueueIcon, SettingsIcon, ThemeIcon, TotalQueueIcon } from '../../icons';
import { useGetDefaultSalonByKioskMutation } from '../public/publicApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice';
import Skeleton from 'react-loading-skeleton';
import Skeleton2 from '@mui/material/Skeleton';
import { setTheme } from '../app/themeSlice';
import { setDefaultModeColor, setModeColor } from '../app/modeColorSlice';
import { useGlobal } from '../../context/GlobalContext';
import { useSocket } from '../../context/SocketContext';
import { useKioskBookingAvailabilityStatusMutation } from '../Dashboard/dashboardApiSlice';
import toast from 'react-hot-toast';

const CommonHeader = () => {

    const { getDefaultAdminData, setGetDefaultAdminData } = useSocket()
    const connectedSalonId = localStorage.getItem("ConnectedSalonId")

    console.log("Barber Connected Salon ", connectedSalonId)

    const [
        getDefaultSalonByAdmin,
        {
            data: getDefaultSalonByAdmindata,
            isSuccess: getDefaultSalonByAdminisSuccess,
            isError: getDefaultSalonByAdminisError,
            error: getDefaultSalonByAdminerror,
            isLoading: getDefaultSalonByAdminisLoading
        }
    ] = useGetDefaultSalonByKioskMutation()

    // console.log("From api ", getDefaultSalonByAdmindata)

    useEffect(() => {
        if (
            getDefaultSalonByAdmindata?.response &&
            typeof getDefaultSalonByAdmindata.response === "object" &&
            !Array.isArray(getDefaultSalonByAdmindata.response)
        ) {
            setGetDefaultAdminData(getDefaultSalonByAdmindata?.response)
        }
    }, [getDefaultSalonByAdmindata])


    const { currentTheme, colors } = useSelector(state => state.theme);
    const { availableModeColors } = useSelector(state => state.modeColor)

    const dispatch = useDispatch()

    const [themedropOpen, setThemedropOpen] = useState(false)

    const toggleTheme = (theme) => {
        dispatch(setTheme(theme));
    };

    const toggleThemecolor = (themecolor) => {
        dispatch(setModeColor(themecolor))
    }


    useEffect(() => {
        dispatch(setDefaultModeColor({ modeColor: "default", theme: currentTheme }))
    }, [currentTheme])


    const adminInfo = useSelector(selectCurrentAdminInfo)

    const [
        getDefaultSalonByKiosk,
        {
            data,
            isSuccess,
            isError,
            error,
            isLoading
        }
    ] = useGetDefaultSalonByKioskMutation()

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


    useEffect(() => {
        if (adminInfo?.email) {
            const salondata = {
                email: adminInfo?.email,
                role: adminInfo?.role,
                salonId: connectedSalonId
            }
            getDefaultSalonByKiosk(salondata)
        }
    }, [adminInfo])


    const navigate = useNavigate()

    const [showdrop, setShowDrop] = useState(false)

    const queuelistClicked = () => {
        navigate('/queuelist')
        setShowDrop(false)
    }

    const joinqueueClicked = () => {
        navigate('/joinqueue')
        setShowDrop(false)
    }

    const logoutHandler = () => {
        localStorage.removeItem("ConnectedSalonId")
        localStorage.setItem('adminkiyoskloggin', 'false')
        localStorage.setItem('adminkiyosktoken', '')
        localStorage.setItem("salonSelect", "false")
        navigate('/')
    }

    const handleClickAway = () => {
        setShowDrop(false)
    }

    const salonsettingClicked = () => {
        navigate("/salonsignin")
        setShowDrop(true)
    }

    const barbersigninClicked = () => {
        navigate("/barbersignin")
        setShowDrop(true)
    }

    const location = useLocation()
    const { modecolors } = useSelector(state => state.modeColor)

    const {
        setSelectedServices,
        setSelectedBarber,
        setCustomerName,
        setCustomerEmail,
        setMobileNumber,
        setCountryFlag,
        setMobileCountryCode
    } = useGlobal();


    const {
        kioskSocketOnline,
        setKioskSocketOnline,
        kioskbtnCheck,
        setKioskbtnCheck
    } = useSocket()

    const [
        kioskBookingAvailabilityStatus,
        {
            data: kioskBookData,
            isSuccess: kioskBookSuccess,
            isError: kioskBookError,
            error: kioskBookErrorData
        }
    ] = useKioskBookingAvailabilityStatusMutation()


    // Sync kiosk button with socket state
    useEffect(() => {
        if (typeof kioskSocketOnline === 'boolean') {
            setKioskbtnCheck(kioskSocketOnline)
        }
    }, [kioskSocketOnline])

    // Update kiosk button when API success
    useEffect(() => {
        if (kioskBookSuccess) {
            toast.success(kioskBookData?.message, toastStyle)
            setKioskbtnCheck(kioskBookData?.response?.kioskAvailability)
        }
    }, [kioskBookSuccess])


    // Handle kiosk API error
    useEffect(() => {
        if (kioskBookError) {
            toast.error(kioskBookErrorData?.data?.message, toastStyle)
            setKioskbtnCheck(adminInfo?.kioskAvailability)
        }
    }, [kioskBookError])


    return (
        <header
            className={style.kiyosk_header}
            style={{
                borderBottom: `0.1rem solid ${colors.queueBorder}`,
                backgroundColor: colors.color4
                // backgroundColor: location.pathname === "/kiosk" ? "#000" : colors.color4
            }}
        >
            <div>
                <div onClick={() => {
                    setSelectedServices([]);
                    setSelectedBarber("");
                    setCustomerName("");
                    setCustomerEmail("");
                    setMobileNumber("");
                    setCountryFlag("gb");
                    setMobileCountryCode("");
                    navigate("/kiosk");
                }}>
                    {
                        isLoading ? <Skeleton
                            count={1}
                            circle={true}
                            borderRadius={"50%"}
                            height={"4.7rem"}
                            width={"4.7rem"}
                        /> : isSuccess && data?.response?.salonLogo.length > 0 ? (
                            <img src={data.response.salonLogo[0].url} alt={data.response.salonName} />
                        ) : (
                            <img src='/no-image.webp' alt="no image available" />
                        )
                    }
                </div>
                {
                    isLoading ? (
                        <Skeleton2
                            variant="rectangular"
                            className={style.skeleton}
                            sx={{ backgroundColor: colors.borderColor }}
                        />
                    ) : (
                        adminInfo?.role === "Barber" ? <p>{adminInfo?.salonName}</p> : <p>{data?.response?.salonName}</p>
                    )

                }
            </div>

            {
                isLoading ? (
                    <div className={style.top}>
                        <div>
                            <Skeleton2
                                variant="rectangular"
                                className={style.skeleton}
                                sx={{ backgroundColor: colors.borderColor }}
                            />
                            <Skeleton2
                                variant="rectangular"
                                className={style.skeleton}
                                sx={{ backgroundColor: colors.borderColor }}
                            />
                        </div>
                    </div>
                ) : Object.keys(adminInfo).length > 0 && getDefaultAdminData?.totalQueueCount != null && getDefaultAdminData?.barbersOnDuty != null ? (
                    <div className={style.top}>
                        <div>

                            <div
                                className={style.top_chip}
                                style={{
                                    backgroundColor: colors?.cardColor,
                                    border: `0.1rem solid ${colors?.queueBorder}`,
                                    color: colors?.color3
                                }}
                            >
                                <div>
                                    <div><TotalQueueIcon /></div>
                                    <p>Total Queue</p>
                                </div>
                                <b>{getDefaultAdminData.totalQueueCount}</b>
                            </div>

                            <div
                                className={style.top_chip}
                                style={{
                                    backgroundColor: colors?.cardColor,
                                    border: `0.1rem solid ${colors?.queueBorder}`,
                                    color: colors?.color3
                                }}
                            >
                                <div>
                                    <div><PersonIcon /></div>
                                    <p>Barbers on duty</p>
                                </div>
                                <b>{getDefaultAdminData.barbersOnDuty}</b>
                            </div>

                        </div>
                    </div>
                ) : (<div></div>)
            }


            {
                location.pathname === "/kiyoskdashboard" ?
                    <>
                        <div />
                        <button
                            className={style.back_btn}
                            onClick={() => navigate("/barbersignin")}
                        ><BackIconNew /></button>
                    </>
                    : <div>
                        <div>
                            {isLoading ? <Skeleton2
                                variant="rectangular"
                                className={style.skeleton}
                                sx={{ backgroundColor: colors.borderColor }}
                            /> : Object.keys(adminInfo).length > 0 && data?.response ? <button className={`${style.sytem_status} ${kioskbtnCheck ? style.online : style.offline}`}>{kioskbtnCheck ? "System ON" : "System OFF"}</button> : null}
                        </div>

                        <ClickAwayListener onClickAway={handleClickAway}>
                            <div
                                onClick={() => setShowDrop((prev) => !prev)}
                                style={{
                                    background: colors.cardColor,
                                    border: `0.1rem solid ${colors.queueBorder}`,
                                    color: colors.color3
                                }}
                            >
                                <SettingsIcon />

                                {showdrop && (
                                    <div
                                        className={style.kiyosk_dropbox}
                                        style={{
                                            background: colors.cardColor,
                                            border: `0.1rem solid ${colors.queueBorder}`
                                        }}
                                    >
                                        <div onClick={barbersigninClicked}>
                                            <div><AccountIcon /></div>
                                            <p>Barber signin</p>
                                        </div>

                                        <div onClick={salonsettingClicked}>
                                            <div><SettingsIcon /></div>
                                            <p>Salon settings</p>
                                        </div>

                                        <p>Theme</p>

                                        <div onClick={() => dispatch(setTheme(currentTheme === "Dark" ? "Light" : "Dark"))}>
                                            <div>{currentTheme === "Dark" ? <DarkIcon /> : <LightIcon />}</div>
                                            <p>{currentTheme === "Dark" ? "Dark" : "Light"}</p>
                                        </div>

                                        <p>Colors</p>

                                        {
                                            Object.entries(availableModeColors)?.map(([key, value]) => {
                                                return (
                                                    <div className={style.theme_item} key={key} onClick={() => toggleThemecolor(key)}>
                                                        <div><div style={{
                                                            background: value.color1
                                                        }}></div></div>
                                                        <p>{key}</p>
                                                    </div>
                                                )
                                            })
                                        }

                                        <div onClick={logoutHandler}>
                                            <div><LogoutIcon /></div>
                                            <p>Logout</p>
                                        </div>
                                        <div style={{ cursor: "default" }}>
                                            <div></div>
                                            <p style={{ color: "gray" }}>v 1.0.3</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ClickAwayListener>
                    </div>
            }



        </header>
    )
}

export default React.memo(CommonHeader)
