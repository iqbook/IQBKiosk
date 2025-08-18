import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { selectCurrentBarberToken } from '../../barber/Signin/barberauthSlice'

const BarberKiyoskDashboardProtect = () => {

    const selectCurrentBarberTokendata = useSelector(selectCurrentBarberToken)
    const [showdashboard, setShowdashboard] = useState(false)
    
    const navigate = useNavigate()

    useEffect(() => {
        if(selectCurrentBarberTokendata === null){
            setShowdashboard(false)
            navigate('/barbersignin')
        }else if(selectCurrentBarberTokendata){
            setShowdashboard(true)
        }
    },[selectCurrentBarberTokendata])

  return (
    <div>{showdashboard && <Outlet/>}</div>
  )
}

export default BarberKiyoskDashboardProtect