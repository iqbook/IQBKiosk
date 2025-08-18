// import React, { useEffect, useRef, useState } from 'react';
// import style from './Public.module.css';
// import { AddIcon, BackIcon, ClockIcon, DeleteIcon, DropdownIcon, NextQueueIcon, PersonIcon, TotalQueueIcon } from '../../icons';
// import Marquee from "react-fast-marquee";
// import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { useGetDefaultSalonByKioskMutation } from './publicApiSlice';
// import { useGetBarberByServicesKioskMutation, useGetServicesByBarberKioskMutation, useJoinQueueKioskMutation, useLazyGetAllSalonServicesKioskQuery, useLazyGetAvailableBarbersForQKioskQuery } from '../JoinQueue/joinqueueApiSlice';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { PhoneNumberUtil } from 'google-libphonenumber';
// import { PhoneInput } from 'react-international-phone';
// import { Modal as MuiModal, Skeleton } from '@mui/material';
// import { MdClose } from 'react-icons/md'
// import { ColorRing } from 'react-loader-spinner';
// import { RiVipCrownFill } from 'react-icons/ri';
// import Modal from '../modal/Modal';
// import { GoogleLogin } from '@react-oauth/google'

// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import { BiCrown } from 'react-icons/bi';

// const Public = () => {

//   const { colors, currentTheme } = useSelector(state => state.theme);
//   const { modecolors } = useSelector(state => state.modeColor)


//   const adminInfo = useSelector(selectCurrentAdminInfo)


//   const [
//     getDefaultSalonByAdmin,
//     {
//       data: getDefaultSalonByAdmindata,
//       isSuccess: getDefaultSalonByAdminisSuccess,
//       isError: getDefaultSalonByAdminisError,
//       error: getDefaultSalonByAdminerror,
//       isLoading: getDefaultSalonByAdminisLoading
//     }
//   ] = useGetDefaultSalonByKioskMutation()

//   const [
//     joinQueueKiosk,
//     {
//       data: joinQueueKioskdata,
//       isSuccess: joinQueueKioskisSuccess,
//       isError: joinQueueKioskisError,
//       isLoading: joinQueueKioskloading,
//       error: joinQueueKioskerror
//     }
//   ] = useJoinQueueKioskMutation()


// useEffect(() => {
//   if (adminInfo?.email) {
//     const salondata = {
//       email: adminInfo?.email,
//       role: adminInfo?.role
//     }
//     getDefaultSalonByAdmin(salondata)
//   }

//     if (joinQueueKioskisSuccess) {
//       const salondata = {
//         email: adminInfo?.email,
//         role: adminInfo?.role
//       }
//       getDefaultSalonByAdmin(salondata)

//     }
//   }, [adminInfo, joinQueueKioskisSuccess])


//   const [
//     getavailablebarber,
//     {
//       data: getavailablebarberdata,
//       isSuccess: getavailablebarberisSuccess,
//       isError: getavailablebarberisError,
//       isLoading: getavailablebarberloading,
//       error: getavailablebarbererror
//     }
//   ] = useLazyGetAvailableBarbersForQKioskQuery()

//   const [
//     getServicesByBarber,
//     {
//       data: getServicesByBarberdata,
//       isSuccess: getServicesByBarberisSuccess,
//       isError: getServicesByBarberisError,
//       isLoading: getServicesByBarberloading,
//       error: getServicesByBarbererror
//     }
//   ] = useGetServicesByBarberKioskMutation()

//   const [
//     getAllSalonServices,
//     {
//       data: getAllSalonServicesdata,
//       isSuccess: getAllSalonServicesisSuccess,
//       isError: getAllSalonServicesisError,
//       isLoading: getAllSalonServicesloading,
//       error: getAllSalonServiceserror
//     }
//   ] = useLazyGetAllSalonServicesKioskQuery()

//   const [
//     getBarberByServicesKiosk,
//     {
//       data: getBarberByServicesKioskdata,
//       isSuccess: getBarberByServicesKioskisSuccess,
//       isError: getBarberByServicesKioskisError,
//       isLoading: getBarberByServicesKioskloading,
//       error: getBarberByServicesKioskerror
//     }
//   ] = useGetBarberByServicesKioskMutation()



//   const [customerName, setCustomerName] = useState("")
//   const [mobileNumber, setMobileNumber] = useState("")
//   const [customerEmail, setCustomerEmail] = useState("")



//   const [isOpen, setIsOpen] = useState(false)
//   const [modal1, setModal1] = useState(false)
//   const [modal2, setModal2] = useState(false)
//   const [modal3, setModal3] = useState(false)
//   const [modal4, setModal4] = useState(false)


//   const [selectedBarber, setSelectedBarber] = useState(false)

//   const [selecteBarberdata, setSelectedBarberData] = useState(false)
//   const [selectedBarberServices, setSelectedBarberServices] = useState([])
//   const [selectedServices, setSelectedServices] = useState([])

//   const [selectedBarberId, setSelectedBarberId] = useState("")
//   const [selectedBarberImg, setSelectedBarberImg] = useState("")

//   // const SelectBarberDropdownHandler = () => {
//   //   setBarberError("")
//   //   setIsOpen(true)
//   //   setModal1(true)
//   //   getavailablebarber({ salonId: adminInfo?.salonId })
//   //   setModal2(false)
//   //   setModal3(false)
//   //   setModal4(false)
//   // }



//   const SelectBarberDropdownHandler = () => {
//     getavailablebarber({ salonId: adminInfo?.salonId })
//   }



//   // const selectbarberHandler = async () => {
//   //   setModal1(false)
//   //   setModal2(true)
//   //   await getServicesByBarber({
//   //     salonId: adminInfo?.salonId,
//   //     barberId: selectedBarberId
//   //   })
//   //   setModal3(false)
//   //   setModal4(false)
//   // }


//   const selectbarberHandler = async () => {
//     await getServicesByBarber({
//       salonId: adminInfo?.salonId,
//       barberId: selectedBarberId
//     })
//   }


//   const selectedServicesHandler = (item) => {
//     setSelectedServices([...selectedServices, item])
//   }

//   const deleteSelectServicesHandler = (itemid) => {
//     setSelectedServices(selectedServices.filter((c) => c._id !== itemid))
//   }


//   const SelectServicesDropdownHandler = () => {
//     setServicesError("")
//     setIsOpen(true)
//     setModal1(false)
//     setModal2(false)
//     setModal3(true)
//     getAllSalonServices({ salonId: adminInfo?.salonId })
//     setModal4(false)
//   }


//   const selectserviceHandler = () => {
//     setSelectedBarberServices(selectedServices)
//     setModal1(false)
//     setModal2(false)
//     setModal3(false)

//     const services = {
//       salonId: adminInfo?.salonId,
//       serviceIds: selectedServices.map((s) => s.serviceId)
//     }
//     getBarberByServicesKiosk(services)
//     setModal4(true)
//   }

//   const modaltwobackHandler = () => {
//     setModal2(false)
//     setModal1(true)
//   }

//   const modalfourbackHandler = () => {
//     setModal4(false)
//     setModal3(true)
//   }

//   // console.log("Selected ", selectedBarberId)

//   const searchSelectedBarber = (barber) => {
//     setSelectedBarberImg(barber?.profile)
//     setSelectedBarber(barber?.name)
//     setSelectedBarberData(barber?.name)
//     setSelectedBarberId(barber?.barberId)
//   }

//   // console.log("Selected barber Data ", selecteBarberdata)


//   const selectbarbercontinueHandler = () => {
//     setSelectedBarberServices(selectedServices)
//     setSelectedServices([])
//     setSelectedBarber(false)
//     setModal1(false)
//     setModal2(false)
//     setIsOpen(false)
//   }

//   const selectservicecontinueHandler = () => {
//     setSelectedServices([])
//     setSelectedBarber(false)
//     setModal3(false)
//     setModal4(false)
//     setIsOpen(false)
//   }

//   const [mobileCountryCode, setMobileCountryCode] = useState("")

//   const joinqueuedata = {
//     salonId: adminInfo?.salonId,
//     name: customerName,
//     customerEmail: customerEmail,
//     joinedQType: "Single-Join",
//     methodUsed: "Walk-In",
//     mobileNumber: Number(mobileNumber),
//     mobileCountryCode: Number(mobileCountryCode),
//     barberName: selecteBarberdata,
//     barberId: selectedBarberId,
//     services: selectedServices
//   }

//   const navigate = useNavigate()

//   useEffect(() => {
//     if (joinQueueKioskisSuccess) {
//       toast.success("Join Queue Successfully", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--tertiary-text)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });

//       setSelectedBarber("")
//       setSelectedBarberData("")
//       setSelectedBarberServices([])
//       setSelectedServices([])
//       setCustomerName("")
//       setCustomerEmail("")
//       setMobileNumber("")
//       setSelectedBarberId("")
//       setStep(0)
//       // navigate('/kiosk')
//       setJoinqueueModalOpen({
//         open: false,
//         data: {}
//       })

//     } else if (joinQueueKioskisError) {
//       toast.error(joinQueueKioskerror?.data?.message, {
//         duration: 3000,
//         style: {
//           fontSize: "var(--tertiary-text)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//     }
//   }, [joinQueueKioskisSuccess, joinQueueKioskisError, navigate])

//   const [invalidNumber, setInvalidNumber] = useState(false)

//   const [nameError, setNameError] = useState("")
//   const [invalidNumberError, setInvalidNumberError] = useState("")
//   const [emailError, setEmailError] = useState("")
//   const [servicesError, setServicesError] = useState("")
//   const [barberError, setBarberError] = useState("")
//   const [mobileNumberError, setMobileNumberError] = useState("")

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


//   const joinqueueCheckHandler = () => {
//     if (!customerName) {
//       toast.error("Please enter customer name", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--tertiary-text)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });

//       return setNameError("Please enter customer name")
//     }

//     if (customerName.length === 0 || customerName.length > 20) {
//       toast.error("Customer name must be between 1 to 20 characters", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--list-modal-header-normal-font)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setNameError("Customer name must be between 1 to 20 characters");
//     }



//     if (mobileNumberError.length > 3 && invalidNumber) {
//       toast.error("Invalid Number", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--list-modal-header-normal-font)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });

//       return setInvalidNumberError("Invalid Number")
//     }


//     if (customerEmail && !emailRegex.test(customerEmail)) {
//       toast.error("Invalid email format", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--list-modal-header-normal-font)",
//           borderRadius: "0.3rem",
//           background: "#333",
//           color: "#fff",
//         },
//       });
//       return setEmailError("Invalid email format");
//     }

//     if (selecteBarberdata === false) {
//       toast.error("Please provide a barber", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--tertiary-text)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setBarberError("Please provide a barber")
//     }

//     if (selectedBarberServices.length === 0) {
//       toast.error("Please provide a service", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--tertiary-text)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setServicesError("Please provide a service")
//     }


//     setJoinqueueModalOpen({
//       open: true,
//       data: joinqueuedata
//     })
//   }

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       joinqueueHandler();
//     }
//   };


//   const modelcolorfnc2 = (selectedServices, item) => {
//     // const modelcolor2 = selectedServices.find((select) => select._id === item._id) ? "var(--primary-color)" : "var(--primary-color)"
//     // return modelcolor2;
//   }

//   const [themecolor, setThemeColor] = useState(false)

//   const [phoneinputborder, setPhoneinputBorder] = useState(false)

//   const phoneUtil = PhoneNumberUtil.getInstance();

//   const isPhoneValid = (phone) => {
//     try {
//       return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
//     } catch (error) {
//       return false;
//     }
//   };

//   const [countryflag, setCountryFlag] = useState("gb")


//   const handlePhoneChange = (phone, meta) => {
//     setInvalidNumberError("")
//     const { country } = meta;

//     // if (phone.length == 3) {
//     //     setInvalidNumber(false);
//     //     return;
//     // }
//     setMobileNumberError(phone)

//     const isValid = isPhoneValid(phone);

//     if (isValid) {
//       setMobileNumber(phone);
//       setMobileCountryCode(country?.dialCode);
//       setCountryFlag(country?.iso2);
//       setInvalidNumber(false);
//     } else {
//       setInvalidNumber(true);
//     }
//   };


//   const [joinqueueModalOpen, setJoinqueueModalOpen] = useState({
//     open: false,
//     data: {}
//   })


//   const joinHandler = () => {
//     joinQueueKiosk(joinqueueModalOpen.data)
//   }

//   const [step, setStep] = useState(0)

//   const phoneInputUseRef = useRef()

//   useEffect(() => {
//     if (phoneInputUseRef.current) {
//       phoneInputUseRef.current.style.color = colors.color3
//     }

//   }, [colors, step])

//   const steps = [
//     'Customer Info',
//     'Select Barber ',
//     'Select Services',
//     'Completed'
//   ];



//   const customerInfoHandler = () => {

//     if (!adminInfo.kioskAvailability) {
//       return toast.error("System is offline", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--tertiary-text)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//     }

//     if (!customerName) {
//       toast.error("Please enter customer name", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--tertiary-text)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });

//       return setNameError("Please enter customer name")
//     }

//     if (customerName.length === 0 || customerName.length > 20) {
//       toast.error("Customer name must be between 1 to 20 characters", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--list-modal-header-normal-font)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setNameError("Customer name must be between 1 to 20 characters");
//     }



//     if (mobileNumberError.length > 3 && invalidNumber) {
//       toast.error("Invalid Number", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--list-modal-header-normal-font)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });

//       return setInvalidNumberError("Invalid Number")
//     }


//     if (customerEmail && !emailRegex.test(customerEmail)) {
//       toast.error("Invalid email format", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--list-modal-header-normal-font)",
//           borderRadius: "0.3rem",
//           background: "#333",
//           color: "#fff",
//         },
//       });
//       return setEmailError("Invalid email format");
//     }

//     setStep((prev) => prev + 1)

//     SelectBarberDropdownHandler()
//   }

//   const barberHandler = () => {

//     if (selectedBarberId === "" || selectedBarberId === undefined || selectedBarberId === null) {
//       toast.error("Please provide a barber", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--tertiary-text)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setBarberError("Please provide a barber")
//     }

//     setStep((prev) => prev + 1)

//     selectbarberHandler()
//   }

//   const serviceHandler = () => {
//     if (!selectedServices.length) {
//       toast.error("Please provide a service", {
//         duration: 3000,
//         style: {
//           fontSize: "var(--tertiary-text)",
//           borderRadius: '0.3rem',
//           background: '#333',
//           color: '#fff',
//         },
//       });
//       return setServicesError("Please provide a service")
//     }

//     setStep((prev) => prev + 1)

//     setJoinqueueModalOpen({
//       open: true,
//       data: joinqueuedata
//     })
//   }


//   return (
//     <main className={style.container}
//       style={{
//         backgroundColor: colors?.color4
//       }}
//     >
//       <section className={style.middle}>
//         <div className={style.stepper_header}>
//           <Stepper activeStep={step} alternativeLabel>
//             {steps.map((label) => (
//               <Step key={label}>
//                 <StepLabel
//                   sx={{

//                     '& .MuiStepIcon-root': {
//                       fontSize: '3rem',
//                       color: colors.color2
//                     },

//                     '& .MuiStepIcon-root.Mui-active': {
//                       color: modecolors?.color1
//                     },

//                     '& .MuiStepIcon-root.Mui-completed': {
//                       background: "green",
//                       borderRadius: "50%",
//                       color: "#fff",
//                       padding: "0.5rem"
//                     },

//                     '& .MuiStepIcon-text': {
//                       fontSize: '1rem',
//                       fill: modecolors?.color2
//                     },

//                     '& .MuiStepIcon-root.Mui-active .MuiStepIcon-text': {
//                       fill: modecolors?.color2
//                     },

//                     '& .MuiStepIcon-root.Mui-completed .MuiStepIcon-text': {
//                       fill: "#fff"
//                     },

//                     '& .MuiStepLabel-label': {
//                       color: "gray",
//                       fontSize: '1.4rem',
//                     },

//                     '& .MuiStepLabel-label.Mui-active': {
//                       color: colors.color3
//                     },

//                     '& .MuiStepLabel-label.Mui-completed': {
//                       color: colors.color3
//                     }

//                   }}
//                 >{label}</StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//         </div>

//         {
//           step === 0 && (
//             <div className={style.stepper_container_one}>
//               {/* .css-p8xe3-MuiStepLabel-labelContainer */}
//               <div>
//                 <label htmlFor="fullname">Full Name</label>
//                 <input
//                   type="text"
//                   id="fullname"
//                   name="fullname"
//                   placeholder='Enter Your Full Name'
//                   value={customerName}
//                   onChange={(e) => {
//                     setNameError("")
//                     setCustomerName(e.target.value)
//                   }}
//                   onKeyDown={handleKeyPress}
//                   style={{
//                     border: `0.1rem solid ${colors.borderColor}`,
//                     borderBottom: nameError ? "0.1rem solid red" : `0.1rem solid ${colors?.borderColor}`,
//                     backgroundColor: colors.inputColor
//                   }}
//                 />

//                 {nameError && <p className={style.error_message}>{nameError}</p>}
//               </div>

//               <div>
//                 <label htmlFor="email">Email <span>&#40;Optional&#41;</span></label>
//                 <input
//                   type="text"
//                   id="email"
//                   name="email"
//                   placeholder='Enter Your Email ID'
//                   value={customerEmail}
//                   onChange={(e) => {
//                     setEmailError("")
//                     setCustomerEmail(e.target.value)
//                   }}
//                   onKeyDown={handleKeyPress}
//                   style={{
//                     border: `0.1rem solid ${colors.borderColor}`,
//                     borderBottom: emailError ? "0.1rem solid red" : `0.1rem solid ${colors.borderColor}`,
//                     backgroundColor: colors.inputColor
//                   }}
//                 />

//                 {emailError && <p className={style.error_message}>{emailError}</p>}
//               </div>

//               <div>
//                 <label htmlFor="phone">Phone Number <span>&#40;Optional&#41;</span></label>
//                 <div
//                   id="phone"
//                   onMouseEnter={() => setPhoneinputBorder(true)}
//                   onMouseLeave={() => setPhoneinputBorder(false)}
//                   style={{
//                     border: `0.1rem solid ${colors.borderColor}`,
//                     borderBottom: invalidNumberError ? "0.1rem solid red" : `0.1rem solid ${colors.borderColor}`,
//                     backgroundColor: colors.inputColor,
//                   }}
//                   onKeyDown={handleKeyPress}
//                 >
//                   <PhoneInput
//                     forceDialCode={true}
//                     defaultCountry={countryflag}
//                     value={mobileNumber}
//                     onChange={(phone, meta) => handlePhoneChange(phone, meta)}
//                     ref={phoneInputUseRef}
//                   />
//                 </div>

//                 {invalidNumberError && (
//                   <p className={style.error_message}>{invalidNumberError}</p>
//                 )}
//               </div>

//               <button
//                 style={{
//                   backgroundColor: modecolors?.color1,
//                   color: modecolors?.color2,
//                   opacity: (!adminInfo.kioskAvailability || invalidNumberError || emailError || nameError || !customerName) ? 0.4 : 1
//                 }}
//                 onClick={customerInfoHandler}
//               >Continue</button>
//             </div>

//           )
//         }

//         {
//           step === 1 && (
//             <div
//               style={{
//                 backgroundColor: colors?.inputColor,
//                 border: `0.1rem solid ${colors?.borderColor}`,
//                 alignContent: (getavailablebarberloading || getavailablebarberisSuccess) && "flex-start"
//               }}
//               className={style.stepper_container_two}>

//               {
//                 getavailablebarberloading ? (
//                   <>
//                     <Skeleton
//                       variant="rectangular"
//                       className={style.skeleton}
//                       style={{
//                         backgroundColor: colors.color4
//                       }}
//                     />

//                     <Skeleton
//                       variant="rectangular"
//                       className={style.skeleton}
//                       style={{
//                         backgroundColor: colors.color4
//                       }}
//                     />
//                     <Skeleton
//                       variant="rectangular"
//                       className={style.skeleton}
//                       style={{
//                         backgroundColor: colors.color4
//                       }}
//                     />
//                     <Skeleton
//                       variant="rectangular"
//                       className={style.skeleton}
//                       style={{
//                         backgroundColor: colors.color4
//                       }}
//                     />
//                     <Skeleton
//                       variant="rectangular"
//                       className={style.skeleton}
//                       style={{
//                         backgroundColor: colors.color4
//                       }}
//                     />
//                     <Skeleton
//                       variant="rectangular"
//                       className={style.skeleton}
//                       style={{
//                         backgroundColor: colors.color4
//                       }}
//                     />
//                     <Skeleton
//                       variant="rectangular"
//                       className={style.skeleton}
//                       style={{
//                         backgroundColor: colors.color4
//                       }}
//                     />
//                     <Skeleton
//                       variant="rectangular"
//                       className={style.skeleton}
//                       style={{
//                         backgroundColor: colors.color4
//                       }}
//                     />
//                   </>
//                 ) : getavailablebarberisSuccess && getavailablebarberdata?.response?.length > 0 ? (
//                   getavailablebarberdata?.response?.map((b, index) => {
//                     return (
//                       <div
//                         style={{
//                           backgroundColor: colors?.color4,
//                           border: selectedBarberId === b.barberId ? `0.1rem solid ${modecolors.color1}` : `0.1rem solid ${colors?.borderColor}`
//                         }}
//                         className={style.barber_item}
//                         key={b.barberId}
//                         onClick={() => searchSelectedBarber(b)}
//                       >

//                         <div>
//                           <img src={b?.profile?.[0]?.url || ""} alt="" width={60} height={60} />
//                           <div>
//                             <p>{b?.name}</p>
//                             <p>{b?.barberServices?.[0]?.serviceName} {b?.barberServices?.length - 1 === 0 ? null : <span>+ {b?.barberServices?.length - 1} more</span>}</p>
//                           </div>
//                         </div>


//                         <div>
//                           <p><span><ClockIcon /></span>{b?.barberEWT} mins</p>
//                           <p><span><NextQueueIcon /></span>{b?.queueCount === 0 ? "Next" : b?.queueCount}</p>
//                         </div>

//                       </div>
//                     )
//                   })
//                 ) : (
//                   <p className={style.empty_message}>No barbers available</p>
//                 )
//               }

//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: "0rem",
//                   left: "50%",
//                   transform: "translateX(-50%)"
//                 }}
//               >
//                 <button
//                   style={{
//                     backgroundColor: modecolors?.color1,
//                     color: modecolors?.color2
//                   }}
//                   onClick={() => setStep((prev) => prev - 1)}
//                 >Back</button>
//                 <button
//                   style={{
//                     backgroundColor: modecolors?.color1,
//                     color: modecolors?.color2,
//                     opacity: selectedBarberId === "" || selectedBarberId === undefined || selectedBarberId === null ? 0.4 : 1
//                   }}
//                   onClick={barberHandler}
//                 >Continue</button>
//               </div>


//             </div>
//           )
//         }

//         {
//           step === 2 && (
//             <div
//               style={{
//                 backgroundColor: colors?.inputColor,
//                 border: `0.1rem solid ${colors?.borderColor}`,
//                 alignContent: (getServicesByBarberloading || getServicesByBarberisSuccess) && "flex-start"
//               }}
//               className={style.stepper_container_three}>

//               {
//                 getServicesByBarberloading ? (
//                   <>
//                     <Skeleton
//                       variant="rectangular"
//                       className={style.skeleton}
//                       style={{
//                         backgroundColor: colors.color4
//                       }}
//                     />

//                     <Skeleton
//                       variant="rectangular"
//                       className={style.skeleton}
//                       style={{
//                         backgroundColor: colors.color4
//                       }}
//                     />
//                     <Skeleton
//                       variant="rectangular"
//                       className={style.skeleton}
//                       style={{
//                         backgroundColor: colors.color4
//                       }}
//                     />
//                     <Skeleton
//                       variant="rectangular"
//                       className={style.skeleton}
//                       style={{
//                         backgroundColor: colors.color4
//                       }}
//                     />
//                     <Skeleton
//                       variant="rectangular"
//                       className={style.skeleton}
//                       style={{
//                         backgroundColor: colors.color4
//                       }}
//                     />
//                     <Skeleton
//                       variant="rectangular"
//                       className={style.skeleton}
//                       style={{
//                         backgroundColor: colors.color4
//                       }}
//                     />
//                     <Skeleton
//                       variant="rectangular"
//                       className={style.skeleton}
//                       style={{
//                         backgroundColor: colors.color4
//                       }}
//                     />
//                     <Skeleton
//                       variant="rectangular"
//                       className={style.skeleton}
//                       style={{
//                         backgroundColor: colors.color4
//                       }}
//                     />
//                   </>
//                 ) : getServicesByBarberisSuccess && getServicesByBarberdata?.response?.length > 0 ? (
//                   getServicesByBarberdata?.response?.map((item, index) => {
//                     return (
//                       <div
//                         onClick={() => {
//                           if (selectedServices.find((select) => select._id === item._id)) {
//                             deleteSelectServicesHandler(item._id)
//                           } else {
//                             selectedServicesHandler(item)
//                           }
//                         }}
//                         key={item._id}
//                         style={{
//                           backgroundColor: colors?.color4,
//                           border: selectedServices.find((select) => select._id === item._id) ? `0.1rem solid ${modecolors.color1}` : `0.1rem solid ${colors?.borderColor}`
//                         }}
//                         className={style.service_item}>

//                         <div>
//                           <div>
//                             <img src={item?.serviceIcon?.url} alt="" width={60} height={60} />
//                             {item?.vipService ? <span><RiVipCrownFill /></span> : null}
//                           </div>
//                           <div>
//                             <p>{item.serviceName}</p>
//                             <p><span><ClockIcon /></span>{item.barberServiceEWT}&nbsp; mins</p>
//                           </div>


//                         </div>

//                         <p>{getDefaultSalonByAdmindata?.response?.currency}{item.servicePrice}</p>

//                       </div>
//                     )
//                   })
//                 ) : (
//                   <p className={style.empty_message}>No services available</p>
//                 )
//               }


//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: "0rem",
//                   left: "50%",
//                   transform: "translateX(-50%)"
//                 }}
//               >
//                 <button
//                   style={{
//                     backgroundColor: modecolors?.color1,
//                     color: modecolors?.color2
//                   }}
//                   onClick={() => setStep((prev) => prev - 1)}
//                 >Back</button>

//                 <button
//                   style={{
//                     backgroundColor: modecolors?.color1,
//                     color: modecolors?.color2,
//                     opacity: selectedServices.length ? 1 : 0.4
//                   }}
//                   onClick={serviceHandler}
//                 >Continue</button>
//               </div>

//             </div>
//           )
//         }

//         {
//           step === 3 && (
//             <div className={style.stepper_container_four}>
//               <p>Queue Review</p>

//               <div
//                 style={{
//                   border: `0.1rem solid ${colors?.borderColor}`,
//                   backgroundColor: colors.inputColor
//                 }}
//               >
//                 <p>Name :</p>
//                 <p>{joinqueueModalOpen?.data?.name}</p>
//               </div>

//               <div className={style.double_div}>
//                 <div
//                   style={{
//                     border: `0.1rem solid ${colors?.borderColor}`,
//                     backgroundColor: colors.inputColor
//                   }}
//                 >
//                   <p>Email :</p>
//                   <p>{joinqueueModalOpen?.data?.customerEmail || "Not provided"}</p>
//                 </div>

//                 <div
//                   style={{
//                     border: `0.1rem solid ${colors?.borderColor}`,
//                     backgroundColor: colors.inputColor
//                   }}
//                 >
//                   <p>Phone No. :</p>
//                   <p>{joinqueueModalOpen?.data?.mobileNumber ? `+${joinqueueModalOpen?.data?.mobileNumber}` : "Not provided"}</p>
//                 </div>
//               </div>

//               <div
//                 style={{
//                   border: `0.1rem solid ${colors?.borderColor}`,
//                   backgroundColor: colors.inputColor
//                 }}
//               >
//                 <p>Barber :</p>
//                 <p>{joinqueueModalOpen?.data?.barberName}</p>
//               </div>

//               <div
//                 className={style.serviceNames_container}
//               >
//                 <p>Services Name :</p>

//                 <textarea
//                   name="servicesNames"
//                   id="servicesName"
//                   readOnly
//                   rows={3}
//                   style={{
//                     border: `0.1rem solid ${colors?.borderColor}`,
//                     backgroundColor: colors.inputColor
//                   }}
//                   value={
//                     joinqueueModalOpen?.data?.services?.map(item => item?.serviceName).join(', ')
//                   }
//                 />

//               </div>

//               {/* {
//                 joinqueueModalOpen?.data?.services?.map((item) => {
//                   return (
//                     <div
//                       key={item.serviceId}
//                       style={{
//                         border: `0.1rem solid ${colors?.borderColor}`,
//                         backgroundColor: colors.inputColor
//                       }}
//                     >
//                       <p>Service Name :</p>
//                       <p>{item.serviceName}</p>
//                     </div>
//                   )
//                 })
//               } */}


//               <div className={style.double_div}>
//                 <div
//                   style={{
//                     border: `0.1rem solid ${colors?.borderColor}`,
//                     backgroundColor: colors.inputColor
//                   }}
//                 >
//                   <p>Est. Time:</p>
//                   <p>{joinqueueModalOpen?.data?.services?.reduce((accumulator, item) => accumulator + item.barberServiceEWT, 0)} mins</p>
//                 </div>

//                 <div
//                   style={{
//                     border: `0.1rem solid ${colors?.borderColor}`,
//                     backgroundColor: colors.inputColor
//                   }}
//                 >
//                   <p>Total Price :</p>
//                   <p>{getDefaultSalonByAdmindata?.response?.currency} {joinqueueModalOpen?.data?.services?.reduce((accumulator, item) => accumulator + item.servicePrice, 0)}</p>
//                 </div>
//               </div>


//               <div>
//                 <button
//                   style={{
//                     backgroundColor: modecolors?.color1,
//                     color: modecolors?.color2
//                   }}
//                   onClick={() => setStep((prev) => prev - 1)}
//                 >Back</button>

//                 <button
//                   style={{
//                     backgroundColor: modecolors?.color1,
//                     color: modecolors?.color2,
//                     opacity: selectedServices.length ? 1 : 0.4
//                   }}
//                   onClick={serviceHandler}
//                 >Continue</button>
//               </div>

//             </div>
//           )
//         }

//         {
//           step === 4 && (
//             <div className={style.stepper_container_five}>
//               {/* <p>All steps has been successfully <span>completed</span>.
//                 Please click the <span
//                   style={{
//                     color: modecolors?.color1,
//                     fontWeight: "600"
//                   }}
//                 >join queue button</span> to join the queue list</p> */}

//               <p style={{ textAlign: "center" }}>
//                 Please click the <span
//                   style={{
//                     color: modecolors?.color1,
//                     fontWeight: "700",
//                   }}
//                 >Join Queue </span>button to join the queue list
//               </p>


//               {/* <button
//                 style={{
//                   backgroundColor: modecolors?.color1,
//                   color: modecolors?.color2
//                 }}
//               >Join Queue</button> */}


//               <div>
//                 <button
//                   style={{
//                     backgroundColor: modecolors?.color1,
//                     color: modecolors?.color2
//                   }}
//                   onClick={() => setStep((prev) => prev - 1)}
//                 >Back</button>

//                 {joinQueueKioskloading ? <button
//                   style={{
//                     backgroundColor: modecolors?.color1,
//                     color: modecolors?.color2
//                   }}
//                   className={style.modaljoinqueue_btn}><ColorRing
//                     visible={true}
//                     height="3rem"
//                     width="3rem"
//                     ariaLabel="color-ring-loading"
//                     wrapperStyle={{}}
//                     wrapperClass="color-ring-wrapper"
//                     colors={[modecolors?.color2, modecolors?.color2, modecolors?.color2, modecolors?.color2, modecolors?.color2]}
//                   /></button> : <button
//                     style={{
//                       backgroundColor: modecolors?.color1,
//                       color: modecolors?.color2
//                     }}
//                     className={style.modaljoinqueue_btn}
//                     onClick={joinHandler}>Join queue</button>}
//               </div>


//             </div>
//           )
//         }


//       </section>

//       <div className={style.end}>
//         {
//           getDefaultSalonByAdminisLoading ? (
//             <Marquee
//               speed={50}
//               gradient={true}
//               pauseOnHover={true}
//               gradientColor={colors.color4}
//             >
//               {
//                 new Array(10).fill(0).map((_, index) => {
//                   return (
//                     <Skeleton
//                       key={index}
//                       variant="rectangular"
//                       style={{
//                         height: "8rem",
//                         width: "35rem",
//                         marginRight: "1rem",
//                         backgroundColor: colors.borderColor
//                       }}
//                     />
//                   )
//                 })
//               }

//             </Marquee>
//           ) : (
//             <Marquee
//               speed={50}
//               gradient={true}
//               pauseOnHover={true}
//               gradientColor={colors.color4}
//             // className={style.marquee}
//             >
//               {getDefaultSalonByAdmindata?.response?.leastQueueBarbers?.map((item, index) => (
//                 <div key={item.barberId}
//                   className={style.marqueeItem}
//                   style={{
//                     backgroundColor: colors?.inputColor,
//                     border: `0.1rem solid ${colors?.borderColor}`
//                   }}
//                 >
//                   <div>
//                     <div><img src={item?.profile?.[0]?.url} alt="" /></div>
//                     <div>
//                       <p>{item?.name}</p>
//                       <p>Waiting Time - {item?.barberEWT} mins</p>
//                     </div>
//                   </div>

//                   <div>
//                     <p>Queue</p>
//                     <p>{item?.queueCount}</p>
//                   </div>
//                 </div>
//               ))}
//             </Marquee>
//           )
//         }
//       </div>


//     </main >
//   );
// }

// export default Public;

import React, { useEffect } from 'react'
import style from './Public.module.css';
import { TouchIcon } from '../../icons';
import { useNavigate } from 'react-router-dom';
import dashboardImage from '../../assets/dashboardImage.png'
import { useSelector } from 'react-redux';
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice';
import { useGetDefaultSalonByKioskMutation } from './publicApiSlice';
import toast from 'react-hot-toast';
import { useSocket } from '../../context/SocketContext';

const Public = () => {

  const navigate = useNavigate()
  const adminInfo = useSelector(selectCurrentAdminInfo)

  const connectedSalonId = localStorage.getItem("ConnectedSalonId")

  console.log("ConnectedSalonId ", connectedSalonId)

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

  useEffect(() => {
    if (adminInfo?.email) {
      const salondata = {
        email: adminInfo?.email,
        role: adminInfo?.role,
        salonId: connectedSalonId
      };
      getDefaultSalonByAdmin(salondata);
    }
  }, [adminInfo]);

  // console.log("getDefaultSalonByAdmindata ", getDefaultSalonByAdmindata)

  const {
    kioskbtnCheck,
  } = useSocket()

  return (
    <main
      className={style.container}
      style={{
        backgroundImage: `url(${dashboardImage})`,
      }}
    >
      <button
        disabled={!adminInfo?.email || getDefaultSalonByAdminisLoading}
        onClick={() => {
          if (!getDefaultSalonByAdmindata?.response?.isQueuing) {
            return toast.error("Queueing feature is not available at this salon", {
              duration: 3000,
              style: {
                fontSize: "var(--list-modal-header-normal-font)",
                borderRadius: '0.3rem',
                background: '#333',
                color: '#fff',
              },
            });
          }

          if (!kioskbtnCheck) {
            return toast.error("Kiosk is offline", {
              duration: 3000,
              style: {
                fontSize: "var(--list-modal-header-normal-font)",
                borderRadius: '0.3rem',
                background: '#333',
                color: '#fff',
              },
            });
          }

          localStorage.setItem("joinQueue", JSON.stringify(true))
          navigate("/joinForm")
        }}
        className={style.button}>
        <TouchIcon size={"2.5rem"} color='#fff' />
        <p>Touch to Join Queue</p>
      </button>

      {/* <img
        src='./dashboardImage.png'
        style={{
          width: "50rem",
          height: "50rem"
        }}
      /> */}
    </main >
  )
}

export default Public