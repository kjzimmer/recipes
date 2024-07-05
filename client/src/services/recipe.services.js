import axios from 'axios'


const API_INSTANCE = axios.create({
    baseURL: 'http://localhost:8000/api/recipes'
})

API_INSTANCE.interceptors.request.use((config) => {
    const token = localStorage.getItem('userToken');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const recipeServices = {

    //Create
    create: async (recipe) => {
        try {
            const res = await API_INSTANCE.post('/', recipe)
            return res
        } catch (error) { throw error }
    },
}

