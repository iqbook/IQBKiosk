import { apiSlice } from "../app/api/apiSlice";

export const salonBarbers2ApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAvailableBarbersForQKiosk: builder.mutation({
            query: (salonId) => ({
                url: `/kiosk/getAvailableBarbersForQKiosk`,
                method: "GET",
                params: { salonId },
            }),
        }),
    }),
});

export const { useGetAvailableBarbersForQKioskMutation } = salonBarbers2ApiSlice;
