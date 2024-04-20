import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridToolbarDensitySelector } from '@mui/x-data-grid';
import Button from '@mui/material/Button'; // Import Button từ Material-UI

function BasicTable() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                setRows(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phone', headerName: 'Phone', width: 200 },
    ];

    const handleAdd = () => {
        // Xử lý logic khi nhấn nút thêm
    };

    const handleEdit = () => {
        // Xử lý logic khi nhấn nút sửa
    };

    const handleDelete = () => {
        // Xử lý logic khi nhấn nút xóa
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                components={{
                    Toolbar: GridToolbar
                }}
            />
        </div>
    );

    function GridToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarExport />
                <GridToolbarDensitySelector />
                <Button variant="contained" onClick={handleAdd}>Add</Button>
                <Button variant="contained" onClick={handleEdit}>Edit</Button>
                <Button variant="contained" onClick={handleDelete}>Delete</Button>
            </GridToolbarContainer>
        );
    }
}

export default BasicTable;