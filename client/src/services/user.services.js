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

    // Create
    register: async (user) => {
        try {
            const res = await API_INSTANCE.post('/register', user)
            localStorage.setItem('userToken', res.data.token)
            window.location = '/recipes'
        } catch (error) { throw error }
    },

    // Read
    getAll: async () => {   // TODO: need to delete this service and use get instead
        try {
            const res = await API_INSTANCE.get('/users')
            return res.data
        } catch (error) {
            error.response.data?.msg === 'session expired' && (window.location = '/')
            throw error
        }
    },

    get: async (id) => {
        try{
            if(id){
                const res = await API_INSTANCE.get(`/users/${id}`)
                return res.data
            }else{
                const res = await API_INSTANCE.get(`/`)
                return res.data
            }
        } catch(error){ 
            error.response.data?.msg ==='session expired' && (window.location = '/')
            throw error
        }
    },

    // Update
    update: async (user) => {
        try{
            const res = await API_INSTANCE.put('/', user)
        } catch(error){ 
            error.response.data?.msg ==='session expired' && (window.location = '/')
            throw error
        }
    },

    // Delete
    delete: async (id) => { // TODO: this needs to be set inactive not delete
        try{
            const res = await API_INSTANCE.delete(`/${id}`)
        } catch(error){ 
            error.response.data?.msg ==='session expired' && (window.location = '/')
            throw error
        }
    }
}

