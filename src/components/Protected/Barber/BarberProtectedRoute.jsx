import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedAuthRoute = () => {
    const loggedinAdmin = localStorage.getItem('adminkiyoskloggin')
    const [outlettrue, setOutlettrue] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if(loggedinAdmin === 'true'){
            navigate('/kiyosk')
        }else if(loggedinAdmin === 'false' || loggedinAdmin === undefined || loggedinAdmin === 'undefined' || loggedinAdmin === null){
            setOutlettrue(true)
        }
    },[loggedinAdmin])

  return (
    <div>{ outlettrue && <Outlet />}</div>
  )
}

export default ProtectedAuthRoute