import axios from 'axios'


const API_INSTANCE = axios.create({
    baseURL: 'http://localhost:8000/api/prepSteps'
})

API_INSTANCE.interceptors.request.use((config) => {
    const token = localStorage.getItem('userToken');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const prepStepServices = {

    //Create
    create: async (step) => {
        try {
            const res = await API_INSTANCE.post('/', step)
            return res
        } catch(error){ 
            error.response.data?.msg ==='session expired' && (window.location = '/')
            throw error
        }
    },

    // Read
    // all reads are done through the recipes service

    // Update
    update: async (step) => {
        try{
            const res = await API_INSTANCE.put('/', step)
        } catch(error){ 
            error.response.data?.msg ==='session expired' && (window.location = '/')
            throw error
        }
    },

    // Delete
    delete: async (id) => {
        try{
            const res = await API_INSTANCE.delete(`/${id}`)
        } catch(error){ 
            error.response.data?.msg ==='session expired' && (window.location = '/')
            throw error
        }
    }
}

