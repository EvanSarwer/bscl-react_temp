import { useState, useEffect } from "react";
import axios from "axios";
import axiosConfig from '../axiosConfig';
import UserListTable from "./UserListTable";

const DeviceForm = (props) => {
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
        if (props.mode == "Edit") {
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
        } else {

            navigator.geolocation.getCurrentPosition(function (position) {
                //console.log(position);
                //console.log("Latitude is :", position.coords.latitude);
                //console.log("Longitude is :", position.coords.longitude);
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);

            }, function (error) {
                console.error("Error Code = " + error.code + " - " + error.message);
            }

            );

        }



        navigator.permissions
            .query({ name: "geolocation" })
            .then(function (result) {
                if (result.state === "granted") {
                    console.log(result.state);
                    //If granted then you can directly call your function here
                } else if (result.state === "prompt") {
                    console.log(result.state);
                } else if (result.state === "denied") {
                    //If denied then you have to show instructions to enable location
                    console.log(result.state);
                    alert("Enable Location to Get Your Current Position");
                }
                result.onchange = function () {
                    console.log(result.state);
                };
            });


        if ("geolocation" in navigator) {
            console.log("Available");
        } else {
            console.log("Not Available");
        }





    }, []);



    const [err_msg, setErrMsg] = useState({});

    const refresh = () => {
        setErrMsg({});
        setDeviceName("");
        setType("");
        setAge("");
        setAddress("");
        setGender("");
        setEconomicStatus("");
        setSocioStatus("");
    }

    const handleForm = (e) => {
        e.preventDefault();
        if (props.mode == "Edit") {
            const obj = { id: deviceID, device_name: deviceName, lat: latitude, lng: longitude, address: address, type: type, economic_status: economicStatus, socio_status: socioStatus };
            axiosConfig.post("/device/edit", obj).then((rsp) => {

                alert(rsp.data.message);
                window.location.href = "/device";

            }, (err) => {
                if (err.response.status === 422) {
                    setErrMsg(err.response.data);

                }
            });
        }

        else {
            const obj = { device_name: deviceName, lat: latitude, lng: longitude, address: address, type: type, economic_status: economicStatus, socio_status: socioStatus };
            axiosConfig.post("/device/create", obj).then((rsp) => {
                alert(rsp.data.message);
                window.location.href = "/device";

            }, (err) => {
                if (err.response.status === 422) {
                    setErrMsg(err.response.data);

                }
            });
        }

    }


    const handleChange = event => {
        if (event.target.checked) {
            //console.log('✅ Checkbox is checked');
            navigator.geolocation.getCurrentPosition(function (position) {
                //console.log(position);
                //console.log("Latitude is :", position.coords.latitude);
                //console.log("Longitude is :", position.coords.longitude);
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);

            }, function (error) {
                console.error("Error Code = " + error.code + " - " + error.message);
            }
            );
        } else {
            //console.log('⛔️ Checkbox is NOT checked');
            setLatitude(getLatitude);
            setLongitude(getLongitude);

        }
        setIsSubscribed(current => !current);

    };



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
                                    <h6 className="card-subtitle line-on-side text-muted text-center font-medium-5 pt-2"><span>{props.mode} Device</span>
                                    </h6>
                                </div>
                                <div className="card-content" >
                                    <div className="card-body">
                                        <div class="row justify-content-center">

                                            {(() => {
                                                if (props.mode == "Edit") {

                                                    return numbers.map((index) =>
                                                        <><button key={index} class={(allTimeArray[index]) ? "btn btn-danger" : "btn btn-success"} onClick={() => { if (allTimeArray[index]) { alert("Already has User in this index") } else { window.location.href = "/device/user/create/" + deviceID + "/" + index; } }}>{index + 1}</button> &nbsp; &nbsp;</>
                                                    )
                                                }

                                            })()}



                                            {/* <button class="btn btn-danger">1</button> &nbsp; <button class="btn btn-danger">2</button> &nbsp; <button class="btn btn-danger">3</button> &nbsp; <button class="btn btn-danger">4</button> &nbsp; <button class="btn btn-danger">5</button> &nbsp; <button class="btn btn-danger">6</button> &nbsp; <button class="btn btn-danger">7</button> &nbsp;<button class="btn btn-danger">8</button> */}
                                        </div>
                                        <p></p>
                                        <form className="form-horizontal" onSubmit={handleForm} noValidate>

                                            <table class="table table-borderless">
                                                <tr>
                                                    <td class="form-label">Device Name</td>
                                                    <td><fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="device_id" id="device_id" value={deviceName} onChange={(e) => { setDeviceName(e.target.value) }} readOnly={props.mode == "Edit"} className="form-control" placeholder="Device name" tabIndex={1} required data-validation-required-message="Please enter device name." />
                                                        <div className="form-control-position">
                                                            <i className="la la-user" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.device_name ? err_msg.device_name[0] : ''}</span>
                                                    </fieldset></td>
                                                </tr>
                                                <tr>
                                                    <td class="form-label">Address <br /><br /><br /><br /><br /> {(() => {
                                                        if (props.mode == "Edit") {
                                                            return <div><input type="checkbox" id="location" onChange={handleChange} value={isSubscribed} name="location" />
                                                                <label class="form-label" for="vehicle1">&nbsp; Update Location</label></div>

                                                        }
                                                    })()}</td>
                                                    <td><fieldset className="form-group position-relative has-icon-left">
                                                        <textarea name="address" id="address" className="form-control" value={address} onChange={(e) => { setAddress(e.target.value) }} placeholder="Address" tabIndex={2} required data-validation-required-message="Please enter address." />
                                                        <div className="form-control-position">
                                                            <i className="ft-map-pin" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.address ? err_msg.address[0] : ''}</span>
                                                    </fieldset>
                                                        {(() => {
                                                            if (props.mode == "Edit") {
                                                                return <div><div class="row"><div class="col-sm-3 col-form-label">Lat:</div><div class="col-sm-9"><input type="text" name="lat" id="lat" value={latitude} onChange={(e) => { setLatitude(e.target.value) }} className="form-control" placeholder="Latitude" tabIndex={3} /></div></div>
                                                                    <div className="help-block font-small-3" />
                                                                    <span class="text-danger">{err_msg.lat ? err_msg.lat[0] : ''}</span>

                                                                    <div class="row"><div class="col-sm-3 col-form-label">Lng:</div><div class="col-sm-9"><input type="text" name="lng" id="lng" value={longitude} onChange={(e) => { setLongitude(e.target.value) }} className="form-control" placeholder="Longitude" tabIndex={4} /></div></div>
                                                                    <div className="help-block font-small-3" />
                                                                    <span class="text-danger">{err_msg.lng ? err_msg.lng[0] : ''}</span></div>

                                                            } else {
                                                                return <div><div class="row"><div class="col-sm-3 col-form-label">Lat:</div><div class="col-sm-9"><input type="text" name="lat" id="lat" value={latitude} onChange={(e) => { setLatitude(e.target.value) }} className="form-control" placeholder="Latitude" tabIndex={3} /></div></div>
                                                                    <div className="help-block font-small-3" />
                                                                    <span class="text-danger">{err_msg.lat ? err_msg.lat[0] : ''}</span>
                                                                    <div class="row"><div class="col-sm-3 col-form-label">Lng:</div><div class="col-sm-9"><input type="text" name="lng" id="lng" value={longitude} onChange={(e) => { setLongitude(e.target.value) }} className="form-control" placeholder="Longitude" tabIndex={4} /></div></div>
                                                                    <div className="help-block font-small-3" />
                                                                    <span class="text-danger">{err_msg.lng ? err_msg.lng[0] : ''}</span></div>
                                                            }
                                                        })()}


                                                </td>
                                            </tr>

                                            {/* <tr>
                                                    <td>Age</td>
                                                    <td><fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="age" id="age" className="form-control" value={age} onChange={(e) => { setAge(e.target.value) }} placeholder="Age" tabIndex={6} required data-validation-required-message="Please enter age." />
                                                        <div className="form-control-position">
                                                            <i className="ft-watch" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.age ? err_msg.age[0] : ''}</span>
                                                    </fieldset></td>
                                                </tr>

                                                <tr>
                                                    <td>Gender</td>
                                                    <td><fieldset className="form-group position-relative">
                                                        <input type="radio" name="gender" value="m" onChange={(e) => { setGender(e.target.value) }} checked={gender === "m"} />&nbsp;Male &nbsp;&nbsp;&nbsp;
                                                        <input type="radio" name="gender" value="f" onChange={(e) => { setGender(e.target.value) }} checked={gender === "f"} />&nbsp;Female
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.gender ? err_msg.gender[0] : ''}</span>
                                                    </fieldset></td>
                                                </tr> */}

                                            <tr>
                                                <td>Type</td>
                                                <td><fieldset className="form-group position-relative">
                                                    <input type="radio" name="type" value="STB" onChange={(e) => { setType(e.target.value) }} checked={type === "STB"} />&nbsp;STB &nbsp;&nbsp;&nbsp;
                                                    <input type="radio" name="type" value="OTT" onChange={(e) => { setType(e.target.value) }} checked={type === "OTT"} />&nbsp;OTT
                                                    <div className="help-block font-small-3" />
                                                    <span class="text-danger">{err_msg.type ? err_msg.type[0] : ''}</span>
                                                </fieldset></td>
                                            </tr>

                                            <tr>
                                                <td>Socio Status</td>
                                                <td><fieldset className="form-group position-relative">
                                                    <input type="radio" name="sociostatus" value="u" onChange={(e) => { setSocioStatus(e.target.value) }} checked={socioStatus === "u"} />Urban &nbsp;&nbsp;&nbsp;
                                                    <input type="radio" name="sociostatus" value="r" onChange={(e) => { setSocioStatus(e.target.value) }} checked={socioStatus === "r"} />Rural<br />
                                                    <div className="help-block font-small-3" />
                                                    <span class="text-danger">{err_msg.socio_status ? err_msg.socio_status[0] : ''}</span>
                                                </fieldset></td>
                                            </tr>
                                            <tr>
                                                <td>Economic Status</td>
                                                <td><fieldset className="form-group position-relative">
                                                    <select class="custom-select d-block w-100" value={economicStatus} onChange={(e) => { setEconomicStatus(e.target.value) }}>
                                                        <option value="">Select</option>
                                                        <option value="b1">Upper Class</option>
                                                        <option value="c1">Upper Middle Class</option>
                                                        <option value="e1">Middle Class</option>
                                                        <option value="d1">Lower Middle Class</option>
                                                        <option value="a1">Lower Class</option>

                                                    </select>
                                                    <div className="help-block font-small-3" />
                                                    <span class="text-danger">{err_msg.economic_status ? err_msg.economic_status[0] : ''}</span>
                                                </fieldset></td>
                                            </tr>

                                        </table>


                                        {/* <fieldset className="form-group position-relative has-icon-left">
                                                <input type="email" name="email" id="email" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email Address" tabIndex={2} required data-validation-required-message="Please enter email address." />
                                                <div className="form-control-position">
                                                    <i className="la la-envelope" />
                                                </div>
                                                <div className="help-block font-small-3" />
                                                <span class="text-danger">{err_msg.email ? err_msg.email[0] : ''}</span>
                                            </fieldset> */}

                                        {/* {props.mode == "Create" &&
                                                <div className="row">
                                                    <div className="col-12 col-sm-6 col-md-6">
                                                        <fieldset className="form-group position-relative has-icon-left">
                                                            <input type="password" name="password" id="password" className="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" tabIndex={3} required />
                                                            <div className="form-control-position">
                                                                <i className="la la-key" />
                                                            </div>
                                                            <div className="help-block font-small-3" />
                                                            <span class="text-danger">{err_msg.password ? err_msg.password[0] : ''}</span>
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-12 col-sm-6 col-md-6">
                                                        <fieldset className="form-group position-relative has-icon-left">
                                                            <input type="password" name="c_password" id="c_password" className="form-control" value={c_password} onChange={(e) => { setCPassword(e.target.value) }} placeholder="Confirm Password" tabIndex={4} data-validation-matches-match="password" data-validation-matches-message="Password & Confirm Password must be the same." />
                                                            <div className="form-control-position">
                                                                <i className="la la-key" />
                                                            </div>
                                                            <div className="help-block font-small-3" />
                                                            <span class="text-danger">{err_msg.c_password ? err_msg.c_password[0] : ''}</span>
                                                        </fieldset>
                                                    </div>
                                                </div>
                                            } */}

                                        {/* <div className="row">
                                                <div className="col-12 col-sm-6 col-md-6">
                                                    <fieldset className="form-group position-relative has-icon-left">
                                                        <textarea name="address" id="address" className="form-control" value={address} onChange={(e) => { setAddress(e.target.value) }} placeholder="Address" tabIndex={5} required data-validation-required-message="Please enter address." />
                                                        <div className="form-control-position">
                                                            <i className="ft-map-pin" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.address ? err_msg.address[0] : ''}</span>
                                                    </fieldset>
                                                </div>

                                                <div className="col-12 col-sm-6 col-md-6">
                                                    <fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="phone" id="phone" className="form-control" value={phone} onChange={(e) => { setPhone(e.target.value) }} placeholder="Phone" tabIndex={6} required data-validation-required-message="Please enter phone number." />
                                                        <div className="form-control-position">
                                                            <i className="ft-phone" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.phone ? err_msg.phone[0] : ''}</span>
                                                    </fieldset>
                                                </div>
                                            </div> */}

                                        <div class="pl-0">
                                            {(() => {
                                                if (props.mode == "Edit") {
                                                    return <button type="submit" className="btn btn-info btn-block"><i className="la la-user" />
                                                        Update Device User</button>
                                                } else {
                                                    return <button type="submit" className="btn btn-info btn-block"><i className="la la-user" />
                                                        Add Device User</button>
                                                }
                                            })()}

                                        </div>

                                    </form>
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
                            return <UserListTable deviceUsers={deviceUsers} />
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
        </div >


    )
}
export default DeviceForm;