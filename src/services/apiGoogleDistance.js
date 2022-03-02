import axios from 'axios';

const apiGoogleDistance = axios.create({
baseURL: 'https://maps.googleapis.com/maps/api/distancematrix/'
});



export default apiGoogleDistance;





