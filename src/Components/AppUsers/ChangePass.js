import { useState, useEffect } from "react";
import axios from "axios";
import axiosConfig from '../axiosConfig';

const ChangePass=()=>{
    const [user_name,setUsername] = useState("");
    const [currentpassword,setcurrentPassword] = useState("");
    const [newpassword,setnewPassword] = useState("");
    const [confirmpass,setConfirmPassword] = useState("");

    // useEffect(()=>{
    //     if(props.mode == "Edit"){
    //         axiosConfig.get("/appuser/get/"+props.id).then((rsp)=>{
    //             var obj = rsp.data;
    //             setUsername(obj.user_name);
    //             setEmail(obj.email);
    //             setAddress(obj.address);
    //             setPhone(obj.phone);
    //         }, (err) => {
    //             if (err.response.status === 422) {
    //                 setErrMsg(err.response.data);

    //             }
    //         });
    //     }


    // }, []);



    const [err_msg, setErrMsg] = useState("");
    const [mainerr_msg, setmainErrMsg] = useState("");

    // const refresh = () => {
    //     setErrMsg({});
    //     setUsername("");
    //     setEmail("");
    //     setAddress("");
    //     setPhone("");
    //     setPassword("");
    //     setCPassword("");
    // }

    const handleForm = (e) => {
        e.preventDefault();
        

            const obj = {user_name:(localStorage.getItem("username")),currentpassword:currentpassword,newpassword:newpassword,confirmpass:confirmpass};
            axiosConfig.post("/appuser/changepass",obj).then((rsp)=>{
                console.log(rsp.data);
                console.log(obj);
                setmainErrMsg(rsp.data.msg);
                
                alert(rsp.data.msg);
                window.location.href = "/";

            }, (err) => {
                if (err.response.status === 422) {
                    //console.log(err.response.data.err);
                    //setErrMsg(err.response.data);
                    setmainErrMsg(err.response.data.err);

                }
            });
        

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
                                    <h6 className="card-subtitle line-on-side text-muted text-center font-medium-5 pt-2"><span> Change Password</span>
                                    
                                    </h6>
                                    <div className="card-title text-center">
                                    <div class="h6">{mainerr_msg}</div>
                                    </div>
                                    
                                </div>
                                <div className="card-content" >
                                    <div className="card-body">
                                        <form className="form-horizontal" onSubmit={handleForm} noValidate>

                                            
                                            
                                        <div className="row">
                                                    <div className="col-12 col-sm-12 col-md-12">
                                                        <fieldset className="form-group position-relative has-icon-left">
                                                            <input type="password" name="password" id="password" className="form-control" onChange={(e) => { setcurrentPassword(e.target.value) }} placeholder="Current Password" tabIndex={3} required />
                                                            <div className="form-control-position">
                                                                <i className="la la-key" />
                                                            </div>
                                                            <div className="help-block font-small-3" />
                                                            <span class="text-danger">{err_msg.password ? err_msg.password[0] : ''}</span>
                                                        </fieldset>
                                                    </div>
                                                    </div>
                                                <div className="row">
                                                    <div className="col-12 col-sm-12 col-md-12">
                                                        <fieldset className="form-group position-relative has-icon-left">
                                                            <input type="password" name="password" id="password" className="form-control" onChange={(e) => { setnewPassword(e.target.value) }} placeholder="New Password" tabIndex={3} required />
                                                            <div className="form-control-position">
                                                                <i className="la la-key" />
                                                            </div>
                                                            <div className="help-block font-small-3" />
                                                            <span class="text-danger">{err_msg.password ? err_msg.password[0] : ''}</span>
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
                                                            <span class="text-danger">{err_msg.password ? err_msg.password[0] : ''}</span>
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
export default ChangePass;