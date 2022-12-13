import {useMemo} from "react";
import {links, Links, logoutLinks, tabLinksAdmin} from "../router";
import {Users} from "../@types/users";
import {General} from "../@types/general";
import {Chapter} from "../@types/chapters";
import {Pages} from "../@types/pages";


export type routesType = (general: General, chapters: Chapter[], pages: Pages[]) => Links[]

export const routes: routesType = (general, chapters, pages) => {
    return useMemo(() => {
        const chapterRoutes = chapters.filter(item => !item.hidden).map((chapter: any) => {
            return {
                link: `/posts?chapter=${chapter?.value}&type=recent`,

                name: chapter?.value?.charAt(0)?.toUpperCase() + chapter?.value?.slice(1),
            }
        })



        const pagesRoutes = pages.filter(page => !page.hidden).map((page: any) => {
            return {
                link: page.route,
                name: page.value.charAt(0).toUpperCase() + page.value.slice(1),
            }
        })



        return  [
            {
                link: '/',
                name: 'Home',
            },
            ...chapterRoutes,
            ...pagesRoutes
        ]

    }, [general, chapters, pages])
}

export type tabLinksType = (user: Users) => Links[]

// @ts-ignore
export const tabLinks: tabLinksType = (user) => {
    return useMemo(() => {
        // @ts-ignore
        return user?._id ?  [...tabLinksAdmin.filter(route => user?.roles?.some(item => route.showRouteDependRole.some(value => value === item.value))), links.find(item => item.name === 'Logout')] : logoutLinks
    }, [user])
}

export type mobileLinksType = (user: Users, routes: Links[], tabLinks: Links[]) => Links[]

export const mobileLinks: mobileLinksType = (user, routes, tabLinks) => {

    return useMemo(() => {
        if(routes) {
            return [
                ...routes,
                ...tabLinks,
            ]
        }

        return [
            ...tabLinks,
        ]
    }, [user, routes, tabLinks])
}