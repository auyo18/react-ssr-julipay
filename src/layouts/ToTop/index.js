import React, {PureComponent} from 'react'
import './index.scss'

class ToTop extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.showToTop)
  }

  toTop = () => {
    let height = document.documentElement.scrollTop
    const time = 10
    const totalTime = 300
    const distance = height / (totalTime / time)
    this.timer = setInterval(() => {
      if (document.documentElement.scrollTop <= 0) {
        clearInterval(this.timer)
      }
      height = height - distance
      document.documentElement.scrollTop = height
    }, time)
  }

  showToTop = () => {
    if (document.documentElement.scrollTop > 600) {
      !this.state.show && this.setState(() => ({
        show: true
      }))
    } else {
      this.state.show && this.setState(() => ({
        show: false
      }))
    }
  }

  render() {
    return (
      <div
        className={`to-top${this.state.show ? ' show' : ''}`}
        onClick={this.toTop}>
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#icon-huidaodingbu"/>
        </svg>
      </div>
    )
  }
}

export default ToTop
