
import { useState, useEffect } from "react";
import axiosConfig from '../axiosConfig';
import Header from "../Header/Header";
import MainMenu from "../MainMenu/MainMenu";




const DeviceList = () => {

    const [devices, setDevices] = useState([]);
    const [deselect, setDselect] = useState("");
    const [userId, setUserId] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [query, setQuery] = useState("");
    useEffect(() => {
        axiosConfig.get("/device/list").then((rsp) => {
            setDevices(rsp.data);
            console.log(rsp.data);
        }, (err) => { });


    }, []);

    const deleteDevice = (id) => {

        const obj = { id: id };
        axiosConfig.post("/device/delete", obj).then((rsp) => {
            window.location.reload(false);
        }, (err) => {
        });
    };

    const Search = (data) => {
        return data.filter(
            (item) =>
                item.device_name.toLowerCase().includes(query.toLowerCase())
        );
    };

    const handleChange = (event, device_id) => {

        if (event.target.checked) {
            //console.log('✅ Checkbox is checked');
            const obj = { device_id: device_id, deselect: 'deselect' };
            axiosConfig.post("/device/deselect", obj).then((rsp) => {
                window.location.reload(false);
            }, (err) => {
            });


        } else {
            //console.log('⛔️ Checkbox is NOT checked');
            const obj = { device_id: device_id, deselect: '' };
            axiosConfig.post("/device/deselect", obj).then((rsp) => {
                window.location.reload(false);
            }, (err) => {
            });



        }
        setIsSubscribed(current => !current);

        console.log(event.target.checked);

    };



    return (
        <div><Header title="Devices" />
            <MainMenu menu="device" />
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
                                                            <div class="col-md-7"><div class="h3 font-weight-bold">Device List</div></div>
                                                            <div class="col-md-5"><input type="text" class="search form-control round border-primary mb-1" placeholder="Search" onChange={e => setQuery(e.target.value)} />
                                                            </div>

                                                        </div>
                                                        <a class="btn btn-primary" href="/device/create">Create New</a>

                                                        <div class="table-responsive" style={{ maxHeight: '400px', minHeight: '500px' }}>
                                                            <table class="table display nowrap table-striped table-bordered">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Device name</th>
                                                                        <th>Address</th>
                                                                        <th>Type</th>
                                                                        <th>Economic Status</th>
                                                                        <th>Socio Status</th>
                                                                        <th>Status</th>
                                                                        <th>Operation</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {Search(devices).map((device) =>
                                                                        <tr key={device.id}>
                                                                            <td><a href="">{device.device_name}</a></td>
                                                                            <td>{device.address}</td>
                                                                            <td>{device.type}</td>
                                                                            {/* <td>{user.gender}</td>
                                                                            <td>{user.age}</td> */}
                                                                            <td>{device.economic_status}</td>
                                                                            <td>{device.socio_status}</td>
                                                                            <td style={{ whiteSpace: 'nowrap' }}>
                                                                                <a class="btn btn-secondary" href={`/device/edit/${device.id}`}>Edit</a>
                                                                                <button class="offset-1 btn btn-danger" onClick={() => { if (window.confirm('Delete the item?')) { deleteDevice(device.id) }; }} >Delete</button>
                                                                            </td>
                                                                            <td><div><input type="checkbox" id="deselect" onChange={ (event) =>{ if (window.confirm('Want to run This Deselection operation?')) {handleChange(event, device.id)}else {window.location.reload(false)} }} value={isSubscribed} checked={device.deselect === "deselect"} name="deselect" />
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
export default DeviceList;