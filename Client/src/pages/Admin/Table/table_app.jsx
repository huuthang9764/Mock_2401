import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import BasicTable from './Table_Component/BasicTable.jsx';
import CreateUser from '../createUser.jsx';
import UpdateUser from '../updateUser.jsx';
import DeleteUser from '../deleteUser.jsx';


export default function UserManagerTable() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCount, setSelectedCount] = useState(0);

    const checkBoxList = useSelector((state) => state.tableCheckBox.selected);
    useEffect(() => {
        setSelectedCount(checkBoxList.length)
    }, [checkBoxList]);

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
        window.location.reload();
    };
    const handleOpenUpdateModal = () => {
        setIsUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
        window.location.reload();
    };
    const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        window.location.reload();
    };

    return (
        <CssVarsProvider disableTransitionOnChange>
            <div style={{ maxHeight: "100%" , overflowY: "hidden"}}>
            <CssBaseline />
                <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                    <Box
                        component="main"
                        className="MainContent"
                        sx={{
                            px: { xs: 2, md: 6 },
                            pt: {
                                xs: 'calc(12px + var(--Header-height))',
                                sm: 'calc(12px + var(--Header-height))',
                                md: 1,
                            },
                            pb: { xs: 2, sm: 2, md: 3 },
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            minWidth: 0,
                            height: '100dvh',
                            gap: 1,
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Breadcrumbs
                                size="sm"
                                aria-label="breadcrumbs"
                                separator={<ChevronRightRoundedIcon fontSize="sm" />}
                                sx={{ pl: 0 }}
                            >
                                <Link
                                    underline="none"
                                    color="neutral"
                                    href="/"
                                    aria-label="Home"
                                >
                                    <HomeRoundedIcon />
                                </Link>
                                <Link
                                    underline="hover"
                                    color="neutral"
                                    href="/admin"
                                    fontSize={12}
                                    fontWeight={500}
                                >
                                    Dashboard
                                </Link>
                                <Typography color="primary" fontWeight={500} fontSize={12}>
                                    Quản lý người dùng
                                </Typography>
                            </Breadcrumbs>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                mb: 1,
                                gap: 1,
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: { xs: 'start', sm: 'center' },
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography level="h3" component="h1">
                                Trang quản lý người dùng
                            </Typography>

                            <div>
                                <Button
                                    color="primary"
                                    startDecorator={<PersonAddIcon />}
                                    size="sm"
                                    onClick={handleOpenCreateModal}
                                >
                                    Tạo người dùng mới
                                </Button>

                                <CreateUser
                                    open={isCreateModalOpen}
                                    handleClose={handleCloseCreateModal}
                                    handleOpen={handleOpenCreateModal}
                                />

                                <Button
                                    style={{ marginLeft: 20 }}
                                    color="success"
                                    startDecorator={<EditCalendarIcon />}
                                    size="sm"
                                    onClick={handleOpenUpdateModal}
                                    disabled={selectedCount !== 1}
                                >
                                    Edit
                                </Button>
                                <UpdateUser
                                    open={isUpdateModalOpen}
                                    handleClose={handleCloseUpdateModal}
                                    handleOpen={handleOpenUpdateModal}
                                />

                                <Button
                                    style={{ marginLeft: 20 }}
                                    color="danger"
                                    startDecorator={<PersonRemoveIcon />}
                                    size="sm"
                                    onClick={handleOpenDeleteModal}
                                    disabled={selectedCount === 0}
                                >
                                    Xoá người dùng
                                </Button>
                                <DeleteUser
                                    open={isDeleteModalOpen}
                                    handleClose={handleCloseDeleteModal}
                                    handleOpen={handleOpenDeleteModal}
                                />
                            </div>
                        </Box>
                        <BasicTable />
                    </Box>
                </Box>
            </div>
        </CssVarsProvider>
    );
}