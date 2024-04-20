import React from 'react';
import { Typography, Paper, LinearProgress, Card } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const data = {
    labels: ['Tiêu chuẩn', 'Nhanh', 'Siêu tốc'],
    datasets: [
        {
            data: [400, 300, 300],
            backgroundColor: ['#0088FE', '#00C49F', '#FFBB28'],
            hoverBackgroundColor: ['#005c9e', '#00847d', '#d18c1a'],
        },
    ],
};

const options = {
    plugins: {
        legend: {
            position: 'bottom',
        },
        datalabels: {
            color: '#fff',
            formatter: (value, context) => {
                return ((value / 1000) * 100).toFixed(2) + '%';
            },
        },
    },
};

const TrangThaiGiaoHang = () => {
    return (
        <Card style={{ height: "100%", margin: 2, padding: 2 }}>
            <Typography variant="h5" gutterBottom>
                Phương thức vận chuyển
            </Typography>
            <div style={{ margin: 'auto', width: '59%' }}>
                <Pie data={data} options={options} plugins={[ChartDataLabels]} />
            </div>
        </Card>
    );
};

export default TrangThaiGiaoHang;
