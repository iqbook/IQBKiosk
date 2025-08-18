import React from 'react'
import style from "./ErrorPage.module.css"

const ErrorPage = () => {
  return (
    <div className={style.error_container}>
      <div>
        <p>404</p>
        <p>Page not found</p>
      </div>
    </div>
  )
}

export default ErrorPage