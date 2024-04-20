import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Flex, Rate } from 'antd';

const ProductPreview = ({ product,productsWithGiamGia }) => {

  const { maSanPham, tenSanPham, rating, gia, giamGia, danhSachAnhMinhHoa } = product;


  const anhMinhHoa = danhSachAnhMinhHoa && danhSachAnhMinhHoa.length > 0
    ? `https://res.cloudinary.com/djhoea2bo/image/upload/v1711511636/${danhSachAnhMinhHoa[0].url}`
    : 'https://res.cloudinary.com/djhoea2bo/image/upload/v1711546395/MockProject/celit98tjoulh1d2xdku';

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return '';
  };

  return (
    <div>
      <Link to={{ pathname: `/productDetail/${maSanPham}` }} state={product}  >
        <div style={{
          boxSizing: 'border-box',
          width: '180px',
          padding: '7px',
        }}>
          <Paper>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  width={"140px"}
                  height={"140px"}
                  src={anhMinhHoa}
                  alt="Product"
                  style={{ objectFit: 'cover', borderRadius: '4px' }}
                />
              </div>
            </div>
            <div style={{ marginLeft: "10px", textAlign: "left" }}>
              <div style={{ overflow: "hidden" }}>
                <Typography variant="h7"
                  style={{
                    maxWidth: '140px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                  {tenSanPham}
                </Typography>
              </div>
              <Flex align='center' style={{margin:'10px 0'}}>
                <Rate disabled allowHalf value={rating} style={{  fontSize:15, marginRight:'15px' }}/>
                <strong>{rating}</strong>
              </Flex>
              <div>
                <Typography variant="h8"
                  style={{ display: 'inline-block', marginRight: '8px' }}>
                  {`${formatPrice(gia - gia * giamGia / 100)}đ`}
                </Typography>
                <Typography variant="h8"
                  style={{ display: 'inline-block', marginLeft: '8px', textAlign: "right" }}>
                  {`-${giamGia}%`}
                </Typography>
              </div>
              <Typography variant="body2" style={{
                display: 'inline-block',
                color: 'red',
                textDecoration: 'line-through',
                textAlign: 'left',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>{`${formatPrice(gia)}đ`}</Typography>
            </div>
          </Paper>
        </div>
      </Link>
    </div>
  );
};

export default ProductPreview;
