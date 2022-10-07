import { useState, useEffect } from "react";
import axios from "axios";
import axiosConfig from '../../axiosConfig';
import UserListTable from "./UserListTable";
import Cookies from 'universal-cookie';

const DeviceForm = (props) => {
    const cookies = new Cookies();
    const [deviceID, setDeviceID] = useState("");
    const [deviceName, setDeviceName] = useState("");
    const [address, setAddress] = useState("");
    const [type, setType] = useState("");
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
    const [altContactNumber, setAltContactNumber] = useState("");
    const [mobileFinancialService, setMobileFinancialService] = useState("");
    const [mobileFinancialNumber, setMobileFinancialNumber] = useState("");
    const [otherFinancial, setOtherFinancial] = useState("");
    const [otherFinancialService, setOtherFinancialService] = useState("");
    const [otherFinancialNumber, setOtherFinancialNumber] = useState("");
    const [houseName, setHouseName] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [roadNumber, setRoadNumber] = useState("");
    const [stateName, setStateName] = useState("");
    const [wardNo, setWardNo] = useState("");
    const [zoneThana, setZoneThana] = useState("");
    const [cityCorporation, setCityCorporation] = useState("");
    const [cityName, setCityName] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [districtName, setDistrictName] = useState("");
    const [householdCondition, setHouseholdCondition] = useState("");
    const [serveyDate, setServeyDate] = useState("");
    const [installationDate, setInstallationDate] = useState("");
    const [description, setDescription] = useState("");
    const [tvType, setTvType] = useState("");
    const [tvBrand, setTvBrand] = useState("");
    const [tvPlacement, setTvPlacement] = useState("");
    const [gsmSignalStrength, setGsmSignalStrength] = useState("");
    const [wifi, setWifi] = useState("");
    const [wifiSignalStrength, setWifiSignalStrength] = useState("");
    const [stbProviderName, setStbProviderName] = useState("");
    const [stbSubscriptionType, setStbSubscriptionType] = useState("");
    const [stbSubscriptionCharge, setStbSubscriptionCharge] = useState("");






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
            const obj = {
                device_name: deviceName, lat: latitude, lng: longitude, economic_status: economicStatus, socio_status: socioStatus, installer_name: cookies.get('username'), contact_person: contactPerson, contact_email: contactEmail, contact_number: contactNumber, alt_number: altContactNumber, payment_type: mobileFinancialService, payment_number: mobileFinancialNumber, other_payment_type: otherFinancialService, other_payment_number: otherFinancialNumber,
                house_name: houseName, house_number: houseNumber, road_number: roadNumber, state_name: stateName, ward_no: wardNo, zone_thana: zoneThana, city_corporation: cityCorporation, city_Name: cityName, zip_code: zipCode, district: districtName, household_condition: householdCondition, description: description, tv_type: tvType, tv_brand: tvBrand, tv_placement: tvPlacement, gsm_signal_strength: gsmSignalStrength, wifi: wifi, wifi_signal_strength: wifiSignalStrength, 
                stb_provider_name: stbProviderName, stb_subscription_type: stbSubscriptionType, stb_subscription_charge: stbSubscriptionCharge
            };
            axiosConfig.post("/device/create", obj).then((rsp) => {
                alert(rsp.data.message);
                //window.location.href = "/device";
                window.location.href = `/device/details/${rsp.data.device_id}`;

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

    console.log(socioStatus);


    return (

        <div class="app-content content" style={{ backgroundColor: "azure" }}>
            <div class="content-wrapper" >
                <div class="content-body">

                    <div class="row">
                        <div class="col-2"></div>
                        <div class="col-9 box-shadow-2 p-0">


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
                                                        <><button key={index} class={(allTimeArray[index]) ? "btn btn-danger" : "btn btn-success"} onClick={() => { if (allTimeArray[index]) { alert("Already has User in this index") } else { window.location.href = "/device/user/create/" + deviceID + "/" + index + "/user"; } }}>{index + 1}</button> &nbsp; &nbsp;</>
                                                    )
                                                }

                                            })()}



                                            {/* <button class="btn btn-danger">1</button> &nbsp; <button class="btn btn-danger">2</button> &nbsp; <button class="btn btn-danger">3</button> &nbsp; <button class="btn btn-danger">4</button> &nbsp; <button class="btn btn-danger">5</button> &nbsp; <button class="btn btn-danger">6</button> &nbsp; <button class="btn btn-danger">7</button> &nbsp;<button class="btn btn-danger">8</button> */}
                                        </div>
                                        <p></p>
                                        <form className="form-horizontal" onSubmit={handleForm} noValidate>

                                            <table style={{ width: '100%' }} >
                                                <tr>
                                                    <td class="form-label">Device Name:</td>
                                                    <td style={{ width: '68%' }} colspan={3}><fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="device_id" id="device_id" value={deviceName} onChange={(e) => { setDeviceName(e.target.value) }} readOnly={props.mode == "Edit"} className="form-control" placeholder="Device name" tabIndex={1} required data-validation-required-message="Please enter device name." />
                                                        <div className="form-control-position">
                                                            <i className="la la-user" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.device_name ? err_msg.device_name[0] : ''}</span>
                                                    </fieldset></td>
                                                </tr>
                                                <tr>
                                                    <td class="form-label">Contact Person:</td>
                                                    <td colspan={3}><fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="contact_person" id="contact_person" value={contactPerson} onChange={(e) => { setContactPerson(e.target.value) }} className="form-control" placeholder="Contact Person" tabIndex={1} required data-validation-required-message="Please enter device contact person." />
                                                        <div className="form-control-position">
                                                            <i className="la la-user" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.contact_person ? err_msg.contact_person[0] : ''}</span>
                                                    </fieldset></td>
                                                </tr>
                                                <tr>
                                                    <td class="form-label">Contact Email:</td>
                                                    <td colspan={3}><fieldset className="form-group position-relative has-icon-left">
                                                        <input type="email" name="contact_Email" id="contact_Email" value={contactEmail} onChange={(e) => { setContactEmail(e.target.value) }} className="form-control" placeholder="Contact Email" tabIndex={1} required data-validation-required-message="Please enter device user contact email." />
                                                        <div className="form-control-position">
                                                            <i className="la la-user" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.contact_email ? err_msg.contact_email[0] : ''}</span>
                                                    </fieldset></td>
                                                </tr>
                                                <tr>
                                                    <td class="form-label">Contact Number:</td>
                                                    <td colspan={3}><fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="contact_Number" id="contact_Number" value={contactNumber} onChange={(e) => { setContactNumber(e.target.value) }} className="form-control" placeholder="Contact Number" tabIndex={1} required data-validation-required-message="Please enter device user contact number." />
                                                        <div className="form-control-position">
                                                            <i className="la la-user" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.contact_number ? err_msg.contact_number[0] : ''}</span>
                                                    </fieldset></td>
                                                </tr>
                                                <tr>
                                                    <td class="form-label">Alternative Contact Number:</td>
                                                    <td colspan={3}><fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="alt_Number" id="alt_Number" value={altContactNumber} onChange={(e) => { setAltContactNumber(e.target.value) }} className="form-control" placeholder="Alternative Contact Number" tabIndex={1}  />
                                                        <div className="form-control-position">
                                                            <i className="la la-user" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.alt_number ? err_msg.alt_number[0] : ''}</span>
                                                    </fieldset></td>
                                                </tr>
                                                <tr>
                                                    <td colspan={4}>
                                                        <h6 className="card-subtitle line-on-side text-muted text-center font-medium-5 "></h6>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Mobile Financial Service:</td>
                                                    <td colspan={3}><fieldset className="form-group position-relative">
                                                        <input type="radio" name="payment_type" value="Bkash" onChange={(e) => { setMobileFinancialService(e.target.value) }} checked={mobileFinancialService === "Bkash"} />&nbsp;Bkash &nbsp;&nbsp;&nbsp;
                                                        <input type="radio" name="payment_type" value="Nagad" onChange={(e) => { setMobileFinancialService(e.target.value) }} checked={mobileFinancialService === "Nagad"} />&nbsp;Nagad &nbsp;&nbsp;&nbsp;
                                                        <input type="radio" name="payment_type" value="Ucash" onChange={(e) => { setMobileFinancialService(e.target.value) }} checked={mobileFinancialService === "Ucash"} />&nbsp;Ucash &nbsp;&nbsp;&nbsp;
                                                        <input type="radio" name="payment_type" value="SureCash" onChange={(e) => { setMobileFinancialService(e.target.value) }} checked={mobileFinancialService === "SureCash"} />&nbsp;SureCash
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.payment_type ? err_msg.payment_type[0] : ''}</span>
                                                    </fieldset>
                                                        <div><div class="row"><div style={{ whiteSpace: 'nowrap' }} class="col-sm-3 col-form-label">Mobile Number:</div><div class="col-sm-9"><input style={{ width: '68%' }} type="text" name="payment_number" id="payment_number" value={mobileFinancialNumber} onChange={(e) => { setMobileFinancialNumber(e.target.value) }} className="form-control" placeholder="Number" tabIndex={3} /></div></div>
                                                            <div className="help-block font-small-3" />
                                                            <span class="text-danger">{err_msg.payment_number ? err_msg.payment_number[0] : ''}</span><br />


                                                            <div style={{ whiteSpace: 'nowrap' }} class="row">&nbsp; &nbsp;&nbsp;<input type="radio" name="other_financial" value="other_financial" onChange={(e) => { setOtherFinancial(e.target.value) }} /><div class="col-sm-2 col-form-label">Others</div> &nbsp;&nbsp;
                                                                <div class="col-sm-9"><input style={{ width: '68%' }} type="text" name="Other_payment_type" id="Other_payment_type" value={otherFinancialService} onChange={(e) => { setOtherFinancialService(e.target.value) }} className="form-control" placeholder="" tabIndex={4} /></div></div>
                                                            <div className="help-block font-small-3" />
                                                            <span class="text-danger">{err_msg.Other_payment_type ? err_msg.Other_payment_type[0] : ''}</span> <br />


                                                            <div class="row"><div style={{ whiteSpace: 'nowrap' }} class="col-sm-3 col-form-label">Mobile Number:</div><div class="col-sm-9"><input style={{ width: '68%' }} type="text" name="Other_payment_number" id="Other_payment_number" value={otherFinancialNumber} onChange={(e) => { setOtherFinancialNumber(e.target.value) }} className="form-control" placeholder="Number" tabIndex={3} /></div></div>
                                                            <div className="help-block font-small-3" />
                                                            <span class="text-danger">{err_msg.Other_payment_number ? err_msg.Other_payment_number[0] : ''}</span>

                                                        </div>


                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td colspan={4}>
                                                        <h6 className="card-subtitle line-on-side text-muted text-center font-medium-1"><span>Urban / Rural Panel</span> </h6>
                                                    </td>
                                                </tr>


                                                <tr>
                                                    <td>Urban or Rural</td>
                                                    <td colspan={3}><fieldset className="form-group position-relative">
                                                        <input type="radio" name="sociostatus" value="u" onChange={(e) => { setSocioStatus(e.target.value) }} checked={socioStatus === "u"} />Urban &nbsp;&nbsp;&nbsp;
                                                        <input type="radio" name="sociostatus" value="r" onChange={(e) => { setSocioStatus(e.target.value) }} checked={socioStatus === "r"} />Rural<br />
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.socio_status ? err_msg.socio_status[0] : ''}</span>
                                                    </fieldset></td>
                                                </tr>

                                                <tr>
                                                    <td colspan={4}>
                                                        <h6 className="card-subtitle line-on-side text-muted text-center font-medium-1"></h6>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <th ><h5 class="font-weight-bold">Household Address:</h5></th>
                                                    <td colspan={3}></td>

                                                </tr>


                                                <tr>
                                                    <td><h5>House Name:</h5></td>
                                                    <td colspan={3}>
                                                        <fieldset className="form-group position-relative has-icon-left">
                                                            <input type="text" name="house_name" id="house_name" className="form-control" value={houseName} onChange={(e) => { setHouseName(e.target.value) }} placeholder="House Name" tabIndex={14} required data-validation-required-message="Please enter house name." />
                                                            <div className="form-control-position">
                                                                <i className="la icon-home" />
                                                            </div>
                                                            <div className="help-block font-small-3" />
                                                            <span class="text-danger">{err_msg.house_name ? err_msg.house_name[0] : ''}</span>
                                                        </fieldset>
                                                    </td>
                                                </tr>



                                                <tr>
                                                    <td><h5>House Number:</h5></td>
                                                    <td>
                                                        <fieldset className="form-group position-relative has-icon-left">
                                                            <input type="text" name="house_number" id="house_number" className="form-control" value={houseNumber} onChange={(e) => { setHouseNumber(e.target.value) }} placeholder="House Number" tabIndex={15} required data-validation-required-message="Please enter house number." />
                                                            <div className="form-control-position">
                                                                <i className="la la-map-signs" />
                                                            </div>
                                                            <div className="help-block font-small-3" />
                                                            <span class="text-danger">{err_msg.house_number ? err_msg.house_number[0] : ''}</span>
                                                        </fieldset>

                                                    </td>
                                                    <td><h5>Road Number:</h5></td>
                                                    <td>
                                                        <fieldset className="form-group position-relative has-icon-left">
                                                            <input type="text" name="road_number" id="road_number" className="form-control" value={roadNumber} onChange={(e) => { setRoadNumber(e.target.value) }} placeholder="Road Number" tabIndex={16} required data-validation-required-message="Please enter road number." />
                                                            <div className="form-control-position">
                                                                <i className="la la-road" />
                                                            </div>
                                                            <div className="help-block font-small-3" />
                                                            <span class="text-danger">{err_msg.road_number ? err_msg.road_number[0] : ''}</span>
                                                        </fieldset>

                                                    </td>

                                                </tr>





                                                <tr>
                                                    <td><h6>Area Name/ Village Name/ State Name:</h6></td>
                                                    <td colspan={3}>
                                                        <fieldset className="form-group position-relative has-icon-left">
                                                            <input type="text" name="state_name" id="state_name" className="form-control" value={stateName} onChange={(e) => { setStateName(e.target.value) }} placeholder="State Name" tabIndex={17} required data-validation-required-message="Please enter state name." />
                                                            <div className="form-control-position">
                                                                <i className="la la-flag-o" />
                                                            </div>
                                                            <div className="help-block font-small-3" />
                                                            <span class="text-danger">{err_msg.state_name ? err_msg.state_name[0] : ''}</span>
                                                        </fieldset>
                                                    </td>
                                                </tr>


                                                <tr>
                                                    <td><h5>Ward no:</h5></td>
                                                    <td>
                                                        <fieldset className="form-group position-relative has-icon-left">
                                                            <input type="text" name="ward_no" id="ward_no" className="form-control" value={wardNo} onChange={(e) => { setWardNo(e.target.value) }} placeholder="Ward no" tabIndex={15} required data-validation-required-message="Please enter ward no." />
                                                            <div className="form-control-position">
                                                                <i className="la la-map-signs" />
                                                            </div>
                                                            <div className="help-block font-small-3" />
                                                            <span class="text-danger">{err_msg.ward_no ? err_msg.ward_no[0] : ''}</span>
                                                        </fieldset>

                                                    </td>

                                                    {(() => {
                                                        if (socioStatus == "r") {
                                                            return <><td><h5>Thana:</h5></td>
                                                                <td>
                                                                    <fieldset className="form-group position-relative has-icon-left">
                                                                        <input type="text" name="zone_thana" id="zone_thana" className="form-control" value={zoneThana} onChange={(e) => { setZoneThana(e.target.value) }} placeholder="Thana" tabIndex={16} required data-validation-required-message="Please enter Thana." />
                                                                        <div className="form-control-position">
                                                                            <i className="la la-road" />
                                                                        </div>
                                                                        <div className="help-block font-small-3" />
                                                                        <span class="text-danger">{err_msg.zone_thana ? err_msg.zone_thana[0] : ''}</span>
                                                                    </fieldset>

                                                                </td> </>
                                                        } else {
                                                            return <><td><h5>Zone no:</h5></td>
                                                                <td>
                                                                    <fieldset className="form-group position-relative has-icon-left">
                                                                        <input type="text" name="zone_thana" id="zone_thana" className="form-control" value={zoneThana} onChange={(e) => { setZoneThana(e.target.value) }} placeholder="Zone no" tabIndex={16} required data-validation-required-message="Please enter zone no." />
                                                                        <div className="form-control-position">
                                                                            <i className="la la-road" />
                                                                        </div>
                                                                        <div className="help-block font-small-3" />
                                                                        <span class="text-danger">{err_msg.zone_thana ? err_msg.zone_thana[0] : ''}</span>
                                                                    </fieldset>

                                                                </td></>
                                                        }
                                                    })()}

                                                </tr>

                                                {(() => {
                                                    if (socioStatus == "u") {
                                                        return <><tr>
                                                            <td><h5>city Corporation:</h5></td>
                                                            <td colspan={3}>
                                                                <fieldset className="form-group position-relative has-icon-left">
                                                                    <input type="text" name="city_corporation" id="city_corporation" className="form-control" value={cityCorporation} onChange={(e) => { setCityCorporation(e.target.value) }} placeholder="City Corporation" tabIndex={14} required data-validation-required-message="Please enter city corporation." />
                                                                    <div className="form-control-position">
                                                                        <i className="la icon-home" />
                                                                    </div>
                                                                    <div className="help-block font-small-3" />
                                                                    <span class="text-danger">{err_msg.city_corporation ? err_msg.city_corporation[0] : ''}</span>
                                                                </fieldset>
                                                            </td>
                                                        </tr>
                                                            <tr>
                                                                <td><h5>City Name:</h5></td>
                                                                <td colspan={3}>
                                                                    <fieldset className="form-group position-relative has-icon-left">
                                                                        <input type="text" name="city_Name" id="city_Name" className="form-control" value={cityName} onChange={(e) => { setCityName(e.target.value) }} placeholder="City Name" tabIndex={14} required data-validation-required-message="Please enter city name." />
                                                                        <div className="form-control-position">
                                                                            <i className="la icon-home" />
                                                                        </div>
                                                                        <div className="help-block font-small-3" />
                                                                        <span class="text-danger">{err_msg.city_Name ? err_msg.city_Name[0] : ''}</span>
                                                                    </fieldset>
                                                                </td>
                                                            </tr>

                                                        </>
                                                    }
                                                })()}


                                                <tr>
                                                    <td><h5>Postal/Zip Code:</h5></td>
                                                    <td colspan={3}>
                                                        <fieldset className="form-group position-relative has-icon-left">
                                                            <input type="text" name="zip_code" id="zip_code" className="form-control" value={zipCode} onChange={(e) => { setZipCode(e.target.value) }} placeholder="Postal/Zip Code" tabIndex={14} required data-validation-required-message="Please enter postal/zip code." />
                                                            <div className="form-control-position">
                                                                <i className="la icon-home" />
                                                            </div>
                                                            <div className="help-block font-small-3" />
                                                            <span class="text-danger">{err_msg.zip_code ? err_msg.zip_code[0] : ''}</span>
                                                        </fieldset>
                                                    </td>
                                                </tr>







                                                <tr>
                                                    <td class="form-label">District <br /><br /><br /><br /><br /> {(() => {
                                                        if (props.mode !== "aEdit") {
                                                            return <div><input type="checkbox" id="location" onChange={handleChange} value={isSubscribed} name="location" />
                                                                <label class="form-label" for="vehicle1">&nbsp; Update Location</label></div>

                                                        }
                                                    })()}</td>
                                                    <td colspan={3}><fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="district" id="district" className="form-control" value={districtName} onChange={(e) => { setDistrictName(e.target.value) }} placeholder="District" tabIndex={2} required data-validation-required-message="Please enter District." />
                                                        <div className="form-control-position">
                                                            <i className="ft-map-pin" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.district ? err_msg.district[0] : ''}</span>
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
                                                    <td colspan={4}>
                                                        <h6 className="card-subtitle line-on-side text-muted text-center font-medium-1"><span>Household Condition</span> </h6>
                                                    </td>
                                                </tr>


                                                {(() => {
                                                    if (socioStatus == "u") {
                                                        return <tr>
                                                            <td>Urban Panel:</td>
                                                            <td colspan={3}><fieldset className="form-group position-relative">
                                                                <input type="radio" name="household_condition" value="Flat in apartment" onChange={(e) => { setHouseholdCondition(e.target.value) }} checked={householdCondition === "Flat in apartment"} />&nbsp;Flat in apartment <br />
                                                                <input type="radio" name="household_condition" value="Non-Flat apartment where there is no security guard and parking / Rented flat" onChange={(e) => { setHouseholdCondition(e.target.value) }} checked={householdCondition === "Non-Flat apartment where there is no security guard and parking / Rented flat"} />&nbsp;Non-Flat apartment where there is no security guard and parking / Rented flat <br />
                                                                <input type="radio" name="household_condition" value="Slum" onChange={(e) => { setHouseholdCondition(e.target.value) }} checked={householdCondition === "Slum"} />&nbsp;Slum
                                                                <div className="help-block font-small-3" />
                                                                <span class="text-danger">{err_msg.household_condition ? err_msg.household_condition[0] : ''}</span>
                                                            </fieldset>
                                                            </td>
                                                        </tr>


                                                    } else if (socioStatus == "r") {
                                                        return <tr>
                                                            <td>Rural Panel:</td>
                                                            <td colspan={3}><fieldset className="form-group position-relative">
                                                                <input type="radio" name="household_condition" value="Full Concrete house (wall, floor and roof)" onChange={(e) => { setHouseholdCondition(e.target.value) }} checked={householdCondition === "Full Concrete house (wall, floor and roof)"} />&nbsp;Full Concrete house (wall, floor and roof) <br />
                                                                <input type="radio" name="household_condition" value="Semi Concrete house (wall and floor concrete but the roof is made by Tin)" onChange={(e) => { setHouseholdCondition(e.target.value) }} checked={householdCondition === "Semi Concrete house (wall and floor concrete but the roof is made by Tin)"} />&nbsp;Semi Concrete house (wall and floor concrete but the roof is made by Tin) <br />
                                                                <input type="radio" name="household_condition" value="Non-Concrete (Made by Tin/Wood/Bamboo etc.)" onChange={(e) => { setHouseholdCondition(e.target.value) }} checked={householdCondition === "Non-Concrete (Made by Tin/Wood/Bamboo etc.)"} />&nbsp;Non-Concrete (Made by Tin/Wood/Bamboo etc.)
                                                                <div className="help-block font-small-3" />
                                                                <span class="text-danger">{err_msg.household_condition ? err_msg.household_condition[0] : ''}</span>
                                                            </fieldset>
                                                            </td>
                                                        </tr>

                                                    }
                                                })()}







                                                <tr>
                                                    <td>Monthly Income</td>
                                                    <td colspan={3}><fieldset className="form-group position-relative">
                                                        <select class="custom-select d-block w-100" value={economicStatus} onChange={(e) => { setEconomicStatus(e.target.value) }}>
                                                            <option value="">Select</option>
                                                            <option value="e1">Income above 1,00,000 Taka</option>
                                                            <option value="d1">Income 70,000 to 99,999 Taka</option>
                                                            <option value="c1">Income 40,000 to 69,999 Taka</option>
                                                            <option value="b1">Income 10,000 to 39,999 Taka</option>
                                                            <option value="a1">Income below 10,000 Taka</option>

                                                        </select>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.economic_status ? err_msg.economic_status[0] : ''}</span>
                                                    </fieldset></td>
                                                </tr>

                                                <tr>
                                                    <td colspan={4}>
                                                        <h6 className="card-subtitle line-on-side text-muted text-center font-medium-5 "></h6>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><h5>Description:</h5></td>
                                                    <td colspan={3}>
                                                        <fieldset className="form-group position-relative has-icon-left">
                                                            <input type="text" name="description" id="description" className="form-control" value={description} onChange={(e) => { setDescription(e.target.value) }} placeholder="Description / Others" tabIndex={14} />
                                                            <div className="form-control-position">
                                                                <i className="la icon-home" />
                                                            </div>
                                                            <div className="help-block font-small-3" />
                                                            <span class="text-danger">{err_msg.description ? err_msg.description[0] : ''}</span>
                                                        </fieldset>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td colspan={4}>
                                                        <h6 className="card-subtitle line-on-side text-muted text-center font-medium-5 "></h6>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <th ><h6 class="font-weight-bold">Surrounding Condition for Installation</h6></th>
                                                    <td colspan={3}></td>

                                                </tr>
                                                <tr>
                                                    <td>TV Type:</td>
                                                    <td colspan={3}><fieldset className="form-group position-relative">
                                                        <input type="radio" name="tv_type" value="CRT" onChange={(e) => { setTvType(e.target.value) }} checked={tvType === "CRT"} />&nbsp;CRT &nbsp;&nbsp;&nbsp;
                                                        <input type="radio" name="tv_type" value="LED" onChange={(e) => { setTvType(e.target.value) }} checked={tvType === "LED"} />&nbsp;LED &nbsp;&nbsp;&nbsp;
                                                        <input type="radio" name="tv_type" value="LCD" onChange={(e) => { setTvType(e.target.value) }} checked={tvType === "LCD"} />&nbsp;LCD <br />
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.tv_type ? err_msg.tv_type[0] : ''}</span>
                                                    </fieldset></td>
                                                </tr>
                                                <tr>
                                                    <td>TV Brand:</td>
                                                    <td colspan={3}><fieldset className="form-group position-relative">
                                                        <input type="radio" name="tv_brand" value="Sony" onChange={(e) => { setTvBrand(e.target.value) }} checked={tvBrand === "Sony"} />&nbsp;Sony &nbsp;&nbsp;&nbsp;
                                                        <input type="radio" name="tv_brand" value="Samsung" onChange={(e) => { setTvBrand(e.target.value) }} checked={tvBrand === "Samsung"} />&nbsp;Samsung &nbsp;&nbsp;&nbsp;
                                                        <input type="radio" name="tv_brand" value="LG" onChange={(e) => { setTvBrand(e.target.value) }} checked={tvBrand === "LG"} />&nbsp;LG &nbsp;&nbsp;&nbsp;
                                                        <input type="radio" name="tv_brand" value="Walton" onChange={(e) => { setTvBrand(e.target.value) }} checked={tvBrand === "Walton"} />&nbsp;Walton &nbsp;&nbsp;&nbsp;
                                                        <input type="radio" name="tv_brand" value="Hisense" onChange={(e) => { setTvBrand(e.target.value) }} checked={tvBrand === "Hisense"} />&nbsp;Hisense &nbsp;&nbsp;&nbsp;
                                                        <input type="radio" name="tv_brand" value="Mi" onChange={(e) => { setTvBrand(e.target.value) }} checked={tvBrand === "Mi"} />&nbsp;Mi &nbsp;&nbsp;&nbsp;
                                                        <input type="radio" name="tv_brand" value="Others" onChange={(e) => { setTvBrand(e.target.value) }} checked={tvBrand === "Others"} />&nbsp;Others <br />
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.tv_brand ? err_msg.tv_brand[0] : ''}</span>
                                                    </fieldset></td>
                                                </tr>

                                                <tr>
                                                    <td>TV placement/ Location:</td>
                                                    <td colspan={3}><fieldset className="form-group position-relative">
                                                        <input type="radio" name="tv_placement" value="Bed Room" onChange={(e) => { setTvPlacement(e.target.value) }} checked={tvPlacement === "Bed Room"} />&nbsp;Bed Room &nbsp;&nbsp;&nbsp;
                                                        <input type="radio" name="tv_placement" value="Dinning" onChange={(e) => { setTvPlacement(e.target.value) }} checked={tvPlacement === "Dinning"} />&nbsp;Dinning &nbsp;&nbsp;&nbsp;
                                                        <input type="radio" name="tv_placement" value="Drawing" onChange={(e) => { setTvPlacement(e.target.value) }} checked={tvPlacement === "Drawing"} />&nbsp;Drawing &nbsp;&nbsp;&nbsp;
                                                        <input type="radio" name="tv_placement" value="Other Room" onChange={(e) => { setTvPlacement(e.target.value) }} checked={tvPlacement === "Other Room"} />&nbsp;Other Room <br />
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.tv_placement ? err_msg.tv_placement[0] : ''}</span>
                                                    </fieldset></td>
                                                </tr>

                                                <tr>
                                                    <td><h5>GSM signal strength:</h5></td>
                                                    <td colspan={3}>
                                                        <fieldset className="form-group position-relative has-icon-left">
                                                            <input type="text" name="gsm_signal_strength" id="gsm_signal_strength" className="form-control" value={gsmSignalStrength} onChange={(e) => { setGsmSignalStrength(e.target.value) }} placeholder="GSM signal strength" tabIndex={14} required data-validation-required-message="Please enter GSM signal strength." />
                                                            <div className="form-control-position">
                                                                <i className="la icon-home" />
                                                            </div>
                                                            <div className="help-block font-small-3" />
                                                            <span class="text-danger">{err_msg.gsm_signal_strength ? err_msg.gsm_signal_strength[0] : ''}</span>
                                                        </fieldset>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>Wi-Fi user:</td>
                                                    <td colspan={3}><fieldset className="form-group position-relative">
                                                        <input type="radio" name="wifi" value="y" onChange={(e) => { setWifi(e.target.value) }} checked={wifi === "y"} />&nbsp;Yes &nbsp;&nbsp;&nbsp;
                                                        <input type="radio" name="wifi" value="n" onChange={(e) => { setWifi(e.target.value) }} checked={wifi === "n"} />&nbsp;No <br />
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.wifi ? err_msg.wifi[0] : ''}</span>
                                                    </fieldset></td>
                                                </tr>
                                                {wifi == "y" &&
                                                <><tr>
                                                    <td><h5>Wi-Fi signal strength:</h5></td>
                                                    <td colspan={3}>
                                                        <fieldset className="form-group position-relative has-icon-left">
                                                            <input type="text" name="wifi_signal_strength" id="wifi_signal_strength" className="form-control" value={wifiSignalStrength} onChange={(e) => { setWifiSignalStrength(e.target.value) }} placeholder="Wi-Fi signal strength" tabIndex={14} required data-validation-required-message="Please enter Wi-Fi signal strength." />
                                                            <div className="form-control-position">
                                                                <i className="la icon-home" />
                                                            </div>
                                                            <div className="help-block font-small-3" />
                                                            <span class="text-danger">{err_msg.wifi_signal_strength ? err_msg.wifi_signal_strength[0] : ''}</span>
                                                        </fieldset>
                                                    </td>
                                                </tr></>}

                                                <tr>
                                                    <td colspan={4}>
                                                        <h6 className="card-subtitle line-on-side text-muted text-center font-medium-5 "></h6>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <th ><h6 class="font-weight-bold">Cable Connection Condition</h6></th>
                                                    <td colspan={3}></td>

                                                </tr>


                                                <tr>
                                                    <td><h5>Set-Top Box Provider name:</h5></td>
                                                    <td colspan={3}>
                                                        <fieldset className="form-group position-relative has-icon-left">
                                                            <input type="text" name="stb_provider_name" id="stb_provider_name" className="form-control" value={stbProviderName} onChange={(e) => { setStbProviderName(e.target.value) }} placeholder="STB Provider name" tabIndex={14} required data-validation-required-message="Please enter Set-Top Box Provider name." />
                                                            <div className="form-control-position">
                                                                <i className="la icon-home" />
                                                            </div>
                                                            <div className="help-block font-small-3" />
                                                            <span class="text-danger">{err_msg.stb_provider_name ? err_msg.stb_provider_name[0] : ''}</span>
                                                        </fieldset>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td><h5>Set-Top Box subscription package type:</h5></td>
                                                    <td colspan={3}>
                                                        <fieldset className="form-group position-relative has-icon-left">
                                                            <input type="text" name="stb_subscription_type" id="stb_subscription_type" className="form-control" value={stbSubscriptionType} onChange={(e) => { setStbSubscriptionType(e.target.value) }} placeholder="STB subscription type" tabIndex={14} required data-validation-required-message="Please enter Set-Top Box subscription package type." />
                                                            <div className="form-control-position">
                                                                <i className="la icon-home" />
                                                            </div>
                                                            <div className="help-block font-small-3" />
                                                            <span class="text-danger">{err_msg.stb_subscription_type ? err_msg.stb_subscription_type[0] : ''}</span>
                                                        </fieldset>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td><h5>Set-Top Box subscription payment/ monthly charge:</h5></td>
                                                    <td colspan={3}>
                                                        <fieldset className="form-group position-relative has-icon-left">
                                                            <input type="text" name="stb_subscription_charge" id="stb_subscription_charge" className="form-control" value={stbSubscriptionCharge} onChange={(e) => { setStbSubscriptionCharge(e.target.value) }} placeholder="STB subscription payment/ monthly charge" tabIndex={14} required data-validation-required-message="Please enter Set-Top Box subscription payment/ monthly charge." />
                                                            <div className="form-control-position">
                                                                <i className="la icon-home" />
                                                            </div>
                                                            <div className="help-block font-small-3" />
                                                            <span class="text-danger">{err_msg.stb_subscription_charge ? err_msg.stb_subscription_charge[0] : ''}</span>
                                                        </fieldset>
                                                    </td>
                                                </tr>



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
                                                <tr>
                                                    <td colspan={4}>
                                                        <div class="pl-0">
                                                            {(() => {
                                                                if (props.mode == "Edit") {
                                                                    return <button type="submit" className="btn btn-info btn-block"><i className="la la-user" />
                                                                        Update Device User</button>
                                                                } else {
                                                                    return <button type="submit" className="btn btn-info btn-block"><i className="la la-user" />
                                                                        Create Device and Go to next</button>
                                                                }
                                                            })()}

                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>

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