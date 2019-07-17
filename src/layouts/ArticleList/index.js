import React, {PureComponent} from 'react'
import {NavLink} from "react-router-dom"
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
                <div className="mask" />
                <div className="content">
                  <div className="image">
                    <img src={`${item.thumbnail}?imageView2/1/w/520/h/300/q/75|imageslim`} alt={item.title} />
                  </div>
                  <div className="info">
                    <h2 className="title">
                      {item.title}
                    </h2>
                    <p className="description">
                      {item.description.slice(0, 50)}
                    </p>
                    <p className="bottom">
                      分类：
                      <span className="category">
                        <NavLink to={`/${item.category.slug}`}>{item.category.name}</NavLink>
                      </span>
                      <span className="time">
                        ☀&nbsp;&nbsp;{dateFormat(item.updateTime)}
                      </span>
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
                <use xlinkHref="#icon-loading" />
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
