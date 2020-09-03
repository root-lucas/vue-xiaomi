import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/goods',
        name: 'Goods',
        component: () => import('../views/Goods.vue'),
    },
]

const router = new VueRouter({
    routes,
})

export default router
