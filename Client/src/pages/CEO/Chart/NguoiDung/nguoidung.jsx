import React from 'react';
import { Container, Typography } from '@mui/material';
import TopBuy from "./Table/TopBuy.jsx";

const NguoiDung = () => {

    return (
        <Container>
            <Typography variant="h4">Phân tích người dùng mua hàng</Typography>
            <TopBuy/>
        </Container>
    );
};

export default NguoiDung;
