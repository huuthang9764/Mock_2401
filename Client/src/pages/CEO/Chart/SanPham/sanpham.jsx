import React from 'react';
import { Container, Typography } from '@mui/material';
import TopSale from "./Table/topSale.jsx";

const SanPham = () => {

    return (
        <Container >
            <Typography variant="h4">Thống kê sản phẩm bán chạy</Typography>
            <TopSale/>
        </Container>
    );
};

export default SanPham;
