import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import './style.scss';

const Breadcrumbs = () => {
  const location = useLocation();
  const { pathname } = location;
  const pathnames = pathname.split("/").filter((item) => item);
  
  const items = [
    {
      href: '/',
      title: (
        <>
          <HomeOutlined />
          <span>Home</span>
        </>
      )
    }
  ];

  pathnames.forEach((name, index) => {
    const isLast = index === pathnames.length - 1;
    items.push({
      href: name,
      title: isLast ? (<span>{name}</span>): (<span>{name}</span>)
    });
  });


  return (
    <Breadcrumb separator=">" items={items} />
  );
};

export default Breadcrumbs;
