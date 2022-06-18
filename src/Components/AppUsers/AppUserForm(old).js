import { useState,useEffect} from "react";
import axios from "axios";

const AppUserForm=(props)=>{
    const [user_name,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [address,setAddress] = useState("");
    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState("");
    const [c_password,setCPassword] = useState("");

    useEffect(()=>{
        if(props.mode == "edit"){
                axios.get("http://127.0.0.1:8000/api/appuser/get/"+props.id).then((rsp)=>{
                debugger;
                var obj = rsp.data;    
                setUsername(obj.user_name);
                setEmail(obj.email);
                setAddress(obj.address);
                setPhone(obj.phone);
            },(err)=>{
                if(err.response.status===422){
                    setErrMsg(err.response.data);
                    
                }
            });
        }


    },[]);
    


    const [err_msg,setErrMsg] = useState({});

    const refresh=()=>{
        setErrMsg({});
        setUsername("");
        setEmail("");
        setAddress("");
        setPhone("");
        setPassword("");
        setCPassword("");
    }

    const handleForm=(e)=>{
        e.preventDefault();
        if(props.mode == "edit"){
            const obj = {user_name:user_name,email:email,address:address,phone:phone};
            axios.post("http://127.0.0.1:8000/api/appuser/edit",obj).then((rsp)=>{
                
                alert(rsp.data.message);
                window.location.href="/app/users";
    
            },(err)=>{
                if(err.response.status===422){
                    setErrMsg(err.response.data);
                    
                }
            });
        }
        else{
            const obj = {user_name:user_name,email:email,address:address,phone:phone,password:password,c_password:c_password};
            axios.post("http://127.0.0.1:8000/api/appuser/create",obj).then((rsp)=>{
                
                alert(rsp.data.message);
                window.location.href="/app/users";
    
            },(err)=>{
                if(err.response.status===422){
                    setErrMsg(err.response.data);
                    
                }
            });
        }
      
    }
    return (
        <div class="app-content content">
            <h3>{props.mode} Application User</h3>
            <form onSubmit={handleForm}>
                <div class="form-row">
                    <div class="col">
                        <input type="text" class="form-control" value={user_name} onChange={(e)=>{setUsername(e.target.value)}} placeholder="Username" readOnly={props.mode=="edit"}></input>
                        <span class="text-danger">{err_msg.user_name ? err_msg.user_name[0] : ''}</span>
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email"></input>
                        <span class="text-danger">{err_msg.email ? err_msg.email[0] : ''}</span>
                    </div>
                </div>
                <br/>
                <div class="form-row">
                    <div class="col">
                        <textarea  class="form-control" value={address} onChange={(e)=>{setAddress(e.target.value)}} placeholder="Address"></textarea>
                        <span class="text-danger">{err_msg.address ? err_msg.address[0] : ''}</span>
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" value={phone} onChange={(e)=>{setPhone(e.target.value)}} placeholder="Phone"></input>
                        <span class="text-danger">{err_msg.phone ? err_msg.phone[0] : ''}</span>
                    </div>
                </div>
                <br/>
                { props.mode=="create" &&
                    <div class="form-row">
                        <div class="col">
                        <input type="password" class="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password"></input>
                        <span class="text-danger">{err_msg.password ? err_msg.password[0] : ''}</span>
                        </div>
                        <div class="col">
                            <input type="password" class="form-control" value={c_password} onChange={(e)=>{setCPassword(e.target.value)}} placeholder="Confirm Password"></input>
                            <span class="text-danger">{err_msg.c_password ? err_msg.c_password[0] : ''}</span>
                        </div>
                    </div>
                }
                <input type="submit" value="create" class="btn btn-success"></input>
            </form>
        </div>
    )
}
export default AppUserForm;