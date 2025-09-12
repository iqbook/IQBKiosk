import { apiSlice } from "../app/api/apiSlice"

export const salonServices2ApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getServicesByBarberKiosk: builder.mutation({
            query: ({ salonId, barberId }) => ({
                url: '/kiosk/getServicesByBarberKiosk',
                method: 'POST',
                body: {
                    barberId,
                    salonId
                }
            })
        }),
    })
})

export const { useGetServicesByBarberKioskMutation } = salonServices2ApiSlice