import {createRouter, createWebHistory} from "vue-router";
import {db} from "@/firebase";

import Home from "@/views/Home";
import Admin from "@/views/Admin";
import Article from "@/views/Article";
import Error404 from "@/views/Error404";

const routes = [
    {
        path:"/",
        name: "Home",
        component: Home
    },
    {
        path:"/admin",
        name: "Admin",
        component: Admin
    },
    {
        path: "/category/:categoryId",
        name: "Category",
        component: Home,
        props: true,
        async beforeEnter(to, from, next){
            const doc = await db.collection("categories").doc(to.params.categoryId).get();

            if (doc.exists){
                return next();
            }

            return next({
                name: '404',
                params: { pathMatch: to.path.substring(1).split('/') },
                query: to.query,
                hash: to.hash
            });
        }
    },
    {
        path: "/article/:id",
        name: "Article",
        component: Article,
        props: true,
        async beforeEnter(to, from, next){
            const doc = await db.collection("articles").doc(to.params.id).get();

            if (doc.exists){
                return next();
            }

            return next({
                name: '404',
                params: { pathMatch: to.path.substring(1).split('/') },
                query: to.query,
                hash: to.hash
            });
        }
    },
    //NOTE: This path should always be last!
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: Error404
    }
];

export default createRouter({
    history: createWebHistory(),
    routes,
});