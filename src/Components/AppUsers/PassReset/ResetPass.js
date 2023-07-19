import { useState, useEffect } from "react";
import axios from "axios";
import axiosConfig from '../../axiosConfig';
import Header from "../../Header/Header";
import { useParams } from "react-router-dom";


const ResetPass=()=>{
    const { username } = useParams();
    const [newpassword,setnewPassword] = useState("");

    useEffect(() => {
        generateRandomString();
    }, []);

    const generateRandomString = () => {
        const length = 8;
        const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numberChars = '0123456789';
    
        const allChars = lowerCaseChars + upperCaseChars + numberChars;
        let password = '';
    
        // Ensure at least one character of each type
        password += getRandomChar(lowerCaseChars);
        password += getRandomChar(upperCaseChars);
        password += getRandomChar(numberChars);
    
        // Fill up the rest of the password with random characters
        for (let i = password.length; i < length; i++) {
          password += getRandomChar(allChars);
        }
    
        // Shuffle the characters in the password
        password = shuffleString(password);
    
        setnewPassword(password);
      };
    
    const getRandomChar = (characterSet) => {
        const randomIndex = Math.floor(Math.random() * characterSet.length);
        return characterSet[randomIndex];
      };
    
    const shuffleString = (str) => {
        const arr = str.split('');
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join('');
      };



    const [err_msg, setErrMsg] = useState("");


    const handleForm = (e) => {
        e.preventDefault();

        const obj = {username: username, newpassword:newpassword};
        axiosConfig.post("/appuser/resetpass",obj).then((rsp)=>{
            //console.log(rsp.data);
            // console.log(obj);
            // setmainErrMsg(rsp.data.msg);
            navigator.clipboard.writeText(newpassword)
            alert(`${rsp.data.msg} & new password copied to clipboard`);
            window.location.href = "/user-passreset";

        }, (err) => {
            if (err.response.status === 422) {
                console.log(err.response.data.err);
                console.log(err);
                setErrMsg(err.response.data.err);
                alert(err.response.data.err);

            }
        });
    }

    return (
    <div><Header title=""/>
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
                                    <h6 className="card-subtitle line-on-side text-muted text-center font-medium-5 pt-2"><span> Reset Password</span>
                                    
                                    </h6>
                                    <div className="card-title text-center">
                                    
                                    </div>
                                    
                                </div>
                                <div className="card-content" >
                                    <div className="card-body">
                                        <form className="form-horizontal" onSubmit={handleForm} noValidate>
                                            
                            
                                                <div className="row">
                                                    <div className="col-9 col-sm-9 col-md-9">
                                                        <fieldset className="form-group position-relative has-icon-left">
                                                            <input type="text" disabled name="password" id="password" className="form-control" value={newpassword} placeholder="New Password" tabIndex={3} required />
                                                            
                                                            <div className="form-control-position">
                                                                <i className="la la-key" />
                                                            </div>
                                                            <div className="help-block font-small-3" />
                                                            {/* <span class="text-danger">{err_msg.password ? err_msg.password[0] : ''}</span> */}
                                                        </fieldset>
                                                        </div>
                                                        <div className="col-3 col-sm-3 col-md-3 text-nowrap"> <i className="la la la-copy btn btn-outline-info btn-sm" onClick={()=> {navigator.clipboard.writeText(newpassword)}} />&nbsp;<i className="la la-refresh btn btn-info btn-sm" onClick={()=> generateRandomString()} /></div>
                                                    
                                                    </div>
                                                    
                                                
                                            

                                            

                                            <div class="pl-0">
                                                <button type="submit" className="btn btn-info btn-block" onClick={()=> {navigator.clipboard.writeText(newpassword)}}><i className="la la-user" />
                                                            Reset Password</button>
                                                    

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
        </div>


    )
}
export default ResetPass;