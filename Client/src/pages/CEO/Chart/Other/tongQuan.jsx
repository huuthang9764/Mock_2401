import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Card from '@mui/material/Card';
import { thongKeTongQuat } from "../../../../service/ceo/thongKeTongQuat";




const TongQuan = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const result = await thongKeTongQuat();
                if (result && Object.keys(result).length > 0) {
                    setData(result);
                } else {
                    console.log("Dữ liệu không hợp lệ");
                }
            } catch (error) {
                console.log("Lỗi khi call API:", error);
            }
        };
        fetchDataAsync();
    }, []);


    return (
        <Card style={{ height: "100%", margin: 2, padding: 2 }}>
            <Grid container spacing={2} style={{ display: "flex", flexDirection: "row" }}>
                {/* Dòng 1 */}
                <Grid item xs={12}>
                    <Grid container alignItems="center">
                        <Grid item xs={8}>
                            <div style={{ display: "flex" }}>
                                <ShoppingCartIcon sx={{ fontSize: 40, color: "#6495ED" }} style={{ marginTop: 5 }} />
                                <h2>{data.soDonHangThangNay ? data.soDonHangThangNay.toLocaleString() : 'Loading...'}</h2>
                            </div>
                            <Typography variant="h6">Đơn hàng</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <div style={{ marginRight: 5, textAlign: "right" }}>
                                <p>So với tháng trước:</p>
                                <Typography variant="h4" style={{ marginTop: "5px", color: data.soDonHangThangNay / data.soDonHangThangTruoc * 100 < 100 ? "red" : "green" }}>
                                    %{Math.round(data.soDonHangThangNay / data.soDonHangThangTruoc * 100)}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Dòng 2 */}
                <Grid item xs={12}>
                    <Grid container alignItems="center">
                        <Grid item xs={8}>
                            <div style={{ display: "flex" }}>
                                <LocalShippingIcon sx={{ fontSize: 40, color: "#FFA500" }} style={{ marginTop: 5 }} />
                                <h2>{data.soDonHangGiaoThanhCongThangNay ? data.soDonHangGiaoThanhCongThangNay.toLocaleString(): 'Loading...'}</h2>
                            </div>
                            <Typography variant="h6">Giao thành công</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <div style={{ marginRight: 5, textAlign: "right" }}>
                                <p>So với tháng trước:</p>
                                <Typography variant="h4" style={{ marginTop: "5px", color: data.soDonHangGiaoThanhCongThangNay / data.soDonHangGiaoThanhCongThangTruoc * 100 < 100 ? "red" : "green" }}>
                                    %{Math.round(data.soDonHangGiaoThanhCongThangNay / data.soDonHangGiaoThanhCongThangTruoc * 100)}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Dòng 3 */}
                <Grid item xs={12}>
                    <Grid container alignItems="center">
                        <Grid item xs={8}>
                            <div style={{ display: "flex" }}>
                                <DoneAllIcon sx={{ fontSize: 40, color: "#32CD32" }} style={{ marginTop: 5 }} />
                                <h2>{data.doanhThuHomNay ? data.doanhThuHomNay.toLocaleString() + 'đ' : 'Loading...'}</h2>
                            </div>
                            <Typography variant="h6">Doanh thu ngày</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <div style={{ marginRight: 5, textAlign: "right" }}>
                                <p>So với ngày hôm qua:</p>
                                <Typography variant="h4" style={{ marginTop: "5px", color: data.doanhThuHomNay / data.doanhThuHomQua * 100 < 100 ? "red" : "green" }}>
                                    %{Math.round(data.doanhThuHomNay / data.doanhThuHomQua * 100)}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Dòng 4 */}
                <Grid item xs={12}>
                    <Grid container alignItems="center">
                        <Grid item xs={8}>
                            <div style={{ display: "flex" }}>
                                <MonetizationOnIcon sx={{ fontSize: 40, color: "#FFD700" }} style={{ marginTop: 5 }} />
                                <h2>{data.doanhThuThangNay ? data.doanhThuThangNay.toLocaleString() + 'đ' : 'Loading...'}</h2>
                            </div>
                            <Typography variant="h6">Doanh thu tháng</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <div style={{ marginRight: 5, textAlign: "right" }}>
                                <p>So với tháng trước:</p>
                                <Typography variant="h4" style={{ marginTop: "5px", color: data.doanhThuThangNay / data.doanhThuThangTruoc * 100 < 100 ? "red" : "green" }}>
                                    %{Math.round(data.doanhThuThangNay / data.doanhThuThangTruoc * 100)}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
        ;
};

export default TongQuan;
