import { apiSlice } from '../app/api/apiSlice'

export const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        ChangeSalonOnlineStatusKiosk: builder.mutation({
            query: (salondata) => ({
                url: `/kiosk/changeSalonOnlineStatusKiosk`,
                method: 'POST',
                body: salondata
            })
        }),
        ChangeBarberClockedInStatusKiosk: builder.mutation({
            query: (barberdata) => ({
                url: '/kiosk/changeBarberClockedInStatusKiosk',
                method: 'POST',
                body: barberdata
            })
        }),
        GetAttendenceByBarberIdKiosk: builder.mutation({
            query: (barberdata) => ({
                url: '/kiosk/getAttendenceByBarberIdKiosk',
                method: 'POST',
                body: barberdata
            })
        }),
        ChangeBarberOnlineStatusKiosk: builder.mutation({
            query: (barberdata) => ({
                url: '/kiosk/changeBarberOnlineStatusKiosk',
                method: "POST",
                body: barberdata
            })
        }),
        MobileBookingAvailabilityStatus: builder.mutation({
            query: (mobilebookdata) => ({
                url: `/kiosk/mobileBookingAvailabilityStatus`,
                method: 'POST',
                body: mobilebookdata
            })
        }),
        KioskBookingAvailabilityStatus: builder.mutation({
            query: (kisokbookdata) => ({
                url: `/kiosk/kioskAvailabilityStatus`,
                method: 'POST',
                body: kisokbookdata
            })
        }),

    })
})

export const { useChangeSalonOnlineStatusKioskMutation, useChangeBarberClockedInStatusKioskMutation, useGetAttendenceByBarberIdKioskMutation, useChangeBarberOnlineStatusKioskMutation, useMobileBookingAvailabilityStatusMutation, useKioskBookingAvailabilityStatusMutation } = dashboardApiSlice