import {useMemo} from "react";
import {updateGeneral} from "../asyncActions/general";
import {toastError, toastSuccess} from "./useModalAndAlert";



export const socialLinks = (general) => {
    const social = useMemo(() => {
        return general?.links && general?.links.map((link) => {
            return {
                title: link.value,
                href: link.url,
                _id: link._id
            }
        })
    }, [general?.links])
    return social
}




export const animationText = (general) => {
    const animationTextData = useMemo(() => {
        return general?.animationText && general?.animationText.map((item) => {
            return {
                ...item,
                title: item.label,
            }
        })
    }, [general?.animationText])

    return animationTextData
}


export const keywords = (general) => {
    const keywordsData = useMemo(() => {
        return general?.keywords && general?.keywords.map((item) => {
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

export const animationAction = async (addMode, inputValue, textareaValue, general, setCurrentAnimation, setAnimTextData, setAddMode, currentAnimation) => {

    if(inputValue.trim().length > 0 && textareaValue.trim().length > 0) {
        const data = addMode ? await addTextAnimation(general, {label: inputValue, text: textareaValue}) : await updateTextAnimation(general, {_id: currentAnimation, label: inputValue, text: textareaValue})
        if(data) {

            setAnimTextData(data.animationText.map(el => ({...el, title: el.label})))
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

export const deleteAnimation = async (animTextData, general, currentAnimation, setCurrentAnimation, setInputValue, setTextareaValue, setAnimTextData) => {
    const index = animTextData.findIndex(el => el._id === currentAnimation)
    const data = await deleteTextAnimation(general, currentAnimation)
    if(data) {
        setCurrentAnimation(data.animationText[index > 0 ? index - 1 : 0]._id)
        setInputValue(data.animationText[index > 0 ? index - 1 : 0].label)
        setTextareaValue(data.animationText[index > 0 ? index - 1 : 0].text)
        setAnimTextData(data.animationText.map(el => ({...el, title: el.label})))
        toastSuccess('Animation item deleted')
        return data
    } else {
        toastError('Something went wrong')
    }
}

export const hideAnimation = async (general, currentAnimation, animTextData, setAnimTextData) => {
    const data = await hideTextAnimation(general, currentAnimation, !animTextData.find(el => el._id === currentAnimation)?.hidden)
    if(data) {
        setAnimTextData(data.animationText.map(el => ({...el, title: el.label})))
        toastSuccess(`Animation item ${(animTextData.find(el => el._id === currentAnimation)?.hidden ? 'shown' : 'hidden')}`)
        return data
    } else {
        toastError('Something went wrong')
    }
}


export const addSocialLink = async (socialTitle, socialUrl, setLinksData, general) => {
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


export const updateSocialLink = async (socialTitle, socialUrl, setLinksData, linksData, general, currentSocialId) => {
    if(socialTitle.trim().length > 0 && socialUrl.trim().length > 0) {
        const links = linksData.map(el => {
            return {...el, value: el.title, url: el.href}
        })
        const data = await updateGeneral({...general, links: links.map(el => el._id === currentSocialId ? {...el, value: socialTitle, url: socialUrl} : el)})
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


export const deleteSocialLink = async (setLinksData, general, linksData, currentSocialId, setSocialTitle, setSocialUrl) => {
    const index = linksData.findIndex(el => el._id === currentSocialId)
    const links = linksData.map(el => {
        return {...el, value: el.title, url: el.href}
    })
    const data = await updateGeneral({...general, links: links.filter(el => el._id !== currentSocialId)})
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


export const updateSeoInfo = async (general, title, description, keywords) => {
    const keywordsArr = keywords.map(el => el.text)
    const data = await updateGeneral({...general, title, description, keywords: keywordsArr})
    if(data) {
        toastSuccess('SEO info updated')
        return data
    } else {
        toastError('Something went wrong')
    }
}

