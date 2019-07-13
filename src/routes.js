import React from 'react'

import Home from './views/Home'
import NotFound from './views/NotFound'

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
    key: 'home'
  },
  {
    component: NotFound
  }
]

export default routes
