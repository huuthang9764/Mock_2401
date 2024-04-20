import axios from 'axios';

const apiUrl = 'https://64b14794062767bc4825f76a.mockapi.io/User';

async function UserManagerAPI() {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default UserManagerAPI;
