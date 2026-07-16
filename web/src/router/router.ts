import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import DocumentView from "../views/DocumentView";
import HomeView from "../views/HomeView";
import { childrenOf, findPage, pages, pagesUnder, siblingsOf } from "../services/content";

const homePage = findPage("/")!;

const relatedPagesFor = (page: typeof homePage) => {
  const children = childrenOf(page.slug);
  return children.length ? [page, ...children] : siblingsOf(page.slug);
};

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: HomeView,
    props: {
      skills: pagesUnder("/skills/").filter((page) => page.slug !== "/skills/").slice(0, 15),
      featuredDocs: ["/getting-started/", "/understanding-reports/", "/documentation/examples/"]
        .map((slug) => findPage(slug))
        .filter((page) => page !== undefined),
    },
  },
  ...pages
    .filter((page) => page.slug !== "/")
    .map((page) => ({
      path: page.slug,
      component: DocumentView,
      props: {
        page,
        relatedPages: relatedPagesFor(page),
      },
    })),
  {
    path: "/:pathMatch(.*)*",
    component: DocumentView,
    props: {
      page: homePage,
      relatedPages: [],
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash };
    return { top: 0 };
  },
});
