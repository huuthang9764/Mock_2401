import api from '../config/apiConfig';

export async function thongKeDonHang() {
    try {
        const response = await api.get(`/ThongKe/DonHang`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default thongKeDonHang;
