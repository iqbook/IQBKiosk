import React, { useEffect, useState } from 'react'
import style from './SalonSelection.module.css'
import { useAdminConnectKioskMutation, useGetAllSalonsByAdminMutation, useGetDefaultSalonByKioskMutation } from '../public/publicApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { IoMdArrowDropdownCircle } from 'react-icons/io'
import { ColorRing } from 'react-loader-spinner'
import { ClickAwayListener } from '@mui/material'
import { setDefaultModeColor } from '../app/modeColorSlice'
import { LogoutIcon } from '../../icons'

const SalonSelection = () => {

    const { colors, currentTheme } = useSelector(state => state.theme);
    const { modecolors } = useSelector(state => state.modeColor)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setDefaultModeColor({ modeColor: "default", theme: currentTheme }))
    }, [currentTheme])

    const navigate = useNavigate()

    const [salonId, setSalonId] = useState("")
    const [salonName, setSalonName] = useState("")
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

    const [
        adminConnectKiosk,
        {
            data: adminConnectKioskdata,
            isSuccess: adminConnectKioskisSuccess,
            isError: adminConnectKioskisError,
            error: adminConnectKioskerror,
            isLoading: adminConnectKioskisLoading
        }
    ] = useAdminConnectKioskMutation()

    const [
        getAllSalonsByAdmin,
        {
            data: getAllSalonsByAdmindata,
            isSuccess: getAllSalonsByAdminisSuccess,
            isError: getAllSalonsByAdminisError,
            error: getAllSalonsByAdminerror,
            isLoading: getAllSalonsByAdminisLoading
        }
    ] = useGetAllSalonsByAdminMutation()


    useEffect(() => {
        if (adminInfo?.email) {
            const salondata = {
                email: adminInfo?.email,
                role: adminInfo?.role,
            }
            getDefaultSalonByKiosk(salondata)
            getAllSalonsByAdmin(adminInfo?.email)
        }
    }, [adminInfo])

    useEffect(() => {
        if (adminInfo && isSuccess) {
            setSalonName(data?.response?.salonName)
            setSalonId(data?.response?.salonId)
        }

    }, [adminInfo, isSuccess])

    useEffect(() => {
        if (adminConnectKioskisSuccess) {
            localStorage.setItem("salonSelect", "true")
            navigate('/kiosk')
            window.location.reload()
        }
    }, [adminConnectKioskisSuccess, navigate])


    useEffect(() => {
        if (adminInfo && adminInfo?.salonId === 0) {
            localStorage.setItem('adminkiyoskloggin', 'false')
            localStorage.setItem('adminkiyosktoken', 'null')
            localStorage.setItem('salonSelect', 'false')
            navigate('/')
            toast.error("Salon is not Present", {
                duration: 3000,
                style: {
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }, [adminInfo])


    const [salonlistdrop, setSalonListDrop] = useState(false)


    const salonHandler = (currentsalon) => {
        setSalonId(currentsalon.salonId)
        setSalonName(currentsalon.salonName)
        setSalonListDrop(false)
    }

    const applySalonHandler = () => {

        const admindata = {
            adminEmail: adminInfo?.email,
            salonId
        }

        if (salonId !== "") {
            localStorage.setItem("ConnectedSalonId", salonId)
            adminConnectKiosk(admindata)
        } else {
            alert("Salon Id cannot be empty")
        }

    }

    const continueHandler = () => {
        localStorage.setItem("salonSelect", "true")
        navigate('/kiosk')
        window.location.reload()
    }

    // console.log(adminInfo)

    const logoutHandler = () => {
        localStorage.setItem('adminkiyoskloggin', 'false')
        localStorage.setItem('adminkiyosktoken', '')
        localStorage.setItem("salonSelect", "false")
        navigate('/')
    }

    return (
        <main className={style.select_salon_container}
            style={{
                backgroundColor: colors.color4
            }}
        >
            <div className={style.select_salon_container_left}>
                <img src="./Forgot_Password.png" alt="salon_selection_img" />
            </div>

            <div className={style.select_salon_container_right}>
                {
                    Object.keys(adminInfo).length > 0 && (
                        <div className={style.salon_selection_container}>
                            <h2>Welcome Back, {adminInfo?.name}</h2>

                            {
                                adminInfo?.role === "Barber" ? (<p>Continue to access the Kiosk Dashboard</p>) : (<p>Kindly select a salon from the available options to proceed.</p>)
                            }

                            <div className={style.selection_box_container}>
                                <p></p>
                                {
                                    adminInfo?.role === "Barber" ? null : adminInfo?.role === "Admin" ? <div>
                                        <ClickAwayListener onClickAway={() => setSalonListDrop(false)}>
                                            <div
                                                style={{
                                                    backgroundColor: colors.cardColor,
                                                    border: `0.1rem solid ${colors.queueBorder}`
                                                }}
                                                onClick={() => setSalonListDrop((prev) => (!prev))}>
                                                <p>{!salonName ? "Select Salon" : salonName}</p>
                                                <div style={{ color: colors.color3 }}><IoMdArrowDropdownCircle /></div>


                                                {salonlistdrop && <main
                                                    className={style.salondropdown_box}
                                                    style={{
                                                        height: getAllSalonsByAdmindata?.salons?.length > 0 && getAllSalonsByAdmindata?.salons?.length <= 4 ? "auto" : "20rem",
                                                        backgroundColor: colors.color4,
                                                        border: `0.1rem solid ${colors.queueBorder}`,
                                                        zIndex: 999,
                                                        opacity: 1
                                                    }}
                                                >
                                                    {getAllSalonsByAdmindata?.salons?.length > 0 &&
                                                        getAllSalonsByAdmindata?.salons.map((s, i) => (
                                                            <div key={s._id} onClick={(e) => {
                                                                e.stopPropagation();
                                                                salonHandler(s);
                                                            }}
                                                                style={{
                                                                    // backgroundColor: salonName === s.salonName ? "var(--primary-color)" : "",
                                                                    // borderBottom: i === getAllSalonsByAdmindata?.salons.length - 1 ? "none" : "1px solid #00000",
                                                                    // borderTop: i === 0 && "none"
                                                                }}
                                                            ><p style={{
                                                                color: salonName === s.salonName && colors.color3,
                                                                opacity: salonName === s.salonName && 1,
                                                                fontWeight: salonName === s.salonName && 600
                                                            }}>{s.salonName}</p></div>
                                                        ))
                                                    }
                                                </main>}
                                            </div>
                                        </ClickAwayListener>
                                    </div> : null
                                }

                                {
                                    adminInfo?.role === "Barber" ? <button
                                        style={{
                                            backgroundColor: modecolors.color1,
                                            color: modecolors?.color2
                                        }}
                                        onClick={continueHandler} className={style.salon_selection_btn}>Continue</button> : adminInfo?.role === "Admin" ? Object.keys(adminInfo).length > 0 && adminConnectKioskisLoading ? <button
                                            style={{
                                                backgroundColor: modecolors.color1,
                                                color: modecolors?.color2
                                            }}
                                            className={style.salon_selection_btn}><ColorRing
                                                visible={true}
                                                height="4rem"
                                                width="4rem"
                                                ariaLabel="color-ring-loading"
                                                wrapperStyle={{}}
                                                wrapperClass="color-ring-wrapper"
                                                colors={[modecolors?.color2, modecolors?.color2, modecolors?.color2, modecolors?.color2, modecolors?.color2]}
                                            /></button> : <button
                                                disabled={!salonName}
                                                style={{
                                                    backgroundColor: modecolors.color1,
                                                    color: modecolors?.color2,
                                                    opacity: salonName ? 1 : 0.4
                                                }}
                                                onClick={applySalonHandler} className={style.salon_selection_btn}>Apply</button> : null
                                }

                            </div>
                        </div>
                    )
                }

            </div>
        </main>
    )
}

export default SalonSelection

