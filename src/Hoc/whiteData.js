import React, {PureComponent} from 'react'

export default (DecoratedComponent) => {
  class NewComponent extends PureComponent {
    render() {
      return <DecoratedComponent {...this.props} />
    }
  }

  NewComponent.loadData = () => {
    console.log(77)
  }
  return NewComponent
}
