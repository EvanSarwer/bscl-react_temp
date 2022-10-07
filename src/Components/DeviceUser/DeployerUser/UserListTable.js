
import { useState, useEffect } from "react";
import axiosConfig from '../../axiosConfig';




const UserListTable = (props) => {

    const [devices, setDevices] = useState([]);
    const [deselect, setDselect] = useState("");
    const [userId, setUserId] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [query, setQuery] = useState("");
    // useEffect(() => {
    //     axiosConfig.get("/device/list").then((rsp) => {
    //         setDevices(rsp.data);
    //         console.log(rsp.data);
    //     }, (err) => { });


    // }, []);




    const deleteUser = (id) => {

        const obj = { id: id };
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

    // const handleChange = (event, user_id) => {

    //     if (event.target.checked) {
    //         //console.log('✅ Checkbox is checked');
    //         const obj = { user_id: user_id, deselect: 'deselect' };
    //         axiosConfig.post("/deviceuser/deselect", obj).then((rsp) => {
    //             window.location.reload(false);
    //         }, (err) => {
    //         });


    //     } else {
    //         //console.log('⛔️ Checkbox is NOT checked');
    //         const obj = { user_id: user_id, deselect: '' };
    //         axiosConfig.post("/deviceuser/deselect", obj).then((rsp) => {
    //             window.location.reload(false);
    //         }, (err) => {
    //         });



    //     }
    //     setIsSubscribed(current => !current);

    //     console.log(event.target.checked);
    //     console.log(user_id);

    // };



    return (





        <div class="card">

            <div class="card-content collapse show">
                <div class="card-body card-dashboard">

                    <div class="row">
                        <div class="col-md-7"><div class="h3 font-weight-bold">Device User List</div></div>
                        <div class="col-md-5"><input type="text" class="search form-control round border-primary mb-1" placeholder="Search" onChange={e => setQuery(e.target.value)} />
                        </div>

                    </div>

                    <div class="table-responsive" style={{ maxHeight: '400px', minHeight: '500px' }}>
                        <table class="table display nowrap table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>User Index</th>
                                    <th>User name</th>
                                    <th>Gender</th>
                                    <th>Age</th>
                                    <th>Status</th>
                                    {/* <th>Operation</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {Search(props.deviceUsers).map((user) =>
                                    <tr key={user.user_index}>
                                        <td>{user.user_index + 1}</td>
                                        <td><a href={`/device/user/details/${user.id}`}>{user.user_name}</a></td>
                                        <td>{user.gender}</td>
                                        <td>{user.age}</td>
                                        <td style={{ whiteSpace: 'nowrap' }}>
                                            <a class="btn btn-secondary" href={`/device/user/edit/${user.id}/${props.from}`}>Edit</a>
                                            {(() => {
                                                if (props.from == "DeviceDetails") {
                                                    return null;
                                                }else{
                                                    return <button class="offset-1 btn btn-danger" onClick={() => { if (window.confirm('Delete the item?')) { deleteUser(user.id) }; }}>Delete</button>
                                                }
                                            })()}
                                        </td>


                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>



    )

}
export default UserListTable;