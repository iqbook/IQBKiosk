import React, { useEffect, useState } from 'react'
import style from './BarberServeLogin.module.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { ColorRing } from 'react-loader-spinner'
import { selectCurrentAdminInfo } from '../../AdminSignin/adminauthSlice'
import { setToken } from '../../barber/Signin/barberauthSlice'
import { useBarberServedQueueMutation } from '../QueueApiSlice'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { ClickAwayListener, Skeleton } from '@mui/material'
import { DropdownIcon } from '../../../icons'
import { useLazyGetAllBarbersBySalonIdQuery } from '../../public/publicApiSlice'

const BarberServeLogin = () => {

    const location = useLocation()

    const adminInfo = useSelector(selectCurrentAdminInfo)

    const [
        getAllBarbersBySalonId,
        {
            data,
            isSuccess,
            isError,
            error,
            isLoading
        }
    ] = useLazyGetAllBarbersBySalonIdQuery()


    const [password, setPassword] = useState("")
    const [barberemail, setBarberEmail] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [
        servequeuefunction,
        {
            data: servequeuedata,
            isSuccess: serverqueueisSuccess,
            isError: servequeueisError,
            error: servequeueError,
            isLoading: servequeueisLoading
        }
    ] = useBarberServedQueueMutation()

    useEffect(() => {
        if (servequeueisError) {
            toast.error(servequeueError?.data?.message, {
                duration: 3000,
                style: {
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    }, [servequeueisError])


    useEffect(() => {
        if (serverqueueisSuccess) {
            toast.success(servequeuedata.message, {
                duration: 3000,
                style: {
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });

            navigate("/queuelist", { ...location, state: {} });
        }
    }, [serverqueueisSuccess, navigate])

    const serveQueueHandler = () => {

        const confirm = window.confirm("Are you Sure ?")

        const queueData = {
            barberId: location?.state?.barberId,
            salonId: adminInfo?.salonId,
            services: location?.state?.services,
            _id: location?.state?._id,
            barberEmail: chooseBarberEmail,
            updatedByEmail: barberemail,
            password: password,
        }

        // console.log("Console ", queueData)

        if (confirm) {
            servequeuefunction(queueData)
        }

    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            serveQueueHandler();
        }
    };

    const [drop, setDrop] = useState(false)


    const [emailTimeout, setEmailTimeout] = useState(null);

    useEffect(() => {
        dispatch(setToken())
    }, [dispatch])



    const [showPassword, setShowPassword] = useState(false)

    const [chooseBarberEmail, setChooseBarberEmail] = useState(location?.state?.barberEmail)
    const [chooseBarberDrop, setChooseBarberDrop] = useState(false)

    const dropdownHandler = () => {
        setChooseBarberDrop((prev) => !prev)
    }

    const debounceSearch = (value) => {
        if (emailTimeout) {
            clearTimeout(emailTimeout);
        }

        setChooseBarberEmail(value);

        setEmailTimeout(setTimeout(() => {
            setChooseBarberEmail(value);
            const salonId = adminInfo?.salonId
            // email: value
            getAllBarbersBySalonId({ email: value, salonId });
        }, 500));
    };

    const setChooseBarberEmailHandler = (e) => {
        const searchTerm = e.target.value;
        setChooseBarberDrop(true)
        debounceSearch(searchTerm);
    }

    const selectEmailClick = (b) => {
        setChooseBarberEmail(b.email)
        setChooseBarberDrop(false)
    }

    return (
        <section className={style.barber_serve_login_container}>
            <div className={style.barber_serve_login_left}>
                <img src="./Signup.png" alt="salon_settings_img" />
            </div>
            <div className={style.barber_serve_login_right}>
                <div className={style.barber_serve_main}>
                    <p>Welcome to Barber Sign-In</p>

                    <ClickAwayListener onClickAway={() => setChooseBarberDrop(false)}>
                        <div className={style.choose_barber_selection_container} onClick={dropdownHandler}>
                            <input
                                type="text"
                                placeholder='Choose Barber'
                                value={chooseBarberEmail}
                                onChange={(e) => setChooseBarberEmailHandler(e)}
                                onKeyDown={handleKeyPress}
                            />
                            <div>
                                <DropdownIcon />
                            </div>

                            {
                                chooseBarberDrop && <main className={style.choose_email_selection_dropdown}>
                                    {
                                        isLoading ? (<div className={style.choose_barber_email_selection_dropdown_loading}>
                                            <Skeleton variant="rectangular" className={style.skeleton} />
                                            <Skeleton variant="rectangular" className={style.skeleton} />
                                            <Skeleton variant="rectangular" className={style.skeleton} />
                                        </div>) :
                                            isSuccess && data?.getAllBarbers?.length > 0 ? (
                                                data?.getAllBarbers?.map((b) => {
                                                    return (
                                                        <div className={style.choose_barber_dropdown_item} key={b._id}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                selectEmailClick(b);
                                                            }}
                                                            style={{
                                                                borderLeft: b.isOnline ? "0.5rem solid limegreen" : "0.5rem solid red",
                                                                outline: chooseBarberEmail === b?.email ? "0.1rem solid #000" : "none"
                                                            }}
                                                        >
                                                            <div>
                                                                <img src={b?.profile?.[0]?.url} alt="img" />
                                                                <div className={style.barber_online_dot}
                                                                    style={{
                                                                        backgroundColor: b.isOnline ? "limegreen" : "red"
                                                                    }}
                                                                ></div>
                                                            </div>
                                                            <div>
                                                                <p>{b.name}</p>
                                                                <p>Queue Count : {b.queueCount}</p>
                                                                <p>EWT : {b.barberEWT} mins</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })

                                            ) :
                                                (<div className={style.choose_barber_email_selection_dropdown_error}>
                                                    <p>No barber available</p>
                                                </div>)
                                    }
                                </main>
                            }

                        </div>
                    </ClickAwayListener>

                    <div className={style.email_container}>
                        <input
                            type="text"
                            value={barberemail}
                            onChange={(e) => setBarberEmail(e.target.value)}
                            placeholder='Enter Your Email'
                            onKeyDown={handleKeyPress}
                        />

                    </div>

                    <div className={style.password_container}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="input_password"
                            placeholder='Enter Your Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <div onClick={() => setShowPassword((prev) => !prev)}>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</div>
                    </div>

                    {servequeueisLoading ? <button className={style.signin_btn}><ColorRing
                        visible={true}
                        height="4rem"
                        width="4rem"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                    /></button> : <button
                        onClick={serveQueueHandler}
                        className={style.signin_btn}
                    >Serve</button>}

                </div>
            </div>
        </section>
    )
}

export default BarberServeLogin