import React, { useEffect } from 'react'
import style from './QueueList.module.css'
import { useLazyGetQlistBySalonIdKioskQuery } from './QueueApiSlice'
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RiVipCrownFill } from 'react-icons/ri'
import Skeleton from '@mui/material/Skeleton';

const QueueList = () => {

  const adminInfo = useSelector(selectCurrentAdminInfo)

  const [
    useLazyGetQlistBySalonIdKioskfunc,
    {
      data,
      isSuccess,
      isError,
      error,
      isLoading
    }
  ] = useLazyGetQlistBySalonIdKioskQuery()

  useEffect(() => {
    if (adminInfo && adminInfo?.salonId) {
      useLazyGetQlistBySalonIdKioskfunc(adminInfo?.salonId)
    }

  }, [adminInfo])

  const navigate = useNavigate()

  const serverHandler = (barberId, services, _id, barberEmail) => {
    navigate("/barberservelogn", {
      state: {
        barberId,
        services,
        _id,
        barberEmail
      }
    })
  }


  const cancelHandler = (barberId, _id, barberEmail) => {
    navigate("/cancelservelogn", {
      state: {
        barberId,
        _id,
        barberEmail
      }
    })
  }


  return (
    <section className={style.queuelist_container}>
      <p>Queue List</p>
      <main className={style.queuelist_table}>
        <header className={style.queuelist_table_header}>
          <p>#</p>
          <p>Name</p>
          <p>Barber</p>
          <p>Join Time</p>
          <div><p>Qg Code</p></div>
          <div><p>EWT</p></div>
          <div><p>Type</p></div>
          <p>Services</p>
          <div><p>Serve</p></div>
          <div><p>Cancel</p></div>
        </header>

        {isLoading ? (
          <div className={style.queuelist_loading}>
            <Skeleton variant="rectangular" className={style.skeleton} />
            <Skeleton variant="rectangular" className={style.skeleton} />
            <Skeleton variant="rectangular" className={style.skeleton} />
            <Skeleton variant="rectangular" className={style.skeleton} />
            <Skeleton variant="rectangular" className={style.skeleton} />
            <Skeleton variant="rectangular" className={style.skeleton} />
          </div>
        )
          : isSuccess && data?.response?.length > 0 ? (
            data?.response?.map((item, index) => {
              return (
                <div
                  className={style.queuelist_table_item}
                  key={item?._id}
                  style={{
                    borderBottom: data?.response?.length - 1 === index && "none"
                  }}
                >
                  <p>{item?.qPosition === 1 ? "Next" : item?.qPosition}</p>
                  <p>{item?.name.length > 18 ? item?.name.slice(0, 18) + "..." : item?.name}</p>
                  <p>{item?.barberName.length > 18 ? item?.barberName.slice(0, 18) + "..." : item?.barberName}</p>
                  <p>{item?.timeJoinedQ}</p>
                  <div><p>{item?.qgCode}</p></div>
                  <div><p>{item?.customerEWT === 0 ? "-" : item?.customerEWT + " " + "mins"}</p></div>
                  <div>
                    {
                      item?.serviceType === "VIP" ? <RiVipCrownFill /> : "-"
                    }
                  </div>
                  <p>{item?.services?.[0]?.serviceName} {item?.services?.length - 1 === 0 ? null : <span>+ {item?.services?.length - 1} more</span>}</p>
                  <div><button onClick={() => serverHandler(item?.barberId, item?.services, item?._id, item?.barberEmail)}>serve</button></div>
                  <div><button onClick={() => cancelHandler(item?.barberId, item?._id, item?.barberEmail)}>cancel</button></div>
                </div>
              )
            })
          )
            :
            <div className={style.queuelist_error}>
              <p>No queuelist available</p>
            </div>
        }


      </main >
    </section >
  )
}

export default QueueList;

