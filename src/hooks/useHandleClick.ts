import {RefObject} from "react";

export interface HandleClickProps {
    (ref: RefObject<HTMLElement>, callback: (arg: boolean) => void): void;

}

export const useHandleClick: HandleClickProps = (ref, callback) => {
    const handleClickOutside  = (e: any) => {
        if(!e.path.includes(ref.current)) {
            callback(false)
        }
    }
    document.body.addEventListener('click', handleClickOutside)


    return () => {
        document.body.removeEventListener('click', handleClickOutside)
    }
}