import React from 'react';
import { StarFilled } from '@ant-design/icons';

const ProductRating = ({ totalReviews, averageRating, ratings }) => {
    const renderStars = (count) => {
        const stars = [];
        for (let i = 0; i < count; i++) {
            stars.push(<StarFilled key={i} style={{ color: '#ffc107' }} />);
        }
        return stars;
    };

    return (
        <div>
            <div>
                <strong>Số lượng đánh giá:</strong> {totalReviews}
            </div>
            <div>
                <strong>Đánh giá trung bình:</strong> {renderStars(Math.round(averageRating))}
            </div>
            <div>
                <ul>
                    {Object.entries(ratings).map(([stars, count]) => (
                        <li key={stars}>
                            {renderStars(parseInt(stars, 10))}
                            {count} reviews
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductRating;
