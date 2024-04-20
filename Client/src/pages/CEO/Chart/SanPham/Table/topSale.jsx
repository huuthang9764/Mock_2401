import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ProductAPI from '../../../../../service/manager/productService'

const columns = [
    { id: 'TenSP', label: 'Tên Sản Phẩm', minWidth: 80 },
    { id: 'DanhMuc', label: 'Danh Mục', minWidth: 80 },
    { id: 'DaBan', label: 'Đã Bán', minWidth: 80, },
    { id: 'TonKho', label: 'Tồn Kho', minWidth: 120 },
];

const TopSale = () => {
    const [rows, setProductData] = React.useState([]);

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const result = await ProductAPI.fetchProducts(1, 10);
                if (!result) {
                    console.log("API result is undefined");
                    return;
                }
                const productData = result.map((item) => ({
                    TenSP: item.tenSanPham,
                    DanhMuc: item.xuatXu,
                    DaBan: item.soLuongSanPham,
                    TonKho: item.soLuongSanPham,
                    DoanhThu: item.gia,
                }));
                setProductData(productData);
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
                        {rows && rows.map((row) => (
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

export default TopSale;