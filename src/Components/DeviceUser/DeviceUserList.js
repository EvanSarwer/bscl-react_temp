
import { useState, useEffect } from "react";
import axiosConfig from '../axiosConfig';
import Header from "../Header/Header";
import MainMenu from "../MainMenu/MainMenu";




const DeviceUserList = () => {

    const [deviceUsers, setDeviceUsers] = useState([]);
    const [deselect, setDselect] = useState("");
    const [userId, setUserId] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [query, setQuery] = useState("");
    useEffect(() => {
        axiosConfig.get("/deviceuser/list").then((rsp) => {
            setDeviceUsers(rsp.data);
            console.log(rsp.data);
        }, (err) => { });


    }, []);

    const deleteUser = (user_name) => {

        const obj = { user_name: user_name };
        axiosConfig.post("/deviceuser/delete", obj).then((rsp) => {
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

    const handleChange = (event, user_id) => {

        if (event.target.checked) {
            //console.log('✅ Checkbox is checked');
            const obj = { user_id: user_id, deselect: 'deselect' };
            axiosConfig.post("/deviceuser/deselect", obj).then((rsp) => {
                window.location.reload(false);
            }, (err) => {
            });


        } else {
            //console.log('⛔️ Checkbox is NOT checked');
            const obj = { user_id: user_id, deselect: '' };
            axiosConfig.post("/deviceuser/deselect", obj).then((rsp) => {
                window.location.reload(false);
            }, (err) => {
            });



        }
        setIsSubscribed(current => !current);

        console.log(event.target.checked);
        console.log(user_id);

    };



    return (
        <div><Header title="Device Users" />
            <MainMenu menu="deviceusers" />
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
                                                        <a class="btn btn-primary" href="/device/user/create">Create New</a>

                                                        <div class="table-responsive" style={{ maxHeight: '400px', minHeight: '500px' }}>
                                                            <table class="table display nowrap table-striped table-bordered">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Username</th>
                                                                        <th>Address</th>
                                                                        <th>Type</th>
                                                                        <th>Gender</th>
                                                                        <th>Age</th>
                                                                        <th>Economic Status</th>
                                                                        <th>Socio Status</th>
                                                                        <th>Status</th>
                                                                        <th>Operation</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {Search(deviceUsers).map((user) =>
                                                                        <tr key={user.id}>
                                                                            <td><a href={`/device/details/${user.id}`}>{user.user_name}</a></td>
                                                                            <td>{user.address}</td>
                                                                            <td>{user.type}</td>
                                                                            <td>{user.gender}</td>
                                                                            <td>{user.age}</td>
                                                                            <td>{user.economic_status}</td>
                                                                            <td>{user.socio_status}</td>
                                                                            <td style={{ whiteSpace: 'nowrap' }}>
                                                                                <a class="btn btn-secondary" href={`/device/user/edit/${user.user_name}`}>Edit</a>
                                                                                <button class="offset-1 btn btn-danger" onClick={() => { if (window.confirm('Delete the item?')) { deleteUser(user.user_name) }; }} >Delete</button>
                                                                            </td>
                                                                            <td><div><input type="checkbox" id="deselect" onChange={ (event) =>{ if (window.confirm('Want to run This Deselection operation?')) {handleChange(event, user.id)}else {window.location.reload(false)} }} value={isSubscribed} checked={user.deselect === "deselect"} name="deselect" />
                                                                                <label class="form-label" >&nbsp; Deselect</label></div>
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
        </div>
    )

}
export default DeviceUserList;