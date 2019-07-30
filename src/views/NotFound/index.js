import React, {PureComponent} from 'react'
import {Helmet} from 'react-helmet'
import {connect} from 'react-redux'
import {SITE_NAME,SITE_SUB_NAME} from '../../config'
import {setNotFound} from "./store/actions"
import './index.scss'

class NotFound extends PureComponent {
  render() {
    this.props.staticContext && (this.props.staticContext.NotFound = true)
    return (
      <div className="not-found">
        <Helmet>
          <meta charSet="utf-8"/>
          <title>{this.props.siteInfo && this.props.siteInfo.subtitle || SITE_SUB_NAME} - {this.props.siteInfo && this.props.siteInfo.title || SITE_NAME}</title>
          <meta name="keywords" content={`${this.props.siteInfo && this.props.siteInfo.keyword || ''}`}/>
          <meta name="description" content={`${this.props.siteInfo && this.props.siteInfo.description || ''}`}/>
        </Helmet>
        <div className="not-found-main container">
          <div className="status">404</div>
          <p className="info">抱歉，您要查看的数据不存在或已被删除。</p>
        </div>
      </div>
    )
  }
}

NotFound.loadData = store => store.dispatch(setNotFound())

const mapStateToProps = state => ({
  siteInfo: state.common.siteInfo || {}
})

export default connect(mapStateToProps, null)(NotFound)
