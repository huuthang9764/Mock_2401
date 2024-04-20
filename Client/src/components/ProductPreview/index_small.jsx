import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {Avatar, Chip, Rating} from "@mui/material";

const ProductPreviewSmall = () => {

    return (
        <div style={{
            boxSizing: 'border-box',
            width: '160px',
            padding: '7px',
        }}>
            <Paper>
                <img
                    width={"140px"}
                    src="src/assets/product/img.png"
                    alt="Product"
                    style={{objectFit: 'cover', borderRadius: '4px'}}
                />
                <Typography variant="h8" style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    Iphone 15 Promax
                </Typography>
                <Rating name="half-rating-read" defaultValue={2.5} size="small" precision={0.5} readOnly/>
                <div>
                    <Typography variant="h8" style={{display: 'inline-block', marginRight: '8px'}}>200.000đ</Typography>
                    <Typography variant="h8" style={{display: 'inline-block', marginLeft: '8px'}}>-20%</Typography>
                </div>
                <Typography variant="body2" style={{
                    display: 'inline-block',
                    color: 'red',
                    textDecoration: 'line-through',
                    textAlign: 'left',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>300.000đ</Typography>
            </Paper>
        </div>
    );
};

export default ProductPreviewSmall;


