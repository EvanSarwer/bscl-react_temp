import GetMail from './Components/ForgetPassword/GetMail';
import Admin from './Components/MainPages/Admin';
import Login from './Components/MainPages/Login';
import MainPage from './Components/MainPages/MainPage';
import User from './Components/MainPages/User';
import Cookies from 'universal-cookie';


function App() {
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
