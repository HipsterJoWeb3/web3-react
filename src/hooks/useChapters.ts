import {useMemo} from "react";
import {createChapter, deleteChapter, getCountChapters, hiddenChapter, updateChapter} from "../asyncActions/chapters";
import {toastError, toastSuccess} from "./useModalAndAlert";


export const getChapters = (chapters: any) => {
    const value = useMemo(() => {
        return chapters.map((item: any) => {
            return {
                title: item.value,
                link: `posts?chapter=${item.value}&type=recent`,
                text: item.description,
                _id: item._id,
                count: item.count,
                showRecent: item.showRecent,
                showPopular: item.showPopular,
                hidden: item.hidden,
            }
        })
    }, [chapters])

    return value
}

export const addChapterAction = async (chapters: any, chapter: any) => {
    const data = await createChapter(chapter)

    return [...chapters, {
        ...data,
        title: data?.value,
        link: `posts?chapter=${data?.value}&type=recent`,
        text: data?.description,
    }]
}

export const deleteChapterAction = async (chapters: any, id: any, setChaptersList: any, setCurrentId: any, setInputValue: any, setTextAreaValue: any, setShowRecent: any, setShowPopular: any, setNumberPosts: any) => {
    const count = await getCountChapters(id)
    const index = chapters.findIndex((item: any) => item._id === id)
    if(count > 0) {
        toastError(`Chapter has ${count} posts`)
    } else {
        await deleteChapter(id)
        const newChapter = index === 0 ? chapters[1] : chapters[index - 1]
        setChaptersList(chapters.filter((item: any) => item._id !== id))
        setCurrentId(newChapter._id)
        setInputValue(newChapter.title)
        setTextAreaValue(newChapter.text)
        setShowRecent(newChapter.showRecent)
        setShowPopular(newChapter.showPopular)
        setNumberPosts(newChapter.count)

        toastSuccess('Chapter deleted')
    }

}

export const updateChapterAction = async (chapters: any, chapter: any) => {
    const data = await updateChapter(chapter._id, chapter)

    return chapters.map((item: any) => {
        if (item._id === chapter._id) {
            return {
                ...data,
                title: data.value,
                link: `posts?chapter=${data.value}&type=recent`,
                text: data.description,
            }
        }
        return item
    })
}

export const actionHideChapter = async (chapters: any, id: any, hidden: any) => {
    const data = await hiddenChapter(id, hidden)
    return chapters.map((item: any) => {
        if (item._id === id) {
            return {
                ...data,
                title: data.value,
                link: `posts?chapter=${data.value}&type=recent`,
                text: data.description,
            }
        }
        return item
    })
    return null
}


export const actionChapter = async (inputValue: any, textAreaValue: any, numberPosts: any, addMode: any, chapterList: any, setChapterList: any, setAddMode: any, setChapterSidebarTitle: any, chapter: any) => {
    if(inputValue.trim().length > 0 && textAreaValue.trim().length > 0 && numberPosts.trim().length > 0 ) {

        const data = addMode ? await addChapterAction(chapterList, chapter) : await updateChapterAction(chapterList, chapter)
        if(data) {
            setChapterList(data)
            setAddMode(false)
            setChapterSidebarTitle('Edit chapter')
            toastSuccess(`Chapter ${addMode ? 'added' : 'updated'}`)
        } else {
            toastError('Something went wrong')
        }
    }
}





export const hideChapter = async (chapters: any, setChapterList: any, id: any, hidden: any) => {
    const data = await actionHideChapter(chapters, id, hidden)
    if(data) {
        setChapterList(data)
        toastSuccess(`Chapter ${hidden ? 'hidden' : 'unhidden'}`)
    } else {
        toastError('Something went wrong')
    }
}