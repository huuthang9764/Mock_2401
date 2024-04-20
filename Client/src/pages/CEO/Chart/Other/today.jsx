import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { useSelector } from "react-redux";
import Card from '@mui/material/Card';

const Today = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => {
            clearInterval(timerID);
        };
    }, []);

    const tick = () => {
        setCurrentTime(new Date());
    };

    const weekday = currentTime.toLocaleString('vn', { weekday: 'long' });
    const day = currentTime.toLocaleString('vn', { month: 'long', day: '2-digit' });
    const timeNow = currentTime.toLocaleString('vn', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    let greeting = '';
    const currentHour = currentTime.getHours();
    if (currentHour >= 6 && currentHour < 12) {
        greeting = 'buổi sáng!';
    } else if (currentHour >= 12 && currentHour < 17) {
        greeting = 'buổi chiều!';
    } else {
        greeting = 'buổi tối!';
    }

    const userName = useSelector((state) => state.userLoginInfo.userInfo.userName);

    return (
        <div style={{ height: "100%" }}>
            <Card style={{ height: "100%", margin: 2, padding: 5 }}>
                <Typography variant="h4">{weekday}</Typography>
                <div style={{display: "flex"}}>
                    <Typography variant="subtitle1">{day}</Typography>
                    {/* <Typography variant="h5" style={{marginLeft: "60px"}}>{timeNow}</Typography> */}
                </div>
                <Typography variant="h5">{userName}, Chào {greeting}</Typography>
            </Card>
        </div>
    );
};

export default Today;
