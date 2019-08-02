import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import './index.scss'

class Footer extends PureComponent {
  render() {
    const {siteInfo} = this.props
    return (
      <footer className="footer">
        {
          siteInfo ? <div className="container">
            <p className="copyright">
              Copyright © 2011 - 2019 JULIPAY.COM 聚力创意 | {siteInfo.beian}
            </p>
            <p className="rights">部分资源来源于网络整合，侵删</p>
          </div> : null
        }
      </footer>
    )
  }
}

const mapStateToProps = state => ({
  siteInfo: state.common.siteInfo || {}
})

export default connect(mapStateToProps, null)(Footer)
