import React, {PureComponent, Fragment} from 'react'
import Helmet from 'react-helmet'
import Header from "../../layouts/Header"
import Footer from '../../layouts/Footer'
import {SITE_NAME} from "../../config"
import {setSiteInfo} from "../../store/actions"
import {connect} from "react-redux"

class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      siteInfo: {}
    }
  }

  async componentWillMount() {
    !this.props.siteInfo.title && this.props.getSiteInfo()
  }


  render() {
    return (
      <Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>首页 - {this.props.siteInfo.title || SITE_NAME}</title>
          <meta name="keywords" content={`${this.props.siteInfo.keyword}`} />
          <meta name="description" content={`${this.props.siteInfo.description}`} />
        </Helmet>
        <Header />
        <p>Home</p>
        <Footer />
      </Fragment>
    )
  }
}

Home.loadData = store => store.dispatch(setSiteInfo())

const mapStateToProps = state => ({
  siteInfo: state.common.siteInfo
})

const mapDispatchToProps = dispatch => ({
  getSiteInfo() {
    dispatch(setSiteInfo())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
