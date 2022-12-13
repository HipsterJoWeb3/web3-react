import React, {useEffect, useRef, useState} from "react";
import GroupButtons from "../../GroupButtons";
import MyInput from "../../../UI/inputs/MyInput";
import MyButton from "../../../UI/buttons/MyButton";
import Delete from "../../../assets/iconsComponent/Delete";
import {motion} from "framer-motion";
import {useHandleClick} from "../../../hooks/useHandleClick";
import {Tags} from "../../../@types/tags";
import {toastError, toastSuccess} from "../../../hooks/useModalAndAlert";

export interface AdminTagsOptionProps {
    tags: {
        text: string
        setValue?: (arg: any) => void
        someContextFunction?: (arg: any) => void
    }[]
    setTags: ((tags: { text: string }[]) => void) | any
    uploadTags?: Tags[],
    message?: string
}

const AdminTagsOption: React.FC<AdminTagsOptionProps> = ({message, uploadTags, tags, setTags}) => {
    const [tagsInput, setTagsInput] = useState<string>('')
    const [showContextMenu, setShowContextMenu] = useState<boolean>(false)
    const [removeTag, setRemoveTag] = useState<string>('')
    const deleteTagRef = useRef(null)
    const [contextMenuPosition, setContextMenuPosition] = useState<{ x: number, y: number }>({x: 0, y: 0})
    const changeTagsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagsInput(e.target.value)
    }

    const someContextFunction = (e: React.MouseEvent<HTMLButtonElement>) => {
        // @ts-ignore
        setRemoveTag(e.currentTarget.textContent)
        setShowContextMenu(true)
        setContextMenuPosition({x: e.pageX, y: e.pageY})
    }

    const removeTags = (_: any, value: any) => {
        setTags(tags.filter(tag => tag.text !== value))
        setShowContextMenu(false)

        toastSuccess(`Remove ${message} ${value}`)
    }

    useEffect(() => {
        useHandleClick(deleteTagRef, () => setShowContextMenu(false))
    }, [])

    useEffect(() => {
        if (uploadTags) {
            setTags(uploadTags.map(tag => ({text: tag.value, someContextFunction})))
        }
    }, [uploadTags])

    const addTags = (e: any) => {
        if(e.key === 'Enter' && tagsInput.length > 2) {
            if(tags.some(tag => tag.text.toLowerCase().trim() === tagsInput.toLowerCase().trim())) {
                return toastError(`This ${message} already exists`)
            }

            setTags([...tags, {text: tagsInput, someContextFunction}])

            setTagsInput('')

            toastSuccess(`Add ${message} ${tagsInput}`)
        }
    }

    return (
        <div>
            <MyInput value={tagsInput} setValue={changeTagsInput} placeholder={`Enter ${message}`} onKeyPress={addTags}/>
            <GroupButtons groupButtonData={tags} />
            {
                showContextMenu &&
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    dragConstraints={{ left: contextMenuPosition.x, top: contextMenuPosition.y }}
                    animate={{ opacity: 1, scale: 1, left: contextMenuPosition.x - 40 + 'px', top: contextMenuPosition.y + 20 + 'px', position: 'absolute'}}
                    transition={{ duration: 0.2 }}
                >
                    <div className="remove-tags" ref={deleteTagRef}>
                        <MyButton value={removeTag} setValue={removeTags} white={true} active={true}><Delete /><span>Delete</span></MyButton>
                    </div>

                </motion.div>
            }
        </div>
    )

}

export default AdminTagsOption