import MyInput from "../../../UI/inputs/MyInput";
import MyButton from "../../../UI/buttons/MyButton";
import React, {useEffect, useRef, useState} from "react";
import {useHandleClick} from "../../../hooks/useHandleClick";
import {motion} from 'framer-motion'

export interface AdminPreviewPostProps {
    inputValue: string
    changeInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void
    setUrl?: (url: string) => void
    url?: string
    changePicture?: boolean
    setChangePicture?: (changePicture: boolean) => void
    uploadPreview?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    uploadRef?: React.RefObject<HTMLInputElement>
}

const PreviewPostButtons: React.FC<AdminPreviewPostProps> = ({changePicture, setChangePicture, url, setUrl, uploadPreview, uploadRef, inputValue, changeInputValue}) => {
    const [showInputUrl, setShowInputUrl] = useState(false)
    const previewButtonRef = useRef<any>(null)

    const showInput = () => {
        setShowInputUrl(!showInputUrl)
        if(showInputUrl) {
            setChangePicture(false)
            setUrl(inputValue)
        }
    }

    const changeFilePicture = async (e) => {
        await uploadPreview(e)
        setChangePicture(false)
    }

    useEffect(() => {
        useHandleClick(previewButtonRef, setChangePicture)
    }, [])


    return (

        <div className="preview-inner d-flex aic" ref={previewButtonRef}>
            { changePicture ?

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1}}
                transition={{ duration: 0.15 }}
                className="d-flex aic fdc gap20"
            >
                <MyButton white={true} valueRef={uploadRef} ><span>Browse file</span></MyButton>
                <input type="file" ref={uploadRef} onChange={changeFilePicture} hidden/>

                <span>or</span>
                {showInputUrl && <MyInput white={true} placeholder={'Enter url'} value={inputValue} setValue={changeInputValue}/>}
                <MyButton white={true} setValue={showInput}>{showInputUrl ? 'Upload image' : 'Enter url'}</MyButton>
            </motion.div>
                :
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1}}
                    transition={{ duration: 0.3 }}
                    className="d-flex aic fdc gap20"
                >
                <MyButton white={true} setValue={() => setChangePicture(true)}>{url ? 'Change preview' : 'Upload preview'}</MyButton>
                </motion.div>
            }


        </div>
    )
}

export default PreviewPostButtons