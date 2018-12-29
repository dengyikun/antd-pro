export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin'],
    routes: [
      { path: '/', redirect: '/order/completed' },
      {
        path: '/order',
        name: 'order',
        icon: 'form',
        routes: [
          {
            path: '/order/completed',
            name: 'completed',
            component: './Order/TableList',
          },
          {
            path: '/order/paying',
            name: 'paying',
            component: './Order/TableList',
          },
          {
            path: '/order/cancel',
            name: 'cancel',
            component: './Order/TableList',
          },
        ],
      },
      {
        path: '/dish',
        name: 'dish',
        icon: 'coffee',
        component: './Dish/TableList',
      },
      {
        path: '/dish/detail/:id?',
        name: '',
        component: './Dish/Detail',
      },
      {
        path: '/dish-type',
        name: 'dishType',
        icon: 'tag',
        component: './DishType/TableList',
      },
    ],
  },
];
