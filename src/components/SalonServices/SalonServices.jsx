import React, { useEffect, useState } from 'react';
import style from './SalonServices.module.css';
import { AddIcon, CheckIcon, ClockIcon, DeleteIcon, LeftArrowIcon, SearchIcon } from '../../icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  useGetAllSalonCategoriesMutation,
  useGetSalonServicesByCategoryMutation
} from './salonServicesApiSlice';
import { selectCurrentAdminInfo } from '../AdminSignin/adminauthSlice';
import { Skeleton } from '@mui/material';
import { useGetDefaultSalonByKioskMutation } from '../public/publicApiSlice';
import toast from 'react-hot-toast';
import { useGlobal } from '../../context/GlobalContext';
import { formatMinutesToHrMin } from '../../utils/formatMinutesToHrMin';

const SalonServices = () => {

  const { selectedServices, setSelectedServices } = useGlobal()

  const adminInfo = useSelector(selectCurrentAdminInfo);
  const { colors } = useSelector(state => state.theme);
  const { modecolors } = useSelector(state => state.modeColor)

  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchServiceQuery, setSearchServiceQuery] = useState("");
  const connectedSalonId = localStorage.getItem("ConnectedSalonId")


  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const customerName = searchParams.get("customerName");
  const customerEmail = searchParams.get("customerEmail");
  const mobileNumber = searchParams.get("mobileNumber");
  const countryflag = searchParams.get("countryflag");

  const [
    getAllSalonCategories,
    {
      data: getAllSalonCategoriesData,
      isLoading: getAllSalonCategoriesisLoading
    }
  ] = useGetAllSalonCategoriesMutation();

  const [
    getSalonServicesByCategory,
    {
      data: getSalonServicesByCategoryData,
      isLoading: getSalonServicesByCategoryisLoading
    }
  ] = useGetSalonServicesByCategoryMutation();

  const [
    getDefaultSalonByAdmin,
    {
      data: getDefaultSalonByAdmindata
    }
  ] = useGetDefaultSalonByKioskMutation();


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

  useEffect(() => {
    if (connectedSalonId) {
      getAllSalonCategories(connectedSalonId);
    }
  }, []);

  useEffect(() => {
    if (connectedSalonId && selectedCategory) {
      getSalonServicesByCategory({
        salonId: connectedSalonId,
        serviceCategoryName: selectedCategory
      });
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (getAllSalonCategoriesData?.response?.length > 0) {
      setSelectedCategory(getAllSalonCategoriesData.response[0].serviceCategoryName);
    }
  }, [getAllSalonCategoriesData]);

  const filteredServices = getSalonServicesByCategoryData?.response?.filter(service =>
    service?.serviceName?.toLowerCase().includes(searchServiceQuery.toLowerCase())
  );


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

  const totalPrice = selectedServices.reduce((acc, service) => acc + service.servicePrice, 0);
  const totalTime = selectedServices.reduce((acc, service) => acc + service.serviceEWT, 0);
  const totalServices = selectedServices.length;

  const { currentTheme } = useSelector(state => state.theme);


  return (
    <>
      <main className={style.container} style={{
        backgroundColor: colors.color4,
        height: selectedServices.length > 0 ? "calc(var(--primary-height) - 7rem)" : "var(--primary-height)"
      }}>
        <div>
          <button onClick={() => navigate("/joinForm")}><LeftArrowIcon /></button>
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
              onChange={(e) => setSearchServiceQuery(e.target.value)}
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
            {getAllSalonCategoriesisLoading ? (
              <>
                <Skeleton variant="rectangular" className={style.skeleton} />
                <Skeleton variant="rectangular" className={style.skeleton} />
                <Skeleton variant="rectangular" className={style.skeleton} />
                <Skeleton variant="rectangular" className={style.skeleton} />
              </>
            ) : (
              getAllSalonCategoriesData?.response?.map((item) => (
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
                  onClick={() => setSelectedCategory(item.serviceCategoryName)}
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

          <div className={style.serviceCardContainer}>
            {getSalonServicesByCategoryisLoading ? (
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
                      <p>~{formatMinutesToHrMin(item.serviceEWT)}</p>
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

      {
        selectedServices.length > 0 && (
          <div
            className={style.serviceDetailContainer}
            style={{
              backgroundColor: colors.cardColor,
              borderTop: `0.1rem solid ${colors.queueBorder}`
            }}
          >
            <div>
              <h3>{getDefaultSalonByAdmindata?.response?.currency} {totalPrice.toFixed(2)}</h3>
              <p>{totalServices} {totalServices === 1 ? "service" : "services"} |{" "}
                {formatMinutesToHrMin(totalTime)}</p>
            </div>

            <button
              style={{
                backgroundColor: modecolors.color1
              }}
              onClick={() => {
                if (selectedServices.length === 0) {
                  toast.error("Atleast one service need to be selected", {
                    duration: 3000,
                    style: {
                      fontSize: "var(--list-modal-header-normal-font)",
                      borderRadius: "0.3rem",
                      background: "#333",
                      color: "#fff",
                    },
                  });
                  return
                }
                navigate("/salonBarbers")
              }}
            >
              Continue
            </button>
          </div>
        )
      }

    </>
  );
};

export default SalonServices;
