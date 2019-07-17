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
import {setHome, setArticleList} from "./store/actions"
import {dateFormat} from "../../utils"
import './index.scss'
import {NavLink} from "react-router-dom"


class Home extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      banners: [],
      categoryIndex: 0,
      articles: [],
      loading: false,
      currentPage: 1,
      hasMore: true
    }
  }

  async componentWillMount() {
    !this.props.siteInfo.title && this.props.setHome()
    if (this.props.total === this.props.articleList.length * this.state.currentPage) {
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

    const hasMore = nextProps.total > nextProps.articleList.length

    this.setState(() => ({
      loading: false,
      hasMore
    }))
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
      categoryIndex: index,
      currentPage: 1
    }))
  }

  getMoreArticle = () => {
    this.setState(() => ({
      loading: true
    }))
    const page = this.state.currentPage + 1
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
  }

  render() {
    const settings = {
      dots: true,
      lazyLoad: true,
      // autoplay: true,
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
          <meta charSet="utf-8"/>
          <title>{this.props.siteInfo && this.props.siteInfo.subtitle || '首页'} - {this.props.siteInfo && this.props.siteInfo.title || SITE_NAME}</title>
          <meta name="keywords" content={`${this.props.siteInfo && this.props.siteInfo.keyword}`}/>
          <meta name="description" content={`${this.props.siteInfo && this.props.siteInfo.description}`}/>
        </Helmet>
        <Header/>
        <div className="home container clearfix">
          <div className="main">
            <div className="banner">
              <Slick {...settings} ref="slick">
                {
                  this.props.bannerList && this.props.bannerList.length && this.props.bannerList.map(item => (
                    <div className="image" key={item._id}>
                      <img src={item.thumbnail + '?imageView2/1/w/1000/h/650/q/75|imageslim'} alt={item.title}/>
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
            <div className="article-wrapper">
              <div className="switches">
              <span
                onClick={() => {
                  this.selectCategory(0)
                }}
                className={`switch${this.state.categoryIndex === 0 ? ' cur' : ''}`}
              >最新</span>
                {
                  this.props.categoryInfo && this.props.categoryInfo.length && this.props.categoryInfo.map((item, index) => (
                    <span
                      key={item._id}
                      className={`switch${index + 1 === this.state.categoryIndex ? ' cur' : ''}`}
                      onClick={() => {
                        this.selectCategory(index + 1)
                      }}>{item.name}</span>
                  ))
                }
              </div>
              <ArticleList articleList={this.props.articleList} loading={this.state.loading}
                           hasMore={this.state.hasMore} getMoreArticle={this.getMoreArticle}/>
            </div>
          </div>
          <Side/>
        </div>
        <Footer/>
        <ToTop/>
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
  total: state.home.total
})

const mapDispatchToProps = dispatch => ({
  setHome() {
    dispatch(setHome())
  },
  setArticleList(params, curList) {
    dispatch(setArticleList(params, curList))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
