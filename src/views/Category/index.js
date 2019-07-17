import React, {PureComponent, Fragment} from 'react'
import Helmet from "react-helmet"
import {connect} from "react-redux"
import Header from "../../layouts/Header"
import Footer from "../../layouts/Footer"
import ToTop from "../../layouts/ToTop"
import {SITE_NAME} from "../../config"
import {setCategory} from "./store/actions"
import './index.scss'

class Category extends PureComponent {
  render() {
    return (
      <Fragment>
        <Helmet>
          <meta charSet="utf-8"/>
          <title>{this.props.siteInfo && this.props.siteInfo.subtitle || '首页'} - {this.props.siteInfo && this.props.siteInfo.title || SITE_NAME}</title>
          <meta name="keywords" content={`${this.props.siteInfo && this.props.siteInfo.keyword}`}/>
          <meta name="description" content={`${this.props.siteInfo && this.props.siteInfo.description}`}/>
        </Helmet>
        <Header/>
        <Footer/>
        <ToTop/>
      </Fragment>
    )
  }
}

Category.loadData = store => store.dispatch(setCategory())

const mapStateToProps = state => ({
  siteInfo: state.common.siteInfo,
  categoryInfo: state.common.categoryInfo
})

export default connect(mapStateToProps, null)(Category)
