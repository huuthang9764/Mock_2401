import React from 'react';

const Footer = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#f5f5f5', padding: '20px', textAlign: 'center', height: '180px', marginLeft:"100px" }}>
            <div>
                <div>
                    <h3 style={{ borderBottom: '1px solid #333' }}>Thông tin liên hệ</h3>
                    <p>Địa chỉ: 123 Đường ABC, Thành phố XYZ</p>
                    <p>Email: info@example.com</p>
                    <p>Điện thoại: (123) 456-7890</p>
                </div>
            </div>
            <div>
                <div>
                    <h3 style={{ borderBottom: '1px solid #333' }}>Liên kết hữu ích</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li>
                            <a href="/about">Về chúng tôi</a>
                        </li>
                        <li>
                            <a href="/contact">Liên hệ</a>
                        </li>
                        <li>
                            <a href="/terms">Điều khoản sử dụng</a>
                        </li>
                        <li>
                            <a href="/privacy">Chính sách bảo mật</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <p>&copy; 2024 VTI MOCK 2401-1. Bảo lưu mọi quyền.</p>
            </div>
        </div>
    );
};

export default Footer;
