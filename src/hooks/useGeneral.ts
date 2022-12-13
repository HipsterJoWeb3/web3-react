import {useMemo} from "react";
import {updateGeneral} from "../asyncActions/general";
import {toastError, toastSuccess} from "./useModalAndAlert";



export const socialLinks = (general: any) => {
    const social = useMemo(() => {
        return general?.links && general?.links.map((link: any) => {
            return {
                title: link.value,
                href: link.url,
                _id: link._id
            }
        })
    }, [general?.links])
    return social
}




export const animationText = (general: any) => {
    const animationTextData = useMemo(() => {
        return general?.animationText && general?.animationText.map((item: any) => {
            return {
                ...item,
                title: item.label,
            }
        })
    }, [general?.animationText])

    return animationTextData
}


export const keywords = (general: any) => {
    const keywordsData = useMemo(() => {
        return general?.keywords && general?.keywords.map((item: any) => {
            return {
                value: item,
            }
        })
    }, [general?.keywords])

    return keywordsData
}



export const addTextAnimation = async (general: any, data: any) => {
    let allData = general
    let textAnimation = general?.animationText || []
    const newItem = {
        ...data,
        duration: 0.1,
        hidden: false,
        _id: Math.random().toString(36).substr(2, 9),
    }

    let animationText = [...textAnimation, newItem]

    await updateGeneral({...allData, animationText})

    return {...allData, animationText}
}


export const updateTextAnimation = async (general: any, data: any) => {
    let allData = general
    let textAnimation = [...general?.animationText] || []
    const index = textAnimation.findIndex(item => item._id === data._id)
    textAnimation[index] = data


    await updateGeneral({...allData, animationText: textAnimation})


    return {...allData, animationText: textAnimation}
}

export const hideTextAnimation = async (general: any, id: any, hidden: boolean) => {
    let allData = general
    let textAnimation = [...general?.animationText] || []


    const animationText = textAnimation.map((item) => {
        if (item._id === id) {
            return {
                ...item,
                hidden
            }
        }
        return item
    })

    await updateGeneral({...allData, animationText})

    return {...allData, animationText}
}

export const deleteTextAnimation = async (general: any, id: any) => {
    let allData = general
    let textAnimation = [...general?.animationText] || []
    const index = textAnimation.findIndex(item => item._id === id)
    textAnimation.splice(index, 1)

    await updateGeneral({...allData, animationText: textAnimation})

    return {...allData, animationText: textAnimation}
}

export const animationAction = async (addMode: any, inputValue: any, textareaValue: any, general: any, setCurrentAnimation: any, setAnimTextData: any, setAddMode: any, currentAnimation: any) => {

    if(inputValue.trim().length > 0 && textareaValue.trim().length > 0) {
        const data = addMode ? await addTextAnimation(general, {label: inputValue, text: textareaValue}) : await updateTextAnimation(general, {_id: currentAnimation, label: inputValue, text: textareaValue})
        if(data) {

            setAnimTextData(data.animationText.map((el: any) => ({...el, title: el.label})))
            setAddMode(false)
            toastSuccess(`Animation item ${addMode ? 'added' : 'updated'}`)
            return data
        } else {
            toastError('Something went wrong')
        }

    } else {
        toastError('Please fill all fields')
    }
}

export const deleteAnimation = async (animTextData: any, general: any, currentAnimation: any, setCurrentAnimation: any, setInputValue: any, setTextareaValue: any, setAnimTextData: any) => {
    const index = animTextData.findIndex((el: any) => el._id === currentAnimation)
    const data = await deleteTextAnimation(general, currentAnimation)
    if(data) {
        setCurrentAnimation(data.animationText[index > 0 ? index - 1 : 0]._id)
        setInputValue(data.animationText[index > 0 ? index - 1 : 0].label)
        setTextareaValue(data.animationText[index > 0 ? index - 1 : 0].text)
        setAnimTextData(data.animationText.map((el: any) => ({...el, title: el.label})))
        toastSuccess('Animation item deleted')
        return data
    } else {
        toastError('Something went wrong')
    }
}

export const hideAnimation = async (general: any, currentAnimation: any, animTextData: any, setAnimTextData: any) => {
    const data = await hideTextAnimation(general, currentAnimation, !animTextData.find((el: any) => el._id === currentAnimation)?.hidden)
    if(data) {
        setAnimTextData(data.animationText.map((el: any) => ({...el, title: el.label})))
        toastSuccess(`Animation item ${(animTextData.find((el: any) => el._id === currentAnimation)?.hidden ? 'shown' : 'hidden')}`)
        return data
    } else {
        toastError('Something went wrong')
    }
}


export const addSocialLink = async (socialTitle: any, socialUrl: any, setLinksData: any, general: any) => {
    if(socialTitle.trim().length > 0 && socialUrl.trim().length > 0) {
        const data = await updateGeneral({...general, links: [...general.links, {value: socialTitle, url: socialUrl, _id: Math.random().toString(36).substr(2, 9)}]})

        if(data) {
            setLinksData(data.links.map(el => ({...el, title: el.value, href: el.url})))
            toastSuccess('Social link added')
            return data
        } else {
            toastError('Something went wrong')
        }
    } else {
        toastError('Please fill all fields')
    }
}


export const updateSocialLink = async (socialTitle: any, socialUrl: any, setLinksData: any, linksData: any, general: any, currentSocialId: any) => {
    if(socialTitle.trim().length > 0 && socialUrl.trim().length > 0) {
        const links = linksData.map((el: any) => {
            return {...el, value: el.title, url: el.href}
        })
        const data = await updateGeneral({...general, links: links.map((el: any) => el._id === currentSocialId ? {...el, value: socialTitle, url: socialUrl} : el)})
        if(data) {
            setLinksData(data.links.map(el => ({...el, title: el.value, href: el.url})))
            toastSuccess('Social link updated')
            return data
        } else {
            toastError('Something went wrong')
        }
    } else {
        toastError('Please fill all fields')
    }
}


export const deleteSocialLink = async (setLinksData: any, general: any, linksData: any, currentSocialId: any, setSocialTitle: any, setSocialUrl: any) => {
    const index = linksData.findIndex((el: any) => el._id === currentSocialId)
    const links = linksData.map((el: any) => {
        return {...el, value: el.title, url: el.href}
    })
    const data = await updateGeneral({...general, links: links.filter((el: any) => el._id !== currentSocialId)})
    if(data) {
        setLinksData(data.links.map(el => ({...el, title: el.value, href: el.url})))
        setSocialTitle(data.links[index > 0 ? index - 1 : 0].value)
        setSocialUrl(data.links[index > 0 ? index - 1 : 0].url)
        toastSuccess('Social link deleted')
        return data
    } else {
        toastError('Something went wrong')
    }
}


export const updateSeoInfo = async (general: any, title: any, description: any, keywords: any) => {
    const keywordsArr = keywords.map((el: any) => el.text)
    const data = await updateGeneral({...general, title, description, keywords: keywordsArr})
    if(data) {
        toastSuccess('SEO info updated')
        return data
    } else {
        toastError('Something went wrong')
    }
}

