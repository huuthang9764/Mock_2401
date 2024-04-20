import api from '../config/apiConfig';

export async function User_GET(totalElementsConfig) {
    try {
        const response = await api.get(`/TaiKhoan?&pageSize=${totalElementsConfig}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default User_GET;
