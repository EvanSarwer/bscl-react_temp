import {useState,useEffect} from 'react';
import axiosConfig from '../axiosConfig';
import Cookies from 'universal-cookie';

const Login=()=> {
    const cookies = new Cookies();
    const [uname,setUname] = useState("");
    const [pass,setPass] = useState("");
    const [err,setErr] = useState({});

    const handleForm=(e)=>{
        e.preventDefault();
      
        const obj = {username:uname,password:pass};
        axiosConfig.post("/auth/sign-in",obj).then((rsp)=>{
            console.log(rsp.data);
            //localStorage.setItem("_authToken",rsp.data.data.token);
            cookies.set('_authToken', rsp.data.data.token);
            //localStorage.setItem("_role",rsp.data.data.role);
            cookies.set('_role', rsp.data.data.role);
            //localStorage.setItem("username",rsp.data.data.username);
            cookies.set('username', rsp.data.data.username);
            
            window.location.href="/";

        },(err)=>{
            if(err.response.status===422){
                console.log(err.response.data);
                setErr(err.response.data);
                
            } else if(err.response.status===423){
                window.location.href="/account/notice";
            }
        });
    }

  return (
    
        <div class="content-wrapper">
            <div class="row justify-content-center">
            <div class="content-body col-md-4">
                            <div class="card border-grey border-lighten-3 m-0">
                                <div class="card-header border-0">
                                    <div class="card-title text-center">
                                        <div class="p-1"><img src="/app-assets/images/logo/bscl-logo.png" alt="branding logo"/></div>
                                    </div>
                                    <h6 className="card-subtitle line-on-side text-muted text-center font-medium-5 pt-2"><span>Login</span>
                                    </h6>
                                </div>
                                <div class="card-content">
                                    <div class="card-body">
                                        <form onSubmit={handleForm } class="form-horizontal form-simple" noValidate>
                                            <h6 class="text-center font-weight-bold text-danger">{err.error}</h6>
                                            <fieldset class="form-group position-relative has-icon-left mb-0">
                                                <input type="text" class="form-control" id="user-name" onChange={(e)=>{setUname(e.target.value)}} value={uname} placeholder="Your Username" required data-validation-required-message="Please enter username."/>
                                                <div class="form-control-position">
                                                    <i class="la la-user"></i>
                                                </div>
                                                <div className="help-block font-small-3" />
                                            </fieldset>
                                            <fieldset class="form-group position-relative has-icon-left">
                                                <input type="password" class="form-control" id="user-password" onChange={(e)=>{setPass(e.target.value)}} value={pass} placeholder="Enter Password" required data-validation-required-message="Please enter password."/>
                                                <div class="form-control-position">
                                                    <i class="la la-key"></i>
                                                </div>
                                                <div className="help-block font-small-3" />
                                            </fieldset>
                                            <div class="form-group row">
                                                <div class="col-sm-6 col-12 text-center text-sm-left">
                                                    <fieldset>
                                                        <input type="checkbox" id="remember-me" class="chk-remember"/>
                                                        <label for="remember-me"> Remember Me</label>
                                                    </fieldset>
                                                </div>
                                                <div class="col-sm-6 col-12 text-center text-sm-right"><a href="/forget-Pass/email" class="card-link">Forgot Password?</a></div>
                                            </div>
                                            <button type="submit"  class="btn btn-info btn-block"><i class="ft-unlock"></i> Login</button>
                                        </form>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <div class="">
                                        <p class="float-xl-left text-center m-0"><a href="/forget-Pass/email" class="card-link">Recover
                                                password</a></p>
                                        <p class="float-xl-right text-center m-0">New to BSCL User? <a href="/" class="card-link">Suggesstion</a></p> <br/>
                                        <p class="float-xl-right text-center m-0">Deployer <a href="/deployer/validation" class="card-link">Registration Form</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

            </div>
);
}

export default Login;