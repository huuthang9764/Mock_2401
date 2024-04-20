import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <>
      <Typography variant="h2" gutterBottom>
        Chào mừng bạn tới với trang quản lý của Manager
      </Typography>
      <Typography variant="h6" gutterBottom>
        Vui lòng chọn chức năng sử dụng:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={4} md={3}>
          <Link to="/dashboard/manager/products" style={{ textDecoration: 'none' }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Quản lý sản phẩm
                </Typography>
                <img 
                height={200}
                width={200}
                src="https://cdn3d.iconscout.com/3d/premium/thumb/product-5806313-4863042.png?f=webp" alt="Product Management" />
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Link to="/dashboard/manager/categories" style={{ textDecoration: 'none' }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Quản lý loại sản phẩm
                </Typography>
                <img 
                height={200}
                width={200}
                src="https://icons.iconarchive.com/icons/sora-meliae/matrilineare/512/Categories-applications-office-icon.png" alt="Category Management" />
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Link to="/dashboard/manager/inventory" style={{ textDecoration: 'none' }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Quản lý tồn kho
                </Typography>
                <img 
                height={200}
                width={200}
                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/inventory-2072276-1751587.png?f=webp" alt="Inventory Management" />
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Link to="/dashboard/manager/brand" style={{ textDecoration: 'none' }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Quản lý Thương Hiệu
                </Typography>
                <img 
                height={200}
                width={200}
                src="https://cdn-icons-png.freepik.com/512/5309/5309779.png" alt="Supplier Management" />
              </CardContent>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Link to="/dashboard/manager/order" style={{ textDecoration: 'none' }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Quản lý đơn hàng
                </Typography>
                <div style={{}}>
                  <img
                  height={200}
                  width={200}
                  src="https://cdn-icons-png.flaticon.com/512/679/679821.png" alt="Order Management"/>
                </div>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
