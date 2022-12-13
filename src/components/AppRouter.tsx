import {
    Routes,
    Route,
    Navigate
} from 'react-router-dom'

import React, { useState } from 'react'

import { routes } from '../router'

const AppRouter: React.FC = () => {


    return (
        <Routes>
             {routes.map(({link, Component}, i) =>
                <Route path={link} element={<Component/>} key={i}></Route>
             )}
            <Route path="*" element={<Navigate to="/page" replace />} />
        </Routes>
    )
}

export default AppRouter