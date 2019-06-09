export default [
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('@/views/detail/Detail.vue'),
    }
  ]
