import React, {PureComponent, Fragment} from 'react'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import {NavLink} from 'react-router-dom'
import NotFound from '../NotFound'
import {SITE_NAME} from '../../config'
import {
  setArticle,
  setArticleContent
} from './store/actions'
import Side from '../../layouts/Side'
import {dateFormat} from '../../utils'
import whiteComponent from '../../Hoc/whiteComponent'
import './index.scss'

class Article extends PureComponent {
  constructor(props) {
    super(props)
  }

  async componentWillMount() {
    await this.getArticleContent(this.props.match.params.id)
  }

  async componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      await this.getArticleContent(nextProps.match.params.id)
    }
  }

  getArticleContent = async (id) => {
    this.props.articleContent && (!this.props.articleContent._id || (this.props.articleContent._id !== id)) && await this.props.setArticleContent({id})
  }

  render() {
    const {siteInfo, articleContent, articleNotFound, staticContext} = this.props
    return (
      articleNotFound ?
        <NotFound staticContext={staticContext} /> :
        <Fragment>
          <Helmet>
            <title>{articleContent && articleContent.title || siteInfo && siteInfo.subtitle || SITE_NAME} - {siteInfo && siteInfo.title || SITE_NAME}</title>
            <meta name="keywords" content={`${articleContent && articleContent.keyword}`} />
            <meta name="description" content={`${articleContent && articleContent.description}`} />
          </Helmet>
          <div className="article container clearfix">
            <div className="main">
              <div className="breadcrumb">
                <span><NavLink to="/">首页</NavLink></span>
                <span className="arrow">›</span>
                <span className="category">
                  {
                    articleContent.category &&
                    <NavLink to={`/category/${articleContent.category.slug}`}>
                      {articleContent.category.name}
                    </NavLink>
                  }
                </span>
                <span className="arrow">›</span>
                <span className="current">{articleContent.title}</span>
              </div>
              <p className="category">
                {
                  articleContent.category &&
                  <NavLink to={`/category/${articleContent.category.slug}`}>
                    <span>{articleContent.category.name}</span>
                  </NavLink>
                }
              </p>
              <h2 className="title">
                {articleContent.title}
              </h2>
              <p className="meta">
                <span className="time">{dateFormat(articleContent.updateTime)}</span>
                <span className="author">{articleContent.author}</span>
              </p>
              <div className="content-wrapper">
                <div className="content" dangerouslySetInnerHTML={{__html: articleContent.content}} />
                <div className="tag">
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-biaoqian" />
                  </svg>
                  {
                    articleContent.keyword && articleContent.keyword.split(',').map(tag => (
                      <span key={tag}>{tag}</span>
                    ))
                  }
                </div>
              </div>
              <div className="recommend">
                <h2 className="title">推荐文章</h2>
                <div className="article-list">
                  {
                    this.props.recommendList && this.props.recommendList.length > 0 && this.props.recommendList.map((article, index) => (
                      <NavLink to={`/article/${article._id}`} className="article" key={article._id}>
                        {article.title}
                      </NavLink>
                    ))
                  }
                </div>
              </div>
            </div>
            <Side hideRecommend={true} />
          </div>
        </Fragment>
    )
  }
}

Article.loadData = (store, path) => store.dispatch(setArticle(path))

const mapStateToProps = state => ({
  siteInfo: state.common.siteInfo,
  articleContent: state.article.articleContent,
  articleNotFound: state.article.articleNotFound,
  recommendList: state.side.recommendList
})
const mapDispatchToProps = dispatch => ({
  async setArticleContent(params) {
    await dispatch(setArticleContent(params))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(whiteComponent(Article))
