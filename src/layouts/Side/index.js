import React, {Fragment, PureComponent} from 'react'
import {connect} from "react-redux"
import {dateFormat} from "../../utils"
import {setOneRandomArticle, setPolymerizationArticle, setRecommendArticle} from "./store/actions"
import './index.scss'
import {NavLink} from "react-router-dom"

class Side extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      skills: [
        'icon-HTML',
        'icon-CSS',
        'icon-JavaScript',
        'icon-xiaochengxu',
        'icon-node-jsNodejsxingnengpingtai',
        'icon-webpack',
        'icon-React',
        'icon-Vue'
      ],
      switchRotate: false
    }
  }

  componentWillMount() {
    (!this.props.oneRandomArticle.length || !this.props.recommendList.length || !this.props.polymerizationList.length) && this.props.setSide()
  }

  setOneRandomArticle = () => {
    if (this.state.switchRotate) return
    this.props.setOneRandomArticle()
    this.setState(() => ({
      switchRotate: true
    }), () => {
      setTimeout(() => {
        this.setState(() => ({
          switchRotate: false
        }))
      }, 1000)
    })
  }

  render() {
    return (
      <div className="side">
        <div className="author">
          <div className="avatar-wrapper">
            <div className="bg" />
            <div className="mask" />
            <div className="avatar">
              <div className="img"
                   style={{backgroundImage: 'url(http://image.julipay.com/b829ce62-6828-d73e-8c7c-45efaa3036b2)'}} />
            </div>
          </div>
          <div className="meta">
            <p className="name">
              <span>JaMie</span>
            </p>
            <p className="role">
              <span>前端工程师</span>
            </p>
            <p className="skill">技能栈</p>
            <div className="icon-wrapper">
              {
                this.state.skills.map((item, index) => (
                  <svg className="icon" aria-hidden="true" key={index}>
                    <use xlinkHref={`#${item}`} />
                  </svg>
                ))
              }
            </div>
            <div className="cases">
              <div className="default">
                <p className="title">Cases</p>
                <div className="case">
                  <a href="http://y.julipay.com" target="_blank">音乐站-React</a>
                  <img
                    className="scan-image"
                    src="data:image/png;base64,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"
                    alt="" />
                </div>
                <div className="case">
                  <a href="http://music.julipay.com" target="_blank">音乐站-Vue</a>
                  <img
                    className="scan-image"
                    src="data:image/png;base64,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"
                    alt="" />
                </div>
                <div className="case">
                  <a href="/" target="_blank">本站-React</a>
                </div>
                <div className="case">
                  <a href="http://tea.julipay.com" target="_blank">资讯站-Vue</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="random">
          {
            this.props.oneRandomArticle && this.props.oneRandomArticle.length > 0 &&
            <Fragment>
              <NavLink to={`/article/${this.props.oneRandomArticle[0]._id}`}>
                <div className="image"
                     style={{backgroundImage: `url(${this.props.oneRandomArticle[0].thumbnail})`}} />
              </NavLink>
              <div className="bottom">
                <p>
                  <span className="badge">随机一文</span>
                  <span className={`switch${this.state.switchRotate ? ' rotate' : ''}`}
                        onClick={this.setOneRandomArticle}>↻</span>
                </p>
                <p className="title">
                  <NavLink to={`/article/${this.props.oneRandomArticle[0]._id}`}>
                    {this.props.oneRandomArticle[0].title}
                  </NavLink>
                </p>
              </div>
            </Fragment>
          }
        </div>
        <div className="polymerization">
          <h2 className="title">
            聚合文章
          </h2>
          <div className="article-wrapper">
            {
              this.props.polymerizationList && this.props.polymerizationList.length > 0 && this.props.polymerizationList.map(article => (
                <div className="article" key={article._id}>
                  <h3 className="title">
                    <NavLink to={`/article/${article._id}`}>
                      {article.title}
                    </NavLink>
                  </h3>
                  <p className="time">
                    {dateFormat(article.updateTime)}
                  </p>
                </div>
              ))
            }
          </div>
        </div>
        {
          !this.props.hideRecommend && <div className="recommend">
            <h2 className="title">推荐文章</h2>
            <div className="article-wrapper">
              {
                this.props.recommendList && this.props.recommendList.length > 0 && this.props.recommendList.map((article, index) => (
                  <div className={`article ${index < 2 ? 'background' : 'column'}`} key={article._id}>
                    <div className="index one">{index + 1}</div>
                    <NavLink to={`/article/${article._id}`}>
                      <div
                        className="image"
                        style={{backgroundImage: `url(${article.thumbnail}?imageView2/1/w/500/h/375/q/75|imageslim)`}} />
                    </NavLink>
                    {
                      index < 2 ?
                        <NavLink to={`/article/${article._id}`}>
                          <div className="text-wrapper">
                            <div className="text">
                              <p className="title">
                                {article.title}
                              </p>
                            </div>
                          </div>
                        </NavLink> :
                        <div className="text-wrapper">
                          <div className="text">
                            <p className="title">
                              <NavLink to={`/article/${article._id}`}>
                                {article.title}
                              </NavLink>
                            </p>
                            <p className="time">{dateFormat(article.updateTime)}</p>
                          </div>
                        </div>
                    }
                  </div>
                ))
              }
            </div>
          </div>
        }
      </div>
    )
  }
}

Side.defaultProps = {
  hideRecommend: false
}

const mapStateToProps = state => ({
  oneRandomArticle: state.side.oneRandomArticle || [],
  recommendList: state.side.recommendList || [],
  polymerizationList: state.side.polymerizationList || []
})

const mapDispatchToProps = dispatch => ({
  setOneRandomArticle() {
    dispatch(setOneRandomArticle())
  },
  setSide() {
    dispatch(setOneRandomArticle())
    dispatch(setRecommendArticle())
    dispatch(setPolymerizationArticle())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Side)
