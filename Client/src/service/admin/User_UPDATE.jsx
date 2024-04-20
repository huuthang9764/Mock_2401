import axios from 'axios';

const apiUrl = 'http://localhost:8080/TaiKhoan';

export async function User_UPDATE(page,pageSize) {
    try {
        const response = await axios.patch(`${apiUrl}?page=${page}&size=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default User_UPDATE;
