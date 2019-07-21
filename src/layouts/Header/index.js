import React, {PureComponent} from 'react'
import {connect} from "react-redux"
import {NavLink} from 'react-router-dom'
import {setInfo} from "../../store/actions"
import './index.scss'

class Header extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showNav: false
    }
  }

  componentWillMount() {
    (!this.props.siteInfo.title || !this.props.categoryInfo.length) && this.props.setInfo()
  }

  setNav = (status) => {
    this.setState(() => ({
      showNav: status
    }))
  }

  render() {
    return (
      <header className="header">
        <div className="container clearfix">
          <h1 className="logo">
            <NavLink to="/">
              <div className="image" style={{backgroundImage:`url(${this.props.siteInfo.logo})`}}/>
              <span>{this.props.siteInfo.title}</span>
            </NavLink>
          </h1>
          <nav className={`${this.state.showNav ? ' show' : ''}`}>
            <NavLink to="/" className="item">首页</NavLink>
            {
              this.props.categoryInfo && this.props.categoryInfo.map(item => (
                <NavLink to={`/category/${item.slug}`} key={item._id} className="item">{item.name}</NavLink>
              ))
            }
          </nav>
          <div className={`mask${this.state.showNav ? ' show' : ''}`} onClick={() => {
            this.setNav(false)
          }} />
          <div className="nav-button">
            <svg className="icon" aria-hidden="true" onClick={() => {
              this.setNav(true)
            }}>
              <use xlinkHref="#icon-caidan" />
            </svg>
          </div>
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  siteInfo: state.common.siteInfo,
  categoryInfo: state.common.categoryInfo
})

const mapDispatchToProps = dispatch => ({
  setInfo() {
    dispatch(setInfo())
  }
})

export default connect(mapStateToProps, mapDispatchToProps, null,
  {
    forwardRef: true
  })(Header)
