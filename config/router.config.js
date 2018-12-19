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
    authority: ['admin', 'user'],
    routes: [
      { path: '/', redirect: '/dish' },
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
        icon: 'flag',
        component: './DishType/TableList',
      },
    ],
  },
];
