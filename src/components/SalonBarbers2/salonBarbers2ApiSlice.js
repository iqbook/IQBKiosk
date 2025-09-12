import { apiSlice } from "../app/api/apiSlice";

export const salonBarbers2ApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBarberByServicesKiosk: builder.query({
            query: () => ({
                url: `/kiosk/getAvailableBarbersForQKiosk`,
                method: "GET",
                params: { salonId: 1 },
            }),
        }),
    }),
});

export const { useGetBarberByServicesKioskQuery } = salonBarbers2ApiSlice;
