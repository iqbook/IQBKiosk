import React, { useEffect, useState } from 'react'
import style from './SalonSignin.module.css'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { ColorRing } from 'react-loader-spinner'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { useLoginKioskMutation, useGoogleAdminLoginKioskMutation } from '../../AdminSignin/adminsigninApiSlice'
import { selectCurrentAdminInfo } from '../../AdminSignin/adminauthSlice'
import { useGoogleSalonAccountLoginMutation, useSalonAccountLoginMutation } from '../salonSlice'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

const SalonSignin = () => {

    const connectedSalonId = localStorage.getItem("ConnectedSalonId")

    const { colors, currentTheme } = useSelector(state => state.theme);
    const { modecolors } = useSelector(state => state.modeColor)

    const adminInfo = useSelector(selectCurrentAdminInfo)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("Admin")

    const navigate = useNavigate()

    const [
        salonAccountLogin,
        {
            data: salonlogindata,
            isSuccess: salonloginisSuccess,
            isError: salonloginisError,
            error: salonloginerror,
            isLoading: salonloginisLoading
        }
    ] = useSalonAccountLoginMutation()

    const [
        googleSalonAccountLogin,
        {
            data: salongooglelogindata,
            isSuccess: salongoogleloginisSuccess,
            isError: salongoogleloginisError,
            error: salongoogleloginerror,
            isLoading: salongoogleloginisLoading
        }
    ] = useGoogleSalonAccountLoginMutation()


    useEffect(() => {
        if (salonloginisSuccess) {
            localStorage.setItem("adminsalonsettings", "true")
            navigate("/salonsettings")
        } else if (salonloginisError) {
            toast.error(salonloginerror?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }, [salonloginisSuccess, salonloginisError, navigate])


    useEffect(() => {
        if (salongoogleloginisSuccess) {
            localStorage.setItem("adminsalonsettings", "true")
            navigate("/salonsettings")
        } else if (salongoogleloginisError) {
            toast.error(salongoogleloginerror?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }, [salongoogleloginisSuccess, salongoogleloginisError, navigate])

    const loginHandler = async () => {
        const data = { email, password, role, salonId: connectedSalonId }
        salonAccountLogin(data)

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

                const data = { email: userInfo.data.email, role, salonId: connectedSalonId }

                googleSalonAccountLogin(data)

            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        },
    });

    return (
        <main className={style.admin__signin__main__container}
            style={{
                backgroundColor: colors.color4
            }}
        >
            <div className={style.admin__signin__main__left}>
                <img src="./Signup.png" alt="signin" />
            </div>

            <div className={style.admin__signin__main__right}>

                <div className={style.admin_signin_form_container}>
                    <h2>Welcome to Salon Sign-In</h2>

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



                    {salonloginisLoading ? <button
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

export default SalonSignin
