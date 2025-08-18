import { apiSlice } from "../app/api/apiSlice"

export const queueApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        GetQlistBySalonIdKiosk: builder.query({
            query: (salonId) => ({
                url: `/kiosk/getQlistBySalonIdKiosk?salonId=${salonId}`,
                method: 'GET'
            })
        }),
        barberServedQueue: builder.mutation({
            query: (queueData) => ({
                url: `/kiosk/barberServedQueueKiosk`,
                method: 'POST',
                body: queueData
            })
        }),
        cancelQKiyosk: builder.mutation({
            query: (queueData) => ({
                url: `/kiosk/canceledQKiosk`,
                method: "POST",
                body: queueData
            })
        })
    })
})

export const { useLazyGetQlistBySalonIdKioskQuery, useBarberServedQueueMutation, useCancelQKiyoskMutation } = queueApiSlice