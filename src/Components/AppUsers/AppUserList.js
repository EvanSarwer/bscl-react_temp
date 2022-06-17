import { useState,useEffect } from "react";
import axiosConfig from '../axiosConfig';



const AppUserList=()=>{

    const [appUsers,setAppUsers] = useState([]);
    useEffect(()=>{
        axiosConfig.get("/appuser/list").then((rsp)=>{
            setAppUsers(rsp.data);
        },(err)=>{});

    },[]);
    const activateDeactivate=(user_name,flag)=>{
        const obj = {user_name:user_name,flag:flag};
        axiosConfig.post("/api/appuser/activate",obj).then((rsp)=>{
            window.location.reload(false);
        },(err)=>{
            debugger;
        });
    };
    const deleteUser = (user_name) => {
        const obj = {user_name:user_name};
        axiosConfig.post("/api/appuser/delete",obj).then((rsp)=>{
            window.location.reload(false);
        },(err)=>{
            debugger;
        });
      };
    return(
        <div class="app-content content">
            <a class="btn btn-primary" href="/app/user/create">Create New</a>
            <table class="table table-bordered">
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th></th>
                    
                </tr>
                <tbody>
                    {
                        appUsers.map((user)=>
                            <tr>
                                <td>{user.user_name} <span class={`badge badge-${user.active ? "success" : "danger"}`} >{user.active ? 'Active' : 'Inactive'}</span></td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <a class="btn btn-secondary" href={`/app/user/edit/${user.user_name}`}>Edit</a>
                                    <burtton class="offset-1 btn btn-danger" onClick={() => {if(window.confirm('Delete the item?')){deleteUser(user.user_name)};}} >Delete</burtton>
                                    <burtton class={`offset-1 btn btn-${user.active ? "danger" : "success"}`} onClick={() => {if(window.confirm('Change Status?')){activateDeactivate(user.user_name,!user.active)};}} >{user.active ? 'Deactivate' : 'Activate'}</burtton>
                                </td>
                        
                            </tr>
                        )
                    }
                </tbody>
                
            </table>
        </div>
    )

}
export default AppUserList;