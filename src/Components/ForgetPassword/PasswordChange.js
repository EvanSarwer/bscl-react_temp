import { useState, useEffect } from "react";
import axiosConfig from '../axiosConfig';
import { useParams } from "react-router-dom";

const PasswordChange = () => {
    const { token } = useParams();
    const [email, setEmail] = useState("");
    const [mainerr_msg, setmainErrMsg] = useState("");
    const [newpassword, setnewPassword] = useState("");
    const [confirmpass, setConfirmPassword] = useState("");

    useEffect(() => {
        const data = { token: token };
        axiosConfig.post("/auth/forgetPass-Validation", data).then((rsp) => {
            var obj = rsp.data;
            setEmail(obj.email);
        }, (err) => {
            if (err.response.status === 422) {
                alert(err.response.data.err);
                window.location.href = "/";
            }
        });

    }, []);


    const handleForm = (e) => {
        e.preventDefault();


        const obj = { email: email, token: token, newpassword: newpassword, confirmpass: confirmpass };
        axiosConfig.post("/auth/newPassSubmit", obj).then((rsp) => {
            console.log(rsp.data);
            console.log(obj);
            if (rsp.data.err == null) {
                localStorage.setItem("_authToken",rsp.data.data.token);
                localStorage.setItem("_role",rsp.data.data.role);
                localStorage.setItem("username",rsp.data.data.username);
                alert(rsp.data.msg);
                window.location.href="/";
            }else {
                setmainErrMsg(rsp.data.err);
            }


        }, (err) => {
            if (err.response.status === 422) {
                alert(err.response.data.err);
                window.location.href = "/";

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
                                    <h6 className="card-subtitle line-on-side text-muted text-center font-small-3 pt-2"><span>Reset Password</span></h6>
                                </div>
                                <div className="card-content" >
                                    <div className="card-body">
                                        <form className="form-horizontal" onSubmit={handleForm} noValidate>

                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-12">
                                                    <span class="text-danger">{mainerr_msg}</span>
                                                    <fieldset className="form-group position-relative has-icon-left">
                                                        <input type="email" name="email" id="email" className="form-control" readOnly value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email Address" tabIndex={1} required data-validation-required-message="Please enter email address." />
                                                        <div className="form-control-position">
                                                            <i className="la la-envelope" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                    </fieldset>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-12">
                                                    <fieldset className="form-group position-relative has-icon-left">
                                                        <input type="password" name="password" id="password" className="form-control" onChange={(e) => { setnewPassword(e.target.value) }} placeholder="New Password" tabIndex={2} required />
                                                        <div className="form-control-position">
                                                            <i className="la la-key" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                    </fieldset>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-12 col-sm-12 col-md-12">
                                                    <fieldset className="form-group position-relative has-icon-left">
                                                        <input type="password" name="password" id="password" className="form-control" onChange={(e) => { setConfirmPassword(e.target.value) }} placeholder="Confirm Password" tabIndex={3} required />
                                                        <div className="form-control-position">
                                                            <i className="la la-key" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                    </fieldset>
                                                </div>
                                            </div>

                                            <div class="pl-0">
                                                <button type="submit" className="btn btn-info btn-block"><i className="la la-user" />
                                                    Change Password</button>


                                            </div>

                                        </form>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
export default PasswordChange;