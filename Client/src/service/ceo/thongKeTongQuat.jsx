import api from '../config/apiConfig';

export async function thongKeTongQuat() {
    try {
        const response = await api.get(`/ThongKe/TongQuat`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default thongKeTongQuat;
