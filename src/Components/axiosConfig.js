import axios from 'axios';

// Next we make an 'instance' of it
const instance = axios.create({
// .. where we make our configurations
    baseURL: 'http://127.0.0.1:8000/api'
});

// Where you would set stuff like your 'Authorization' header, etc ...
instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// Also add/ configure interceptors && all the other cool stuff

// axios.interceptors.request.use(
//     config => {
//       if (!config.headers.Authorization) {
//         const token = JSON.parse(localStorage.getItem("keyCloak")).token;
  
//         if (token) {
//           config.headers.Authorization = `Bearer ${token}`;
//         }
//       }
  
//       return config;
//     },
//     error => Promise.reject(error)
//   );

export default instance;