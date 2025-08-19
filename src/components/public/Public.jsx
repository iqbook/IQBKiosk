import React, { useEffect } from 'react'
import style from './Public.module.css';
import { TouchIcon } from '../../icons';
import { useNavigate } from 'react-router-dom';
import dashboardImage from '../../assets/dashboardImage.webp'
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