import Box from "@mui/joy/Box";
import Link from "@mui/joy/Link";
import Table from "@mui/joy/Table";
import { Button, Modal } from "antd";
import { useEffect, useMemo, useState } from "react";
import Typography from "@mui/joy/Typography";
import { formatPrice, sleep } from "../Order";
import OrderAPI from "../../../../service/manager/orderAPI";

const DialogOrderDetails = ({ open, details, onClose = () => { } }) => {
  // const data = useMemo(() => [...details.ChiTietDonHang], [details]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!details.maDonHang) return;

    (async () => {
      try {
        setLoading(true);
        await sleep();

        const response = await OrderAPI.getOrderDetails(details.maDonHang);

        setData(response);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, [details?.maDonHang]);

  return (
    <Modal
      width={820}
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Đóng
        </Button>,
      ]}
    >
      <h1>Chi tiết đơn hàng {`#${details.maDonHang}`}</h1>

      {loading ? (
        "loading..."
      ) : (
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground": "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground": "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 100, padding: "12px 6px" }}>
                {/* Tên cột*/}
                <Link underline="none" color="primary" component="button" fontWeight="lg">
                  Mã sản phẩm
                </Link>
              </th>

              <th style={{ width: 250, padding: "12px 6px" }}>Tên sản phẩm</th>
              <th style={{ width: 100, padding: "12px 6px" }}>Số lượng</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Đơn giá</th>
              <th style={{ width: 190, padding: "12px 6px" }}>Thành tiền</th>
            </tr>
          </thead>

          <tbody>
            {data.length ? (
              data.map((row) => (
                <tr key={row.MaTK}>
                  {/*Mã sản phẩm*/}
                  <td>
                    <Typography level="body-xs">{row.maSanPham}</Typography>
                  </td>

                  {/*Tên sản phẩm*/}
                  <td>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <Typography level="body-xs">{row.tenSanPham}</Typography>
                    </Box>
                  </td>

                  {/*Số lượng*/}
                  <td>
                    <Typography level="body-xs">{row.soLuong}</Typography>
                  </td>

                  {/*Đơn giá*/}
                  <td>
                    <Typography level="body-xs">{formatPrice(row.donGia)}</Typography>
                  </td>

                  {/*Thành tiền*/}
                  <td>
                    <Typography level="body-xs">{formatPrice(row.thanhTien)}</Typography>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} align="center">
                  Chưa có chi tiết đơn hàng nào
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Modal>
  );
};

export default DialogOrderDetails;
