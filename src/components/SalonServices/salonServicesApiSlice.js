import { apiSlice } from "../app/api/apiSlice"

export const salonServicesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        GetAllSalonCategories: builder.mutation({
            query: (salonId) => ({
                url: '/kiosk/getAllSalonCategories',
                method: 'POST',
                body: { salonId }
            })
        }),

        getSalonServicesByCategory: builder.mutation({
            query: ({ salonId, serviceCategoryName }) => ({
                url: '/kiosk/getSalonServicesByCategory',
                method: 'GET',
                params: {
                    salonId,
                    serviceCategoryName
                }
            })
        }),
    })
})

export const {
    useGetAllSalonCategoriesMutation, useGetSalonServicesByCategoryMutation } = salonServicesApiSlice