import { useState, useEffect } from "react";
import axiosConfig from '../axiosConfig';

const DeployerCheck = () => {
    const [value,setValue] = useState("");
    const [token,setToken] = useState("");
    const [err,setErr] = useState({});

    const handleForm=(e)=>{
        e.preventDefault();
      
        const obj = {code:value};
        axiosConfig.post("/auth/deployerCheck",obj).then((rsp)=>{
            console.log(rsp.data);
            setToken(rsp.data.token);
            console.log(rsp.data.token);
            window.location.href = `/deployer/form/${rsp.data.token}`;

        },(err)=>{
            if(err.response.status===401){
                console.log(err.response.data);
                alert("Unauthorized User");
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
                                        <h6 className="card-subtitle line-on-side text-muted text-center font-small-3 pt-2"><span>Deployer / Installer can do it.</span></h6>
                                    </div>
                                    <div className="card-content">
                                        <div className="card-body">
                                            <form class="form-horizontal form-simple" onSubmit={handleForm } noValidate>
                                                <span class="text-danger">{err.error}</span>
                                                <fieldset className="form-group position-relative has-icon-left">
                                                    <input type="value" name="value" id="value" className="form-control"  onChange={(e) => { setValue(e.target.value) }} placeholder="" tabIndex={1} required data-validation-required-message="Fill the box." />
                                                    <div className="form-control-position">
                                                        <i className="la ft-flag" />
                                                    </div>
                                                    <div className="help-block font-small-3" />
                                                </fieldset>
                                                <button type="submit" className="btn btn-outline-info btn-md btn-block"><i className="la ft-chevrons-right" />Go To Next</button>
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
export default DeployerCheck;