import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const BarberProtectedAuthRoute = () => {
    const loggedinBarber = localStorage.getItem('barberkiyoskloggin')
    const [outlettrue, setOutlettrue] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if(loggedinBarber === 'true'){
            navigate('/kiyosk')
        }else if(loggedinBarber === 'false' || loggedinBarber === undefined || loggedinBarber === 'undefined' || loggedinBarber === null){
            setOutlettrue(true)
        }
    },[loggedinBarber])

  return (
    <div>{ outlettrue && <Outlet />}</div>
  )
}

export default BarberProtectedAuthRoute