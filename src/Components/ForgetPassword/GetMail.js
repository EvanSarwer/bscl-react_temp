import { useState, useEffect } from "react";
import axiosConfig from '../axiosConfig';

const GetMail = () => {
    const [email,setEmail] = useState("");
    const [err,setErr] = useState({});

    const handleForm=(e)=>{
        e.preventDefault();
      
        const obj = {email:email};
        axiosConfig.post("/auth/forgetPassword-Email",obj).then((rsp)=>{
            console.log(rsp.data);
            alert(rsp.data.msg);
            window.location.href = "/";

        },(err)=>{
            if(err.response.status===422){
                console.log(err.response.data);
                setErr(err.response.data);
                
            }
        });
    }

    return (
        
            <div className="content-wrapper">
                <div className="content-header row">
                </div>
                <div className="content-body">
                    <section className="row flexbox-container">
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <div className="col-lg-4 col-md-8 col-10 box-shadow-2 p-0">
                                <div className="card border-grey border-lighten-3 px-2 py-2 m-0">
                                    <div className="card-header border-0 pb-0">
                                        <div className="card-title text-center">
                                            <img class="w-25" src="/app-assets/images/logo/bscl-logo.png" alt="branding logo" />
                                        </div>
                                        <h6 className="card-subtitle line-on-side text-muted text-center font-small-3 pt-2"><span>We will send you a link
                                            to reset password.</span></h6>
                                    </div>
                                    <div className="card-content">
                                        <div className="card-body">
                                            <form class="form-horizontal form-simple" onSubmit={handleForm } noValidate>
                                                <span class="text-danger">{err.error}</span>
                                                <fieldset className="form-group position-relative has-icon-left">
                                                    <input type="email" name="email" id="email" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email Address" tabIndex={2} required data-validation-required-message="Please enter email address." />
                                                    <div className="form-control-position">
                                                        <i className="la la-envelope" />
                                                    </div>
                                                    <div className="help-block font-small-3" />
                                                </fieldset>
                                                <button type="submit" className="btn btn-outline-info btn-lg btn-block"><i className="ft-unlock" />Recover
                                                    Password</button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="card-footer border-0">
                                        <p className="float-sm-left text-center"><a href="/" className="card-link">Login</a></p>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        

    )
}
export default GetMail;