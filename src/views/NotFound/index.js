import React from 'react'
import Header from "../../layouts/Header"
import Footer from '../../layouts/Footer'
import {SITE_NAME} from "../../config"
import {Helmet} from "react-helmet"

const NotFound = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>找不到页面 - {SITE_NAME}</title>
      </Helmet>
      <Header/>
      <p>404, sorry, page not found!</p>
      <Footer/>
    </div>
  )
}

export default NotFound
