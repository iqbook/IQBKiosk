import React, { useEffect, useState } from 'react'
import style from './SalonServices2.module.css'
import { AddIcon, CheckIcon, LeftArrowIcon, SearchIcon } from '../../icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../../context/GlobalContext';
import { useGetServicesByBarberKioskMutation } from './salonServices2ApiSlice';
import { Box, Modal, Skeleton } from '@mui/material';
import { useGetDefaultSalonByKioskMutation } from '../public/publicApiSlice';
import { formatMinutesToHrMin } from '../../utils/formatMinutesToHrMin';
import { ColorRing } from 'react-loader-spinner';
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice';
import toast from 'react-hot-toast';
import { useJoinQueueKioskMutation } from '../JoinQueue/joinqueueApiSlice';

const SalonServices2 = () => {

    const {
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
    } = useGlobal()

    const selectedBarberId = selectBarber?.barberId
    const connectedSalonId = localStorage.getItem("ConnectedSalonId")

    const [
        getServicesByBarberKiosk,
        {
            data: getServicesByBarberKioskData,
            isLoading: getServicesByBarberKioskisLoading,
            isSuccess: getServicesByBarberKioskisSuccess
        }
    ] = useGetServicesByBarberKioskMutation();


    useEffect(() => {
        if (connectedSalonId) {
            getServicesByBarberKiosk({
                salonId: Number(connectedSalonId),
                barberId: selectedBarberId
            })
        }
    }, [selectedBarberId])

    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchServiceQuery, setSearchServiceQuery] = useState("");
    const { colors } = useSelector(state => state.theme);
    const { modecolors } = useSelector(state => state.modeColor)

    const { currentTheme } = useSelector(state => state.theme);

    const [selecteditemegory, setSelecteditemegory] = useState("")

    const toggleService = (service) => {
        if (selectedServices.find((s) => s.id === service.id)) {
            setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
        } else {
            setSelectedServices([...selectedServices, service]);
        }
    };

    const navigate = useNavigate()

    const [
        getDefaultSalonByAdmin,
        {
            data: getDefaultSalonByAdmindata
        }
    ] = useGetDefaultSalonByKioskMutation();


    const addServiceHandler = (service) => {
        setSelectedServices(prev => {
            const exists = prev.find(s => s.serviceId === service.serviceId);
            if (exists) return prev;
            return [...prev, service];
        });
    };

    const removeServiceHandler = (service) => {
        setSelectedServices(prev =>
            prev.filter(s => s.serviceId !== service.serviceId)
        );
    };

    const [filteredServices, setFilteredServices] = useState([])

    useEffect(() => {
        if (getServicesByBarberKioskData?.response) {
            const filteredServicesData = getServicesByBarberKioskData.response.filter((service) =>
                service?.serviceName?.toLowerCase().includes(searchServiceQuery.toLowerCase())
            );

            setFilteredServices(filteredServicesData);
        } else {
            setFilteredServices([]); // safe default
        }
    }, [searchServiceQuery, getServicesByBarberKioskData]);



    useEffect(() => {
        if (selectedCategory) {

            const filteredServicesData = getServicesByBarberKioskData?.response?.filter((service) => {
                return service.serviceCategoryName === selectedCategory
            })

            setFilteredServices(filteredServicesData)
        }
    }, [selectedCategory])

    // console.log("filteredServices ", filteredServices)
    const totalPrice = selectedServices.reduce((acc, service) => acc + service.servicePrice, 0);
    const totalTime = selectedServices.reduce((acc, service) => acc + service.barberServiceEWT, 0);
    const totalServices = selectedServices.length;


    const [previewModal, setPreviewModal] = useState(false)

    const adminInfo = useSelector(selectCurrentAdminInfo);

    useEffect(() => {
        if (adminInfo?.email) {
            const salondata = {
                email: adminInfo.email,
                role: adminInfo.role,
                salonId: connectedSalonId
            };
            getDefaultSalonByAdmin(salondata);
        }
    }, [adminInfo]);


    const [
        joinQueueKiosk,
        {
            data: joinQueueKioskdata,
            isSuccess: joinQueueKioskisSuccess,
            isError: joinQueueKioskisError,
            isLoading: joinQueueKioskloading,
            error: joinQueueKioskerror
        }
    ] = useJoinQueueKioskMutation()

    useEffect(() => {
        if (joinQueueKioskisSuccess) {

            toast.success("Join queue successfully", {
                duration: 3000,
                style: {
                    fontSize: "var(--list-modal-header-normal-font)",
                    borderRadius: "0.3rem",
                    background: "#333",
                    color: "#fff",
                },
            });

            setSelectedServices([])
            setSelectedBarber("")
            setCustomerName("")
            setCustomerEmail("")
            setMobileNumber("")
            setCountryFlag("gb")
            setMobileCountryCode("")
            setPreviewModal(false)
            navigate("/joinQueueSuccess")

        }
    }, [joinQueueKioskisSuccess])


    const joinHandler = () => {
        const joinqueuedata = {
            salonId: connectedSalonId,
            name: customerName,
            customerEmail: customerEmail,
            joinedQType: "Single-Join",
            methodUsed: "Walk-In",
            mobileNumber: Number(mobileNumber),
            mobileCountryCode: Number(mobileCountryCode),
            barberName: selectBarber?.name,
            barberId: selectBarber?.barberId,
            services: selectedServices
        }

        // console.log(joinqueuedata)

        joinQueueKiosk(joinqueuedata)
        // joinQueueKiosk(joinqueueModalOpen.data)
    }


    return (
        <>
            <main
                className={style.container}
                style={{
                    backgroundColor: colors.color4,
                    height: selectedServices.length > 0 ? "calc(var(--primary-height) - 7rem)" : "var(--primary-height)"
                }}
            >
                <div>
                    <button onClick={() => {
                        setSelectedBarber("")
                        setSelectedServices([])
                        navigate("/salonBarbers2")
                    }}><LeftArrowIcon /></button>
                    <p>Select Services</p>
                </div>

                <div>
                    <div>
                        <input
                            placeholder='Search services by category'
                            style={{
                                backgroundColor: colors.cardColor,
                                border: `0.1rem solid ${colors.queueBorder}`
                            }}
                            value={searchServiceQuery}
                            onChange={(e) => {
                                setSelectedCategory("")
                                setSearchServiceQuery(e.target.value)
                            }}
                        />
                        <div
                            style={{
                                backgroundColor: modecolors.color1
                            }}
                        ><SearchIcon color='#fff' size="2rem" /></div>
                    </div>
                </div>

                <div className={style.servicesContainer}>
                    <div style={{ display: "flex", flexDirection: "row", gap: "1.5rem", flexWrap: "wrap", alignSelf: "flex-start" }}>
                        {getServicesByBarberKioskisLoading ? (
                            <>
                                <Skeleton variant="rectangular" className={style.skeleton} />
                                <Skeleton variant="rectangular" className={style.skeleton} />
                                <Skeleton variant="rectangular" className={style.skeleton} />
                                <Skeleton variant="rectangular" className={style.skeleton} />
                            </>
                        ) : (
                            getServicesByBarberKioskData?.serviceCategories?.map((item) => (
                                <button
                                    key={item._id}
                                    style={{
                                        height: "4rem",
                                        paddingInline: "2rem",
                                        background: selectedCategory === item.serviceCategoryName ? modecolors.color1 : currentTheme === "Dark" ? "#3f3f46" : "#e4e4e7",
                                        border: "none",
                                        borderRadius: "0.4rem",
                                        color: selectedCategory === item.serviceCategoryName && "#fff",
                                        fontSize: "1.6rem",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.8rem", // space between image and text
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        setSearchServiceQuery("")
                                        setSelectedCategory(item.serviceCategoryName)
                                    }}
                                >
                                    <img
                                        src={item?.serviceCategoryImage?.url}
                                        alt={item.serviceCategoryName}
                                        style={{
                                            width: "2.2rem",
                                            height: "2.2rem",
                                            border: `0.1rem solid ${colors.queueBorder}`,
                                            objectFit: "cover",
                                            borderRadius: "50%",
                                        }}
                                    />
                                    {item.serviceCategoryName}
                                </button>

                            ))
                        )}
                    </div>

                    {/* Services */}
                    <div className={style.serviceCardContainer}>
                        {getServicesByBarberKioskisLoading ? (
                            <>
                                <Skeleton variant="rectangular" className={style.serviceCardLoader} />
                                <Skeleton variant="rectangular" className={style.serviceCardLoader} />
                                <Skeleton variant="rectangular" className={style.serviceCardLoader} />
                                <Skeleton variant="rectangular" className={style.serviceCardLoader} />
                            </>
                        ) : filteredServices?.length > 0 ? (
                            filteredServices.map((item, index) => {
                                const isSelected = selectedServices.find(s => s.serviceId === item.serviceId);
                                return (
                                    <button
                                        onClick={() =>
                                            isSelected
                                                ? removeServiceHandler(item)
                                                : addServiceHandler(item)
                                        }
                                        key={item.serviceId}
                                        className={style.serviceCard}
                                        style={{
                                            backgroundColor: colors.cardColor,
                                            // border: isSelected ? `0.2rem solid ${modecolors.color1}` : `0.1rem solid ${colors.queueBorder}`
                                            border: isSelected && currentTheme === "Dark" && modecolors.color1 === "#000000" ?
                                                '0.2rem solid #fff' : isSelected ? `0.2rem solid ${modecolors.color1}` : `0.1rem solid ${colors.queueBorder}`
                                        }}
                                    >
                                        <div>
                                            <div>
                                                <img src={item?.serviceIcon?.url} alt="service" style={{ border: `0.1rem solid ${colors.queueBorder}` }} />

                                                <button
                                                    style={{
                                                        position: "absolute",
                                                        right: "1rem",
                                                        bottom: "1rem",
                                                        width: "3.5rem",
                                                        height: "3.5rem",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        background: isSelected ? modecolors.color1 : modecolors.color1,
                                                        borderRadius: "50%",
                                                        border: "none",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() =>
                                                        isSelected
                                                            ? removeServiceHandler(item)
                                                            : addServiceHandler(item)
                                                    }
                                                >
                                                    {isSelected ? <CheckIcon color="#fff" /> : <AddIcon color='#fff' />}
                                                </button>

                                            </div>
                                            <h4>{item.serviceName}</h4>
                                            <p>~{formatMinutesToHrMin(item?.barberServiceEWT)}</p>
                                            <h3>
                                                {getDefaultSalonByAdmindata?.response?.currency} {item.servicePrice}
                                            </h3>
                                        </div>
                                    </button>
                                );
                            })
                        ) : (
                            <p style={{ color: colors.textColor, fontSize: "1.4rem", marginTop: "2rem" }}>
                                No services found.
                            </p>
                        )}
                    </div>


                </div>
            </main>

            {/* Bottom summary */}
            {selectedServices.length > 0 && (
                <div
                    className={style.serviceDetailContainer}
                    style={{
                        backgroundColor: colors.cardColor,
                        borderTop: `0.1rem solid ${colors.queueBorder}`
                    }}
                >
                    <div>
                        <h3>{getDefaultSalonByAdmindata?.response?.currency}{" "}{totalPrice.toFixed(2)}</h3>
                        <p>
                            {totalServices}{" "}
                            {totalServices === 1 ? "service" : "services"} | {formatMinutesToHrMin(totalTime)}
                        </p>
                    </div>

                    <button
                        style={{
                            backgroundColor: modecolors.color1
                        }}
                        onClick={() => {
                            setPreviewModal(true)
                        }}
                    >
                        Continue
                    </button>
                </div>
            )}


            <Modal
                open={previewModal}
                onClose={() => setPreviewModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "60%",
                    bgcolor: colors.color4,
                    borderRadius: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                    boxShadow: 5,
                    p: 2,
                    backgroundColor: colors.cardColor,
                    borderColor: colors.queueBorder
                }}>
                    <div className={style.modalHeader}>
                        <div
                            style={{
                                background: colors.tabBackground
                            }}
                        >
                            <CheckIcon color={currentTheme === "Dark" ? "#F4F4F5" : "#09090B"} />
                        </div>
                        <h3>Please Confirm</h3>
                    </div>

                    <p>Are you sure you want to proceed ?</p>

                    <div
                        className={style.modalBody}
                        style={{
                            background: colors.tabBackground
                        }}
                    >
                        <h4>{selectBarber?.name}</h4>
                        <div>
                            <h3>{getDefaultSalonByAdmindata?.response?.currency} {totalPrice.toFixed(2)}</h3>
                            <p>( {totalServices} {totalServices === 1 ? "service" : "services"} |{" "}
                                {formatMinutesToHrMin(totalTime)} )</p>
                        </div>
                    </div>

                    <div className={style.modalBtnGroup}>
                        <div />
                        <div>
                            <button
                                onClick={() => setPreviewModal(false)}
                            >No</button>

                            {
                                joinQueueKioskloading ? (
                                    <button
                                        style={{
                                            backgroundColor: modecolors.color1,
                                        }}
                                    ><ColorRing
                                            visible={true}
                                            height="2.4rem"
                                            width="2.4rem"
                                            ariaLabel="color-ring-loading"
                                            wrapperStyle={{}}
                                            wrapperClass="color-ring-wrapper"
                                            colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                                        /></button>
                                ) : (
                                    <button
                                        style={{
                                            backgroundColor: modecolors.color1,
                                            color: modecolors?.color2
                                        }}
                                        onClick={joinHandler}
                                    >Yes</button>
                                )
                            }
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default SalonServices2