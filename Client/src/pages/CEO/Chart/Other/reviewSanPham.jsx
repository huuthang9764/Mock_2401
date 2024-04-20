import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Container, Typography } from '@mui/material';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const ReivewSanPham = () => {

    const ratings = [
        { star: 5, count: 100 },
        { star: 4, count: 50 },
        { star: 3, count: 30 },
        { star: 2, count: 20 },
        { star: 1, count: 10 }
    ];

    // Tính tổng số lượt đánh giá
    const totalRatings = ratings.reduce((acc, rating) => acc + rating.count, 0);

    // Tính phần trăm đánh giá cho mỗi số sao
    const data = {
        labels: ratings.map(rating => `${rating.star} sao`),
        datasets: [{
            data: ratings.map(rating => (rating.count / totalRatings * 100).toFixed(2)),
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#FF8A80',
                '#8C9EFF'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#FF8A80',
                '#8C9EFF'
            ]
        }]
    };

    const options = {
        plugins: {
            legend: {
                position: 'right'
            },
            datalabels: {
                color: '#fff',
                formatter: (value) => {
                    return value + '%';
                }
            }
        }
    };

    return (
        <Container>
            <Typography variant="h4">Đánh giá sản phẩm</Typography>
            <div style={{maxHeight:"75vh", marginLeft: "50px"}}>
                <Doughnut data={data} options={options} plugins={[ChartDataLabels]}/>
            </div>
        </Container>
    );
};

export default ReivewSanPham;
