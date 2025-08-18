import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const SalonProtectRoute = () => {

    const salonSelect = localStorage.getItem("salonSelect")

    return (
        <div>{salonSelect === "false" ? <Outlet /> : salonSelect === "true" && <Navigate to="/kiosk" />}</div>
    )
}

export default SalonProtectRoute