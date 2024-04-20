import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Today from "../Chart/Other/today.jsx";
import TongQuan from "../Chart/Other/tongQuan.jsx";
import TrangThaiGiaoHang from "../Chart/Other/trangThaiGiaoHang.jsx";
import { DonHang } from "../Chart/index.jsx";
import SanPham from "../Chart/SanPham/sanpham.jsx";
import Card from "@mui/material/Card";
import DoanhThu from "../Chart/DoanhThu/doanhthu.jsx";
import ChiTieu from "../Chart/ChiTieu/chitieu.jsx";
import NguoiDung from "../Chart/NguoiDung/nguoidung.jsx";
import NewUserReport from "../Chart/NguoiDung/newUserReport.jsx";
import ReivewSanPham from "../Chart/Other/reviewSanPham.jsx";

const CeoDashboard = () => {
  return (
    <Paper
      style={{
        width: "100%",
        height: "100%",
        background: "#F5F5FA"
      }}
    >
      <Grid container spacing={1} >
        {/* Cột 25% */}
        <Grid item xs={3.5}>
          <Grid container spacing={1} style={{ height: "92vh" }}>
            {/* Ô con 1 */}
            <Grid item xs={12} style={{ height: "13%" }}>
              <Today />
            </Grid>
            {/* Ô con 2 */}
            <Grid item xs={12} style={{ height: "46%" }}>
              <TongQuan />
            </Grid>
            {/* Ô con 3 */}
            <Grid item xs={12} style={{ height: "38%" }}>
              <TrangThaiGiaoHang />
            </Grid>
          </Grid>
        </Grid>

        {/* Cột 75% */}
        <Grid item xs={8.5}>
          <Grid
            container
            spacing={1}
            style={{ height: "92vh", display: "flex", flexDirection: "row" }}
          >
            {/* Ô con 1 */}
            <Grid item xs={12} style={{ height: "55%" }}>
              <Card style={{ height: "100%", margin: 2, padding: 2 }}>
                <DonHang />
              </Card>
            </Grid>
            {/* Ô con 2 */}
            <Grid
              item
              xs={12}
              style={{ height: "43%", display: "flex", flexDirection: "row" }}
            >
              <Grid item xs={6} style={{ height: "100%" }}>
                <Card style={{ height: "100%", margin: 2, padding: 2 }}>
                  <DoanhThu />
                </Card>
              </Grid>
              <Grid item xs={6} style={{ height: "100%" }}>
                <Card style={{ height: "100%", margin: 2, padding: 2 }}>
                  <ChiTieu />
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* MH2 */}
        <Grid item xs={12}>
          <Grid container spacing={1} style={{ height: "92vh" }}>
            {/* Ô con 1 */}
            <Grid item xs={8} style={{ height: "50%" }}>
              <Card style={{ height: "100%", margin: 2, padding: 2 }}>
                <NguoiDung />
              </Card>
            </Grid>
            {/* Ô con 2 */}
            <Grid item xs={4} style={{ height: "50%" }}>
              <Card style={{ height: "100%", margin: 2, padding: 2 }}>
                <NewUserReport />
              </Card>
            </Grid>
            {/* Ô con 3 */}
            <Grid item xs={8} style={{ height: "50%" }}>
              <Card style={{ height: "100%", margin: 2, padding: 2 }}>
                <SanPham />
              </Card>
            </Grid>
            {/* Ô con 4 */}
            <Grid item xs={4} style={{ height: "50%" }}>
              <Card style={{ height: "100%", margin: 2, padding: 2 }}>
                <ReivewSanPham />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CeoDashboard;
