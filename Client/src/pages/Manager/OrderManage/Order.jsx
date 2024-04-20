import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Link from "@mui/joy/Link";
import Sheet from "@mui/joy/Sheet";
import Table from "@mui/joy/Table";
import React, { useEffect, useMemo, useState } from "react";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import ContainerCommon from "./../../../components/ContainerCommon/ContainerCommon";
import DialogOrderDetails from "./components/DialogOrderDetails";
import OrderAPI from "../../../service/manager/orderAPI";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import LinearProgress from "@mui/joy/LinearProgress";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import BikeScooterIcon from "@mui/icons-material/BikeScooter";
import DialogChangeStatus from "./components/DialogChangeStatus";

const statusOptions = [
  { label: "Chờ duyệt", value: "ChoDuyet" },
  { label: "Đã duyệt", value: "DaDuyet" },
  { label: "Hủy", value: "Huy" },
  { label: "Đang giao", value: "DangGiao" },
  { label: "Giao thành công", value: "GiaoThanhCong" },
];

const statusChanges = {
  ChoDuyet: "DaDuyet",
  DaDuyet: "DangGiao",
  DangGiao: "GiaoThanhCong",
  GiaoThanhCong: "GiaoThanhCong",
  Huy: "Huy",
};

export const sleep = (ms = 500) => new Promise((rs) => setTimeout(rs, ms));

export const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

export function formatDate(date) {
  // Extracting date components
  var day = date.getDate();
  var month = date.getMonth() + 1; // Month is zero-based
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  // Padding single digit values with leading zeros
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  // Returning formatted date string
  return day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
}

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("MaDonHang");
  const [details, setDetails] = useState(null);
  const [filters, setFilters] = useState({
    pageSize: 10,
    pageNumber: 1,
  });
  const [pagination, setPagination] = useState({
    totalPages: 1,
  });
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    document.title = "Order Page";
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      await sleep();

      const response = await OrderAPI.getAllOrder({
        ...filters,
        sort: `${orderBy},${order}`,
        ...(search ? { searchValue: search } : {}),
      });

      // console.log(`response:::`, response);

      setOrders(response.content);
      setPagination((prev) => ({ ...prev, totalPages: response.totalPages }));
    } catch (error) {
      console.log(`error`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [filters, orderBy, order, search]);

  const filterData = useMemo(() => {
    if (!orders) {
      return [];
    }

    if (!status) {
      return orders;
    }

    return orders.filter((t) => t.trangThaiMoiNhat === status);
  }, [status, orders]);

  const renderFilters = () => (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
        <label
          htmlFor="statusFilter"
          style={{ marginBottom: "2px", fontSize: "0.85rem", color: "rgba(0, 0, 0, 0.54)" }}
        >
          Trạng Thái
        </label>
        <select
          id="statusFilter"
          name="statusFilter"
          style={{
            flex: 1,
            width: "8rem",
            padding: "4px",
            border: "1px solid #ced4da",
            borderRadius: "0.35rem",
            fontSize: "0.875rem",
          }}
          value={status}
          onChange={({ target: { value } }) => setStatus(value)}
        >
          <option value="">Tất cả</option>
          {statusOptions.map((item) => (
            <option value={item.value} key={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );

  const resetAllFilter = () => {
    setSearch("");
    setStatus("");
  };

  const handleChangePage = (page) => {
    setFilters((prev) => ({ ...prev, pageNumber: page }));
  };

  const handleChangeStatus = (item) => {
    setSelected(item);
  };

  const handleSubmitChangeStatus = async () => {
    if (!selected) return;
    try {
      setLoading(true);
      const response = await OrderAPI.updateOrderStatus(
        selected.maDonHang,
        statusChanges[selected.trangThaiMoiNhat]
      );

      if (response) {
        await getData();
        setSelected(null);
      }
    } catch (error) {
      console.log(`error change Status`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContainerCommon title={"Quản lý đơn hàng"}>
      {selected ? (
        <DialogChangeStatus
          open={true}
          title={`Chuyển từ trạng thái \`${selected.trangThaiMoiNhat}\` sang \`${statusChanges[selected.trangThaiMoiNhat]
            }\``}
          details={selected}
          onClose={() => setSelected(null)}
          onSubmit={handleSubmitChangeStatus}
        />
      ) : null}

      {details ? (
        <DialogOrderDetails
          open={Boolean(details)}
          onClose={() => setDetails(null)}
          details={details}
        />
      ) : null}

      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Tìm kiếm đơn hàng</FormLabel>
          <Input
            size="sm"
            placeholder="Tìm đơn hàng theo mã"
            startDecorator={<SearchIcon />}
            value={search}
            type="number"
            onChange={({ target: { value } }) => setSearch(value)}
          />
        </FormControl>

        {renderFilters()}

        <div style={{ paddingLeft: 50, paddingTop: 12 }}>
          <Button
            startDecorator={<AutorenewIcon />}
            size="lg"
            color="none"
            onClick={resetAllFilter}
          />
        </div>
      </Box>

      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
          position: "relative",
        }}
      >
        {loading ? <LinearProgress /> : ""}

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
              <th style={{ width: 45, padding: "12px 6px" }}>
                {/* Tên cột*/}
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => {
                    setOrder(order === "asc" ? "desc" : "asc");
                    setOrderBy("MaDonHang");
                  }}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    "& svg": {
                      transition: "0.2s",
                      transform: order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                    },
                  }}
                >
                  Mã ĐH
                </Link>
              </th>

              <th style={{ width: 120, padding: "12px 6px" }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => {
                    setOrder(order === "asc" ? "desc" : "asc");
                    setOrderBy("MaKhachHang");
                  }}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    "& svg": {
                      transition: "0.2s",
                      transform: order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                    },
                  }}
                >
                  Email
                </Link>
              </th>

              <th style={{ width: 100, padding: "12px 6px" }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => {
                    setOrder(order === "asc" ? "desc" : "asc");
                    setOrderBy("NgayDat");
                  }}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    "& svg": {
                      transition: "0.2s",
                      transform: order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                    },
                  }}
                >
                  Ngày Đặt
                </Link>
              </th>

              <th style={{ width: 90, padding: "12px 6px" }}>Tổng giá trị</th>
              <th style={{ width: 210, padding: "12px 6px" }}>Địa chỉ</th>
              <th style={{ width: 120, padding: "12px 6px" }}>Phương thức thanh toán</th>
              <th style={{ width: 100, padding: "12px 6px" }}>Dịch vụ vận chuyển</th>
              <th style={{ width: 100, padding: "12px 6px" }}>Trạng thái</th>
              <th style={{ width: 160, padding: "12px 6px" }}></th>
            </tr>
          </thead>

          <tbody>
            {filterData.length ? (
              filterData.map((row) => (
                <tr key={row.MaTK}>
                  {/*Mã đơn hàng*/}
                  <td>
                    <Typography level="body-xs">{row.maDonHang}</Typography>
                  </td>

                  {/*Họ tên khách hàng*/}
                  <td>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <Avatar size="sm">{row.email.charAt(0)}</Avatar>

                      <div style={{overflow:"hidden"}}>
                        <Typography level="body-xs">{row.email}</Typography>
                      </div>
                    </Box>
                  </td>

                  {/*Ngày Tạo*/}
                  <td>
                    <Typography level="body-xs">{row.ngayDat}</Typography>
                  </td>

                  {/*Tổng giá trị*/}
                  <td>
                    <Typography level="body-xs">{formatPrice(row.tongGiaTri)}</Typography>
                  </td>

                  {/*Địa chỉ*/}
                  <td>
                    <div style={{overflow:"hidden"}}>
                    <Typography level="body-xs">
                      {`${row.diaChi.soNha}, ${row.diaChi.phuong}, ${row.diaChi.quan}, ${row.diaChi.tinh}, ${row.diaChi.quocGia}`}
                    </Typography>
                    </div>
                  </td>

                  {/*Phương thức thanh toán*/}
                  <td>
                    <Typography level="body-xs">{row.tenPhuongThucThanhToan}</Typography>
                  </td>

                  {/*Dịch vụ vận chuyển*/}
                  <td>
                    <Typography level="body-xs">{row.tenDichVuVanChuyen}</Typography>
                  </td>

                  {/*Trạng thái*/}
                  <td>
                    <Chip
                      variant="soft"
                      size="sm"
                      startDecorator={
                        {
                          GiaoThanhCong: <CheckRoundedIcon />,
                          DaDuyet: <CheckRoundedIcon />,
                          ChoDuyet: <FiberNewIcon />,
                          Huy: <BlockIcon />,
                          DangGiao: <BikeScooterIcon />,
                        }[row.trangThaiMoiNhat]
                      }
                      color={
                        {
                          GiaoThanhCong: "success",
                          DaDuyet: "primary",
                          Huy: "danger",
                          DangGiao: "primary",
                          ChoDuyet: "warning",
                        }[row.trangThaiMoiNhat]
                      }
                    >
                      {row.trangThaiMoiNhat}
                    </Chip>
                  </td>

                  {/*Chức năng*/}
                  <td>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <Button
                        variant="outlined"
                        style={{ border: "none" }}
                        size="small"
                        disabled={
                          row.trangThaiMoiNhat === "GiaoThanhCong" || row.trangThaiMoiNhat === "Huy"
                        }
                        onClick={() => handleChangeStatus(row)}
                      >
                        Đổi Trạng Thái
                      </Button>
                      <Button
                        onClick={() => setDetails(row)}
                        variant="outlined"
                        style={{ border: "none" }}
                        size="small"
                      >
                        Xem chi tiết
                      </Button>
                    </Box>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} align="center">
                  Chưa có đơn hàng nào
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Sheet>

      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => handleChangePage(filters.pageNumber - 1)}
          disabled={filters.pageNumber === 1}
          startDecorator={<KeyboardArrowLeftIcon />}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />

        {Array.from({ length: pagination.totalPages }, (_, index) => (
          <IconButton
            key={index + 1}
            size="sm"
            variant={filters.pageNumber === index + 1 ? "outlined" : "plain"}
            color="neutral"
            onClick={() => handleChangePage(index + 1)}
          >
            {index + 1}
          </IconButton>
        ))}

        <Box sx={{ flex: 1 }} />

        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => handleChangePage(filters.pageNumber + 1)}
          disabled={filters.pageNumber === pagination.totalPages}
          endDecorator={<KeyboardArrowRightIcon />}
        >
          Next
        </Button>
      </Box>
    </ContainerCommon>
  );
};

export default Order;
