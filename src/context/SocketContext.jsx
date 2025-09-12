import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { selectCurrentAdminInfo } from '../components/AdminSignin/adminauthSlice';
import { useGetDefaultSalonByKioskMutation } from '../components/public/publicApiSlice';

const SocketContext = createContext();

export function useSocket() {
    return useContext(SocketContext);
}


export function SocketProvider({ children }) {

    const [getDefaultAdminData, setGetDefaultAdminData] = useState("")

    const adminInfo = useSelector(selectCurrentAdminInfo)
    const connectedSalonId = localStorage.getItem("ConnectedSalonId")

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


    // Initial sync from adminInfo
    useEffect(() => {
        if (getDefaultSalonByAdminisSuccess) {
            setSalonbtnCheck(getDefaultSalonByAdmindata?.response?.isOnline)
            setKioskbtnCheck(getDefaultSalonByAdmindata?.response?.kioskAvailability)
            setMobilebtnCheck(getDefaultSalonByAdmindata?.response?.mobileBookingAvailability)
        }
    }, [getDefaultSalonByAdminisSuccess])

    // // Initial sync from adminInfo
    // useEffect(() => {
    //     if (adminInfo) {
    //         setSalonbtnCheck(adminInfo?.isSalonOnline)
    //         setKioskbtnCheck(adminInfo?.kioskAvailability)
    //         setMobilebtnCheck(adminInfo?.mobileBookingAvailability)
    //     }
    // }, [adminInfo])


    const [kioskbtnCheck, setKioskbtnCheck] = useState(false)
    const [salonbtnCheck, setSalonbtnCheck] = useState(false)
    const [mobilebtnCheck, setMobilebtnCheck] = useState(false)



    // useEffect(() => {

    //     const newSocket = socketIOClient("https://iqb-final.onrender.com")

    //     newSocket.on("connect", () => {
    //         console.log("✅ Connected to WebSocket");
    //     });

    //     if (adminInfo?.salonId) {
    //         newSocket.emit("joinSalon", adminInfo?.salonId);

    //         newSocket.on("liveDefaultSalonData", (defaultSalonData) => {
    //             // console.log("defaultSalonData ", defaultSalonData)
    //             setGetDefaultAdminData(defaultSalonData)
    //         })

    //         newSocket.on("salonStatusUpdate", (salonStatusData) => {
    //             // console.log("salonStatusData ", salonStatusData?.response?.isOnline)
    //             setSalonbtnCheck(salonStatusData?.response?.isOnline)
    //         })

    //         newSocket.on("mobileBookingAvailabilityUpdate", (mobileBookData) => {
    //             console.log("mobileBookData ", mobileBookData)
    //             setMobilebtnCheck(mobileBookData?.response?.mobileBookingAvailability)
    //         })

    //         newSocket.on("kioskAvailabilityUpdate", (kioskData) => {
    //             // console.log("kioskData ", kioskData?.response?.kioskAvailability)
    //             setKioskbtnCheck(kioskData?.response?.kioskAvailability)
    //         })

    //     }

    //     return () => newSocket.disconnect();

    // }, [adminInfo]);


    useEffect(() => {

        const newSocket = socketIOClient("https://iqb-final.onrender.com")

        newSocket.on("connect", () => {
            console.log("✅ Connected to WebSocket");
        });


        if (connectedSalonId) {
            newSocket.emit("joinSalon", connectedSalonId);

            newSocket.on("liveDefaultSalonData", (defaultSalonData) => {
                // console.log("defaultSalonData ", defaultSalonData)
                setGetDefaultAdminData(defaultSalonData)
            })

            newSocket.on("salonStatusUpdate", (salonStatusData) => {
                // console.log("salonStatusData ", salonStatusData?.response?.isOnline)
                setSalonbtnCheck(salonStatusData?.response?.isOnline)
            })

            newSocket.on("mobileBookingAvailabilityUpdate", (mobileBookData) => {
                // console.log("mobileBookData ", mobileBookData)
                setMobilebtnCheck(mobileBookData?.response?.mobileBookingAvailability)
            })

            newSocket.on("kioskAvailabilityUpdate", (kioskData) => {
                // console.log("kioskData ", kioskData?.response?.kioskAvailability)
                setKioskbtnCheck(kioskData?.response?.kioskAvailability)
            })

        }

        return () => newSocket.disconnect();

    }, [connectedSalonId]);

    const valueData = {
        getDefaultAdminData,
        setGetDefaultAdminData,

        kioskbtnCheck,
        setKioskbtnCheck,
        salonbtnCheck,
        setSalonbtnCheck,
        mobilebtnCheck,
        setMobilebtnCheck
    }
    return (
        <SocketContext.Provider value={valueData} >
            {children}
        </SocketContext.Provider>
    );
}