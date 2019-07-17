import React from 'react'
import Home from './views/Home'
import Category from './views/Category'
import NotFound from './views/NotFound'

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
    loadData: Home.loadData,
    key: 'home'
  },
  {
    path: '/:category',
    component: Category,
    exact: true,
    loadData: Category.loadData,
    key: 'category'
  },
  {
    component: NotFound,
    loadData: NotFound.loadData,
    key: 'notfound'
  }
]

export default routes
