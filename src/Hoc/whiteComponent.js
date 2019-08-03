import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {setNavState} from '../layouts/Header/store/actions'

export default (DecoratedComponent) => {
  class NewComponent extends PureComponent {
    componentWillMount = () => {
      this.hideNav()
      this.goTop()
    }

    componentWillReceiveProps = (nextProps, nextContext) => {
      if (this.props.location.pathname !== nextProps.location.pathname) {
        this.hideNav()
        this.goTop()
      }
    }

    goTop = () => {
      try {
        document.documentElement.scrollTop = document.body.scrollTop = 0
      } catch (e) {
        console.log(e.message)
      }
    }

    hideNav = () => {
      this.props.showNav && this.props.setNavState(false)
    }

    render = () => {
      return <DecoratedComponent {...this.props} />
    }
  }

  NewComponent.loadData = (store, patch) => DecoratedComponent.loadData(store, patch)

  const mapStateToProps = state => ({
    showNav: state.header.showNav,
    showSearch: state.header.showSearch
  })

  const mapDispatchToProps = dispatch => ({
    setNavState(showNav) {
      dispatch(setNavState(showNav))
    }
  })

  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}
