import axios from 'axios';

// Next we make an 'instance' of it
const instance = axios.create({
// .. where we make our configurations
    baseURL: 'http://127.0.0.1:8000/api'
});

// Where you would set stuff like your 'Authorization' header, etc ...
//instance.defaults.headers.common['Authorization'] = localStorage.getItem("_authToken");

// Also add/ configure interceptors && all the other cool stuff

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.common['Authorization'] =  localStorage.getItem("_authToken");
    debugger;
    console.log("intercepted");
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


export default instance;