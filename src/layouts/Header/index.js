import React, {PureComponent} from 'react'
import {connect} from "react-redux"
import {NavLink, withRouter} from 'react-router-dom'
import {setNavState, setSearchState} from './store/actions'
import './index.scss'

class Header extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      keyword: ''
    }
  }

  setKeyword = e => {
    const keyword = e.target.value
    this.setState(() => ({
      keyword: keyword.trim()
    }))
  }

  search = e => {
    if (e.nativeEvent.keyCode === 13) {
      this.props.history.push(`/search/${this.state.keyword}`)
      this.props.setSearchState(false)
    }
  }

  deleteKeyword = () => {
    if (this.state.keyword) {
      this.setState(() => ({
        keyword: ''
      }))
    }
  }

  render() {
    return (
      <header className="header-wrapper">
        <div className="header container clearfix">
          <h1 className="logo">
            <NavLink to="/">
              <div className="image" style={{backgroundImage: `url(${this.props.siteInfo.logo || ''})`}} />
              <span>{this.props.siteInfo.title}</span>
            </NavLink>
          </h1>
          <nav className={`${this.props.showNav ? 'show' : ''}`}>
            <p className="hide">
              <span className="btn" onClick={() => {
                this.props.setNavState(false)
              }}>✕</span>
            </p>
            <NavLink to="/" className="item">首页</NavLink>
            {
              this.props.categoryList && this.props.categoryList.map(item => (
                <NavLink to={`/category/${item.slug}`} key={item._id} className="item">{item.name}</NavLink>
              ))
            }
          </nav>
          <div className="search-btn" onClick={() => {
            this.props.setSearchState(!this.props.showSearch)
          }}>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref={this.props.showSearch ? '#icon-guanbi' : '#icon-sousuo'} />
            </svg>
          </div>
          <div className={`mask${this.props.showNav ? ' show' : ''}`} onClick={() => {
            this.props.setNavState(false)
          }} />
          <div className="nav-button">
            <svg className="icon" aria-hidden="true" onClick={() => {
              this.props.setNavState(true)
            }}>
              <use xlinkHref="#icon-caidan" />
            </svg>
          </div>
        </div>
        <div className={'search-wrapper' + (this.props.showSearch ? '' : ' hide')}>
          <div className="search container">
            <input type="text" placeholder="输入关键词，回车搜索" value={this.state.keyword} onChange={this.setKeyword}
                   onKeyPress={this.search} />
            <div className={'deleteKeyword' + (this.state.keyword ? '' : ' hide')}>
              <svg className="icon" aria-hidden="true" onClick={this.deleteKeyword}>
                <use xlinkHref="#icon-guanbi1" />
              </svg>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  siteInfo: state.common.siteInfo || {},
  categoryList: state.common.categoryList || [],
  showNav: state.header.showNav,
  showSearch: state.header.showSearch
})

const mapDispatchToProps = dispatch => ({
  setNavState(showNav) {
    dispatch(setNavState(showNav))
  },
  setSearchState(showSearch) {
    dispatch(setSearchState(showSearch))
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
