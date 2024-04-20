import React from 'react';
import { StarFilled } from '@ant-design/icons';
import { Avatar, Chip } from '@mui/material';

const UserReview = ({ username, avatarSrc, rating, tag, verified, content }) => {
    return (
        <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <Avatar src={avatarSrc} alt={username} style={{ marginRight: '8px' }} />
                {[...Array(rating).keys()].map((index) => (
                    <StarFilled key={index} style={{ color: 'gold', marginRight: '3px' }} />
                ))}
                <h3>UserName</h3>
            </div>
            {tag && (
                <div style={{ marginBottom: '8px' }}>
                    {verified ? (
                        <span style={{ color: '#1976D2', fontWeight: 'bold' }}>Đã mua hàng - {tag}</span>
                    ) : (
                        <span>{tag}</span>
                    )}
                </div>
            )}
            <p style={{ margin: 0 }}>{content}</p>
        </div>
    );
};

export default UserReview;
