export default [
    {
      path: '/orderPay',
      name: 'orderPay',
      component: () => import('../views/order/order_pay.vue'),
    },
    {
      path: '/shopping_cart',
      name: 'shopping_cart',
      component: () => import('../views/shopping_cart/shopping_cart.vue'),
    },
    {
      path: '/person_center',
      name: 'person_center',
      component: () => import('../views/person_center/person_center.vue'),
    },
    {
      path: '/toorder',
      name: 'order',
      component: () => import('../views/order/order_form.vue'),
    },
  ]
