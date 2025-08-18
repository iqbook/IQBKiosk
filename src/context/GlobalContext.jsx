import { createContext, useState, useContext, useEffect, useRef, useCallback } from 'react';
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    const [selectedServices, setSelectedServices] = useState([]);
    const [selectBarber, setSelectedBarber] = useState("")

    const [customerName, setCustomerName] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [countryflag, setCountryFlag] = useState("gb")
    const [mobileCountryCode, setMobileCountryCode] = useState("")

    const value = {
        selectedServices,
        setSelectedServices,
        selectBarber,
        setSelectedBarber,
        customerName,
        setCustomerName,
        customerEmail,
        setCustomerEmail,
        mobileNumber,
        setMobileNumber,
        countryflag,
        setCountryFlag,
        mobileCountryCode,
        setMobileCountryCode
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => useContext(GlobalContext);
