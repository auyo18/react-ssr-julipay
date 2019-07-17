import React, {PureComponent, Fragment} from 'react'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import {NavLink} from "react-router-dom"
import Header from '../../layouts/Header'
import Footer from '../../layouts/Footer'
import ToTop from '../../layouts/ToTop'
import ArticleList from '../../layouts/ArticleList'
import {SITE_NAME, ARTICLE_LENGTH} from '../../config'
import {setCategory, setArticleList, CURRENT_PAGE} from './store/actions'
import Side from '../../layouts/Side'
import './index.scss'

class Category extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      category: null,
      loading: false,
      currentPage: 1,
      hasMore: true
    }
  }

  componentWillMount() {
    this.goTop()
    this.getCategory(this.props.match.params.category)
    let hasMore = this.props.total > this.props.articleList.length
    this.setState(() => ({
      hasMore
    }))
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.location !== nextProps.location) {
      this.goTop()
      this.getCategory(nextProps.match.params.category)
      this.initState()
      this.props.setCurrentPage(1)
    }

    const hasMore = nextProps.total > nextProps.articleList.length
    this.setState(() => ({
      loading: false,
      hasMore
    }))
  }

  goTop = () => {
    try {
      document.documentElement.scrollTop = document.body.scrollTop = 0
    }catch (e) {
      console.log(e.message)
    }
  }

  initState = () => {
    this.setState(() => ({
      loading: false,
      hasMore: true
    }))
  }

  getCategory = categoryName => {
    const category = this.props.categoryInfo.filter(item => (
      item.slug === categoryName
    ))
    if (category.length) {
      this.setState(() => ({
        category: category[0]
      }), () => {
        this.props.setArticleList({
          category: this.state.category._id,
          limit: ARTICLE_LENGTH
        })
      })
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
      category: this.state.category._id
    }, this.props.articleList)
    this.props.setCurrentPage(this.props.currentPage + 1)
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>{this.state.category && this.state.category.name || this.props.siteInfo && this.props.siteInfo.subtitle} - {this.props.siteInfo && this.props.siteInfo.title || SITE_NAME}</title>
          <meta name="keywords" content={`${this.props.siteInfo && this.props.siteInfo.keyword}`} />
          <meta name="description" content={`${this.props.siteInfo && this.props.siteInfo.description}`} />
        </Helmet>
        <Header />
        <div className="category container clearfix">
          <div className="main">
            <div className="breadcrumb">
              <span><NavLink to="/">首页</NavLink></span>
              <span className="arrow">›</span>
              <span className="current">{this.state.category.name}</span>
            </div>
            <ArticleList
              articleList={this.props.articleList}
              loading={this.state.loading}
              hasMore={this.state.hasMore}
              getMoreArticle={this.getMoreArticle} />
          </div>
          <Side />
        </div>
        <Footer />
        <ToTop />
      </Fragment>
    )
  }
}

Category.loadData = (store, path) => store.dispatch(setCategory(store, path))

const mapStateToProps = state => ({
  siteInfo: state.common.siteInfo,
  categoryInfo: state.common.categoryInfo,
  articleList: state.category.articleList,
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

export default connect(mapStateToProps, mapDispatchToProps)(Category)
