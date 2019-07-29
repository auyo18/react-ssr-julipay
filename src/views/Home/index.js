import React, {PureComponent, Fragment} from 'react'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import Slick from 'react-slick'
import {NavLink} from 'react-router-dom'
import Side from '../../layouts/Side'
import ArticleList from '../../layouts/ArticleList'
import {SITE_NAME, ARTICLE_LENGTH} from '../../config'
import {
  setHome,
  setArticleList,
  setBannerList,
  CURRENT_PAGE
} from './store/actions'
import './index.scss'
import whiteComponent from '../../Hoc/whiteComponent'

class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      categoryIndex: 0,
      loading: false,
      hasMore: true
    }
  }

  async componentWillMount() {
    (!this.props.bannerList.length || !this.props.articleList.length) && this.props.setHome()
    if (this.props.total <= this.props.articleList.length) {
      this.setState(() => ({
        hasMore: false
      }))
    } else {
      this.setState(() => ({
        hasMore: true
      }))
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
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


  selectCategory = index => {
    if (index === this.state.categoryIndex) return
    if (index > 0) {
      this.props.setArticleList({
        limit: ARTICLE_LENGTH,
        category_id: this.props.categoryList[index - 1]._id
      })
    } else {
      this.props.setArticleList()
    }
    this.setState(() => ({
      categoryIndex: index
    }))
    this.props.setCurrentPage(1)
  }

  getMoreArticle = () => {
    this.setState(() => ({
      loading: true
    }))
    const page = this.props.currentPage + 1
    const index = this.state.categoryIndex
    let params = null
    if (index > 0) {
      params = {
        page,
        limit: ARTICLE_LENGTH,
        category: this.props.categoryList[index - 1]._id
      }
    } else {
      params = {
        page,
        limit: ARTICLE_LENGTH
      }
    }
    this.props.setArticleList(params, this.props.articleList)
    this.props.setCurrentPage(page)
  }

  render() {
    const settings = {
      dots: true,
      // lazyLoad: true,
      autoplay: true,
      arrows: false,
      autoplaySpeed: 5000,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: false
    }
    return (
      <Fragment>
        <Helmet>
          <title>{this.props.siteInfo && this.props.siteInfo.subtitle || this.props.siteInfo && this.props.siteInfo.subtitle || '聚力创意'} - {this.props.siteInfo && this.props.siteInfo.title || SITE_NAME}</title>
          <meta name="keywords" content={`${this.props.siteInfo && this.props.siteInfo.keyword}`} />
          <meta name="description" content={`${this.props.siteInfo && this.props.siteInfo.description}`} />
        </Helmet>
        <div className="home container clearfix">
          <div className="main">
            <div className="banner">
              <Slick {...settings} ref="slick">
                {
                  this.props.bannerList && this.props.bannerList.length > 0 && this.props.bannerList.map(item => (
                    <div className="item" key={item._id}>
                      <NavLink to={`/article/${item._id}`}>
                        <div
                          className="image"
                          style={{backgroundImage: `url(${item.thumbnail}?imageView2/1/w/1000/h/650/q/75|imageslim)`}}>
                        </div>
                        <div className="text">
                          <p className="category">
                            <span>{item.category && item.category.name}</span>
                          </p>
                          <h2 className="title">
                            {item.title}
                          </h2>
                        </div>
                      </NavLink>
                    </div>
                  ))
                }
              </Slick>
            </div>
            <div className="switches">
              <span
                onClick={() => {
                  this.selectCategory(0)
                }}
                className={`switch${this.state.categoryIndex === 0 ? ' cur' : ''}`}
              >最新</span>
              {
                this.props.categoryList && this.props.categoryList.length > 0 && this.props.categoryList.map((item, index) => (
                  <span
                    key={item._id}
                    key={item._id}
                    className={`switch${index + 1 === this.state.categoryIndex ? ' cur' : ''}`}
                    onClick={() => {
                      this.selectCategory(index + 1)
                    }}>{item.name}</span>
                ))
              }
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

Home.loadData = store => store.dispatch(setHome())

const mapStateToProps = state => ({
  siteInfo: state.common.siteInfo || {},
  categoryList: state.common.categoryList || [],
  bannerList: state.home.bannerList || [],
  articleList: state.home.articleList || [],
  total: state.home.total,
  currentPage: state.home.currentPage
})

const mapDispatchToProps = dispatch => ({
  setHome() {
    dispatch(setBannerList())
    dispatch(setArticleList())
  },
  setArticleList(params, curList) {
    dispatch(setArticleList(params, curList))
  },
  setCurrentPage(currentPage) {
    dispatch(CURRENT_PAGE(currentPage))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(whiteComponent(Home))
