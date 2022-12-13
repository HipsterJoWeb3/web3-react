import React from "react";

export interface ScrollWrapProps {
    children: React.ReactNode;
}

const ScrollWrap: React.FC<ScrollWrapProps> = ({children}) => {

    return (
        <div className="scroll-wrap">
            {children}
        </div>
    )
}

export default ScrollWrap