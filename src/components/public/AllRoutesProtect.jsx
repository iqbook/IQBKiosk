import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const AllRoutesProtect = () => {
    const salonSelect = localStorage.getItem("salonSelect")

    const location = useLocation(); 

    useEffect(() => {
        // Check if the current pathname is not '/accountsettings'
        if (location.pathname !== '/salonsettings') {
            localStorage.setItem('adminsalonsettings', 'false');
        }
    }, [location]);

    return (
        <div>{salonSelect === "true" ? <Outlet /> : salonSelect === "false" && <Navigate to="/selectsalon" />}</div>
    )
}

export default AllRoutesProtect