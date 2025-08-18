import { apiSlice } from "../app/api/apiSlice"

export const joinqueueApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        GetAvailableBarbersForQKiosk: builder.query({
            query: (data) => ({
                url: `/kiosk/getAvailableBarbersForQKiosk?salonId=${data.salonId}`,
                method: 'GET',
            })
        }),
        GetServicesByBarberKiosk: builder.mutation({
            query: (barberdata) => ({
                url: '/kiosk/getServicesByBarberKiosk',
                method: 'POST',
                body: barberdata
            })
        }),
        GetAllSalonServicesKiosk: builder.query({
            query: (data) => ({
                url:`/kiosk/getAllSalonServicesKiosk?salonId=${data.salonId}`,
                method:'GET'
            })
        }),
        GetBarberByServicesKiosk: builder.mutation({
            query: (servicesdata) => ({
                url:'/kiosk/getBarberByServicesKiosk',
                method: 'POST',
                body: servicesdata
            })
        }),
        JoinQueueKiosk: builder.mutation({
            query: (joinqueuedata) => ({
                url: '/kiosk/joinQueueKiosk',
                method: 'POST',
                body: joinqueuedata
            })
        })
    })
})

export const {
    useLazyGetAvailableBarbersForQKioskQuery,
    useGetServicesByBarberKioskMutation,
    useLazyGetAllSalonServicesKioskQuery,
    useGetBarberByServicesKioskMutation,
    useJoinQueueKioskMutation
} = joinqueueApiSlice 