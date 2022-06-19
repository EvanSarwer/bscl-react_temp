
import { useState,useEffect } from "react";
import axiosConfig from '../axiosConfig';




const AppUserList = () => {

    const [appUsers,setAppUsers] = useState([]);
    const [query, setQuery] = useState("");
    useEffect(()=>{
        axiosConfig.get("/appuser/list").then((rsp)=>{
            setAppUsers(rsp.data);
        }, (err) => { });


    },[]);
    const activateDeactivate=(user_name,flag)=>{
        const obj = {user_name:user_name,flag:flag};
        axiosConfig.post("/appuser/activate",obj).then((rsp)=>{

            window.location.reload(false);
        }, (err) => { 
        });
    };
    const deleteUser = (user_name) => {

        const obj = {user_name:user_name};
        axiosConfig.post("/appuser/delete",obj).then((rsp)=>{
            window.location.reload(false);
        }, (err) => {
        });
    };

    const Search = (data) => {
        return data.filter(
            (item) =>
            item.user_name.toLowerCase().includes(query.toLowerCase())
        );
    };


    return (
        <div class="app-content content">
            <div class="content-overlay"></div>
            <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                <div class="content-header row">
                </div>
                <div class="content-body">
                


                    <div class="row justify-content-md-center">
                        <div class="col-xl-12  col-12">
                            <section id="horizontal-vertical">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="card">
                                      
                                            <div class="card-content collapse show">
                                                <div class="card-body card-dashboard">

                                                    <div class="row">
                                                        <div class="col-md-7"><div class="h3 font-weight-bold">User List</div></div>
                                                        <div class="col-md-5"><input type="text" class="search form-control round border-primary mb-1" placeholder="Search" onChange={e => setQuery(e.target.value)} />
                                                        </div>

                                                    </div>
                                                    <a class="btn btn-primary" href="/app/user/create">Create New</a>

                                                    <div class="table-responsive" style={{ maxHeight: '400px', minHeight: '500px' }}>
                                                        <table class="table display nowrap table-striped table-bordered scroll-horizontal-vertical">
                                                            <thead>
                                                                <tr>
                                                                    <th>Username</th>
                                                                    <th>Email</th>
                                                                    <th>Address</th>
                                                                    <th>Phone</th>
                                                                    <th>Status</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {Search(appUsers).map((user) =>
                                                                    <tr>
                                                                        <td>{user.user_name} <span class={`badge badge-${user.active ? "success" : "danger"}`} >{user.active ? 'Active' : 'Inactive'}</span></td>
                                                                        <td>{user.email}</td>
                                                                        <td>{user.address}</td>
                                                                        <td>{user.phone}</td>
                                                                        <td>
                                                                            <a class="btn btn-secondary" href={`/app/user/edit/${user.user_name}`}>Edit</a>
                                                                            <burtton class="offset-1 btn btn-danger" onClick={() => { if (window.confirm('Delete the item?')) { deleteUser(user.user_name) }; }} >Delete</burtton>
                                                                            <burtton class={`offset-1 btn btn-${user.active ? "danger" : "success"}`} onClick={() => { if (window.confirm('Change Status?')) { activateDeactivate(user.user_name, !user.active) }; }} >{user.active ? 'Deactivate' : 'Activate'}</burtton>
                                                                        </td>

                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </section >





                        </div>
                    </div>


                    <br />



                    <br />


                </div>
            </div>

        </div>
    )

}
export default AppUserList;