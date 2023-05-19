import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
// Next we make an 'instance' of it
const instance = axios.create({
// .. where we make our configurations
    baseURL: 'http://127.0.0.1:8000/api'
    //baseURL: 'https://api.bscl.gov.bd/api'

});

// Where you would set stuff like your 'Authorization' header, etc ...
//instance.defaults.headers.common['Authorization'] = localStorage.getItem("_authToken");

// Also add/ configure interceptors && all the other cool stuff

instance.interceptors.request.use(function (config) {
  //const cookies = new Cookies();
    // Do something before request is sent
    config.headers.common['Authorization'] =cookies.get('_authToken');//  localStorage.getItem("_authToken");
    //this.$Progress.start(); 
    //console.log("intercepted");
    return config;
  }, function (error) {
    
    // Do something with request error
    return Promise.reject(error);
  });
instance.interceptors.response.use(function (response) {
  //const cookies = new Cookies();
  //console.log('request interceptor good');
  return response;
}, function(error) {

  //console.log('request interceptor bad');

  //console.log(error.response.status);
 if (error.response.status === 401) {
  //console.log("kkk");
  //localStorage.clear();
  cookies.remove('_authToken');
            cookies.remove('_role');
            cookies.remove('username');
      window.location.href="/";
 }
 return Promise.reject(error)
});


export default instance;