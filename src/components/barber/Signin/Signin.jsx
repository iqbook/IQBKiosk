import React, { useEffect, useState } from 'react'
import style from './Signin.module.css'
import { DropdownIcon } from '../../../icons'
import { useBarberLoginKioskMutation, useGoogleBarberLoginKioskMutation, useLazyGetAllBarbersKioskQuery } from './signinApiSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials, setToken } from './barberauthSlice'
import toast from 'react-hot-toast'
import { selectCurrentAdminInfo } from '../../AdminSignin/adminauthSlice'
import { ColorRing } from 'react-loader-spinner'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { ClickAwayListener, Skeleton } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

const Signin = () => {

    const connectedSalonId = localStorage.getItem("ConnectedSalonId")

    const { colors, currentTheme } = useSelector(state => state.theme);
    const { modecolors } = useSelector(state => state.modeColor)

    const adminInfo = useSelector(selectCurrentAdminInfo)

    const [
        getAllBarbersKiosk,
        {
            data,
            isSuccess,
            isError,
            error,
            isLoading
        }
    ] = useLazyGetAllBarbersKioskQuery()

    const [
        googleBarberLoginKiosk,
        {
            data: barbergooglelogindata,
            isSuccess: barbergoogleloginisSuccess,
            isError: barbergoogleloginisError,
            error: barbergoogleerror,
            isLoading: barbergoogleisloading
        }
    ] = useGoogleBarberLoginKioskMutation()

    const [
        barberLoginKiosk,
        {
            data: barberlogindata,
            isSuccess: barberloginisSuccess,
            isError: barberloginisError,
            error: barbererror,
            isLoading: barberisloading
        }
    ] = useBarberLoginKioskMutation()

    const [password, setPassword] = useState("")
    const [barberemail, setBarberEmail] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (barberloginisSuccess) {
            dispatch(setCredentials(barberlogindata))
            navigate('/kiyoskdashboard')
        } else if (barberloginisError) {
            toast.error(barbererror?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }, [dispatch, navigate, barberloginisSuccess, barberloginisError])

    useEffect(() => {
        if (barbergoogleloginisSuccess) {
            dispatch(setCredentials(barbergooglelogindata))
            localStorage.setItem('barberkiyoskloggin', 'true')
            navigate('/kiyoskdashboard')
        } else if (barbergoogleloginisError) {
            toast.error(barbergoogleerror?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }, [dispatch, navigate, barbergoogleloginisSuccess, barbergoogleloginisError])

    const barberSigninHandler = () => {
        const barberdata = { email: barberemail, password }
        barberLoginKiosk(barberdata)

    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            barberSigninHandler();
        }
    };

    const [drop, setDrop] = useState(false)

    const dropdownHandler = () => {
        setDrop((prev) => !prev)
        const salonId = connectedSalonId

        getAllBarbersKiosk({
            salonId,
            email: barberemail
        })
    }

    const [emailTimeout, setEmailTimeout] = useState(null);

    const debounceSearch = (value) => {
        if (emailTimeout) {
            clearTimeout(emailTimeout);
        }

        setBarberEmail(value);

        setEmailTimeout(setTimeout(() => {
            setBarberEmail(value);
            const salonId = connectedSalonId
            getAllBarbersKiosk({ email: value, salonId });
        }, 500));
    };

    const setBarberEmailHandler = (e) => {
        const searchTerm = e.target.value;
        setDrop(true)
        debounceSearch(searchTerm);
    }

    const selectEmailClick = (b) => {
        setBarberEmail(b.email)
        setDrop(false)
    }

    useEffect(() => {
        dispatch(setToken())
    }, [dispatch])


    const [showPassword, setShowPassword] = useState(false)

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const { access_token } = tokenResponse;

                const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                });

                const data = { email: userInfo.data.email }

                googleBarberLoginKiosk(data)

            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        },
    });

    return (
        <main className={style.barber_signin_container}
            style={{
                backgroundColor: colors.color4
            }}
        >
            <div className={style.barber_signin_container_left}>
                <img src="./Signup.png" alt="signin" />
            </div>
            <div className={style.barber_signin_container_right}>
                <main className={style.barber_signin_content_main}>
                    <h2>Welcome to Barber SignIn</h2>

                    <ClickAwayListener onClickAway={() => setDrop(false)}>
                        <div

                            className={style.barber_email_selection_container} onClick={dropdownHandler}>
                            <input
                                type="text"
                                placeholder='Search Barber'
                                value={barberemail}
                                onChange={(e) => setBarberEmailHandler(e)}
                                onKeyDown={handleKeyPress}
                                style={{
                                    backgroundColor: colors.cardColor,
                                    border: `0.1rem solid ${colors.queueBorder}`
                                }}
                            />
                            <div
                                style={{ color: colors.color3 }}
                            >
                                <DropdownIcon />
                            </div>


                            {drop && <main
                                style={{
                                    backgroundColor: colors.cardColor,
                                    border: `0.1rem solid ${colors.queueBorder}`
                                }}
                                className={style.barber_email_selection_dropdown}>

                                {
                                    isLoading ? (<div className={style.barber_email_selection_dropdown_loading}>
                                        <Skeleton variant="rectangular" className={style.skeleton} />
                                        <Skeleton variant="rectangular" className={style.skeleton} />
                                        <Skeleton variant="rectangular" className={style.skeleton} />
                                    </div>) :
                                        isSuccess && data?.response?.length > 0 ? (
                                            data?.response?.map((b) => {
                                                return (
                                                    <div className={style.barber_dropdown_item} key={b._id}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            selectEmailClick(b);
                                                        }}
                                                        style={{
                                                            // background: barberemail === b.email && "var(--primary-color)",
                                                        }}
                                                    >
                                                        <p style={{
                                                            color: barberemail === b.email && colors.color3,
                                                            opacity: barberemail === b.email && 1,
                                                            fontWeight: barberemail === b.email && 600
                                                        }}>{b.email}</p>
                                                    </div>
                                                )
                                            })

                                        ) :
                                            (<div className={style.barber_email_selection_dropdown_error}>
                                                <p>No barber available</p>
                                            </div>)
                                }

                            </main>}

                        </div>
                    </ClickAwayListener>

                    <div
                        style={{
                            backgroundColor: colors.cardColor,
                            border: `0.1rem solid ${colors.queueBorder}`
                        }}
                        className={style.password_container}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="input_password"
                            placeholder='Enter Your Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <div style={{ color: colors.color3 }} onClick={() => setShowPassword((prev) => !prev)}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</div>
                    </div>

                    {
                        barberisloading ? (<button
                            style={{
                                backgroundColor: modecolors.cardColor
                            }}
                            className={style.signin_btn}><ColorRing
                                visible={true}
                                height="4rem"
                                width="4rem"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={[modecolors?.color2, modecolors?.color2, modecolors?.color2, modecolors?.color2, modecolors?.color2]}
                            /></button>) : (<button
                                style={{
                                    backgroundColor: modecolors.color1,
                                    color: modecolors?.color2
                                }}
                                className={style.signin_btn}
                                onClick={barberSigninHandler}
                            >Sign in</button>)
                    }

                    <button onClick={() => googleLogin()}
                        className={`${style.google_btn}`}
                        style={{
                            backgroundColor: colors.cardColor,
                            border: `0.1rem solid ${colors.queueBorder}`
                        }}
                    >
                        <div>
                            <div><img src="/google_logo.png" alt="logo" /></div>
                            <p>Sign in with Google </p>
                        </div>
                    </button>

                </main>
            </div>
        </main>
    )
}

export default Signin