import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:7046/api',
});

export const dashboardApi = {
    getStats: () => api.get('/Dashboard'),
};

export const roomApi = {
    getAll: () => api.get('/Room'),
    getAvailable: () => api.get('/Room/Available'),
    create: (data) => api.post('/Room', data),
    update: (id, data) => api.put(`/Room/${id}`, data),
    delete: (id) => api.delete(`/Room/${id}`),
};

export const customerApi = {
    getAll: () => api.get('/Customer'),
    create: (data) => api.post('/Customer', data),
    update: (id, data) => api.put(`/Customer/${id}`, data),
    delete: (id) => api.delete(`/Customer/${id}`),
};

export const bookingApi = {
    getAll: () => api.get('/Booking'),
    create: (data) => api.post('/Booking', data),
    cancel: (id) => api.put(`/Booking/Cancel/${id}`),
};

export default api;