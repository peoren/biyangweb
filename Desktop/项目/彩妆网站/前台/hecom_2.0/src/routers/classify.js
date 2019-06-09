export default [
    
    {
      path: '/classify/:id', 
      name: 'classify',
      component: () => import('../views/classify/Classify.vue'),
    },
    {
      path: '/select/:val', 
      name: 'select',
      component: () => import('../views/classify/select.vue'),
    },
  ]
 