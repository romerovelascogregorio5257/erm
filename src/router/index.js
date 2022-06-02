import {createRouter, createWebHistory} from "vue-router"
import pinia from "@/stores/store"
import {useAuthStore} from "@/stores/auth"
import {useUserStore} from "@/stores/user"
import SideMenu from "../layouts/side-menu/Main.vue"
import SimpleMenu from "../layouts/simple-menu/Main.vue"
import TopMenu from "../layouts/top-menu/Main.vue"
import ErrorPage from "../views/error-page/Main.vue"
import Login from "../views/auth/login/Main.vue"
import Home from "../views/home/Main.vue"
import Profile from "../views/user/Profile.vue"
import CrudTest from "../views/system/test/CrudTest.vue"
import Checkpoint from "../views/erm/checkpoint/report/detail/Main.vue";
import Dashboard from "../views/erm/checkpoint/report/dashboard/Main.vue";

const authStore = useAuthStore(pinia)
const userStore = useUserStore(pinia)

const routes = [
    {
        path: "/",
        component: SideMenu,
        children: [
            {
                path: "/",
                name: "home",
                component: Home,
                meta: {requiresAuth: true}
            },
            {
                path: "/profile",
                name: "profile",
                component: Profile,
                meta: {requiresAuth: true}
            },
            {
                path: "/crudtest",
                name: "crud-test",
                component: CrudTest,
                meta: {requiresAuth: true}
            },
            {
                path: "/checkpoint/:id",
                name: "checkpoint",
                component: Checkpoint,
                meta: {requiresAuth: true}
            },
            {
                path: "/dashboard",
                name: "dashboard",
                component: Dashboard,
                meta: {requiresAuth: true}
            },

        ]
    },
    {
        path: "/simple-menu",
        component: SimpleMenu,
        children: [
            {
                path: "/",
                name: "simple-menu-home",
                component: Home,
                meta: {requiresAuth: true}
            },
            {
                path: "/profile",
                name: "simple-menu-profile",
                component: Profile,
                meta: {requiresAuth: true}
            },
            {
                path: "/crudtest",
                name: "simple-menu-crud-test",
                component: CrudTest,
                meta: {requiresAuth: true}
            },
            {
                path: "/checkpoint/:id",
                name: "simple-menu-checkpoint",
                component: Checkpoint,
                meta: {requiresAuth: true}
            },
            {
                path: "/dashboard",
                name: "simple-menu-dashboard",
                component: Dashboard,
                meta: {requiresAuth: true}
            },

        ]
    },
    {
        path: "/top-menu",
        component: TopMenu,
        children: [
            {
                path: "/",
                name: "top-menu-home",
                component: Home,
                meta: {requiresAuth: true}
            },
            {
                path: "/profile",
                name: "top-menu-profile",
                component: Profile,
                meta: {requiresAuth: true}
            },
            {
                path: "/crudtest",
                name: "top-menu-crud-test",
                component: CrudTest,
                meta: {requiresAuth: true}
            },
            {
                path: "/checkpoint/:id",
                name: "top-menu-checkpoint",
                component: Checkpoint,
                meta: {requiresAuth: true}
            },
            {
                path: "/dashboard",
                name: "top-menu-dashboard",
                component: Dashboard,
                meta: {requiresAuth: true}
            },

        ]
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/error-page",
        name: "error-page",
        component: ErrorPage,
    },
    {
        path: "/:pathMatch(.*)*",
        component: ErrorPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || {left: 0, top: 0};
    },
});

router.beforeEach(async (to, from, next) => {
    if (authStore.authData.token === '') {
      console.log('uno');

        const authData = JSON.parse(localStorage.getItem('authData'))
        if (authData) {
          console.log('dos');
            authStore.saveTokenData({
                accessToken: localStorage.getItem('access_token'),
                refreshToken: localStorage.getItem('refresh_token'),
                expiresIn : localStorage.getItem('token_expiration'),
                user : {
                    uid: authData.uid,
                    email : authData.email,
                    providerId: authData.providerId,
                    metadata : authData.metadata
                },
                auth : localStorage.getItem('authData')
            })

            authStore.setIsAuthenticated(true)
        }
    }

    if (!authStore.isTokenAlive && authStore.authData.refreshToken !== '') {
      console.log('get');
        authStore.refreshToken({
            "grant_type": 'refresh_token',
            "refresh_token": authStore.authData.refreshToken
        })

    }

    if (!authStore.isAuthenticated && to.meta.requiresAuth) {
      console.log('lol');

        return next({name: 'login'})
    }

    if(to.name === 'login' && authStore.isAuthenticated){
      console.log('lasa');

        return next({name: 'home'})
    }
    return next()
})

export default router;
