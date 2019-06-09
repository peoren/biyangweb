export default [
    {
     path:'/forgotpassword',
     name:'forgotpassword',
     component:() => import('@/views/forgotpassword/forgotpassword.vue'),
     children:[
        {
          path:'/',
          name:'one',
          component: () => import('@/views/forgotpassword/components/one.vue')
        },
        {
          path:'two',
          name:'two',
          component: () => import('@/views/forgotpassword/components/two.vue')
        },
        {
          path:'three',
          name:'three',
          component: () => import('@/views/forgotpassword/components/three.vue')
        },
        {
          path:'four',
          name:'four',
          component: () => import('@/views/forgotpassword/components/four.vue')
        },
     ]

    }
]