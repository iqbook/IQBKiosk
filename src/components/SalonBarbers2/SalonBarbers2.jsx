import React, { useState } from "react";
import style from "./SalonBarbers2.module.css"; // replace with actual file
import { Modal, Box } from "@mui/material";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LeftArrowIcon } from "../../icons";
import { useGetDefaultSalonByKioskMutation } from "../public/publicApiSlice";
import { useGetBarberByServicesKioskQuery } from "./salonBarbers2ApiSlice";

const SalonBarbers2 = () => {

    const connectedSalonId = localStorage.getItem("ConnectedSalonId")

    const { data, error, isLoading, isFetching } = useGetBarberByServicesKioskQuery();

    console.log("dsvsdv ", data)

    const [
        getDefaultSalonByAdmin,
        {
            data: getDefaultSalonByAdmindata
        }
    ] = useGetDefaultSalonByKioskMutation();

    const [previewModal, setPreviewModal] = useState(false);
    const [selectBarber, setSelectBarber] = useState(null);
    const [joinQueueKioskloading, setJoinQueueKioskloading] = useState(false);

    const totalPrice = 120;
    const totalServices = 2;
    const totalTime = "1h 30m";

    const navigate = useNavigate()
    const { colors } = useSelector(state => state.theme);
    const { modecolors } = useSelector(state => state.modeColor)

    const continueHandler = () => {

        navigate("/salonServices2")
    }

    return (
        <>
            <main
                className={style.container}
                style={{
                    backgroundColor: colors.color4,
                }}
            >
                <div>
                    <button onClick={() => navigate("/joinForm")}><LeftArrowIcon /></button>
                    <p>Select {getDefaultSalonByAdmindata?.response?.salonType === "Barber Shop" ? "Barber" : "Stylist"}</p>
                </div>

                {/* Dummy list of barbers */}
                <div>
                    <button
                        onClick={() => setSelectBarber({ barberId: 1, name: "John Doe" })}
                        className={style.barberCard}
                        style={{
                            backgroundColor: "#fff",
                            border:
                                selectBarber?.barberId === 1
                                    ? "0.2rem solid blue"
                                    : "0.1rem solid gray",
                        }}
                    >
                        <div>
                            <img
                                src="https://via.placeholder.com/80"
                                alt="barber"
                                style={{ border: "0.1rem solid gray" }}
                            />
                            <h4>John Doe</h4>
                            <p style={{ fontSize: "1.4rem", textAlign: "center" }}>~15m</p>
                        </div>
                    </button>

                    <button
                        onClick={() => setSelectBarber({ barberId: 2, name: "Jane Smith" })}
                        className={style.barberCard}
                        style={{
                            backgroundColor: "#fff",
                            border:
                                selectBarber?.barberId === 2
                                    ? "0.2rem solid blue"
                                    : "0.1rem solid gray",
                        }}
                    >
                        <div>
                            <img
                                src="https://via.placeholder.com/80"
                                alt="barber"
                                style={{ border: "0.1rem solid gray" }}
                            />
                            <h4>Jane Smith</h4>
                            <p style={{ fontSize: "1.4rem", textAlign: "center" }}>~20m</p>
                        </div>
                    </button>
                </div>
            </main>

            {/* Bottom Bar */}
            <div
                className={style.bottomContainer}
                style={{
                    backgroundColor: colors.cardColor,
                    borderTop: `0.1rem solid ${colors.queueBorder}`
                }}
            >
                <div>
                    <h3>$ {totalPrice.toFixed(2)}</h3>
                    <p>
                        {totalServices} services | {totalTime}
                    </p>
                </div>

                <button
                    style={{
                        backgroundColor: modecolors.color1,
                        color: modecolors?.color2
                    }}
                    onClick={continueHandler}
                    className={style.btn}
                >
                    Continue
                </button>
            </div>

        </>
    );
};

export default SalonBarbers2;
