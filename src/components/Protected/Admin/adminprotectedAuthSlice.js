import { apiSlice } from "../../app/api/apiSlice"

export const adminprotectedAuthSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        loggedinKiosk: builder.mutation({
            query: (token) => ({
                url: `/kiosk/loggedinKiosk`,
                method: 'POST',
                body:{token:token}
            }),
            providesTags: ['adminloggin'] //GET API KORTE HBE POST HBENA
        })
    })
})

export const { useLoggedinKioskMutation } = adminprotectedAuthSlice