import { createRouter, createWebHistory } from "vue-router";

import Home from '@/views/Home'
import Article from '@/views/Article'
import Error404 from "@/views/Error404";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/article/:id',
        name: 'Article',
        component: Article,
        props: true,
        beforeEnter(to, from, next){
            const isArticleFound = true

            if (isArticleFound){
                return next()
            }
            else {
                next({
                    name: '404',
                    params: { pathMatch: to.path.substring(1).split('/') },
                    query: to.query,
                    hash: to.hash
                })
            }
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: Error404
    }
]

export default createRouter({
    history: createWebHistory(),
    routes,
})
