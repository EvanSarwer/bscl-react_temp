import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import axiosConfig from '../../axiosConfig';
import UserListTable from "./UserListTable";
import Header from "../../Header/Header";
import MainMenuDeployer from "../../MainMenu/MainMenuDeployer";

const DeviceDetails = (props) => {
    const { id } = useParams();
    const [deviceID, setDeviceID] = useState("");
    const [deviceName, setDeviceName] = useState("");
    const [email, setEmail] = useState("");
    const [district, setDistrict] = useState("");
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
    const [contactPerson, setContactPerson] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");


    useEffect(() => {
        axiosConfig.get("/device/get/" + id).then((rsp) => {
            var obj = rsp.data.device;
            setDeviceUsers(rsp.data.deviceUser);
            console.log(rsp.data.deviceUser);

            setDeviceID(obj.id);
            setDeviceName(obj.device_name);
            setContactPerson(obj.contact_person);
            setContactEmail(obj.contact_email);
            setContactNumber(obj.contact_number)
            setDistrict(obj.district);
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
        <div><Header title="Device Details" />
            <MainMenuDeployer menu="device" />

            <div class="app-content content" style={{ backgroundColor: "azure" }}>
                <div class="content-overlay"></div>
                <div class="content-wrapper" >
                    <div class="content-header row">
                    </div>
                    <div class="content-body">

                        <div class="row">
                            <div class="col-2"></div>
                            <div class="col-7 box-shadow-2 p-0">


                                <div class="card border-grey border-lighten-3 m-0" >
                                    <div className="card-header border-0 pb-0">
                                        <div className="card-title text-center">
                                            <img style={{ width: '13%', height: '0%' }} src="/app-assets/images/logo/app-user.png" alt="user logo" />
                                        </div>
                                        <h6 className="card-subtitle line-on-side text-muted text-center font-medium-2 pt-2"><span>Add Household Profiles/Members & Device Info</span>
                                        </h6>
                                    </div>
                                    <div className="card-content" >
                                        <div className="card-body">
                                            <div class="row justify-content-center">

                                                {

                                                    numbers.map((index) =>
                                                        <><button key={index} class={(allTimeArray[index]) ? "btn btn-danger" : "btn btn-success"} onClick={() => { if (allTimeArray[index]) { alert("Already has User in this index") } else { window.location.href = "/device/user/create/" + deviceID + "/" + index + "/DeviceDetails"; } }}>{index + 1}</button> &nbsp; &nbsp;</>
                                                    )
                                                }

                                            </div>
                                            <p></p>

                                            <table class="table table-borderless">
                                                <tr>
                                                    <td class="form-label">Device ID</td>
                                                    <td><fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="device_id" id="device_id" value={deviceID} readOnly className="form-control" placeholder="Device ID" tabIndex={1} />
                                                        <div className="form-control-position">
                                                            <i className="la la-user" />
                                                        </div>
                                                    </fieldset></td>
                                                </tr>
                                                <tr>
                                                    <td class="form-label">Device Name</td>
                                                    <td><fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="device_name" id="device_name" value={deviceName} readOnly className="form-control" placeholder="Device name" tabIndex={2} />
                                                        <div className="form-control-position">
                                                            <i className="la la-user" />
                                                        </div>
                                                    </fieldset></td>
                                                </tr>
                                                <tr>
                                                    <td class="form-label">Contact Person</td>
                                                    <td><fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="contact_person" id="contact_person" value={contactPerson} readOnly className="form-control" placeholder="Contact Person" tabIndex={2} />
                                                        <div className="form-control-position">
                                                            <i className="la la-user" />
                                                        </div>
                                                    </fieldset></td>
                                                </tr>
                                                <tr>
                                                    <td class="form-label">Contact Email</td>
                                                    <td><fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="contact_email" id="contact_email" value={contactEmail} readOnly className="form-control" placeholder="Contact Email" tabIndex={2} />
                                                        <div className="form-control-position">
                                                            <i className="la la-user" />
                                                        </div>
                                                    </fieldset></td>
                                                </tr>
                                                <tr>
                                                    <td class="form-label">Contact Number</td>
                                                    <td><fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="contact_number" id="contact_number" value={contactNumber} readOnly className="form-control" placeholder="Contact Number" tabIndex={2} />
                                                        <div className="form-control-position">
                                                            <i className="la la-user" />
                                                        </div>
                                                    </fieldset></td>
                                                </tr>
                                                <tr>
                                                    <td class="form-label">District </td>
                                                    <td><fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="district" id="district" className="form-control" value={district} readOnly placeholder="District" tabIndex={3} />
                                                        <div className="form-control-position">
                                                            <i className="ft-map-pin" />
                                                        </div>

                                                    </fieldset>
                                                        <div><div class="row"><div class="col-sm-3 col-form-label">Lat:</div><div class="col-sm-9"><input type="text" name="lat" id="lat" value={latitude} readOnly className="form-control" placeholder="Latitude" tabIndex={4} /></div></div>
                                                            <div class="row"><div class="col-sm-3 col-form-label">Lng:</div><div class="col-sm-9"><input type="text" name="lng" id="lng" value={longitude} readOnly className="form-control" placeholder="Longitude" tabIndex={5} /></div></div></div>

                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>Type</td>
                                                    <td><fieldset className="form-group position-relative">
                                                        <input type="text" name="type" id="type" value={type} readOnly className="form-control" placeholder="Type" tabIndex={6} />
                                                    </fieldset></td>
                                                </tr>

                                                <tr>
                                                    <td>Socio Status</td>
                                                    <td><fieldset className="form-group position-relative">
                                                        <input type="text" name="sociostatus" id="sociostatus" value={(socioStatus == "u") ? "Urban" : (socioStatus == "r") ?"Rural": null} readOnly className="form-control" placeholder="Socio Status" tabIndex={7} />

                                                    </fieldset></td>
                                                </tr>
                                                <tr>
                                                    <td>Monthly Income</td>
                                                    <td><fieldset className="form-group position-relative">
                                                        <input type="text" name="economicStatus" id="economicStatus" value={(economicStatus == "a1") ? "Income below 10,000 Taka" : (economicStatus == "b1") ? "Income 10,000 to 39,999 Taka" : (economicStatus == "c1") ? "Income 40,000 to 69,999 Taka" : (economicStatus == "d1") ? "Income 70,000 to 99,999 Taka" : (economicStatus == "e1") ? "Income above 1,00,000 Taka": null} readOnly className="form-control" placeholder="Economic Status" tabIndex={8} />

                                                    </fieldset></td>
                                                </tr>

                                            </table>


                                            <div class="pl-0">
                                                <a className="btn btn-info btn-block" href="/"><i className="la la-user" />Add member/profile done or Go to Device List</a>


                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>


                        </div>
                        <br />
                        <br />

                        {(() => {
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

                        })()}

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
export default DeviceDetails;