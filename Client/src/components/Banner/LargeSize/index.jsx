import React from 'react';
import Carousel from '../../Carousel/Carousel';
import {Paper} from '@mui/material';
import banner1 from '/Banner/bn4.jpg';
import banner2 from '/Banner/bn2.jpg';
import banner3 from '/Banner/bn3.jpg';

const BannerLargeSize = () => {
    const bannerData = [
        {
            images: [banner1, banner2, banner3],
        }
    ];

    return (
        <div style={{ alignItems: 'center', maxWidth: "980px", margin: '0 auto'}}>
            <Paper>
                <Carousel images={bannerData[0].images} /> 
            </Paper>
         </div>
    );
};

export default BannerLargeSize;