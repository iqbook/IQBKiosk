import React, { useState } from 'react'
import style from './SalonServices2.module.css'
import { LeftArrowIcon, SearchIcon } from '../../icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SalonServices2 = () => {

    const { colors } = useSelector(state => state.theme);
    const { modecolors } = useSelector(state => state.modeColor)

    const { currentTheme } = useSelector(state => state.theme);

    const [selecteditemegory, setSelecteditemegory] = useState("Haircut");
    const [selectedServices, setSelectedServices] = useState([]);

    const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
    const totalServices = selectedServices.length;
    const totalTime = `${totalServices * 30}m`; // dummy calc: 30 min per service

    const itemegories = [
        { id: 1, name: "Haircut", image: "https://via.placeholder.com/40" },
        { id: 2, name: "Shaving", image: "https://via.placeholder.com/40" },
        { id: 3, name: "Facial", image: "https://via.placeholder.com/40" },
    ];

    const services = [
        { id: 1, name: "Basic Haircut", price: 20, duration: "30m", icon: "https://via.placeholder.com/60", itemegory: "Haircut" },
        { id: 2, name: "Basic Haircut", price: 20, duration: "30m", icon: "https://via.placeholder.com/60", itemegory: "Haircut" },
        { id: 3, name: "Basic Haircut", price: 20, duration: "30m", icon: "https://via.placeholder.com/60", itemegory: "Haircut" },
        { id: 4, name: "Basic Haircut", price: 20, duration: "30m", icon: "https://via.placeholder.com/60", itemegory: "Haircut" },
        { id: 5, name: "Basic Haircut", price: 20, duration: "30m", icon: "https://via.placeholder.com/60", itemegory: "Haircut" },
        { id: 6, name: "Basic Haircut", price: 20, duration: "30m", icon: "https://via.placeholder.com/60", itemegory: "Haircut" },
        { id: 7, name: "Basic Haircut", price: 20, duration: "30m", icon: "https://via.placeholder.com/60", itemegory: "Haircut" },
        { id: 8, name: "Basic Haircut", price: 20, duration: "30m", icon: "https://via.placeholder.com/60", itemegory: "Haircut" },

        { id: 9, name: "Beard Trim", price: 15, duration: "20m", icon: "https://via.placeholder.com/60", itemegory: "Shaving" },
        { id: 10, name: "Luxury Facial", price: 40, duration: "45m", icon: "https://via.placeholder.com/60", itemegory: "Facial" },
    ];

    const toggleService = (service) => {
        if (selectedServices.find((s) => s.id === service.id)) {
            setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
        } else {
            setSelectedServices([...selectedServices, service]);
        }
    };

    const navigate = useNavigate()

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
                    <button onClick={() => navigate("/salonBarbers2")}><LeftArrowIcon /></button>
                    <p>Select Services</p>
                </div>

                <div>
                    <div>
                        <input
                            placeholder='Search services by itemegory'
                            style={{
                                backgroundColor: colors.cardColor,
                                border: `0.1rem solid ${colors.queueBorder}`
                            }}
                        // value={searchServiceQuery}
                        // onChange={(e) => setSearchServiceQuery(e.target.value)}
                        />
                        <div
                            style={{
                                backgroundColor: modecolors.color1
                            }}
                        ><SearchIcon color='#fff' size="2rem" /></div>
                    </div>
                </div>

                {/* itemegories */}
                <div className={style.servicesContainer}>
                    <div style={{ display: "flex", flexDirection: "row", gap: "1.5rem", flexWrap: "wrap", alignSelf: "flex-start" }}>
                        {itemegories.map((item) => (
                            <button
                                key={item.id}
                                style={{
                                    height: "4rem",
                                    paddingInline: "2rem",
                                    background: selecteditemegory === item.serviceitemegoryName ? modecolors.color1 : currentTheme === "Dark" ? "#3f3f46" : "#e4e4e7",
                                    border: "none",
                                    borderRadius: "0.4rem",
                                    color: selecteditemegory === item.serviceitemegoryName && "#fff",
                                    fontSize: "1.6rem",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.8rem", // space between image and text
                                    cursor: "pointer",
                                }}
                                onClick={() => setSelecteditemegory(item.name)}
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{
                                        width: "2.2rem",
                                        height: "2.2rem",
                                        border: "0.1rem solid gray",
                                        objectFit: "cover",
                                        borderRadius: "50%",
                                    }}
                                />
                                {item.name}
                            </button>
                        ))}
                    </div>

                    {/* Services */}
                    <div className={style.serviceCardContainer}>
                        {services
                            .filter((s) => s.itemegory === selecteditemegory)
                            .map((service) => {
                                const isSelected = selectedServices.find(
                                    (s) => s.id === service.id
                                );
                                return (
                                    <button
                                        key={service.id}
                                        onClick={() => toggleService(service)}
                                        className={style.serviceCard}
                                        style={{
                                            backgroundColor: "#fff",
                                            border: isSelected
                                                ? "0.2rem solid blue"
                                                : "0.1rem solid gray",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <div>
                                            <div style={{ position: "relative" }}>
                                                <img
                                                    src={service.icon}
                                                    alt="service"
                                                    style={{
                                                        border: "0.1rem solid gray",
                                                        width: "60px",
                                                        height: "60px",
                                                        borderRadius: "8px",
                                                    }}
                                                />

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
                                                        background: isSelected ? "blue" : "gray",
                                                        borderRadius: "50%",
                                                        border: "none",
                                                        cursor: "pointer",
                                                        color: "#fff",
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleService(service);
                                                    }}
                                                >
                                                    {isSelected ? "✓" : "+"}
                                                </button>
                                            </div>
                                            <h4>{service.name}</h4>
                                            <p>~{service.duration}</p>
                                            <h3>$ {service.price}</h3>
                                        </div>
                                    </button>
                                );
                            })}
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
                        <h3>$ {totalPrice.toFixed(2)}</h3>
                        <p>
                            {totalServices}{" "}
                            {totalServices === 1 ? "service" : "services"} | {totalTime}
                        </p>
                    </div>

                    <button
                        style={{
                            backgroundColor: modecolors.color1
                        }}
                        onClick={() => alert("Proceeding to barbers...")}
                    >
                        Continue
                    </button>
                </div>
            )}
        </>
    );
}

export default SalonServices2