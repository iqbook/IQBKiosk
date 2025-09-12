import { apiSlice } from "../app/api/apiSlice"

export const salonServices2ApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getServicesByBarberKiosk: builder.mutation({
            query: ({ salonId, serviceCategoryName }) => ({
                url: '/kiosk/getServicesByBarberKiosk',
                method: 'GET',
                params: {
                    barberId,
                    salonId
                }
            })
        }),
    })
})

export const { useGetServicesByBarberKioskMutation } = salonServices2ApiSlice