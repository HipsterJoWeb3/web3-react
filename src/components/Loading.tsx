import SquareLoader from "react-spinners/SquareLoader";
import { TextScramble } from '@a7sc11u/scramble';
import React from "react";

export interface LoadingProps {
    message: string
}

const Loading: React.FC<LoadingProps> = ({message}) => {

    return (
        <div className="loading">
            <div className="loading-inner">
                <SquareLoader
                    color="#fff"
                    size={40}
                />

                <p>
                    <TextScramble
                        text={message}
                        play={true}
                        speed={0.2}
                        scramble={6}
                        step={6}
                    />
                </p>
            </div>
        </div>
    );
}

export default Loading;