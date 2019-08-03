import React, {PureComponent, Fragment} from 'react'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import {ARTICLE_LENGTH, SITE_NAME} from '../../config'
import whiteComponent from '../../Hoc/whiteComponent'
import {SEARCH_NAME, setSearch} from './store/actions'
import Side from '../../layouts/Side'
import ArticleList from '../../layouts/ArticleList'
import {CURRENT_PAGE} from './store/actions'
import {setArticleList} from './store/actions'
import {NavLink} from "react-router-dom"

class Search extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      currentPage: 1,
      hasMore: true,
      notFound: false
    }
  }

  componentWillMount() {
    this.getArticleList(this.props.match.params.name)
    this.setHasMore()
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.initState()
      this.getArticleList(nextProps.match.params.name)
      this.props.setCurrentPage(1)
    }

    const nextArticleLength = nextProps.articleList.length
    const hasMore = nextProps.total > nextArticleLength
    if (this.props.articleList.length !== nextArticleLength) {
      this.setState(() => ({
        loading: false,
        hasMore
      }))
    } else {
      this.setState(() => ({
        hasMore
      }))
    }
  }

  getArticleList(nextName) {
    if (this.props.name !== nextName || !this.props.articleList.length) {
      this.props.setSearchName(nextName)
      this.props.setArticleList({
        keyword: nextName,
        limit: ARTICLE_LENGTH
      })
    }
  }

  initState = () => {
    this.setState(() => ({
      loading: false,
      hasMore: true
    }))
  }

  setHasMore = () => {
    const hasMore = this.props.total > this.props.articleList.length
    this.setState(() => ({
      hasMore
    }))
  }

  getMoreArticle = () => {
    this.setState(() => ({
      loading: true
    }))
    const page = this.props.currentPage + 1
    this.props.setArticleList({
      keyword: this.props.match.params.name,
      page,
      limit: ARTICLE_LENGTH
    }, this.props.articleList)
    this.props.setCurrentPage(this.props.currentPage + 1)
  }

  render() {
    const {siteInfo} = this.props
    const name = this.props.match.params.name
    return (
      <Fragment>
        <Helmet>
          <title>{name + ' - 搜索'} - {siteInfo && siteInfo.title || SITE_NAME}</title>
          <meta name="keywords" content={`${siteInfo && siteInfo.keyword || ''}`} />
          <meta name="description" content={`${siteInfo && siteInfo.description || ''}`} />
        </Helmet>
        <div className="tag container clearfix">
          <div className="main">
            <div className="breadcrumb">
              <span><NavLink to="/">首页</NavLink></span>
              <span className="arrow">›</span>
              <span className="current">搜索：{name}</span>
            </div>
            <ArticleList
              articleList={this.props.articleList}
              loading={this.state.loading}
              hasMore={this.state.hasMore}
              getMoreArticle={this.getMoreArticle} />
          </div>
          <Side />
        </div>
      </Fragment>
    )
  }
}

Search.loadData = (store, path) => store.dispatch(setSearch(path))

const mapStateToProps = state => ({
  siteInfo: state.common.siteInfo || {},
  articleList: state.search.articleList || [],
  total: state.search.total,
  currentPage: state.search.currentPage,
  name: state.search.name
})

const mapDispatchToProps = dispatch => ({
  setArticleList(params, curList) {
    dispatch(setArticleList(params, curList))
  },
  setCurrentPage(currentPage) {
    dispatch(CURRENT_PAGE(currentPage))
  },
  setSearchName(name) {
    dispatch(SEARCH_NAME(name))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(whiteComponent(Search))
