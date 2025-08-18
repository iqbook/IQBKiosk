import React, { useEffect, useState } from 'react'
import style from './SalonSettings.module.css'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import {
  useChangeSalonOnlineStatusKioskMutation,
  useKioskBookingAvailabilityStatusMutation,
  useMobileBookingAvailabilityStatusMutation
} from '../Dashboard/dashboardApiSlice'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import Switch from "react-switch"
import { useSocket } from '../../context/SocketContext'
import { useGetDefaultSalonByKioskMutation } from '../public/publicApiSlice'

const SalonSettings = () => {

  const connectedSalonId = localStorage.getItem("ConnectedSalonId")

  const [
    getDefaultSalonByKiosk,
    {
      data: defaultsalondata,
      isLoading: defaultsalonisLoading,
      isSuccess: defaultsalonsuccess,
      isError: defaultsalonisError,
      error: defaultsalonerror
    }
  ] = useGetDefaultSalonByKioskMutation()

  const {
    kioskbtnCheck,
    setKioskbtnCheck,
    salonbtnCheck,
    setSalonbtnCheck,
    mobilebtnCheck,
    setMobilebtnCheck
  } = useSocket()

  const [
    changeSalonOnlineStatusKiosk,
    {
      data: salonStatusData,
      isSuccess: salonStatusSuccess,
      isError: salonStatusError,
      error: salonStatusErrorData
    }
  ] = useChangeSalonOnlineStatusKioskMutation()

  const [
    kioskBookingAvailabilityStatus,
    {
      data: kioskBookData,
      isSuccess: kioskBookSuccess,
      isError: kioskBookError,
      error: kioskBookErrorData
    }
  ] = useKioskBookingAvailabilityStatusMutation()


  const [
    mobileBookingAvailabilityStatus,
    {
      data: mobilebookdata,
      isSuccess: mobilebookisSuccess,
      isError: mobilebookdataisError,
      error: mobilebookError,
      isLoading: mobilebookisLoading
    }
  ] = useMobileBookingAvailabilityStatusMutation()

  const { colors, currentTheme } = useSelector(state => state.theme)
  const { modecolors } = useSelector(state => state.modeColor)
  const adminInfo = useSelector(selectCurrentAdminInfo)

  // Fetch default salon on load
  useEffect(() => {
    if (adminInfo?.email) {
      getDefaultSalonByKiosk({
        email: adminInfo.email,
        role: adminInfo.role,
        salonId: connectedSalonId
      })
      // setMobilebtnCheck(adminInfo?.mobileBookingAvailability)
    }
  }, [adminInfo])

  // Update salon button when API success
  useEffect(() => {
    if (salonStatusSuccess) {
      toast.success(salonStatusData?.message, toastStyle)
      setSalonbtnCheck(salonStatusData?.response?.isOnline)
    }
  }, [salonStatusSuccess])

  // Handle salon API error
  useEffect(() => {
    if (salonStatusError) {
      toast.error(salonStatusErrorData?.data?.message, toastStyle)
      setSalonbtnCheck(adminInfo?.isSalonOnline)
    }
  }, [salonStatusError])


  // Update kiosk button when API success
  useEffect(() => {
    if (kioskBookSuccess) {
      toast.success(kioskBookData?.message, toastStyle)
      setKioskbtnCheck(kioskBookData?.response?.kioskAvailability)
    }
  }, [kioskBookSuccess])


  // Update mobile button when API success
  useEffect(() => {
    if (mobilebookisSuccess) {
      toast.success(mobilebookdata?.message, toastStyle)
      setMobilebtnCheck(mobilebookdata?.response?.mobileBookingAvailability)
    }
  }, [mobilebookisSuccess])

  // Handle kiosk API error
  useEffect(() => {
    if (kioskBookError) {
      toast.error(kioskBookErrorData?.data?.message, toastStyle)
      setKioskbtnCheck(adminInfo?.kioskAvailability)
    }
  }, [kioskBookError])

  // Handle mobile API error
  useEffect(() => {
    if (mobilebookdataisError) {
      toast.error(mobilebookdataisError?.data?.message, toastStyle)
      setMobilebtnCheck(adminInfo?.mobileBookingAvailability)
    }
  }, [mobilebookdataisError])


  // Salon status toggle handler
  const salonOnlineHandler = () => {
    if (window.confirm("Change Salon Status ?")) {
      changeSalonOnlineStatusKiosk({
        salonId: connectedSalonId,
        isOnline: !salonbtnCheck
      })
    }
  }

  // Kiosk status toggle handler
  const kioskBookOnlineHandler = () => {
    if (window.confirm("Change Kiosk Status ?")) {
      kioskBookingAvailabilityStatus({
        salonId: connectedSalonId,
        kioskAvailability: !kioskbtnCheck
      })
    }
  }


  // Mobile status toggle handler
  const mobileBookOnlineHandler = () => {
    if (window.confirm("Change Mobile Book Status ?")) {
      mobileBookingAvailabilityStatus({
        salonId: connectedSalonId,
        mobileBookingAvailability: !mobilebtnCheck
      })
    }
  }


  const settingsData = [
    {
      id: 1,
      name: "Salon Status",
      desc: "The system will disable the availability of all barbers and mobile bookings, effectively setting their Status to offline or shutting them down.",
      value: salonbtnCheck,
      img: "./shop.png",
      handler: salonOnlineHandler
    },
    {
      id: 2,
      name: "Mobile Queuing",
      desc: "Mobile Queuing can be set to online or offline. When offline, will not be able to join the queue through the app.",
      value: mobilebtnCheck,
      img: "./mobile.png",
      handler: mobileBookOnlineHandler
    },
    {
      id: 3,
      name: "Kiosk Queuing",
      desc: "Kiosk Queuing can be set to online or offline. When offline, Customers will not be able to join the queue through the kiosk.",
      value: kioskbtnCheck,
      img: "./Kiosk.png",
      handler: kioskBookOnlineHandler
    }
  ]

  const toastStyle = {
    duration: 3000,
    style: {
      fontSize: "var(--tertiary-text)",
      borderRadius: '0.3rem',
      background: '#333',
      color: '#fff'
    }
  }

  return (
    <section className={style.salon_settings_container}
      style={{ backgroundColor: colors.color4 }}
    >
      <div className={style.salon_settings_left}>
        <img src="./My_Bookings.png" alt="salon_settings_img" />
      </div>

      <div className={style.salon_settings_right}>
        <h2>Salon Settings</h2>
        {/* <div className={style.salon_main_container}>
          {settingsData.map(item => (
            <div
              key={item.id}
              style={{
                backgroundColor: colors.cardColor,
                border: `0.1rem solid ${colors.queueBorder}`
              }}
              className={style.settings_item}
            >
              <div style={{
                borderRight: `0.1rem solid ${colors.queueBorder}`
              }}>
                <div>
                  <div>
                    <img src={item.img} alt="" style={{
                      filter: currentTheme === "Dark"
                        ? "brightness(0) invert(1)"
                        : "brightness(0) invert(0)"
                    }} />
                  </div>
                  <h2>{item.name}</h2>
                  <div>
                    {typeof item.value === 'boolean' ? (
                      <Switch
                        width={80}
                        handleDiameter={20}
                        offColor="#F44336"
                        onColor="#00A36C"
                        uncheckedIcon={<SwitchIcon text="Offline" />}
                        checkedIcon={<SwitchIcon text="Online" />}
                        onChange={item.handler}
                        checked={item.value}
                      />
                    ) : (
                      <div style={{ height: "2.8rem" }} />
                    )}
                  </div>
                </div>
              </div>
              <div>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div> */}



        <div className={style.salon_main_container}>
          <div
            style={{
              backgroundColor: colors.cardColor,
              border: `0.1rem solid ${colors.queueBorder}`,
            }}
            className={style.settings_item}>
            <div style={{
              borderRight: `0.1rem solid ${colors.queueBorder}`
            }}>
              <div>
                <div><img src={settingsData[0]?.img} alt="" style={{ filter: currentTheme === "Dark" ? "brightness(0) invert(1)" : "brightness(0) invert(0)" }} /></div>
                <h2>{settingsData[0].name}</h2>
                {/* <div>
                  {
                    typeof settingsData[0].value === 'boolean' ? (
                      <Switch
                        width={80}
                        handleDiameter={20}
                        offColor="#F44336"
                        onColor="#00A36C"
                        uncheckedIcon={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                              fontSize: "1.4rem",
                              fontWeight: "600",
                              color: "#F4F4F5",
                              paddingRight: "1.5rem",
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
                              fontSize: "1.4rem",
                              fontWeight: "600",
                              color: "#F4F4F5",
                              paddingLeft: "1.5rem"
                            }}
                          >
                            Online
                          </div>
                        }
                        onChange={() => settingsData[0]?.handler()}
                        checked={settingsData[0].value}
                      />
                    ) : (
                      <div style={{ height: "2.8rem" }} />
                    )
                  }

                </div> */}

                <div>
                  {typeof settingsData[0].value === 'boolean' ? (
                    <Switch
                      width={80}
                      handleDiameter={20}
                      offColor="#F44336"
                      onColor="#00A36C"
                      uncheckedIcon={<SwitchIcon text="Offline" />}
                      checkedIcon={<SwitchIcon text="Online" />}
                      onChange={settingsData[0].handler}
                      checked={settingsData[0].value}
                    />
                  ) : (
                    <div style={{ height: "2.8rem" }} />
                  )}
                </div>
              </div>
            </div>
            <div>
              <p>{settingsData[0].desc}</p>
            </div>
          </div>


          <div>


            {
              settingsData.map((item, index) => {
                if (index === 0) return null;

                return (
                  <div
                    style={{
                      backgroundColor: colors.cardColor,
                      border: `0.1rem solid ${colors.queueBorder}`
                    }}
                    className={style.settings_item} key={item.id}>
                    <div style={{
                      borderRight: `0.1rem solid ${colors.queueBorder}`
                    }}>
                      <div>
                        <div><img src={item.img} alt="" style={{ filter: currentTheme === "Dark" ? "brightness(0) invert(1)" : "brightness(0) invert(0)" }} /></div>
                        <h2>{item.name}</h2>
                        <div>
                          {typeof item.value === 'boolean' ? (
                            <Switch
                              width={80}
                              handleDiameter={20}
                              offColor="#F44336"
                              onColor="#00A36C"
                              uncheckedIcon={<SwitchIcon text="Offline" />}
                              checkedIcon={<SwitchIcon text="Online" />}
                              onChange={item.handler}
                              checked={item.value}
                            />
                          ) : (
                            <div style={{ height: "2.8rem" }} />
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                )
              })
            }


          </div>
        </div>

      </div>
    </section>
  )
}

const SwitchIcon = ({ text }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      fontSize: "1.4rem",
      fontWeight: "600",
      color: "#F4F4F5",
      padding: text === "Online" ? "0 0 0 1.5rem" : "0 1.5rem 0 0"
    }}
  >
    {text}
  </div>
)

export default SalonSettings
