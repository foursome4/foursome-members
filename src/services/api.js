import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-foursome.herokuapp.com/'
});

export default api;



