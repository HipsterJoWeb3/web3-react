import Skeleton from 'react-loading-skeleton'
import React from "react";



const CardSkeleton: React.FC = (props: any) => (
    <div className="card-skeleton">
        <div className="card-skeleton__image">
            <Skeleton height={200} circle/>
        </div>
        <div className="card-skeleton__content">
            <div className="card-skeleton__content__title">
                <Skeleton height={20} />
            </div>
        </div>
    </div>
)

export default CardSkeleton
