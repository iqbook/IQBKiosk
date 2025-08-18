import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';

const JoinQueueProtect = () => {
    const navigate = useNavigate();

    const {
        setSelectedServices,
        setSelectedBarber,
        setCustomerName,
        setCustomerEmail,
        setMobileNumber,
        setCountryFlag,
        setMobileCountryCode
    } = useGlobal();

    useEffect(() => {
        // Clear joinQueue on refresh or tab close
        const handleBeforeUnload = () => {
            localStorage.setItem("joinQueue", JSON.stringify(false));
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        const joinQueueSaved = JSON.parse(localStorage.getItem("joinQueue")) || false;

        if (!joinQueueSaved) {
            setSelectedServices([]);
            setSelectedBarber("");
            setCustomerName("");
            setCustomerEmail("");
            setMobileNumber("");
            setCountryFlag("gb");
            setMobileCountryCode("");
            navigate("/kiosk");
        }
    }, [navigate]);

    return <Outlet />;
};

export default JoinQueueProtect;
