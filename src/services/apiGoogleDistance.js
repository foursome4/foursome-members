import axios from 'axios';

const apiGoogleDistance = axios.create({
baseURL: 'https://maps.googleapis.com/maps/api/distancematrix/'
});



// const config = {
//   method: 'get',
//   url: 'https://maps.googleapis.com/maps/api/distancematrix/',
//   headers: { }
// };

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });



export default apiGoogleDistance;





