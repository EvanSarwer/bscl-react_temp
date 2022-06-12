
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';
import Dashboard from '../Dashboard/Dashboard';
import LiveChannels from '../LiveChannels/LiveChannels';
import ChannelStatus from '../Channel/ChannelStatus';
import DefinedChannelStatus from '../Channel/DefinedChannelStatus';
import DeviceMonitor from '../DeviceMonitor/DeviceMonitor';
import DownloadReport from '../DownloadReport/DownloadReport';
import UserStatus from '../User/UserStatus';
import UserDefined from '../User/UserDefined';
import Overview from '../Overview/Overview';

function Login() {

  return (
    
        <div class="content-wrapper">
            <div class="row justify-content-center">
            <div class="content-body col-md-4">
                            <div class="card border-grey border-lighten-3 m-0">
                                <div class="card-header border-0">
                                    <div class="card-title text-center">
                                        <div class="p-1"><img src="./app-assets/images/logo/bscl-logo.png" alt="branding logo"/></div>
                                    </div>
                                    <h6 class="card-subtitle line-on-side text-muted text-center font-small-3 pt-2"><span>Login</span>
                                    </h6>
                                </div>
                                <div class="card-content">
                                    <div class="card-body">
                                        <form class="form-horizontal form-simple" action="index.html" novalidate>
                                            <fieldset class="form-group position-relative has-icon-left mb-0">
                                                <input type="text" class="form-control" id="user-name" placeholder="Your Username" required/>
                                                <div class="form-control-position">
                                                    <i class="la la-user"></i>
                                                </div>
                                            </fieldset>
                                            <fieldset class="form-group position-relative has-icon-left">
                                                <input type="password" class="form-control" id="user-password" placeholder="Enter Password" required/>
                                                <div class="form-control-position">
                                                    <i class="la la-key"></i>
                                                </div>
                                            </fieldset>
                                            <div class="form-group row">
                                                <div class="col-sm-6 col-12 text-center text-sm-left">
                                                    <fieldset>
                                                        <input type="checkbox" id="remember-me" class="chk-remember"/>
                                                        <label for="remember-me"> Remember Me</label>
                                                    </fieldset>
                                                </div>
                                                <div class="col-sm-6 col-12 text-center text-sm-right"><a href="recover-password.html" class="card-link">Forgot Password?</a></div>
                                            </div>
                                            <button type="submit" class="btn btn-info btn-block"><i class="ft-unlock"></i> Login</button>
                                        </form>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <div class="">
                                        <p class="float-xl-left text-center m-0"><a href="recover-password.html" class="card-link">Recover
                                                password</a></p>
                                        <p class="float-xl-right text-center m-0">New to Moden Admin? <a href="register-simple.html" class="card-link">Sign Up</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

            </div>
);
}

export default Login;