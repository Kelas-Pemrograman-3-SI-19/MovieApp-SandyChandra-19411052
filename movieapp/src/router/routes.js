
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      authAdmin: true
    },
    children: [
      { path: '', name: 'dashboardadmin', component: () => import('pages/admin/Index') },
      { path: '/inputbarang', name: 'inputbarang', component: () => import('pages/admin/inputBarang') },
      { path: '/datauser', name: 'datauser', component: () => import('pages/admin/datauser') },
      { path: '/datadvd', name: 'datadvd', component: () => import('pages/admin/datadvd') },
      { path: '/formedit/:id', name: 'formeditdvd', component: () => import('pages/admin/formedit') }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/userlayout'),
    meta: {
      authUser: true
    },
    children: [
      { path: '', name: 'homeuser', component: () => import('pages/user/Index') },
      { path: '', name: 'myorder', component: () => import('pages/user/myorder') }
    ]
  },
  {
    path: '/login',
    name: 'loginpage',
    component: () => import('pages/guest/login')
  },
  {
    path: '/register',
    name: 'registerpage',
    component: () => import('pages/guest/register')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
