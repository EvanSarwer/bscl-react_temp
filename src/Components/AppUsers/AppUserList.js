
import { useState, useEffect } from "react";
import axiosConfig from '../axiosConfig';
import Header from "../Header/Header";
import MainMenu from "../MainMenu/MainMenu";




const AppUserList = () => {

    const [appUsers, setAppUsers] = useState([]);
    const [adminUsers, setAdminUsers] = useState([]);
    const [channelUsers, setChannelUsers] = useState([]);
    const [addAgencyUsers, setAddAgencyUsers] = useState([]);
    const [deployerUsers, setDeployerUsers] = useState([]);
    const [operatorUsers, setOperatorUsers] = useState([]);
    const [listName, setListName] = useState("channel");
    const [query, setQuery] = useState("");
    useEffect(() => {
        axiosConfig.get("/appuser/list").then((rsp) => {
            //setAppUsers(rsp.data);
            console.log(rsp.data)
            setAdminUsers(rsp.data.admin_users);
            setChannelUsers(rsp.data.channel_users);
            setAddAgencyUsers(rsp.data.addAgency_users);
            setDeployerUsers(rsp.data.deployer_users);
            setOperatorUsers(rsp.data.operator_users);
        }, (err) => { });


    }, []);
    const activateDeactivate = (user_name, flag) => {
        const obj = { user_name: user_name, flag: flag };
        axiosConfig.post("/appuser/activate", obj).then((rsp) => {

            window.location.reload(false);
        }, (err) => {
        });
    };
    const deleteUser = (user_name) => {

        const obj = { user_name: user_name };
        axiosConfig.post("/appuser/delete", obj).then((rsp) => {
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
        <div><Header title="App Users" />
            <MainMenu menu="appusers" />
            <div class="app-content content">
                <div class="content-overlay"></div>
                <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                    <div class="content-header row">
                    </div>
                    <div class="content-body">



                        <div class="row justify-content-md-center">
                            <div class="col-xl-12  col-12">
                                <section id="horizontal-vertical">
                                    {/* <div class="row">
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
                                                            <table class="table display nowrap table-striped table-bordered">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Username</th>
                                                                        <th>Email</th>
                                                                        <th>Address</th>
                                                                        <th>Phone</th>
                                                                        <th>Status</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {Search(appUsers).map((user) =>
                                                                        <tr>
                                                                            <td>{user.user_name} <span class={`badge badge-${user.active ? "success" : "danger"}`} >{user.active ? 'Active' : 'Inactive'}</span></td>
                                                                            <td>{user.email}</td>
                                                                            <td>{user.address}</td>
                                                                            <td>{user.phone}</td>
                                                                            <td style={{ whiteSpace: 'nowrap' }}>
                                                                                <a class="btn btn-secondary" href={`/app/user/edit/${user.user_name}`}>Edit</a>
                                                                                <button class="offset-1 btn btn-danger" onClick={() => { if (window.confirm('Delete the item?')) { deleteUser(user.user_name) }; }} >Delete</button>
                                                                                <button class={`offset-1 btn btn-${user.active ? "danger" : "success"}`} onClick={() => { if (window.confirm('Change Status?')) { activateDeactivate(user.user_name, !user.active) }; }} >{user.active ? 'Deactivate' : 'Activate'}</button>
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
                                    </div> */}

                                    <div class="card card-shadow">
                                        <div class="card-header card-header-transparent py-20">
                                            <ul class="nav nav-pills nav-pills-rounded chart-action float-left btn-group" role="group">
                                                <li class="nav-item"><a class="active nav-link" data-toggle="tab" href="#scoreLineToDay" onClick={() => {setListName("channel")}}>Channel</a></li>
                                                <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#scoreLineToWeek" onClick={() => {setListName("addAgency")}}>Add Agency</a></li>
                                                <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#scoreLineToWeek" onClick={() => {setListName("deployer")}}>Deployer</a></li>
                                                <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#scoreLineToWeek" onClick={() => {setListName("operator")}}>Operator</a></li>
                                                <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#scoreLineToMonth" onClick={() => {setListName("admin")}}>Admin</a></li>
                                            </ul>
                                            <a class="btn btn-primary float-right" href="/app/user/create">Create New</a>
                                        </div>
                                        <div class="widget-content tab-content bg-white p-20">
                                            {/* <div class="ct-chart tab-pane active scoreLineShadow" id="scoreLineToDay"></div> */}



                                            {listName == "channel" &&
                                                <div class="card-body">

                                                    <div class="row">
                                                        <div class="col-md-7"><div class="h3 font-weight-bold">Channel User List</div></div>
                                                        <div class="col-md-5"><input type="text" class="search form-control round border-primary mb-1" placeholder="Search" onChange={e => setQuery(e.target.value)} />
                                                        </div>

                                                    </div>


                                                    <div class="table-responsive" style={{ maxHeight: '400px', minHeight: '500px' }}>
                                                        <table class="table display nowrap table-striped table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>Username</th>
                                                                    <th>Email</th>
                                                                    <th>Address</th>
                                                                    <th>Phone</th>
                                                                    <th>Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {Search(channelUsers).map((user) =>
                                                                    <tr>
                                                                        <td>{user.user_name} <span class={`badge badge-${user.active ? "success" : "danger"}`} >{user.active ? 'Active' : 'Inactive'}</span></td>
                                                                        <td>{user.email}</td>
                                                                        <td>{user.address}</td>
                                                                        <td>{user.phone}</td>
                                                                        <td style={{ whiteSpace: 'nowrap' }}>
                                                                            <a class="btn btn-secondary" href={`/app/user/edit/${user.user_name}`}>Edit</a>
                                                                            <button class="offset-1 btn btn-danger" onClick={() => { if (window.confirm('Delete the item?')) { deleteUser(user.user_name) }; }} >Delete</button>
                                                                            <button class={`offset-1 btn btn-${user.active ? "danger" : "success"}`} onClick={() => { if (window.confirm('Change Status?')) { activateDeactivate(user.user_name, !user.active) }; }} >{user.active ? 'Deactivate' : 'Activate'}</button>
                                                                        </td>

                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>


                                                </div>
                                            }

                                            {/* <div class="ct-chart tab-pane scoreLineShadow" id="scoreLineToWeek"></div> */}
                                            {listName == "addAgency" &&
                                            <div class="card-body" >


                                                <div class="row">
                                                    <div class="col-md-7"><div class="h3 font-weight-bold">Add Agency User List</div></div>
                                                    <div class="col-md-5"><input type="text" class="search form-control round border-primary mb-1" placeholder="Search" onChange={e => setQuery(e.target.value)} />
                                                    </div>

                                                </div>


                                                <div class="table-responsive" style={{ maxHeight: '400px', minHeight: '500px' }}>
                                                    <table class="table display nowrap table-striped table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th>Username</th>
                                                                <th>Email</th>
                                                                <th>Address</th>
                                                                <th>Phone</th>
                                                                <th>Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Search(addAgencyUsers).map((user) =>
                                                                <tr>
                                                                    <td>{user.user_name} <span class={`badge badge-${user.active ? "success" : "danger"}`} >{user.active ? 'Active' : 'Inactive'}</span></td>
                                                                    <td>{user.email}</td>
                                                                    <td>{user.address}</td>
                                                                    <td>{user.phone}</td>
                                                                    <td style={{ whiteSpace: 'nowrap' }}>
                                                                        <a class="btn btn-secondary" href={`/app/user/edit/${user.user_name}`}>Edit</a>
                                                                        <button class="offset-1 btn btn-danger" onClick={() => { if (window.confirm('Delete the item?')) { deleteUser(user.user_name) }; }} >Delete</button>
                                                                        <button class={`offset-1 btn btn-${user.active ? "danger" : "success"}`} onClick={() => { if (window.confirm('Change Status?')) { activateDeactivate(user.user_name, !user.active) }; }} >{user.active ? 'Deactivate' : 'Activate'}</button>
                                                                    </td>

                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>


                                            </div>}


                                            {listName == "deployer" &&
                                                <div class="card-body">

                                                    <div class="row">
                                                        <div class="col-md-7"><div class="h3 font-weight-bold">Deployer User List</div></div>
                                                        <div class="col-md-5"><input type="text" class="search form-control round border-primary mb-1" placeholder="Search" onChange={e => setQuery(e.target.value)} />
                                                        </div>

                                                    </div>


                                                    <div class="table-responsive" style={{ maxHeight: '400px', minHeight: '500px' }}>
                                                        <table class="table display nowrap table-striped table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>Username</th>
                                                                    <th>Email</th>
                                                                    <th>Address</th>
                                                                    <th>Phone</th>
                                                                    <th>Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {Search(deployerUsers).map((user) =>
                                                                    <tr>
                                                                        <td>{user.user_name} <span class={`badge badge-${user.active ? "success" : "danger"}`} >{user.active ? 'Active' : 'Inactive'}</span></td>
                                                                        <td>{user.email}</td>
                                                                        <td>{user.state_name}</td>
                                                                        <td>{user.number}</td>
                                                                        <td style={{ whiteSpace: 'nowrap' }}>
                                                                            <a class="btn btn-secondary" href={`/app/user/edit/${user.user_name}`}>Edit</a>
                                                                            <button class="offset-1 btn btn-danger" onClick={() => { if (window.confirm('Delete the item?')) { deleteUser(user.user_name) }; }} >Delete</button>
                                                                            <button class={`offset-1 btn btn-${user.active ? "danger" : "success"}`} onClick={() => { if (window.confirm('Change Status?')) { activateDeactivate(user.user_name, !user.active) }; }} >{user.active ? 'Deactivate' : 'Activate'}</button>
                                                                        </td>

                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>


                                                </div>
                                            }


                                            {listName == "operator" &&
                                                <div class="card-body">


                                                    <div class="row">
                                                        <div class="col-md-7"><div class="h3 font-weight-bold">Operator User List</div></div>
                                                        <div class="col-md-5"><input type="text" class="search form-control round border-primary mb-1" placeholder="Search" onChange={e => setQuery(e.target.value)} />
                                                        </div>

                                                    </div>


                                                    <div class="table-responsive" style={{ maxHeight: '400px', minHeight: '500px' }}>
                                                        <table class="table display nowrap table-striped table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>Username</th>
                                                                    <th>Email</th>
                                                                    <th>Address</th>
                                                                    <th>Phone</th>
                                                                    <th>Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {Search(operatorUsers).map((user) =>
                                                                    <tr>
                                                                        <td>{user.user_name} <span class={`badge badge-${user.active ? "success" : "danger"}`} >{user.active ? 'Active' : 'Inactive'}</span></td>
                                                                        <td>{user.email}</td>
                                                                        <td>{user.address}</td>
                                                                        <td>{user.phone}</td>
                                                                        <td style={{ whiteSpace: 'nowrap' }}>
                                                                            <a class="btn btn-secondary" href={`/app/user/edit/${user.user_name}`}>Edit</a>
                                                                            <button class="offset-1 btn btn-danger" onClick={() => { if (window.confirm('Delete the item?')) { deleteUser(user.user_name) }; }} >Delete</button>
                                                                            <button class={`offset-1 btn btn-${user.active ? "danger" : "success"}`} onClick={() => { if (window.confirm('Change Status?')) { activateDeactivate(user.user_name, !user.active) }; }} >{user.active ? 'Deactivate' : 'Activate'}</button>
                                                                        </td>

                                                                    </tr>
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>


                                                </div>
                                            }



                                            {/* <div class="ct-chart tab-pane scoreLineShadow" id="scoreLineToMonth"></div> */}
                                            {listName == "admin" &&
                                            <div class="card-body">


                                                <div class="row">
                                                    <div class="col-md-7"><div class="h3 font-weight-bold">Admin User List</div></div>
                                                    <div class="col-md-5"><input type="text" class="search form-control round border-primary mb-1" placeholder="Search" onChange={e => setQuery(e.target.value)} />
                                                    </div>

                                                </div>


                                                <div class="table-responsive" style={{ maxHeight: '400px', minHeight: '500px' }}>
                                                    <table class="table display nowrap table-striped table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th>Username</th>
                                                                <th>Email</th>
                                                                <th>Address</th>
                                                                <th>Phone</th>
                                                                <th>Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Search(adminUsers).map((user) =>
                                                                <tr>
                                                                    <td>{user.user_name} <span class={`badge badge-${user.active ? "success" : "danger"}`} >{user.active ? 'Active' : 'Inactive'}</span></td>
                                                                    <td>{user.email}</td>
                                                                    <td>{user.address}</td>
                                                                    <td>{user.phone}</td>
                                                                    <td style={{ whiteSpace: 'nowrap' }}>
                                                                        <a class="btn btn-secondary" href={`/app/user/edit/${user.user_name}`}>Edit</a>
                                                                        <button class="offset-1 btn btn-danger" onClick={() => { if (window.confirm('Delete the item?')) { deleteUser(user.user_name) }; }} >Delete</button>
                                                                        <button class={`offset-1 btn btn-${user.active ? "danger" : "success"}`} onClick={() => { if (window.confirm('Change Status?')) { activateDeactivate(user.user_name, !user.active) }; }} >{user.active ? 'Deactivate' : 'Activate'}</button>
                                                                    </td>

                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>


                                            </div>}

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
        </div>
    )

}
export default AppUserList;