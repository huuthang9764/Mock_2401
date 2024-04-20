import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Container, Typography } from '@mui/material';
import 'chart.js/auto';

const expenseData = {
    labels: ['Thống kê chi tiêu theo năm'],
    datasets: [
        {
            label: 'Năm Tài Chính 2023',
            data: [2000],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        },
        {
            label: 'Năm Tài Chính 2024',
            data: [1500],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        },
    ],
};

const options = {
    responsive: true,
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

const ChiTieu = () => {
    return (
        <Container style={{maxHeight:"33vh"}}>
            <Typography variant="h4">Thống kê chi tiêu</Typography>
        <div style={{marginTop:"50px"}}>
            <Bar data={expenseData} options={options} />
        </div>
        </Container>
    );
};

export default ChiTieu;
