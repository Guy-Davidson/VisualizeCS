import axios from 'axios';
const API_ROOT_PATH = 'http://localhost:3232';

export const createApiClient = () => {
    return {
        getData: async () => {
            return axios.get(API_ROOT_PATH).then(res => res.data);
        }
    }
}

