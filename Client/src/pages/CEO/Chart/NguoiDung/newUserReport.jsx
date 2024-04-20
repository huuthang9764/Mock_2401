import React, { useEffect, useState } from "react";
import { Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import BoLocNguoiDungMoi from '../../Filter/filterNguoiDungMoi';
import { useSelector } from "react-redux";
import { User_GET } from '../../../../service/index';

const NewUserReport = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const result = await User_GET(1000000);
                setUserData(result.content);
            } catch (error) {
                console.log("Lỗi khi call API:", error);
            }
        };
        fetchDataAsync();
    }, []);

    const dateData = [...new Set(userData.map(item => item.ngayTao.split(" ")[0]))].sort();
    
    const countGenderByDate = (gioiTinh) => {
        const genderCountsByDate = Object.fromEntries(dateData.map(date => [date, 0]));
        userData.forEach(item => {
            const dateString = item.ngayTao.split(" ")[0];
            if (!genderCountsByDate[dateString]) {
                genderCountsByDate[dateString] = 0;
            }
            if (item.gioiTinh === gioiTinh) {
                genderCountsByDate[dateString]++;
            }
        });
        return Object.values(genderCountsByDate);
    };

    const countTotalUsersByDate = () => {
        const totalUsersByDate = dateData &&  Object.fromEntries(dateData.map(date => [date, 0]));
        userData.forEach((item, index) => {
            const dateString = item.ngayTao.split(" ")[0];
            if (!totalUsersByDate[dateString]) {
                totalUsersByDate[dateString] = userData.slice(0, index + 1).length;
            }
        });
        return Object.values(totalUsersByDate);
    };

    const data = {
        labels: dateData,
        datasets: [
            {
                label: 'Người dùng',
                data: countTotalUsersByDate(),
                fill: true,
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.1
            },
            {
                label: 'Nam',
                data: countGenderByDate('Male'),
                fill: true,
                borderColor: 'rgba(54, 162, 235, 1)',
                tension: 0.1
            },
            {
                label: 'Nữ',
                data: countGenderByDate('Female'),
                fill: true,
                borderColor: 'rgba(255, 205, 86, 1)',
                tension: 0.1
            },
            
        ]
    };

    const filterDataByLabel = (data, label) => {
        return data.datasets.filter(dataset => dataset.label === label);
    };

    const filterDataByLabels = (data, labels) => {
        return labels.flatMap(label => filterDataByLabel(data, label));
    };

    const labelsToFilter = useSelector((state) => state.chartFilterNguoiDungMoi.label);


    const dataFilterByLabel = {
        labels: dateData,
        datasets: filterDataByLabels(data, labelsToFilter)
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: ''
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Số lượng người dùng'
                }
            }
        }
    };

    return (
        <div>
            <Typography variant="h4">Thống kê tài khoản</Typography>
            <BoLocNguoiDungMoi filterVisible={true} />
            <br />
            <Line
                style={{ maxHeight: "31vh" }}
                data={dataFilterByLabel}
                options={options}
            />
        </div>
    );
};

export default NewUserReport;
