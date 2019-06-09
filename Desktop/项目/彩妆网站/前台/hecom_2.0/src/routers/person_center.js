export default [
    {
      path: '/person_center',
      name: 'person_center',
      component: () => import('@/views/person_center/person_center.vue'),
      children:[
        {
          path: '',
          name: 'myorder',
          component: () => import('@/views/person_center/children/NewOrder.vue'),
          meta: {
            limit:true
          },
        },
        {
          path: 'comment',
          name: 'comment',
          component: () => import('@/views/person_center/children/Comment.vue'),
          meta: {
            limit:true
          },
        },
        {
          path: 'writecomment',
          name: 'writecomment',
          component: () => import('@/views/person_center/children/WriteComment.vue'),
          meta: {
            limit:true
          },
        },
        {
          path: 'address',
          name: 'address',
          component: () => import('@/views/person_center/children/Address.vue'),
          meta: {
            limit:true
          },
        },
        {
          path: 'changepassword',
          name: 'changepassword',
          component: () => import('@/views/person_center/children/Changepassword.vue'),
          meta: {
            limit:true
          },
        },
        {
          path: 'wishlist',
          name: 'wishlist',
          component: () => import('@/views/person_center/children/Wishlist.vue'),
          meta: {
            limit:true
          },
        },
        {
          path: 'integral',
          name: 'integral',
          component: () => import('@/views/person_center/children/Integral.vue'),
          meta: {
            limit:true
          },
        },
        {
          path: 'userinfo',
          name: 'userinfo',
          component: () => import('@/views/person_center/children/Userinfo.vue'),
          meta: {
            limit:true
          },
        },
        {
          path: 'orderdetail',
          name: 'orderdetail',
          component: () => import('@/views/person_center/children/Orderdetail.vue'),
          meta: {
            limit:true
          },
        },
        {
          path: 'refund',
          name: 'refund',
          component: () => import('@/views/person_center/children/Refund.vue'),
          meta: {
            limit:true
          },
        },
        {
          path:'commitrefund',
          name:'commitrefund',
          component:() => import('@/views/person_center/children/Commitrefund.vue'),
          meta: {
            limit:true
          },
        }
      ],
    },
   
  ]
