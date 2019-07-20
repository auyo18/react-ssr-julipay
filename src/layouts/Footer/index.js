import React, {PureComponent} from 'react'
import './index.scss'

class Footer extends PureComponent {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <p className="copyright">
            Copyright © 2011 - 2019 JULIPAY.COM 聚力创意 | 蜀ICP备17044229号
          </p>
          <p className="rights">部分资源来源于网络整合，侵删</p>
        </div>
      </footer>
    )
  }
}

export default Footer
