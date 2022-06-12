import Admin from './Components/MainPages/Admin';
import Login from './Components/MainPages/Login';
import User from './Components/MainPages/User';


function App() {

  if(localStorage.getItem("user")=="admin"){
    return (
      <div>
        
  <Admin/>
      </div>
    );
  }

  else if(localStorage.getItem("user")=="user"){
    return (
      <div>
        
        <User/>
      </div>
    );
  }
  else{
    return (
      <div>
        <Login/>
  
      </div>
    );
  }

}

export default App;
