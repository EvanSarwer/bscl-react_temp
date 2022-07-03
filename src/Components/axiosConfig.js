import axios from 'axios';

// Next we make an 'instance' of it
const instance = axios.create({
// .. where we make our configurations
    baseURL: 'http://bscl.cs.aiub.edu/api'
});

// Where you would set stuff like your 'Authorization' header, etc ...
//instance.defaults.headers.common['Authorization'] = localStorage.getItem("_authToken");

// Also add/ configure interceptors && all the other cool stuff

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.common['Authorization'] =  localStorage.getItem("_authToken");
    //this.$Progress.start(); 
    console.log("intercepted");
    return config;
  }, function (error) {
    
    // Do something with request error
    return Promise.reject(error);
  });
instance.interceptors.response.use(function (response) {
  console.log('request interceptor good');
 return response;
}, function(error) {

  //console.log('request interceptor bad');

  //console.log(error.response.status);
 if (error.response.status === 401) {
  //console.log("kkk");
  localStorage.clear();
      window.location.href="/";
 }
 return Promise.reject(error)
});


export default instance;