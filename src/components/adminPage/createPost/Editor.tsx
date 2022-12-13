import EditorJS from "@editorjs/editorjs";
import React, {useEffect} from "react";
import {EDITOR_JS_TOOLS} from "../../../utils/fieldConstants";

export interface EditorProps {
    text?: any
    tools?: boolean | false
    setText?: (arg: any) => void,
}

const Editor: React.FC<EditorProps> = ({text, setText, tools}) => {


    useEffect(() => {
        const editor = new EditorJS({
            holder: 'editorjs',
            tools: EDITOR_JS_TOOLS,
            data: text,
            onChange: () => {
                editor.save().then((outputData) => {
                    if (setText) setText(outputData)
                }).catch((error) => {
                    console.log('Saving failed: ', error)
                })
            }
        })

        return () => {
            editor.isReady.then(() => {
                editor.destroy()
            }).catch((error) => {
                console.log('Editor.js is not ready to be destroyed', error)
            })
        }

    }, [])

    return (
        <div id="editorjs"></div>
    )
}

export default Editor