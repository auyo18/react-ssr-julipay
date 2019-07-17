import React, {PureComponent} from 'react'
import {connect} from "react-redux"
import {NavLink} from 'react-router-dom'
import './index.scss'

class Header extends PureComponent {
  render() {
    return (
      <header className="header">
        <div className="container clearfix">
          <img src={this.props.siteInfo.logo} alt={this.props.siteInfo.title} className="logo"/>
          <nav>
            <NavLink to="/">首页</NavLink>
            {
              this.props.categoryInfo && this.props.categoryInfo.map(item => (
                <NavLink to={item.slug} key={item._id} className="item">{item.name}</NavLink>
              ))
            }
          </nav>
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  siteInfo: state.common.siteInfo,
  categoryInfo: state.common.categoryInfo
})

export default connect(mapStateToProps, null)(Header)
