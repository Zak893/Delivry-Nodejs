import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("../layouts/AuthLayout"),
    children: [
      {
        path: "",
        component: () => import("../pages/Auth/SignPage"),
      },

    ],
  },
  {
    path: "/auth",
    name: "AuthLayout",
    component: () => import("../layouts/AuthLayout"),
    children: [
      {
        path: "",
        component: () => import("../pages/Auth/LoginPage"),
      },
      {
        path: "login",
        component: () => import("../pages/Auth/LoginPage"),
      },
      {
        path: "admin",
        component: () => import("../pages/Auth/Admin"),
      },
      {
        path: "sign",
        component: () => import("../pages/Auth/SignPage"),
      },
    ],
  },
  {
    path: "/",
    name: "MainLayout",
    component: () => import("../layouts/MainLayout"),
    children: [
      {
        path: "my-orders",
        component: () => import("../pages/MyOrdersPage"),
        meta: { requiresAuth: true }
      },
      {
        path: "delivry-orders",
        component: () => import("../pages/DelivryOrders"),
        meta: { requiresAuth: true }
      },
      {
        path: "validate",
        component: () => import("../pages/validatePage"),
      },
      {
        path: "allusers",
        component: () => import("../pages/usersPage"),
      },
      {
        path: "localis",
        component: () => import("../pages/localisationPage"),
      },
      {
        path: "delivrys",
        component: () => import("../pages/delivryPage"),
      },
      {
        path: "unique-delivry",
        component: () => import("../pages/uniqueDelPage"),
      },
      {
        path: "profile",
        name: "ProfilePage",
        component: () => import("../pages/ProfilePage.vue"),
        meta: { requiresAuth: true },
        children: [
          {
            path: "",
            component: () => import("../pages/Profile/AccountPage"),
          },
          {
            path: "address",
            component: () => import("../pages/Profile/AddressPage"),
          },
          {
            path: "my-orders",
            component: () => import("../pages/MyOrdersPage"),
          },
          {
            path: "delivery",
            component: () => import("../pages/Profile/Delivery.vue"),
          },
       
        ],
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('userType')  ;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isAuthenticated) {
      if ((to.path.includes('/profile/delivery') || to.path.includes('/my-orders')) && isAuthenticated !== 'User') {
        next('/profile'); // Redirigez les utilisateurs non autorisés vers la page de connexion
      } else {
        next(); // L'utilisateur est connecté et a accès à la route
      }    } else {
      next('/auth/sign'); // L'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
    }
  } else {
    next(); // La route ne nécessite pas d'authentification, laissez l'utilisateur passer
  }
})

export default router;
