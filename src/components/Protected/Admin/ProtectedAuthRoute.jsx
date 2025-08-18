import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedAuthRoute = () => {
    const loggedinuser = localStorage.getItem('adminkiyoskloggin')
    const [outlettrue, setOutlettrue] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if(loggedinuser === 'true'){
            navigate('/kiosk')
        }else if(loggedinuser === 'false' || loggedinuser === undefined || loggedinuser === 'undefined' || loggedinuser === null){
            setOutlettrue(true)
        }
    },[loggedinuser])

  return (
    <div>{ outlettrue && <Outlet />}</div>
  )
}

export default ProtectedAuthRoute