import GetMail from './Components/ForgetPassword/GetMail';
import Admin from './Components/MainPages/Admin';
import Login from './Components/MainPages/Login';
import MainPage from './Components/MainPages/MainPage';
import User from './Components/MainPages/User';
import Cookies from 'universal-cookie';
import Deployer from './Components/MainPages/Deployer';
import AddAgency from './Components/MainPages/AddAgency';
//import GitInfo from 'react-git-info/macro';
//const gitInfo = GitInfo();
function App() {
  //if(localStorage.getItem('git')=='1'){
 //alert("git hash: "+gitInfo.commit.hash);}
  const cookies = new Cookies();
  if (cookies.get('_authToken') != null && cookies.get('_role') == "admin") {
    return (
      <div>

        <Admin />
      </div>
    );
  }

  else if (cookies.get('_authToken') != null && cookies.get('_role')== "general") {
    return (
      <div>

        <User />
      </div>
    );
  }

  else if (cookies.get('_authToken') != null && cookies.get('_role')== "add-agency") {
    return (
      <div>

        <AddAgency />
      </div>
    );
  }

  else if (cookies.get('_authToken') != null && cookies.get('_role')== "deployer") {
    return (
      <div>

        <Deployer />
      </div>
    );
  }

  else if (cookies.get('_authToken') == null) {
    return (
      <div>

        <MainPage />
      </div>
    );
  }

  else {
    return (
      <div>
        <MainPage />

      </div>
    );
  }

}

export default App;
