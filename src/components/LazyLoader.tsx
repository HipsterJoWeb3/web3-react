
// @ts-ignore
import { LazyLoadImage } from 'react-lazy-load-image-component';
import React from "react";
import 'react-lazy-load-image-component/src/effects/blur.css';

export interface LazyLoaderProps {
    image: any
}

const LazyLoader: React.FC<LazyLoaderProps> = ({image}) => {
    return (
        <LazyLoadImage
            alt={image.alt}
            src={image.src}
            effect="blur"
        />
    )
}

export default LazyLoader