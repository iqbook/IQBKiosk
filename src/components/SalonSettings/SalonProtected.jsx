import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const SalonProtected = () => {

    console.log("Protected")

    const navigate = useNavigate()

    const adminsalonsettings = localStorage.getItem("adminsalonsettings")

    useEffect(() => {
        if(adminsalonsettings === "false" || adminsalonsettings === null || adminsalonsettings === "undefined" || adminsalonsettings === undefined){
            navigate("/salonsignin")
        }
    },[navigate,adminsalonsettings])

    return (
        <>
        {adminsalonsettings === "true" ? <Outlet/> : "Loading..."}
        </>
    )
}

export default SalonProtected
