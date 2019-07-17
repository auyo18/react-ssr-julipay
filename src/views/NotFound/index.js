import React, {PureComponent} from 'react'
import Header from "../../layouts/Header"
import Footer from '../../layouts/Footer'
import {SITE_NAME} from "../../config"
import {Helmet} from "react-helmet"
import {setNotFound} from "./store/actions"
import {connect} from "react-redux"
import ToTop from "../../layouts/ToTop"

class NotFound extends PureComponent {
  componentWillMount() {
    // !this.props.siteInfo.title && this.props.setNotFound()
  }

  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8"/>
          <title>{this.props.siteInfo && this.props.siteInfo.subtitle || '首页'} - {this.props.siteInfo && this.props.siteInfo.title || SITE_NAME}</title>
          <meta name="keywords" content={`${this.props.siteInfo && this.props.siteInfo.keyword}`}/>
          <meta name="description" content={`${this.props.siteInfo && this.props.siteInfo.description}`}/>
        </Helmet>
        <Header/>
        <p>404, sorry, page not found!</p>
        <Footer/>
        <ToTop/>
      </div>
    )
  }
}

NotFound.loadData = store => store.dispatch(setNotFound())

const mapStateToProps = state => ({
  siteInfo: state.common.siteInfo
})

const mapDispatchToProps = dispatch => ({
  setNotFound() {
    dispatch(setNotFound())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(NotFound)
