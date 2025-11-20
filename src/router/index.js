import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/:pathMatch(.*)*",
            name: "404",
            component: () => import("../pages/404.vue"),
        },
        {
            path: "/",
            name: "wrapper",
            component: () => import("../components/AppWrapper.vue"),
            children: [
                {
                    path: "home",
                    name: "home",
                    component: () => import("../components/Home.vue"),
                },
                {
                    path: "livros",
                    name: "livros",
                    component: () => import("../components/BookList.vue"),
                },
                {
                    path: "/livros/novo",
                    name: "BookForm",
                    component: () => import("../components/BookForm.vue"),
                },
                {
                    path: "/livros/:id([0-9]+)/editar",
                    name: "BookEdit",
                    component: () => import("../components/BookForm.vue"),
                },
                {
                    path: "/autores/:id([0-9]+)",
                    name: "AuthorDetail",
                    component: () => import("../components/AuthorDetail.vue"),
                },
                {
                    path: "/autores/novo",
                    name: "AuthorCreate",
                    component: () => import("../components/AuthorForm.vue"),
                },
                {
                    path: "/autores/:id([0-9]+)/editar",
                    name: "AuthorEdit",
                    component: () => import("../components/AuthorForm.vue"),
                },
                {
                    path: "/editoras/:id([0-9]+)",
                    name: "PublisherDetail",
                    component: () =>
                        import("../components/PublisherDetail.vue"),
                },
                {
                    path: "/editoras/novo",
                    name: "PublisherCreate",
                    component: () => import("../components/PublisherForm.vue"),
                },
                {
                    path: "/editoras/:id([0-9]+)/editar",
                    name: "PublisherEdit",
                    component: () => import("../components/PublisherForm.vue"),
                },
            ],
        },
    ],
});

export default router;
