import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { User_GET } from '../../../../../service/index'

const columns = [
    { id: 'MaKH', label: 'Mã KH', minWidth: 80 },
    { id: 'GioiTinh', label: 'Giới Tính', minWidth: 80 },
    { id: 'Tuoi', label: 'Tuổi', minWidth: 80, },
    { id: 'DiaChi', label: 'Địa Chỉ', minWidth: 120 },
    { id: 'SoHangDaMua', label: 'Số Hàng Đã Mua', minWidth: 80 },
    { id: 'TienHangDaMua', label: 'Tiền Hàng Đã Mua', minWidth: 120 },
];

const TopBuy = () => {
    const [rows, setUserData] = React.useState([]);

    const calculateAge = (birthday) => {
        const ageDifMs = Date.now() - new Date(birthday).getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const result = await User_GET(10000000);
                const userData = result.content.map((item) => ({
                    MaKH: item.maTaiKhoan,
                    GioiTinh: item.gioiTinh,
                    Tuoi: calculateAge(item.ngaySinh),
                    DiaChi: item.hoTen,
                    SoHangDaMua: item.email,
                    TienHangDaMua: item.soDienThoai
                }));
                setUserData(userData);
            } catch (error) {
                console.log("Lỗi khi call API:", error);
            }
        };
        fetchDataAsync();
    }, []);


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table" >
                    <TableHead>
                        <TableRow >
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, backgroundColor: "#007BFF", color: "white" }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.format && typeof value === 'number'
                                                ? column.format(value)
                                                : value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default TopBuy;