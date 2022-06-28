import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetMail from "../ForgetPassword/GetMail";
import PasswordChange from "../ForgetPassword/PasswordChange";
import Login from "./Login";

function MainPage() {

    return (
      <div>
      
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/forget-Pass/email" element={<GetMail />}></Route>
          <Route exact path="/forget-pass/new-password/:token" element={<PasswordChange />}></Route>
        </Routes>
      </BrowserRouter>
      </div>
      );
  }
  
  export default MainPage;