import React from 'react';
import { Outlet } from 'react-router-dom'
import { Layout } from "antd";

const DefaultLayout = () => {
  return (
    <Layout >
      <Outlet />
    </Layout>
  );
};

export default DefaultLayout;