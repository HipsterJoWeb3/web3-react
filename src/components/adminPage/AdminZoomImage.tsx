import Cropper from 'react-easy-crop'
import {useCallback, useState} from "react";



const AdminZoomImage = ({url}) => {
    const [crop, onCropChange] = useState({ x: 0, y: 0 })
    const [zoom, onZoomChange] = useState(1)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
    }, [])

    return (
        <Cropper
            image={url}
            crop={crop}
            zoom={zoom}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onMediaLoaded={(mediaSize) => {
                // Adapt zoom based on media size to fit max height
                onZoomChange(300 / mediaSize.naturalHeight)
            }}
        />
    )
}

export default AdminZoomImage