import React, {useEffect, useState} from "react";
import AdminCard from "../AdminCard";
import MyButton from "../../../UI/buttons/MyButton";
import Add from "../../../assets/iconsComponent/Add";
import AnimationSidebar from "../sidebars/AnimationSidebar";
import Delete from "../../../assets/iconsComponent/Delete";
import {animationAction, animationText, deleteAnimation, hideAnimation} from "../../../hooks/useGeneral";
import Hide from "../../../assets/iconsComponent/Hide";
import Edit from "../../../assets/iconsComponent/Edit";
import {generalData, updateGeneralSlice} from "../../../redux/general/slice";

import {useDispatch, useSelector} from "react-redux";


const AdminAnimation: React.FC = () => {
    const dispatch = useDispatch()
    const { general } = useSelector(generalData)
    const generalState = {...general}

    const animText = animationText(generalState)
    const [animTextData, setAnimTextData] = useState([])
    const [currentAnimation, setCurrentAnimation] = useState<any>(null)
    const [addMode, setAddMode] = useState(false)

    const [inputValue, setInputValue] = useState('')
    const [textareaValue, setTextareaValue] = useState('')
    const buttonData = [
        {title: 'Delete', Icon: Delete, callback: () => deleteAnimationData()},
        // @ts-ignore
        {title: animTextData.find((el: any) => el?._id === currentAnimation)?.hidden ? 'Show' : 'Hide', Icon: Hide, callback: () => hideAnimationData()},
        {title: addMode ? 'Add item' : 'Edit item', Icon: addMode ? Add : Edit , callback: () => animationActionData()}
    ]

    useEffect(() => {
        if(animText) {
            setAnimTextData(animText)
            setCurrentAnimation(animText[0]?._id)
            setInputValue(animText[0]?.label)
            setTextareaValue(animText[0]?.text)
            setAddMode(false)
        }
    }, [animText])

    const animationActionData = async () => {
        const data = await animationAction(addMode, inputValue, textareaValue, generalState, setCurrentAnimation, setAnimTextData, setAddMode, currentAnimation)
        if (data) {
            dispatch(updateGeneralSlice(data))
        }
    }

    const hideAnimationData = async () => {
        const data = await hideAnimation(generalState, currentAnimation, animTextData, setAnimTextData)
        if (data) {
            dispatch(updateGeneralSlice(data))
        }
    }

    const deleteAnimationData = async () => {
        const data = await deleteAnimation(animTextData, generalState, currentAnimation, setCurrentAnimation, setInputValue, setTextareaValue, setAnimTextData)
        if (data) {
            dispatch(updateGeneralSlice(data))
        }
    }

    const changeAnimation = (_: any, item: any) => {
        setCurrentAnimation(item)
        // @ts-ignore
        setInputValue(animTextData.find((el: any) => el._id === item)?.label)
        // @ts-ignore
        setTextareaValue(animTextData.find((el: any) => el._id === item)?.text)
        setAddMode(false)
    }

    const addAnimItem = () => {
        setAddMode(true)
        setCurrentAnimation('')
        setInputValue('')
        setTextareaValue('')
    }

    return (
        <>
            <div className="admin-content__block">
                <h1 className="label">
                    Animation
                </h1>
                <div className="admin-list__wrap ">
                    <div className="admin-list">
                        {
                            animTextData.map((item: any, i: number) =>
                                <AdminCard key={item.title} focus={item._id === currentAnimation} cardData={item}  value={item._id} setValue={changeAnimation} actionCard="Visible" />
                            )
                        }
                        <MyButton active={addMode} setValue={addAnimItem}><Add/><span>Add item</span></MyButton>
                    </div>

                </div>
            </div>
            <div className="admin-content__block">
                <h1 className="label">
                    Statements animation
                </h1>
                <AnimationSidebar
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    textareaValue={textareaValue}
                    setTextareaValue={setTextareaValue}
                    buttonData={buttonData}
                    sidebarTitle={addMode ? 'Add animation item' : 'Edit animation item'}
                />
            </div>
        </>
    )
}


export default AdminAnimation
