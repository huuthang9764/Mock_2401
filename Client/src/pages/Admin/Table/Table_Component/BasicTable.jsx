import React, { useEffect, useState } from 'react';
import { User_GET } from '../../../../service/index.jsx'
import LogIn from '../../../../service/common/LoginApi.jsx'

import { useDispatch, useSelector } from 'react-redux';
import { toggleCheckBox } from '../../../../redux/slices/checkBoxSlice.jsx';

import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import ChangePassword from '../../changePassword.jsx'

function descendingComparator(a, b, orderBy) {
    if (isNaN(a[orderBy]) || isNaN(b[orderBy])) {
        // Nếu không phải là số, sử dụng so sánh chuỗi
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    } else {
        // Nếu là số, sử dụng so sánh số
        return b[orderBy] - a[orderBy];
    }
}

const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
};


function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export default function BasicTable() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('maTaiKhoan');
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElementsConfig, setTotalPagesConfig] = useState(10000000);
    const [totalElements, setTotalElements] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchValue, setSearchValue] = useState('');
    const [isChangePassWordModalOpen, setChangePassWordModalOpen] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(toggleCheckBox(selected));
    }, [selected, dispatch]);

    const isModalDeleteClose = useSelector((state) => state.modalClose.isUserDeleteModalClose);
    const isModalUpdateClose = useSelector((state) => state.modalClose.isUserUpdateModalClose);
    const isModalCreateClose = useSelector((state) => state.modalClose.isUserCreateModalClose);

    const handleOpenChangePassWordModal = () => {
        setChangePassWordModalOpen(true);
    };

    const handleCloseChangePassWordModal = () => {
        setChangePassWordModalOpen(false);
    };

    const resetAllFilter = () => {
        setOrder('asc');
        setOrderBy('maTaiKhoan');
        setSelected([]);
        setOpen(false);
        setStatusFilter('');
        setGenderFilter('');
        setRoleFilter('');
        setSearchValue('');
        setPage(1);
        setRowsPerPage(10);
        setChangePassWordModalOpen(false);
    };

    const handleSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const isRowMatchingSearch = (row, searchValue) => {
        return row.email.toLowerCase().includes(searchValue.toLowerCase());
    };


    const setHandleFilterStatus = (event) => {
        if (event && event.target) {
            setStatusFilter(event.target.value);
        }
    };

    const handleFilterStatus = (row, statusFilter) => {
        if (statusFilter === "") {
            return true;
        }
        if (typeof statusFilter !== 'string' || typeof row.trangThai !== 'string') {
            return false;
        }
        return row.trangThai.toLowerCase().includes(statusFilter.toLowerCase()) && row.trangThai.length === statusFilter.length;
    };

    const setHandleFilterGender = (event) => {
        if (event && event.target) {
            setGenderFilter(event.target.value);
        }
    };
    const handleFilterGender = (row, genderFilter) => {
        if (genderFilter === "") {
            return true;
        }
        if (typeof genderFilter !== 'string' || typeof row.gioiTinh !== 'string') {
            return false;
        }
        return row.gioiTinh.toLowerCase().includes(genderFilter.toLowerCase()) && row.gioiTinh.length === genderFilter.length;
    };


    const setHandleFilterRole = (event) => {
        if (event && event.target) {
            setRoleFilter(event.target.value);
        }
    };
    const handleFilterRole = (row, roleFilter) => {
        if (roleFilter === "") {
            return true;
        }
        if (typeof roleFilter !== 'string' || typeof row.quyen !== 'string') {
            return false;
        }
        return row.quyen.toLowerCase().includes(roleFilter.toLowerCase()) && row.quyen.length === roleFilter.length;
    };

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };


    const renderFilters = () => (
        <React.Fragment>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                <label htmlFor="statusFilter"
                    style={{ marginBottom: '2px', fontSize: '0.85rem', color: 'rgba(0, 0, 0, 0.54)' }}>Trạng
                    Thái</label>
                <select
                    id="statusFilter"
                    name="statusFilter"
                    value={statusFilter}
                    style={{
                        flex: 1,
                        width: '8rem',
                        padding: '4px',
                        border: '1px solid #ced4da',
                        borderRadius: '0.35rem',
                        fontSize: '0.875rem',
                    }}
                    onChange={setHandleFilterStatus}
                >
                    <option value="">All</option>
                    <option value="Active">Active</option>
                    <option value="NotActive">NotActive</option>
                </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                <label htmlFor="genderFilter"
                    style={{ marginBottom: '2px', fontSize: '0.85rem', color: 'rgba(0, 0, 0, 0.54)' }}>Giới
                    Tính</label>
                <select
                    id="genderFilter"
                    name="genderFilter"
                    value={genderFilter}
                    style={{
                        flex: 1,
                        width: '8rem',
                        padding: '4px',
                        border: '1px solid #ced4da',
                        borderRadius: '0.35rem',
                        fontSize: '0.875rem',
                    }}
                    onChange={setHandleFilterGender}
                >
                    <option value="">All</option>
                    <option value="Male">Male</option>
                    <option value="FeMale">FeMale</option>
                </select>
            </div>


            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                <label htmlFor="roleFilter"
                    style={{ marginBottom: '2px', fontSize: '0.85rem', color: 'rgba(0, 0, 0, 0.54)' }}>Quyền Tài
                    Khoản</label>
                <select
                    id="roleFilter"
                    name="roleFilter"
                    value={roleFilter}
                    style={{
                        flex: 1,
                        width: '8rem',
                        padding: '4px',
                        border: '1px solid #ced4da',
                        borderRadius: '0.35rem',
                        fontSize: '0.875rem',
                    }}
                    onChange={setHandleFilterRole}
                >
                    <option value="">All</option>
                    <option value="Admin">Admin</option>
                    <option value="CEO">CEO</option>
                    <option value="Manager">Manager</option>
                    <option value="Seller">Seller</option>
                    <option value="Member">Member</option>
                </select>
            </div>
        </React.Fragment>
    );


    // Xử lý API
    const [rows, setUserData] = useState([]);

    // Xử lý trạng thái tài khoản
    const statusConvert = (content) => {
        const updatedRows = content.map(item => ({
            ...item,
            trangThai: item.trangThai ? "Active" : "NotActive"
        }));
        setUserData(updatedRows);
    }

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const result = await User_GET(totalElementsConfig);
                setUserData(result.content);
                setTotalPages(result.totalPages);
                setTotalElements(result.totalElements);
                statusConvert(result.content);
                setTotalPagesConfig(result.totalElements);
            } catch (error) {
                console.log("Lỗi khi call API:", error);
            }
        };
        fetchDataAsync();
    }, [isModalCreateClose, isModalUpdateClose, isModalDeleteClose]);

    // useEffect(() => {
    //     const fetchDataAsync = async () => {
    //         try {
    //             const result = await User_GET(totalElementsConfig);
    //             setUserData(result.content);
    //             setTotalPages(result.totalPages);
    //             setTotalElements(result.totalElements);
    //             statusConvert(result.content);
    //             setTotalPagesConfig(result.totalElements)
    //         } catch (error) {
    //             console.log("Lỗi khi call API:", error)
    //         }
    //     };
    //     fetchDataAsync(totalElementsConfig);
    // }, [isModalCreateClose, isModalUpdateClose, isModalDeleteClose]);


    return (
        <React.Fragment>
            <Sheet
                className="SearchAndFilters-mobile"
                sx={{
                    display: { xs: 'flex', sm: 'none' },
                    my: 1,
                    gap: 1,
                }}
            >
                <Input
                    size="sm"
                    placeholder="Search"
                    startDecorator={<SearchIcon />}
                    sx={{ flexGrow: 1 }}
                />


                <IconButton
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    onClick={() => setOpen(true)}
                >
                    <FilterAltIcon />
                </IconButton>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
                        <ModalClose />
                        <Typography id="filter-modal" level="h2">
                            Filters
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {renderFilters()}
                            <Button color="primary" onClick={() => setOpen(false)}>
                                Submit
                            </Button>
                        </Sheet>
                    </ModalDialog>
                </Modal>
            </Sheet>
            <Box
                className="SearchAndFilters-tabletUp"
                sx={{
                    borderRadius: 'sm',
                    py: 2,
                    display: { xs: 'none', sm: 'flex' },
                    flexWrap: 'wrap',
                    gap: 1.5,
                    '& > *': {
                        minWidth: { xs: '120px', md: '160px' },
                    },
                }}
            >
                <FormControl sx={{ flex: 1 }} size="sm">
                    <FormLabel>Tìm kiếm người dùng</FormLabel>
                    <Input
                        size="sm"
                        placeholder="Tìm người dùng theo email"
                        startDecorator={<SearchIcon />}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </FormControl>

                {renderFilters()}

                <div style={{ paddingLeft: 50, paddingTop: 12 }}>
                    <Button
                        startDecorator={<AutorenewIcon />}
                        size="lg"
                        color="none"
                        onClick={resetAllFilter}
                    >
                    </Button>
                </div>

            </Box>

            <Sheet
                className="OrderTableContainer"
                variant="outlined"
                sx={{
                    display: { xs: 'none', sm: 'initial' },
                    width: '100%',
                    borderRadius: 'sm',
                    flexShrink: 1,
                    overflow: 'auto',
                    minHeight: 0,
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    stickyHeader
                    hoverRow
                    sx={{
                        '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
                        '--Table-headerUnderlineThickness': '1px',
                        '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
                        '--TableCell-paddingY': '4px',
                        '--TableCell-paddingX': '8px',
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ width: 30, textAlign: 'center', padding: '12px 6px' }}>
                                <Checkbox
                                    size="sm"
                                    indeterminate={
                                        selected.length > 0 && selected.length !== rows.length
                                    }
                                    checked={selected.length === rows.length}
                                    onChange={(event) => {
                                        if (event.target.checked && selected.length === 0) {
                                            setSelected(rows.map((row) => row.maTaiKhoan));
                                        } else if (selected.length > 0) {
                                            setSelected([]);
                                        }
                                    }}
                                    color={
                                        selected.length > 0 || selected.length === rows.length
                                            ? 'primary'
                                            : undefined
                                    }
                                    sx={{ verticalAlign: 'text-bottom' }}
                                />

                            </th>


                            <th style={{ width: 35, padding: '12px 6px' }}>
                                {/* Tên cột*/}
                                <Link
                                    underline="none"
                                    color="primary"
                                    component="button"
                                    onClick={() => {
                                        setOrder(order === 'asc' ? 'desc' : 'asc');
                                        setOrderBy('maTaiKhoan');
                                    }}
                                    fontWeight="lg"
                                    endDecorator={<ArrowDropDownIcon />}
                                    sx={{
                                        '& svg': {
                                            transition: '0.2s',
                                            transform:
                                                order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                                        },
                                    }}
                                >
                                    ID
                                </Link>
                            </th>

                            <th style={{ width: 180, padding: '12px 6px' }}>
                                <Link
                                    underline="none"
                                    color="primary"
                                    component="button"
                                    onClick={() => {
                                        setOrder(order === 'asc' ? 'desc' : 'asc');
                                        setOrderBy('hoTen');
                                    }}
                                    fontWeight="lg"
                                    endDecorator={<ArrowDropDownIcon />}
                                    sx={{
                                        marginLeft: "35px",
                                        '& svg': {
                                            transition: '0.2s',
                                            transform:
                                                order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                                        },
                                    }}
                                >
                                    Họ Tên
                                </Link>
                            </th>

                            <th style={{ width: 100, padding: '12px 6px' }}>
                                <Link
                                    underline="none"
                                    color="primary"
                                    component="button"
                                    onClick={() => {
                                        setOrder(order === 'asc' ? 'desc' : 'asc');
                                        setOrderBy('ngayTao');
                                    }}
                                    fontWeight="lg"
                                    endDecorator={<ArrowDropDownIcon />}
                                    sx={{
                                        '& svg': {
                                            transition: '0.2s',
                                            transform:
                                                order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                                        },
                                    }}
                                >
                                    Ngày Tạo
                                </Link>
                            </th>

                            <th style={{ width: 85, padding: '12px 6px' }}>Ngày Sinh</th>
                            <th style={{ width: 70, padding: '12px 6px' }}>Giới Tính</th>
                            <th style={{ width: 80, padding: '12px 6px', textAlign: 'center' }}> SDT</th>
                            <th style={{ width: 130, padding: '12px 6px', textAlign: 'center' }}>Email</th>
                            <th style={{ width: 70, padding: '12px 6px', textAlign: 'center' }}>Status</th>
                            <th style={{ width: 50, padding: '12px 6px', textAlign: 'center' }}>Role</th>
                            <th style={{ width: 125, padding: '12px 6px' }}></th>
                        </tr>
                    </thead>

                    <tbody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .filter((row) =>
                                handleFilterStatus(row, statusFilter) &&
                                handleFilterGender(row, genderFilter) &&
                                handleFilterRole(row, roleFilter) &&
                                isRowMatchingSearch(row, searchValue), getComparator(order, 'id'))
                            .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                            .map((row) => (
                                <tr key={row.maTaiKhoan}>
                                    <td style={{ textAlign: 'center', width: 120 }}>
                                        <Checkbox
                                            size="sm"
                                            checked={selected.includes(row.maTaiKhoan)}
                                            color={selected.includes(row.maTaiKhoan) ? 'primary' : undefined}
                                            onChange={(event) => {
                                                setSelected((ids) => {
                                                    const newIds = event.target.checked
                                                        ? ids.concat(row.maTaiKhoan)
                                                        : ids.filter((itemId) => itemId !== row.maTaiKhoan);
                                                    return newIds;
                                                });
                                            }}
                                            slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                                            sx={{ verticalAlign: 'text-bottom' }}
                                        />
                                    </td>


                                    {/*Mã tài khoản*/}
                                    <td>
                                        <Typography level="body-xs">{row.maTaiKhoan}</Typography>
                                    </td>

                                    {/*Họ tên*/}
                                    <td>
                                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                            <Avatar size="sm">{row.hoTen.charAt(0)}</Avatar>
                                            <div>
                                                <Typography
                                                    style={{ overflow: "hidden" }}
                                                    level="body-xs">
                                                    {row.hoTen}
                                                </Typography>
                                            </div>
                                        </Box>
                                    </td>

                                    {/*Ngày Tạo*/}
                                    <td>
                                        <Typography level="body-xs"
                                            style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
                                            {row.ngayTao}
                                        </Typography>
                                    </td>

                                    {/*Ngày Sinh*/}
                                    <td>
                                        <Typography level="body-xs">{row.ngaySinh}</Typography>
                                    </td>

                                    {/*Giới tính*/}
                                    <td>
                                        <Typography style={{ textAlign: "center" }} level="body-xs">{row.gioiTinh}</Typography>
                                    </td>

                                    {/*Số điện thoại*/}
                                    <td>
                                        <Typography level="body-xs">{row.soDienThoai}</Typography>
                                    </td>

                                    {/*email*/}
                                    <td>
                                        <Typography level="body-xs"
                                            style={{ overflow: "hidden" }}>
                                            {row.email}
                                        </Typography>
                                    </td>

                                    {/*Trạng thái kích hoạt*/}
                                    <td>
                                        <Chip
                                            variant="soft"
                                            size="sm"
                                            startDecorator={
                                                {
                                                    Active: <CheckRoundedIcon />,
                                                    NotActive: <BlockIcon />,
                                                }[row.trangThai]
                                            }
                                            color={
                                                {
                                                    Active: 'success',
                                                    NotActive: 'danger',
                                                }[row.trangThai]
                                            }
                                        >
                                            {row.trangThai}
                                        </Chip>
                                    </td>

                                    {/*Role*/}
                                    <td>
                                        <Typography level="body-xs">{row.quyen}</Typography>
                                    </td>


                                    {/*Chức năng*/}
                                    <td>
                                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                            <Button
                                                key={row.maTaiKhoan}
                                                onClick={handleOpenChangePassWordModal}
                                                variant="outlined"
                                                style={{ border: "none", whiteSpace: "nowrap" }}
                                                disabled={!selected.includes(row.maTaiKhoan) || selected.length > 1}
                                            >
                                                Reset Password
                                                <ChangePassword open={isChangePassWordModalOpen} handleClose={handleCloseChangePassWordModal} />
                                            </Button>
                                            {/*<RowMenu/>*/}
                                        </Box>
                                    </td>

                                </tr>
                            ))}
                    </tbody>
                </Table>
            </Sheet>
            <Box
                className="Pagination-laptopUp"
                sx={{
                    pt: 2,
                    gap: 1,
                    [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
                    display: {
                        xs: 'none',
                        md: 'flex',
                    },
                }}
            >
                <Button
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    onClick={() => handleChangePage(page - 1)}
                    disabled={page === 1}
                    startDecorator={<KeyboardArrowLeftIcon />}
                >
                    Previous
                </Button>

                <Box sx={{ flex: 1 }} />

                {Array.from({ length: Math.ceil(rows.length / rowsPerPage) }, (_, index) => (
                    <IconButton
                        key={index + 1}
                        size="sm"
                        variant={page === index + 1 ? 'outlined' : 'plain'}
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
                    onClick={() => handleChangePage(page + 1)}
                    disabled={page === Math.ceil(rows.length / rowsPerPage)}
                    endDecorator={<KeyboardArrowRightIcon />}
                >
                    Next
                </Button>

            </Box>
        </React.Fragment>
    );
}