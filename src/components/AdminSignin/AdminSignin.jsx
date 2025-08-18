import React, { useEffect, useState } from 'react'
import style from './AdminSignin.module.css'
import { useNavigate } from 'react-router-dom'
import { useLoginKioskMutation, useGoogleAdminLoginKioskMutation } from './adminsigninApiSlice'
import toast from 'react-hot-toast'
import { setAdminToken } from './adminauthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { ColorRing } from 'react-loader-spinner'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { setDefaultModeColor } from '../app/modeColorSlice'

const AdminSignin = () => {

    const { colors, currentTheme } = useSelector(state => state.theme);
    const { modecolors } = useSelector(state => state.modeColor)

    const [role, setRole] = useState("Admin")

    const [login, {
        data,
        isSuccess,
        isError,
        isLoading,
        error
    }] = useLoginKioskMutation()



    const [
        googleAdminLoginKiosk,
        {
            data: googleAdminLoginKioskdata,
            isSuccess: googleAdminLoginKioskisSuccess,
            isError: googleAdminLoginKioskisError,
            isLoading: googleAdminLoginKioskisLoading,
            error: googleAdminLoginKioskerror
        }
    ] = useGoogleAdminLoginKioskMutation()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setDefaultModeColor({ modeColor: "default", theme: currentTheme }))
    }, [currentTheme])

    // useEffect(() => {
    //     if (isSuccess) {
    //         localStorage.setItem('adminkiyosktoken', data?.token)
    //         localStorage.setItem('adminkiyoskloggin', 'true')
    //         dispatch(setAdminToken(data))
    //         localStorage.setItem("salonSelect", "false")
    //         navigate("/selectsalon")
    //     } else if (isError) {
    //         toast.error(error?.data?.message, {
    //             duration: 3000,
    //             style: {
    //                 fontSize: "var(--tertiary-text)",
    //                 borderRadius: '0.3rem',
    //                 background: '#333',
    //                 color: '#fff',
    //             },
    //         });
    //     }
    // }, [isSuccess, isError, navigate])


    useEffect(() => {
        if (!isSuccess || !data) return;

        if (data?.foundUser?.role === "Admin") {
            localStorage.setItem('adminkiyosktoken', data?.token)
            localStorage.setItem('adminkiyoskloggin', 'true')
            dispatch(setAdminToken(data))
            localStorage.setItem("salonSelect", "false")
            navigate("/selectsalon")
        } else if (data?.foundUser?.role === "Barber") {
            localStorage.setItem('adminkiyosktoken', data?.token)
            localStorage.setItem('adminkiyoskloggin', 'true')
            localStorage.setItem('ConnectedSalonId', data?.foundUser?.salonId)
            dispatch(setAdminToken(data))
            localStorage.setItem("salonSelect", "false")
            navigate("/selectsalon")
            console.log("Login Barber");
        } else if (isError) {
            toast.error(error?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }, [isSuccess, data, isError, navigate]);


    // useEffect(() => {
    //     if (googleAdminLoginKioskisSuccess) {
    //         localStorage.setItem('adminkiyosktoken', googleAdminLoginKioskdata?.token)
    //         localStorage.setItem('adminkiyoskloggin', 'true')
    //         dispatch(setAdminToken(googleAdminLoginKioskdata))
    //         localStorage.setItem("salonSelect", "false")
    //         navigate("/selectsalon")
    //     } else if (googleAdminLoginKioskisError) {
    //         toast.error(googleAdminLoginKioskerror?.data?.message, {
    //             duration: 3000,
    //             style: {
    //                 fontSize: "var(--tertiary-text)",
    //                 borderRadius: '0.3rem',
    //                 background: '#333',
    //                 color: '#fff',
    //             },
    //         });
    //     }
    // }, [googleAdminLoginKioskisSuccess, googleAdminLoginKioskisError, navigate])

    useEffect(() => {

        if (!googleAdminLoginKioskisSuccess || !googleAdminLoginKioskdata) return;

        if (googleAdminLoginKioskdata?.foundUser?.role === "Admin") {
            localStorage.setItem('adminkiyosktoken', googleAdminLoginKioskdata?.token)
            localStorage.setItem('adminkiyoskloggin', 'true')
            dispatch(setAdminToken(googleAdminLoginKioskdata))
            localStorage.setItem("salonSelect", "false")
            navigate("/selectsalon")
        } else if (googleAdminLoginKioskdata?.foundUser?.role === "Barber") {
            localStorage.setItem('adminkiyosktoken', googleAdminLoginKioskdata?.token)
            localStorage.setItem('adminkiyoskloggin', 'true')
            localStorage.setItem('ConnectedSalonId', googleAdminLoginKioskdata?.foundUser?.salonId)
            dispatch(setAdminToken(googleAdminLoginKioskdata))
            localStorage.setItem("salonSelect", "false")
            navigate("/selectsalon")
        } else if (googleAdminLoginKioskisError) {
            toast.error(googleAdminLoginKioskerror?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }, [googleAdminLoginKioskisSuccess, googleAdminLoginKioskdata, googleAdminLoginKioskisError, navigate])

    const loginHandler = async () => {
        const data = { email, password, role }
        login(data)
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            loginHandler();
        }
    };

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

                // console.log('User Info:', userInfo.data);

                // console.log(role)

                googleAdminLoginKiosk({ email: userInfo.data.email, role })

            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        },
    });

    return (
        <main
            className={style.admin__signin__main__container}
            style={{
                backgroundColor: colors.color4
            }}
        >
            <div
                className={style.admin__signin__main__left}>
                <img src="/Signup.png" alt="signin" />
            </div>

            <div className={style.admin__signin__main__right}>

                <div className={style.admin_signin_form_container}>
                    <div><img
                        src="./IQB-Logo.png" alt="iqb_logo"
                        style={{
                            filter: currentTheme === "Dark" ? "brightness(0) invert(1)" : "brightness(0) invert(0)"
                        }}

                    /></div>
                    {/* <p>Effortlessly manage your salon with IQB! Oversee barbers, adjust settings, and enable easy Barber Login. Customers can join the queue in a tap.</p> */}

                    <div className={style.rolediv}>
                        <div>
                            <div
                                style={{
                                    backgroundColor: colors.cardColor,
                                    border: `0.1rem solid ${colors.queueBorder}`
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={role === "Admin" ? true : false}
                                    onChange={() => setRole("Admin")}
                                    onKeyDown={handleKeyPress}
                                    style={{
                                        accentColor: "red"
                                    }}
                                />
                                <p>Admin</p>
                            </div>

                            <div
                                style={{
                                    backgroundColor: colors.cardColor,
                                    border: `0.1rem solid ${colors.queueBorder}`
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={role === "Barber" ? true : false}
                                    onChange={() => setRole("Barber")}
                                    onKeyDown={handleKeyPress}
                                    style={{
                                        accentColor: "red"
                                    }}
                                />
                                <p>Barber</p>
                            </div>
                        </div>
                    </div>

                    <div className={style.email_container}>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter Your Email'
                            onKeyDown={handleKeyPress}
                            style={{
                                backgroundColor: colors.cardColor,
                                border: `0.1rem solid ${colors.queueBorder}`
                            }}
                        />

                    </div>

                    <div className={style.password_container}
                        style={{
                            backgroundColor: colors.cardColor,
                            border: `0.1rem solid ${colors.queueBorder}`
                        }}
                    >
                        <input
                            type={showPassword ? "text" : "password"}
                            id="input_password"
                            placeholder='Enter Your Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <div
                            style={{ color: colors.color3 }}
                            onClick={() => setShowPassword((prev) => !prev)}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</div>
                    </div>



                    {isLoading ? <button
                        style={{
                            backgroundColor: modecolors.color1
                        }}
                        className={style.signin_btn}><ColorRing
                            visible={true}
                            height="4rem"
                            width="4rem"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={[modecolors?.color2, modecolors?.color2, modecolors?.color2, modecolors?.color2, modecolors?.color2]}
                        /></button> : <button
                            style={{
                                backgroundColor: modecolors.color1,
                                color: modecolors?.color2
                            }}
                            onClick={loginHandler}
                            className={style.signin_btn}
                        >Sign in</button>}

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

                </div>

            </div>
        </main>
    )
}

export default AdminSignin
