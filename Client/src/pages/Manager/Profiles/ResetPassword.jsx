import React, { useState } from 'react';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra mật khẩu và mật khẩu xác nhận
        if (password !== confirmPassword) {
            alert('Mật khẩu và mật khẩu xác nhận không khớp');
            return;
        }

        // Gửi yêu cầu đổi mật khẩu tới server
        // TODO: Gọi API để đổi mật khẩu

        // Reset trường nhập liệu
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <div>
            <h2>Đổi mật khẩu</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Mật khẩu mới:</label>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <label>Xác nhận mật khẩu:</label>
                    <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                </div>
                <button type="submit">Đổi mật khẩu</button>
            </form>
        </div>
    );
};

export default ResetPassword;