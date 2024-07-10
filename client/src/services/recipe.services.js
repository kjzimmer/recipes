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

    upload: async (formData) => {
        try {
            const res = await API_INSTANCE.post('/image', formData)
        } catch (error) { throw error }
    },

    //Create
    create: async (recipe) => {
        console.log('********************')
        try {
            console.log('in recipe create service: ', recipe)
            const res = await API_INSTANCE.post('/', recipe)
            return res.data
        } catch (error) {
            error.response.data?.msg === 'session expired' && (window.location = '/')
            throw error
        }
    },

    // Read
    get: async (id) => {
        try {
            if (id) {
                const res = await API_INSTANCE.get(`/${id}`)
                return res.data
            } else {
                const res = await API_INSTANCE.get(`/`)
                return res.data
            }
        } catch (error) {
            error.response.data?.msg === 'session expired' && (window.location = '/')
            throw error
        }
    },

    // Update
    update: async (recipe ) => {
        try {
            const res = await API_INSTANCE.put(`/ `, recipe)
            return res.data
        } catch (error) {
            error.response.data?.msg === 'session expired' && (window.location = '/')
            throw error
        }
    },

    // Delete
    delete: async (id) => {
        try {
            const res = await API_INSTANCE.delete(`/${id}`)
        } catch (error) {
            error.response.data?.msg === 'session expired' && (window.location = '/')
            throw error
        }
    }
}

