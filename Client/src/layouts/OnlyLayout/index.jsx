import React from 'react';
import { Outlet } from 'react-router-dom';


const OnlyLayout = () => {
    return (
        <>
            <Outlet />
        </>
    );
};

export default OnlyLayout;