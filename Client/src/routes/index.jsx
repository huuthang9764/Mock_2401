import React, { Suspense, useState, useEffect } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { createBrowserRouter, Outlet } from "react-router-dom";
// import PrivateRoute from "./PrivateRoute";
import { MySpin } from "../components";
import CheckoutPage from "../pages/checkout/Checkout";
import CartPage from "../pages/Cart/CartPage";
// import Login from "../pages/login/Login"




//Các trang của CEO
const CeoDashboard = React.lazy(() => import("../pages/CEO/Dashboard"));
const StaffManager = React.lazy(() => import("../pages/CEO/StaffManager"));

//Các trang của Admin
const UserManager = React.lazy(() => import("../pages/Admin/Table/table_app"));

//Các trang của Manager
// Dashboard của Manager
const ManagerDashboard = React.lazy(() => import("../pages/Manager/Dashboard"));

// Quản lý đơn hàng
const OrderPage = React.lazy(() => import("../pages/Manager/OrderManage/index"));

// Quản lý sản phẩm
const ProductsPage = React.lazy(() => import("../pages/Manager/Products"));

// Quản lý loại sản phẩm
const ProductsCategoryPage = React.lazy(() => import("../pages/Manager/CategoryManage"));

const BrandsPage = React.lazy(() => import("../pages/Manager/Brand"));



const NotFound = React.lazy(() => import("../pages/404"));
const Profile = React.lazy(() => import("../pages/Manager/Profiles"));
const HomePage = React.lazy(() => import("../pages/Home"));

const LoginPage = React.lazy(() => import("../pages/login/Login"));
import RegisterPage from "../pages/register/Register";
const ResetPassWord = React.lazy(() => import("../pages/Manager/Profiles/ResetPassword"))

const MainLayout = React.lazy(() => import("../layouts/MainLayout"));
const DefaultLayout = React.lazy(() => import("../layouts/DefaultLayout"));
// import MainLayout from "../layouts/MainLayout";

const ProductDetail = React.lazy(() => import("../pages/ProductDetail"))



const PrivateRoute = ({ children, allowedRoles }) => {
  const role =sessionStorage.getItem('savedUserRole') || localStorage.getItem('savedUserRole');
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');

  const location = useLocation();

  if (role === null || !token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: (
      <PrivateRoute allowedRoles={['CEO', 'Admin', 'Manager', 'Seller']}>
        <Suspense fallback={<MySpin />}>
          <MainLayout />
        </Suspense>
      </PrivateRoute>
    ),
    children: [
      {
        path: 'ceo',
        element: (
          <PrivateRoute allowedRoles={['CEO']}>
            <Suspense fallback={<MySpin />}>
              <Outlet />
            </Suspense>
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <CeoDashboard />,
          },
          {
            path: 'staffManage',
            element: <StaffManager />,
          },
        ]
      },

      {
        path: 'admin',
        element: (
          <PrivateRoute allowedRoles={['Admin']}>
            <Suspense fallback={<MySpin />}>
              <Outlet />
            </Suspense>
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <UserManager />,
          },
          {
            path: 'other',
            element: <h1>Chức năng đang đợi phát triển</h1>,
          },
        ]
      },

      {
        path: 'manager',
        element: (
          <PrivateRoute allowedRoles={['Manager']}>
            <Suspense fallback={<MySpin />}>
              <Outlet />
            </Suspense>
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <ManagerDashboard />,
          },
          {
            path: 'products',
            element: <ProductsPage />
          },
          {
            path: 'categories',
            element: <ProductsCategoryPage />
          },
          {
            path: 'inventory',
            element: <h1>Trang Quản lý tồn kho</h1>
          },
          {
            path: 'brand',
            element: <BrandsPage />
          },
          {
            path: 'order',
            element: <OrderPage />
          },
          // {
          //   path: 'profile',
          //   element: <Profile />
          // },
        ]
      },
    ]
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<MySpin />}>
        <DefaultLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'productDetail/:id',
        element: <ProductDetail />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "profile/:id",
        element: <Profile />,
      },
    ]
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<MySpin />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/resetPassword",
    element: (
      <Suspense fallback={<MySpin />}>
        <ResetPassWord />
      </Suspense>
    ),
  },

  {
    path: "*",
    element: (
      <Suspense fallback={<MySpin />}>
        <NotFound />
      </Suspense>
    ),
  },
  {
    path: "register",
    element: (
      <Suspense fallback={<MySpin />}>
        <RegisterPage />
      </Suspense>
    ),
  },
]);

export default router;