import React, {PureComponent} from 'react'

export default (DecoratedComponent) => {
  class NewComponent extends PureComponent {
    componentWillMount() {
      this.goTop()
    }

    componentWillReceiveProps(nextProps, nextContext) {
      if (this.props.location.pathname !== nextProps.location.pathname) {
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

    render() {
      return <DecoratedComponent {...this.props} />
    }
  }

  NewComponent.loadData = (store, patch) => DecoratedComponent.loadData(store, patch)

  return NewComponent
}
