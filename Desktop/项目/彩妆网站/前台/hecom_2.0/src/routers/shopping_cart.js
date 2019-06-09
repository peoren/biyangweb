export default [
    {
      path: '/shopping_cart/',
      name: 'shopping_cart',
      meta: {
        limit:true
      },
      component: () => import('@/views/shopping_cart/shopping_cart.vue'),
    },
    {
      path: '/toorder/',
      name: 'toorder',
      component: () => import('@/views/order/order_form.vue'),
    },
    {
      path: '/clear_shopping_cart/',
      name: 'clear_shopping_cart',
      component: () => import('@/views/shopping_cart/shopcartclear.vue'),
    }
  ]
