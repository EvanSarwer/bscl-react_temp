import { useState, useEffect } from "react";
import axios from "axios";
import axiosConfig from '../axiosConfig';

const AppUserForm=(props)=>{
    const [user_name,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [address,setAddress] = useState("");
    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState("");
    const [c_password,setCPassword] = useState("");

    useEffect(()=>{
        if(props.mode == "Edit"){
            axiosConfig.get("/appuser/get/"+props.id).then((rsp)=>{
                debugger;
                var obj = rsp.data;
                setUsername(obj.user_name);
                setEmail(obj.email);
                setAddress(obj.address);
                setPhone(obj.phone);
            }, (err) => {
                if (err.response.status === 422) {
                    setErrMsg(err.response.data);

                }
            });
        }


    }, []);



    const [err_msg, setErrMsg] = useState({});

    const refresh = () => {
        setErrMsg({});
        setUsername("");
        setEmail("");
        setAddress("");
        setPhone("");
        setPassword("");
        setCPassword("");
    }

    const handleForm = (e) => {
        e.preventDefault();
        if(props.mode == "Edit"){
            const obj = {user_name:user_name,email:email,address:address,phone:phone};
            axiosConfig.post("/appuser/edit",obj).then((rsp)=>{
                

                alert(rsp.data.message);
                window.location.href = "/app/users";

            }, (err) => {
                if (err.response.status === 422) {
                    setErrMsg(err.response.data);

                }
            });
        }

        else{
            const obj = {user_name:user_name,email:email,address:address,phone:phone,password:password,c_password:c_password};
            axiosConfig.post("/appuser/create",obj).then((rsp)=>{
                alert(rsp.data.message);
                window.location.href = "/app/users";

            }, (err) => {
                if (err.response.status === 422) {
                    setErrMsg(err.response.data);

                }
            });
        }

    }
    return (

        <div class="app-content content" style={{ backgroundColor: "azure" }}>
            <div class="content-overlay"></div>
            <div class="content-wrapper" >
                <div class="content-header row">
                </div>
                <div class="content-body">

                    <div class="row">
                        <div class="col-3"></div>
                        <div class="col-6 box-shadow-2 p-0">


                            <div class="card border-grey border-lighten-3 m-0" >
                                <div className="card-header border-0 pb-0">
                                    <div className="card-title text-center">
                                    <img style={{width:'13%',height:'0%'}} src="/app-assets/images/logo/app-user.png" alt="user logo"/>
                                    </div>
                                    <h6 className="card-subtitle line-on-side text-muted text-center font-medium-5 pt-2"><span>{props.mode} Application User</span>
                                    </h6>
                                </div>
                                <div className="card-content" >
                                    <div className="card-body">
                                        <form className="form-horizontal" onSubmit={handleForm} noValidate>

                                            <fieldset className="form-group position-relative has-icon-left">
                                                <input type="text" name="user_name" id="user_name" value={user_name} onChange={(e) => { setUsername(e.target.value) }} readOnly={props.mode == "Edit"} className="form-control" placeholder="Username" tabIndex={1} required data-validation-required-message="Please enter username." />
                                                <div className="form-control-position">
                                                    <i className="la la-user" />
                                                </div>
                                                <div className="help-block font-small-3" />
                                                <span class="text-danger">{err_msg.user_name ? err_msg.user_name[0] : ''}</span>
                                            </fieldset>
                                            <fieldset className="form-group position-relative has-icon-left">
                                                <input type="email" name="email" id="email" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email Address" tabIndex={2} required data-validation-required-message="Please enter email address." />
                                                <div className="form-control-position">
                                                    <i className="la la-envelope" />
                                                </div>
                                                <div className="help-block font-small-3" />
                                                <span class="text-danger">{err_msg.email ? err_msg.email[0] : ''}</span>
                                            </fieldset>
                                            {props.mode == "Create" &&
                                                <div className="row">
                                                    <div className="col-12 col-sm-6 col-md-6">
                                                        <fieldset className="form-group position-relative has-icon-left">
                                                            <input type="password" name="password" id="password" className="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" tabIndex={3} required />
                                                            <div className="form-control-position">
                                                                <i className="la la-key" />
                                                            </div>
                                                            <div className="help-block font-small-3" />
                                                            <span class="text-danger">{err_msg.password ? err_msg.password[0] : ''}</span>
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-12 col-sm-6 col-md-6">
                                                        <fieldset className="form-group position-relative has-icon-left">
                                                            <input type="password" name="c_password" id="c_password" className="form-control" value={c_password} onChange={(e) => { setCPassword(e.target.value) }} placeholder="Confirm Password" tabIndex={4} data-validation-matches-match="password" data-validation-matches-message="Password & Confirm Password must be the same." />
                                                            <div className="form-control-position">
                                                                <i className="la la-key" />
                                                            </div>
                                                            <div className="help-block font-small-3" />
                                                            <span class="text-danger">{err_msg.c_password ? err_msg.c_password[0] : ''}</span>
                                                        </fieldset>
                                                    </div>
                                                </div>
                                            }

                                            <div className="row">
                                                <div className="col-12 col-sm-6 col-md-6">
                                                    <fieldset className="form-group position-relative has-icon-left">
                                                        <textarea name="address" id="address" className="form-control" value={address} onChange={(e) => { setAddress(e.target.value) }} placeholder="Address" tabIndex={5} required data-validation-required-message="Please enter address." />
                                                        <div className="form-control-position">
                                                            <i className="ft-map-pin" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.address ? err_msg.address[0] : ''}</span>
                                                    </fieldset>
                                                </div>
                                                
                                                <div className="col-12 col-sm-6 col-md-6">
                                                    <fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="phone" id="phone" className="form-control" value={phone} onChange={(e) => { setPhone(e.target.value) }} placeholder="Phone" tabIndex={6} required data-validation-required-message="Please enter phone number." />
                                                        <div className="form-control-position">
                                                            <i className="ft-phone" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.phone ? err_msg.phone[0] : ''}</span>
                                                    </fieldset>
                                                </div>
                                            </div>

                                            <div class="pl-0">
                                                {(() => {
                                                    if (props.mode == "Edit") {
                                                        return <button type="submit" className="btn btn-info btn-block"><i className="la la-user" />
                                                            Update User</button>
                                                    } else {
                                                        return <button type="submit" className="btn btn-info btn-block"><i className="la la-user" />
                                                            Add User</button>
                                                    }
                                                })()}

                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            </div>
        </div>


    )
}
export default AppUserForm;