import { apiSlice } from "../app/api/apiSlice";

export const salonBarbersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBarberByServicesKiosk: builder.mutation({
            query: ({ salonId, selectedServices }) => ({
                url: `/kiosk/getBarberByServicesKiosk`,
                method: "POST",
                body: {
                    salonId,
                    serviceIds: selectedServices.map((item) => item.serviceId)
                },
            }),
        }),
    }),
});

export const {
    useGetBarberByServicesKioskMutation,
} = salonBarbersApiSlice;
