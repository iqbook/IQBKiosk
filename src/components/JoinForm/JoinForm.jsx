import React, { useEffect, useRef, useState } from 'react'
import style from './JoinForm.module.css';
import { PhoneInput } from 'react-international-phone';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { useGlobal } from '../../context/GlobalContext';

const JoinForm = () => {

    const { colors } = useSelector(state => state.theme);
    const { modecolors } = useSelector(state => state.modeColor)
    const navigate = useNavigate()

    // const [customerName, setCustomerName] = useState("")
    // const [mobileNumber, setMobileNumber] = useState("")
    // const [customerEmail, setCustomerEmail] = useState("")

    const phoneInputUseRef = useRef()

    // const [countryflag, setCountryFlag] = useState("gb")

    const {
        customerName,
        setCustomerName,
        mobileNumber,
        setMobileNumber,
        customerEmail,
        setCustomerEmail,
        countryflag,
        setCountryFlag,
        mobileCountryCode,
        setMobileCountryCode
    } = useGlobal()

    useEffect(() => {
        if (phoneInputUseRef.current) {
            phoneInputUseRef.current.style.color = colors.color3
        }

    }, [colors])

    const [invalidNumber, setInvalidNumber] = useState(false)

    const [nameError, setNameError] = useState("")
    const [invalidNumberError, setInvalidNumberError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [servicesError, setServicesError] = useState("")
    const [barberError, setBarberError] = useState("")
    const [mobileNumberError, setMobileNumberError] = useState("")

    const phoneUtil = PhoneNumberUtil.getInstance();

    const isPhoneValid = (phone) => {
        try {
            return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
        } catch (error) {
            return false;
        }
    };

    const handlePhoneChange = (phone, meta) => {
        setInvalidNumberError("")
        const { country } = meta;

        // if (phone.length == 3) {
        //     setInvalidNumber(false);
        //     return;
        // }
        setMobileNumberError(phone)

        const isValid = isPhoneValid(phone);

        if (isValid) {
            setMobileNumber(phone);
            setMobileCountryCode(country?.dialCode);
            setCountryFlag(country?.iso2);
            setInvalidNumber(false);
        } else {
            setInvalidNumber(true);
        }
    };


    const adminInfo = useSelector(selectCurrentAdminInfo)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const continueHandler = () => {

        if (!customerName) {
            toast.error("Please enter customer name", {
                duration: 3000,
                style: {
                    fontSize: "var(--tertiary-text)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });

            return setNameError("Please enter customer name")
        }

        if (customerName.length === 0 || customerName.length > 20) {
            toast.error("Customer name must be between 1 to 20 characters", {
                duration: 3000,
                style: {
                    fontSize: "var(--list-modal-header-normal-font)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });
            return setNameError("Customer name must be between 1 to 20 characters");
        }



        if (mobileNumberError.length > 3 && invalidNumber) {
            toast.error("Invalid Number", {
                duration: 3000,
                style: {
                    fontSize: "var(--list-modal-header-normal-font)",
                    borderRadius: '0.3rem',
                    background: '#333',
                    color: '#fff',
                },
            });

            return setInvalidNumberError("Invalid Number")
        }


        if (customerEmail && !emailRegex.test(customerEmail)) {
            toast.error("Invalid email format", {
                duration: 3000,
                style: {
                    fontSize: "var(--list-modal-header-normal-font)",
                    borderRadius: "0.3rem",
                    background: "#333",
                    color: "#fff",
                },
            });
            return setEmailError("Invalid email format");
        }

        // navigate("/salonServices", {
        //     state: {
        //         customerName,
        //         customerEmail,
        //         mobileNumber,
        //         countryflag
        //     }
        // });

        navigate("/salonServices")
    }

    return (
        <main
            className={style.container}
            style={{
                backgroundColor: colors.color4
            }}
        >
            <div>
                <div
                    className={style.inputWrapper}
                >
                    <p>Full Name</p>
                    <input
                        type="text"
                        name="fullname"
                        placeholder='Enter Your Full Name'
                        value={customerName}
                        onChange={(e) => {
                            setNameError("")
                            setCustomerName(e.target.value)
                        }}
                        style={{
                            backgroundColor: colors.cardColor,
                            border: `0.1rem solid ${colors.queueBorder}`
                        }}
                    />

                    {nameError && <p className={style.error_message}>{nameError}</p>}
                </div>

                <div className={style.inputWrapper}>
                    <p>Email (Optional)</p>
                    <input
                        type="text"
                        name="email"
                        placeholder='Enter Your Email ID'
                        value={customerEmail}
                        onChange={(e) => {
                            setEmailError("")
                            setCustomerEmail(e.target.value)
                        }}
                        style={{
                            backgroundColor: colors.cardColor,
                            border: `0.1rem solid ${colors.queueBorder}`
                        }}
                    />

                    {emailError && <p className={style.error_message}>{emailError}</p>}
                </div>

                <div className={style.mobileInputWrapper}>
                    <p>Phone Number (Optional)</p>

                    <PhoneInput
                        forceDialCode={true}
                        defaultCountry={countryflag}
                        value={mobileNumber}
                        onChange={(phone, meta) => handlePhoneChange(phone, meta)}
                        ref={phoneInputUseRef}
                        className={style.phoneInput}
                        style={{
                            backgroundColor: colors.cardColor,
                            border: `0.1rem solid ${colors.queueBorder}`
                        }}
                    />

                    {invalidNumberError && (
                        <p className={style.error_message}>{invalidNumberError}</p>
                    )}

                </div>

                <button
                    className={style.btn}
                    style={{
                        backgroundColor: modecolors.color1,
                        color: modecolors?.color2
                    }}
                    onClick={() => continueHandler()}
                >Continue</button>
            </div>

        </main>
    )
}

export default JoinForm