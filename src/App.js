

import MainPage from './Components/MainPages/MainPage';
import Cookies from 'universal-cookie';
//import GitInfo from 'react-git-info/macro';
//const gitInfo = GitInfo();
function App() {
  //if(localStorage.getItem('git')=='1'){
 //alert("git hash: "+gitInfo.commit.hash);}
  const cookies = new Cookies();

  cookies.set('_role', 'admin');
  cookies.set('username', 'user_name');
  

  if (cookies.get('_authToken') == null) {
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
