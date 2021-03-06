import React, {PureComponent, Fragment} from 'react'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import {NavLink} from "react-router-dom"
import Side from '../../layouts/Side'
import ArticleList from '../../layouts/ArticleList'
import NotFound from '../../views/NotFound'
import {SITE_NAME, ARTICLE_LENGTH, SITE_SUB_NAME} from '../../config'
import {setCategory, setArticleList, CURRENT_PAGE} from './store/actions'
import whiteComponent from '../../Hoc/whiteComponent'

class Category extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      category: null,
      loading: false,
      currentPage: 1,
      hasMore: true,
      notFound: false
    }
  }

  componentWillMount() {
    this.getCategory(this.props.match.params.category)
    this.setHasMore()
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.initState()
      this.getCategory(nextProps.match.params.category)
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

  setHasMore = () => {
    const hasMore = this.props.total > this.props.articleList.length
    this.setState(() => ({
      hasMore
    }))
  }

  initState = () => {
    this.setState(() => ({
      loading: false,
      hasMore: true
    }))
  }

  getCategory = categoryName => {
    const category = this.props.categoryList.filter(item => (
      item.slug === categoryName
    ))
    if (category.length) {
      this.setState(() => ({
        category: category[0],
        notFound: false
      }), () => {
        if (this.props.articleList.length > 0 && this.props.articleList[0].category && this.props.articleList[0].category.slug === categoryName) return
        this.props.setArticleList({
          category_id: this.state.category._id,
          limit: ARTICLE_LENGTH
        })
      })
    } else {
      this.setState(() => ({
        notFound: true
      }))
    }
  }

  getMoreArticle = () => {
    this.setState(() => ({
      loading: true
    }))
    const page = this.props.currentPage + 1
    this.props.setArticleList({
      page,
      limit: ARTICLE_LENGTH,
      category_id: this.state.category._id
    }, this.props.articleList)
    this.props.setCurrentPage(this.props.currentPage + 1)
  }

  render() {
    const {siteInfo} = this.props
    const {category} = this.state
    return (
      this.state.notFound ?
        <NotFound staticContext={this.props.staticContext} /> :
        <Fragment>
          <Helmet>
            <title>{category && category.name || siteInfo && siteInfo.subtitle || SITE_SUB_NAME} - {siteInfo && siteInfo.title || SITE_NAME}</title>
            <meta name="keywords" content={`${siteInfo && siteInfo.keyword || ''}`} />
            <meta name="description" content={`${siteInfo && siteInfo.description || ''}`} />
          </Helmet>
          <div className="category container clearfix">
            <div className="main">
              <div className="breadcrumb">
                <span><NavLink to="/">首页</NavLink></span>
                <span className="arrow">›</span>
                <span className="current">{category && category.name}</span>
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

Category.loadData = (store, path) => store.dispatch(setCategory(store, path))

const mapStateToProps = state => ({
  siteInfo: state.common.siteInfo || {},
  categoryList: state.common.categoryList || [],
  articleList: state.category.articleList || [],
  total: state.category.total,
  currentPage: state.category.currentPage
})

const mapDispatchToProps = dispatch => ({
  setArticleList(params, curList) {
    dispatch(setArticleList(params, curList))
  },
  setCurrentPage(currentPage) {
    dispatch(CURRENT_PAGE(currentPage))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(whiteComponent(Category))
