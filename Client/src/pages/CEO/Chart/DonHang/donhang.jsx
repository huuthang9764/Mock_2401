import React, { useEffect , useState} from "react";
import { Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import BoLocDonHang from '../../Filter/filterDonHang';
import { useSelector } from "react-redux";
import { thongKeDonHang } from "../../../../service/ceo/thongKeDonHang";

const DonHang = () => {

    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const result = await thongKeDonHang();
                setOrderData(result);
            } catch (error) {
                console.log("Lỗi khi call API:", error);
            }
        };
        fetchDataAsync();
    }, []);


    const dateData = useSelector((state) => state.chartFilterDonHang.dayTime);
    // const dateData = orderData.map(item => item.ngayDatDon);

    const getSoLuongByTrangThai = (trangThai) => {
        return orderData.map(item => {
            const foundStatus = item.danhSachTrangThaiVaSoLuong.find(status => status.trangThai === trangThai);
            return foundStatus ? foundStatus.soLuong : 0;
        });
    };

    const data = {
        labels: dateData,
        datasets: [
            {
                label: 'Chờ Duyệt',
                data: getSoLuongByTrangThai('ChoDuyet'),
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.15
            },
            {
                label: 'Đã Duyệt',
                data: getSoLuongByTrangThai('DaDuyet'),
                fill: false,
                borderColor: 'rgba(54, 162, 235, 1)',
                tension: 0.15
            },
            {
                label: 'Hủy',
                data: getSoLuongByTrangThai('Huy'),
                fill: false,
                borderColor: 'rgba(255, 205, 86, 1)',
                tension: 0.15
            },
            {
                label: 'Đang Giao',
                data: getSoLuongByTrangThai('DangGiao'),
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.15
            },
            {
                label: 'Giao Thành Công',
                data: getSoLuongByTrangThai('GiaoThanhCong'),
                fill: true,
                borderColor: 'rgba(153, 102, 255, 1)',
                tension: 0.15
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

    const labelsToFilter = useSelector((state) => state.chartFilterDonHang.label);

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
                    text: 'Số lượng đơn hàng'
                }
            }
        }
    };

    return (
        <div>
            <Typography variant="h4">Thống kê đơn hàng</Typography>
            <BoLocDonHang filterVisible={true} />
            <Line
                style={{ maxHeight: "395px" }}
                data={dataFilterByLabel}
                options={options}
            />
        </div>
    );
};

export default DonHang;