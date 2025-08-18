import { apiSlice } from "../../app/api/apiSlice"

export const signinApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        GetAllBarbersKiosk: builder.query({
            query: (data) => ({
                url: `/kiosk/getAllBarbersKiosk?salonId=${data.salonId}&email=${data.email}`,
                method: 'GET',
            })
        }),
        BarberLoginKiosk: builder.mutation({
            query: (barberdata) => ({
                url: '/kiosk/barberLoginKiosk',
                method: 'POST',
                body: barberdata
            })
        }),
        GoogleBarberLoginKiosk: builder.mutation({
            query: (barberdata) => ({
                url: `/kiosk/googleBarberLoginKiosk`,
                method: 'POST',
                body: barberdata
            })
        })
    })
})

export const { useLazyGetAllBarbersKioskQuery, useBarberLoginKioskMutation, useGoogleBarberLoginKioskMutation } = signinApiSlice