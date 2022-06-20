import Admin from './Components/MainPages/Admin';
import Login from './Components/MainPages/Login';
import User from './Components/MainPages/User';


function App() {

  if(localStorage.getItem("_authToken")!= null && localStorage.getItem("_role")=="admin"){
    return (
      <div>
        
  <Admin/>
      </div>
    );
  }

  else if(localStorage.getItem("_authToken")!= null && localStorage.getItem("_role")=="general"){
    return (
      <div>
        
        <User/>
      </div>
    );
  }

  else if(localStorage.getItem("_authToken")==null){
    return (
      <div>
        
        <Admin/>
      </div>
    );
  }

  else{
    return (
      <div>
        <Admin/>
  
      </div>
    );
  }

}

export default App;
