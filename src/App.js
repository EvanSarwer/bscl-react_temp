import Admin from './Components/MainPages/Admin';
import Login from './Components/MainPages/Login';
import User from './Components/MainPages/User';


function App() {
  if(2==1){
    return (
      <div>
        
  <Admin/>
      </div>
    );
  }
  else if(2==2){
    return (
      <div>
        
  <Login/>
      </div>
    );
  }
  else{
    return (
      <div>
        
  <User/>
      </div>
    );
  }

}

export default App;
