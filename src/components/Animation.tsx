import React, {useMemo, useState} from "react";
import MyButton from "../UI/buttons/MyButton";
import { TypeAnimation } from 'react-type-animation'
import {generalData} from "../redux/general/slice";
import {useSelector} from "react-redux";

export interface AnimationProps {
    label?: string,
    subtitle?: string,
    link?: {
        text: string,
        url: string
    },
    setIndex?: (id: number) => void
}


const Animation: React.FC<AnimationProps> = ({label, subtitle, link, setIndex}) => {


    const {general} = useSelector(generalData)


    const animationData = useMemo(() => {
        return general?.animationText && general?.animationText?.map((item: any, index: number) => {
            return {
                id: index,
                name: item.label,
                text: item.text
            }
        })
    }, [general])





    return (
        <div className="main-animation">

            <div className="main-animation__container">


                <div className="box">


                    <div className="box-carousel__wrap">
                        <div className={`box-carousel loaded`}>

                        </div>
                    </div>


                    {
                        subtitle &&
                        <div className="box-subtitle">
                            <TypeAnimation
                                sequence={[subtitle, 2000, '']}
                                speed={40}
                                repeat={Infinity}
                                wrapper="p"
                            />
                        </div>
                    }



                    {
                        link &&
                        <div className="box-link">
                            <MyButton
                                to={link.url}
                            >{link.text}</MyButton>

                        </div>
                    }

                </div>

                {
                    animationData &&
                    <div className="box-term__wrap">
                        <div className="box-term">
                            <TypeAnimation
                                sequence={[animationData[0]?.text, 2000, '']}
                                speed={60}
                                repeat={Infinity}
                                wrapper="p"
                            />
                        </div>
                    </div>
                }
            </div>

        </div>
    )
}

export default Animation