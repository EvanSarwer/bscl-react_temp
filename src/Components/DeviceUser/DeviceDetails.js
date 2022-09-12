import { useState, useEffect } from "react";
import axios from "axios";
import axiosConfig from '../axiosConfig';
import UserListTable from "./UserListTable";

const DeviceDetails = (props) => {
    const [deviceID, setDeviceID] = useState("");
    const [deviceName, setDeviceName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [c_password, setCPassword] = useState("");
    const [gender, setGender] = useState("");
    const [type, setType] = useState("");
    const [age, setAge] = useState("");
    const [economicStatus, setEconomicStatus] = useState("");
    const [socioStatus, setSocioStatus] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [getLatitude, setGetLatitude] = useState("");
    const [getLongitude, setGetLongitude] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [deviceUsers, setDeviceUsers] = useState([]);


    useEffect(() => {
        axiosConfig.get("/device/get/" + props.id).then((rsp) => {
            var obj = rsp.data.device;
            setDeviceUsers(rsp.data.deviceUser);
            console.log(rsp.data.deviceUser);

            setDeviceID(obj.id);
            setDeviceName(obj.device_name);
            setAddress(obj.address);
            //setAge(obj.age);
            setType(obj.type);
            //setGender(obj.gender);
            setEconomicStatus(obj.economic_status);
            setSocioStatus(obj.socio_status);
            setGetLatitude(obj.lat);
            setGetLongitude(obj.lng);
            setLatitude(obj.lat);
            setLongitude(obj.lng);
        }, (err) => {
            if (err.response.status === 422) {
                setErrMsg(err.response.data);

            }
        });



    }, []);



    const [err_msg, setErrMsg] = useState({});


    const numbers = [0, 1, 2, 3, 4, 5, 6, 7];
    let allTimeArray = [];
    for (var i = 0; i < 8; i++) {
        allTimeArray[i] = deviceUsers.find(user => {
            return user.user_index === i;
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
                                        <img style={{ width: '13%', height: '0%' }} src="/app-assets/images/logo/app-user.png" alt="user logo" />
                                    </div>
                                    <h6 className="card-subtitle line-on-side text-muted text-center font-medium-5 pt-2"><span>Add Device User</span>
                                    </h6>
                                </div>
                                <div className="card-content" >
                                    <div className="card-body">
                                        <div class="row justify-content-center">

                                            {

                                                numbers.map((index) =>
                                                    <><button key={index} class={(allTimeArray[index]) ? "btn btn-danger" : "btn btn-success"} onClick={() => { if (allTimeArray[index]) { alert("Already has User in this index") } else { window.location.href = "/device/user/create/" + deviceID + "/" + index; } }}>{index + 1}</button> &nbsp; &nbsp;</>
                                                )
                                            }

                                        </div>
                                        <p></p>

                                        <table class="table table-borderless">
                                            <tr>
                                                <td class="form-label">Device Name</td>
                                                <td><fieldset className="form-group position-relative has-icon-left">
                                                    <input type="text" name="device_id" id="device_id" value={deviceName} readOnly className="form-control" placeholder="Device name" tabIndex={1} />
                                                    <div className="form-control-position">
                                                        <i className="la la-user" />
                                                    </div>
                                                </fieldset></td>
                                            </tr>
                                            <tr>
                                                <td class="form-label">Address </td>
                                                <td><fieldset className="form-group position-relative has-icon-left">
                                                    <textarea name="address" id="address" className="form-control" value={address} readOnly placeholder="Address" tabIndex={2} />
                                                    <div className="form-control-position">
                                                        <i className="ft-map-pin" />
                                                    </div>

                                                </fieldset>
                                                    <div><div class="row"><div class="col-sm-3 col-form-label">Lat:</div><div class="col-sm-9"><input type="text" name="lat" id="lat" value={latitude} readOnly className="form-control" placeholder="Latitude" tabIndex={3} /></div></div>
                                                        <div class="row"><div class="col-sm-3 col-form-label">Lng:</div><div class="col-sm-9"><input type="text" name="lng" id="lng" value={longitude} readOnly className="form-control" placeholder="Longitude" tabIndex={4} /></div></div></div>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td>Type</td>
                                                <td><fieldset className="form-group position-relative">
                                                    <input type="text" name="type" id="type" value={type} readOnly className="form-control" placeholder="Type" tabIndex={4} />
                                                </fieldset></td>
                                            </tr>

                                            <tr>
                                                <td>Socio Status</td>
                                                <td><fieldset className="form-group position-relative">
                                                    <input type="text" name="sociostatus" id="sociostatus" value={socioStatus} readOnly className="form-control" placeholder="Socio Status" tabIndex={4} />

                                                </fieldset></td>
                                            </tr>
                                            <tr>
                                                <td>Economic Status</td>
                                                <td><fieldset className="form-group position-relative">
                                                    <input type="text" name="economicStatus" id="economicStatus" value={economicStatus} readOnly className="form-control" placeholder="Economic Status" tabIndex={4} />

                                                </fieldset></td>
                                            </tr>

                                        </table>


                                        <div class="pl-0">
                                            <button type="submit" onClick={handleForm} className="btn btn-info btn-block"><i className="la la-user" />Add Device User</button>


                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>
                    <br />
                    <br />

                    {(() => {
                        if (props.mode == "Edit") {
                            if (deviceUsers.length > 0) {
                                return <UserListTable deviceUsers={deviceUsers} from="DeviceDetails" />
                            } else {
                                return <div class="card">

                                    <div class="card-content collapse show">
                                        <div class="card-body card-dashboard">

                                            <div class="row">
                                                <div class="col-md-7"><div class="h3 font-weight-bold">Device User List</div></div>

                                            </div>
                                            <h4>No User Added In This Device</h4>
                                        </div>
                                    </div>
                                </div>
                            }
                        }
                    })()}

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
export default DeviceDetails;