import React, { useEffect, useState } from "react";
import { Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import BoLocDoanhThu from '../../Filter/filterDoanhThu';
import { useSelector } from "react-redux";
import { thongKeTongQuat } from "../../../../service/ceo/thongKeTongQuat";
import { thongKeDonHang } from "../../../../service/ceo/thongKeDonHang";

const DoanhThu = () => {

    const [doanhThuData, setdoanhThuData] = useState({});
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const result = await thongKeTongQuat();
                setdoanhThuData(result);
            } catch (error) {
                console.log("Lỗi khi call API:", error);
            }
        };
        fetchDataAsync();
    }, []);

    const dateData = useSelector((state) => state.chartFilterDoanhThu.dayTime);
    // const dateData = orderData.map(item => item.ngayDatDon);

    const data = {
        labels: dateData,
        datasets: [
            {
                label: 'Tháng Hiện Tại',
                // data: doanhThuData.doanhThuThangNay,
                data: dateData.map(() => Math.random() * 100),
                fill: true,
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.1
            },
            {
                label: 'Tháng Trước',
                data: dateData.map(() => Math.random() * 100),
                fill: true,
                borderColor: 'rgba(54, 162, 235, 1)',
                tension: 0.1
            },
            {
                label: 'Năm Hiện Tại',
                data: dateData.map(() => Math.random() * 100),
                fill: true,
                borderColor: 'rgba(255, 205, 86, 1)',
                tension: 0.1
            },
            {
                label: 'Năm Trước',
                data: dateData.map(() => Math.random() * 100),
                fill: true,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }
        ]
    };


    // Filter trạng thái
    const filterDataByLabel = (data, label) => {
        return data.datasets.filter(dataset => dataset.label === label);
    };

    const filterDataByLabels = (data, labels) => {
        return labels.flatMap(label => filterDataByLabel(data, label));
    };

    const labelsToFilter = useSelector((state) => state.chartFilterDoanhThu.label);


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
                    text: 'Doanh thu (VND)'
                }
            }
        }
    };

    return (
        <div>
            <Typography variant="h4">Thống kê Doanh Thu</Typography>
            <BoLocDoanhThu filterVisible={true} />
            <Line
                style={{ maxHeight: "31vh" }}
                data={dataFilterByLabel}
                options={options}
            />
        </div>
    );
};

export default DoanhThu;