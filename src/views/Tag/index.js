import React, {PureComponent, Fragment} from 'react'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import {ARTICLE_LENGTH, SITE_NAME} from '../../config'
import whiteComponent from '../../Hoc/whiteComponent'
import {setTag} from "./store/actions"
import Side from "../../layouts/Side"
import ArticleList from "../../layouts/ArticleList"
import {CURRENT_PAGE, TAG_NAME} from "./store/actions"
import {setArticleList} from './store/actions'

class Tag extends PureComponent {
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
    this.getArticleList()
    this.setHasMore()
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      console.log(this.props.match.params.name)
      this.initState()
      this.getArticleList()
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

  getArticleList() {
    (this.props.name !== this.props.match.params.name || !this.props.articleList.length) && this.props.setArticleList({
      keyword: this.props.match.params.name,
      limit: ARTICLE_LENGTH
    })
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
    return (
      <Fragment>
        <Helmet>
          <title>{this.props.match.params.name + ' - 标签'} - {siteInfo && siteInfo.title || SITE_NAME}</title>
          <meta name="keywords" content={`${siteInfo && siteInfo.keyword || ''}`} />
          <meta name="description" content={`${siteInfo && siteInfo.description || ''}`} />
        </Helmet>
        <div className="tag container clearfix">
          <div className="main">
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

Tag.loadData = (store, path) => store.dispatch(setTag(path))

const mapStateToProps = state => ({
  siteInfo: state.common.siteInfo || {},
  articleList: state.tag.articleList || [],
  total: state.tag.total,
  currentPage: state.tag.currentPage,
  name: state.tag.name
})

const mapDispatchToProps = dispatch => ({
  setArticleList(params, curList) {
    dispatch(setArticleList(params, curList))
  },
  setCurrentPage(currentPage) {
    dispatch(CURRENT_PAGE(currentPage))
  },
  setTagName(name) {
    dispatch(TAG_NAME(name))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(whiteComponent(Tag))
