import React, {PureComponent, Fragment} from 'react'
import {renderRoutes} from 'react-router-config'
import Header from '../Header'
import Footer from '../Footer'
import ToTop from '../ToTop'

class Layout extends PureComponent {
  componentWillReceiveProps(nextProps, nextContext) {
    this.refs.header.setNav(false)
  }

  render() {
    return (
      <Fragment>
        <Header ref="header" />
        {
          renderRoutes(this.props.route.routes)
        }
        <Footer />
        <ToTop />
      </Fragment>
    )
  }
}

export default Layout
