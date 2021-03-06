import React, {PureComponent} from 'react'
import {NavLink} from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import {dateFormat} from "../../utils"
import './index.scss'

class ArticleList extends PureComponent {
  render() {
    const {articleList, loading, hasMore, getMoreArticle} = this.props
    return (
      <div className="article-wrapper">
        <div className="article-list">
          {
            articleList && articleList.length > 0 && articleList.map(item => (
              <div className="item clearfix" key={item._id}>
                <div className="mask"/>
                <div className="content">
                  <NavLink className="image-box" to={`/article/${item._id}`}>
                    <LazyLoad once offset={100}>
                      <div
                        className="image"
                        style={{backgroundImage: `url(${item.thumbnail ? item.thumbnail : ''}) `}}/>
                    </LazyLoad>
                  </NavLink>
                  <div className="info">
                    <h2 className="title ellipsis-2">
                      <NavLink to={`/article/${item._id}`}>
                        {item.title}
                      </NavLink>
                    </h2>
                    <p className="description ellipsis-2">
                      <NavLink to={`/article/${item._id}`}>
                        {item.description && item.description}
                      </NavLink>
                    </p>
                    <p className="bottom">
                      分类：
                      <span className="category">
                        <NavLink
                          to={`/category/${item.category && item.category.slug}`}>{item.category && item.category.name}</NavLink>
                      </span>
                      <span className="time">{dateFormat(item.updateTime)}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        {
          loading ?
            <div className="loading">
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-loading"/>
              </svg>
            </div> : hasMore ?
            <button onClick={getMoreArticle} className="more">加载更多</button> :
            <button className="no-more">- 没有更多内容 -</button>
        }
      </div>
    )
  }
}

export default ArticleList
