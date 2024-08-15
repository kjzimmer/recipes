import axios from 'axios'


const API_INSTANCE = axios.create({
    baseURL: `http://${window.location.hostname}:8000/api/recipes`
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
            // for (const pair of formData.entries()) {
            //     console.log(pair[0], pair[1]);
            // }

            // const iter = formData.keys()

            // let result = iter.next();
            // while (!result.done) {
            //     console.log(result); // 1 3 5 7 9
            //     result = iter.next();
            // }
            for (let [key, value] of formData) {
                console.log(`${key}: ${value}`)
            }
            const res = await API_INSTANCE.post('/image', formData)
        } catch (error) { throw error }
    },

    //Create
    create: async (recipe) => {
        try {
            console.log('creating: ', recipe)
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
    update: async (recipe) => {
        try {
            const res = await API_INSTANCE.put(`/ `, recipe)
            return res.data
        } catch (error) {
            error.response.data?.msg === 'session expired' && (window.location = '/')
            throw error
        }
    },

    updateField: async (recipe) => {
        try {
            const res = await API_INSTANCE.put(`/field `, recipe)
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

