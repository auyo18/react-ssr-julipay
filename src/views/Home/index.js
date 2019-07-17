import React, {PureComponent, Fragment} from 'react'
import Helmet from 'react-helmet'
import Header from '../../layouts/Header'
import Footer from '../../layouts/Footer'
import ToTop from '../../layouts/ToTop'
import Side from "../../layouts/Side"
import ArticleList from "../../layouts/ArticleList"
import {connect} from "react-redux"
import Slick from 'react-slick'
import {SITE_NAME, ARTICLE_LENGTH} from '../../config'
import {
  setHome,
  setArticleList,
  setBannerList,
  CURRENT_PAGE
} from "./store/actions"
import {NavLink} from "react-router-dom"
import './index.scss'


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
    this.goTop();
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
    if (this.props.location !== nextProps.location) {
      this.goTop()
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

  selectCategory = index => {
    if (index === this.state.categoryIndex) return
    if (index > 0) {
      this.props.setArticleList({
        limit: ARTICLE_LENGTH,
        category: this.props.categoryInfo[index - 1]._id
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
        category: this.props.categoryInfo[index - 1]._id
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
      slidesToScroll: 1
    }
    return (
      <Fragment>
        <Helmet>
          <title>{this.props.siteInfo && this.props.siteInfo.subtitle || this.props.siteInfo && this.props.siteInfo.subtitle} - {this.props.siteInfo && this.props.siteInfo.title || SITE_NAME}</title>
          <meta name="keywords" content={`${this.props.siteInfo && this.props.siteInfo.keyword}`} />
          <meta name="description" content={`${this.props.siteInfo && this.props.siteInfo.description}`} />
        </Helmet>
        <Header />
        <div className="home container clearfix">
          <div className="main">
            <div className="banner">
              <Slick {...settings} ref="slick">
                {
                  this.props.bannerList && this.props.bannerList.length > 0 && this.props.bannerList.map(item => (
                    <div className="image" key={item._id}>
                      <img src={item.thumbnail + '?imageView2/1/w/1000/h/650/q/75|imageslim'} alt={item.title} />
                      <div className="text">
                        <p className="category">
                          <span>{item.category.name}</span>
                        </p>
                        <h2 className="title">
                          {item.title}
                        </h2>
                      </div>
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
                this.props.categoryInfo && this.props.categoryInfo.length > 0 && this.props.categoryInfo.map((item, index) => (
                  <span
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
        <Footer />
        <ToTop />
      </Fragment>
    )
  }
}

Home.loadData = store => store.dispatch(setHome())

const mapStateToProps = state => ({
  siteInfo: state.common.siteInfo,
  categoryInfo: state.common.categoryInfo,
  bannerList: state.home.bannerList,
  articleList: state.home.articleList,
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
