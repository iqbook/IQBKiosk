import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useLoggedinKioskMutation } from './adminprotectedAuthSlice'
import { useDispatch } from 'react-redux'
import { setAdminCredentials, setAdminToken } from '../../AdminSignin/adminauthSlice'

const ProtectedRoute = () => {
  const loggedinuser = localStorage.getItem('adminkiyoskloggin')
  const kiyosktoken = localStorage.getItem('adminkiyosktoken')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [
    loggedinKiosk,
    {
      isSuccess,
      data,
      isError,
      error,
      isLoading
    }
  ] = useLoggedinKioskMutation()


  useEffect(() => {
    if (loggedinuser === 'false' || loggedinuser === undefined || loggedinuser === 'undefined' || loggedinuser === null || !kiyosktoken || kiyosktoken === null || kiyosktoken === undefined || kiyosktoken === "undefined" || kiyosktoken === "") {
      localStorage.setItem("adminkiyoskloggin", "false")
      navigate('/')
    } else if (isError) {
      if (error?.status === 403 || error?.status === 500) {
        localStorage.setItem("adminkiyoskloggin", "false")
        navigate('/')
      }
    } else if (isSuccess) {
      dispatch(setAdminCredentials(data))
    } else {
      loggedinKiosk(kiyosktoken)
    }
  }, [loggedinuser, kiyosktoken, navigate, isError, isSuccess, dispatch])

  //ar adminkiyosktoken jodi valid thake akhane && lagate hbe

  return (
    <div>{loggedinuser === 'true' && <Outlet />}</div>
  )
}

export default ProtectedRoute