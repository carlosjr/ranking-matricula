
const routes = [
  { path: '/', redirect: '/view' },
  {
    path: '/view',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/ranking.vue') },
      { path: 'enrollment', component: () => import('pages/Index.vue') },
      { path: 'ranking', component: () => import('pages/ranking.vue') },
      { path: 'students', component: () => import('pages/students.vue') },
      { path: 'users', component: () => import('pages/users.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/Login.vue'),
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
