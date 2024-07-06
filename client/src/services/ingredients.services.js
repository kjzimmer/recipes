import axios from 'axios'


const API_INSTANCE = axios.create({
    baseURL: 'http://localhost:8000/api/ingredients'
})

API_INSTANCE.interceptors.request.use((config) => {
    const token = localStorage.getItem('userToken');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const ingredientsServices = {

    //Create
    create: async (ingredient) => {
        try {
            const res = await API_INSTANCE.post('/', ingredient)
            return res
        } catch(error){ 
            error.response.data?.msg ==='session expired' && (window.location = '/')
            throw error
        }
    },
}

