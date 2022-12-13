import {useMemo} from "react";
import {createPage, deletePage, hiddenPage, updatePage} from "../asyncActions/pages";
import {toastError, toastSuccess} from "./useModalAndAlert";


export const getPages = (pages) => {
    const value = useMemo(() => {
        return pages.map((page) => {
            return {
                link: page?.route,
                title: page?.value,
                text: page?.description,
                _id: page?._id,
                hidden: page?.hidden,
            }
        })
    }, [pages])

    return value
}

export const updatePagesAction = async (id, title, description, content, route) => {
    const data = await updatePage(id, {
        value: title,
        description,
        content,
        route,
    })
    if(data) {
        toastSuccess(`Page ${title} updated`)
        return data
    } else {
        toastError(`Something went wrong`)
    }
}

export const hiddenPageAction = async (id: string, hidden: boolean, setPagesListState: any,  pagesListState: any) => {
    const data = await hiddenPage(id, hidden)
    if(data) {
        setPagesListState(pagesListState.map((page) => {
            if(page._id === id) {
                return {
                    link: data?.route,
                    title: data?.value,
                    text: data?.description,
                    _id: data?._id,
                    hidden
                }
            }
            return page
        }))

        toastSuccess(`Page ${hidden ? 'hidden' : 'unhidden'}`)
        return data
    } else {
        toastError(`Something went wrong`)
    }
}

export const deletePageAction = async (id: string, setPagesListState: any,  pagesListState: any, setCurrentPageId: any, setPageName: any, setPageDescription: any, setPageRoute: any) => {
    const index = pagesListState.findIndex((page) => page._id === id)
    const data = await deletePage(id)
    if(data) {
        setPagesListState(pagesListState.filter((page) => page._id !== id))
        const currentPage = index === 0 ? pagesListState[1] : pagesListState[index - 1]
        setCurrentPageId(currentPage?._id)
        setPageName(currentPage?.title)
        setPageDescription(currentPage?.text)
        setPageRoute(currentPage?.link)
        toastSuccess(`Page deleted`)
        return data
    } else {
        toastError(`Something went wrong`)
    }
}

export const addPageAction = async (title, content, description, route) => {


    if(title?.trim()?.length > 0 && content.time && description?.trim()?.length > 0 && route?.trim()?.length > 0) {
        const data = await createPage({value: title, content, description, route})
        if(data) {
            toastSuccess(`Page created`)
            return data
        } else {
            toastError(`Something went wrong`)
        }
    } else {
        toastError(`Fill in all the fields`)
    }
}