import axios from 'axios';

const apiUrl = 'http://localhost:8080/TaiKhoan';

async function User_DELETE(page,pageSize) {
    try {
        const response = await axios.delete(`${apiUrl}?page=${page}&size=${pageSize}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default User_DELETE;
