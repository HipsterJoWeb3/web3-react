import React from 'react'
import MyButton from "../UI/buttons/MyButton";

const ErrorPage: React.FC = () => {
    return (
        <div>
        <h1>404 - Page Not Found</h1>
            <MyButton to={'/'}>Back to main page</MyButton>
        </div>
    )
}


export default ErrorPage