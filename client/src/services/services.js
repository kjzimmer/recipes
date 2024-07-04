import axios from 'axios'


const API_INSTANCE = axios.create({
    baseURL: 'http://localhost:8000/api'
})

API_INSTANCE.interceptors.request.use((config) => {
    const token = localStorage.getItem('userToken');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const userServices = {

    login: async (credentials) => {
        try {
            const res = await API_INSTANCE.post('/login', credentials)
            localStorage.setItem('userToken', res.data.token)
            window.location = '/recipes'
        } catch (error) { throw error }
    },

    logout: async () => {
        try {
            const res = await API_INSTANCE.post('/users/logout')
            localStorage.removeItem('userToken')
            window.location = '/'
        } catch (error) { throw error }
    },

    getAll: async () => {
        try {
            const res = await API_INSTANCE.get('/users')
            return res.data
        } catch (error) {
            error.response.data?.msg === 'session expired' && (window.location = '/')
            throw error
        }
    },

    //Create
    register: async (user) => {
        try {
            const res = await API_INSTANCE.post('/register', user)
            localStorage.setItem('userToken', res.data.token)
            window.location = '/recipes'
        } catch (error) { throw error }
    },


}

