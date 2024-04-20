import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Container, Typography } from '@mui/material';

const locationData = {
    labels: ['Location 1', 'Location 2', 'Location 3', 'Location 4', 'Location 5'],
    datasets: [
        {
            label: 'Total Sales',
            data: [500, 400, 600, 700, 300],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const options = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'right',
        },
        title: {
            display: true,
            text: 'Top Selling Locations',
        },
    },
};

const TopSellingLocations = () => {
    return (
        <Container>
            <Typography variant="h5">Vị trí bán được nhiều hàng</Typography>
            <Bar data={locationData} options={options} />
        </Container>
    );
};

export default TopSellingLocations;
