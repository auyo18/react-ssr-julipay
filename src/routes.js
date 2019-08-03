import React from 'react'
import Layout from './layouts/Layout'
import Home from './views/Home'
import Category from './views/Category'
import Article from './views/Article'
import Tag from './views/Tag'
import Search from './views/Search'
import NotFound from './views/NotFound'

const routes = [
  {
    component: Layout,
    routes: [
      {
        path: '/',
        component: Home,
        exact: true,
        loadData: Home.loadData,
        key: 'home'
      },
      {
        path: '/category/:category',
        component: Category,
        loadData: Category.loadData,
        key: 'category'
      },
      {
        path: '/article/:id',
        component: Article,
        loadData: Article.loadData,
        key: 'article'
      },
      {
        path: '/tag/:name',
        component: Tag,
        loadData: Tag.loadData,
        key: 'tag'
      },
      {
        path: '/search/:name',
        component: Search,
        loadData: Search.loadData,
        key: 'search'
      },
      {
        path: '/error',
        component: NotFound,
        loadData: NotFound.loadData,
        key: 'error'
      },
      {
        component: NotFound,
        loadData: NotFound.loadData,
        key: 'notfound'
      }
    ]
  }
]

export default routes
