import { useState, useEffect } from "react";
import axios from "axios";
import axiosConfig from '../axiosConfig';

const DeployerForm = (props) => {
    const [name, setName] = useState("");
    const [organizationName, setOrganizationName] = useState("");
    const [designation, setDesignation] = useState("");
    const [number, setNumber] = useState("");
    const [altNumber, setAltNumber] = useState("");
    const [doj, setDOJ] = useState("");
    const [dob, setDOB] = useState("");
    const [nid, setNID] = useState("");
    const [employeeID, setEmployeeID] = useState("");
    const [description, setDescription] = useState("");
    const [houseName, setHouseName] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [roadNumber, setRoadNumber] = useState("");
    const [stateName, setStateName] = useState("");
    const [districtName, setDistrictName] = useState("");
    const [divisionName, setDivisionName] = useState("");


    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (props.mode == "Edit") {
            axiosConfig.get("/appuser/get/" + props.id).then((rsp) => {
                var obj = rsp.data;
                setName(obj.user_name);
                setEmail(obj.email);
                setAddress(obj.address);
                setPhone(obj.phone);
            }, (err) => {
                if (err.response.status === 422) {
                    setErrMsg(err.response.data);

                }
            });
        }


    }, []);



    const [err_msg, setErrMsg] = useState({});
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [checkbox1, setCheckbox1] = useState("false");
    const [checkbox2, setCheckbox2] = useState("false");
    const [checkbox1error, setCheckbox1Error] = useState("");
    const [checkbox2error, setCheckbox2Error] = useState("");



    const handleChange = (event, checkboxid) => {

        if (event.target.checked) {
            //console.log('✅ Checkbox is checked');
            if(checkboxid == "checkbox1"){
                setCheckbox1("true");
                setCheckbox1Error("")
            }else{
                setCheckbox2("true");
                setCheckbox2Error("")
            }
            


        } else {
            //console.log('⛔️ Checkbox is NOT checked');
            if(checkboxid == "checkbox1"){
                setCheckbox1("false");
            }else{
                setCheckbox2("false");
            }
            
        }
        setIsSubscribed(current => !current);

        console.log(event.target.checked);

    };









    const handleForm = (e) => {
        e.preventDefault();
        if (props.mode == "Edit") {
            const obj = { user_name: name, email: email, address: address, phone: phone };
            axiosConfig.post("/appuser/edit", obj).then((rsp) => {


                alert(rsp.data.message);
                window.location.href = "/app/users";

            }, (err) => {
                if (err.response.status === 422) {
                    setErrMsg(err.response.data);

                }
            });
        }

        else {
            const obj = { name: name, organization_name: organizationName, designation: designation, number: number, alt_number: altNumber, doj: doj, dob: dob, nid: nid, employee_id: employeeID, description: description, house_name: houseName, house_number: houseNumber, road_number: roadNumber, state_name: stateName, district_name: districtName, division_name: divisionName };

            if(checkbox1 == "true" && checkbox2 == "true"){
                axiosConfig.post("/deployer/create", obj).then((rsp) => {
                    alert(rsp.data.message);
                    window.location.href = "/";
    
                }, (err) => {
                    if (err.response.status === 422) {
                        setErrMsg(err.response.data);
                        setCheckbox1("false");
                        setCheckbox2("false");
    
                    }
                });
            }else{
                alert("Make sure all informations are correct and follow all Tearms & Conditions of BSCL &  please check the boxes."); 
                if(checkbox1 == "false"){
                    setCheckbox1Error("Make sure all given informations are correct & must check the box");
                }
                if(checkbox2 == "false"){
                    setCheckbox2Error("You have to follow all Tearms & Conditions of BSCL and must check this box");
                }
            }

            
        }

    }
    return (

        <div class="app-content" style={{ backgroundColor: "azure" }}>



            <div class="content-body">

                <div class="row">
                    <div class="col-3"></div>
                    <div class="col-6 box-shadow-2 p-0">


                        <div class="card border-grey border-lighten-3 m-0" >
                            <div className="card-header border-0 pb-0">
                                <div className="card-title text-center">
                                    <img style={{ width: '13%', height: '0%' }} src="/app-assets/images/logo/app-user.png" alt="user logo" />
                                </div>
                                <h6 className="card-subtitle line-on-side text-muted text-center font-medium-5 pt-2"><span>{props.mode} Deployer/Installer Information</span>
                                </h6>
                            </div>
                            <div className="card-content" >
                                <div className="card-body">
                                    <form className="form-horizontal" onSubmit={handleForm} noValidate>

                                        <table >
                                            <tr>
                                                <td><h5>Installer Name:</h5></td>
                                                <td style={{ width: '70%' }} colspan={3}>
                                                    <fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="name" id="name" value={name} onChange={(e) => { setName(e.target.value) }} readOnly={props.mode == "Edit"} className="form-control" placeholder="Name" tabIndex={1} required data-validation-required-message="Please enter your name." />
                                                        <div className="form-control-position">
                                                            <i className="la la-user" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.name ? err_msg.name[0] : ''}</span>
                                                    </fieldset>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><h5>Organization Name:</h5></td>
                                                <td colspan={3}>
                                                    <fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="organizationName" id="organizationName" className="form-control" value={organizationName} onChange={(e) => { setOrganizationName(e.target.value) }} placeholder="Organization Name" tabIndex={2} required data-validation-required-message="Please enter organization name." />
                                                        <div className="form-control-position">
                                                            <i className="la la-institution" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.organization_name ? err_msg.organization_name[0] : ''}</span>
                                                    </fieldset>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><h5>Designation:</h5></td>
                                                <td colspan={3}>
                                                    <fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="designation" id="designation" className="form-control" value={designation} onChange={(e) => { setDesignation(e.target.value) }} placeholder="Designation" tabIndex={3} required data-validation-required-message="Please enter your designation." />
                                                        <div className="form-control-position">
                                                            <i className="la ft-award" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.designation ? err_msg.designation[0] : ''}</span>
                                                    </fieldset>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><h5>Mobile Number:</h5></td>
                                                <td colspan={3}>
                                                    <fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="number" id="number" className="form-control" value={number} onChange={(e) => { setNumber(e.target.value) }} placeholder="Mobile Number" tabIndex={4} required data-validation-required-message="Please enter your mobile number." />
                                                        <div className="form-control-position">
                                                            <i className="la ft-phone" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.number ? err_msg.number[0] : ''}</span>
                                                    </fieldset>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><h5>Alternative Number:</h5></td>
                                                <td colspan={3}>
                                                    <fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="altNumber" id="altNumber" className="form-control" value={altNumber} onChange={(e) => { setAltNumber(e.target.value) }} placeholder="Alternative Number" tabIndex={5} required data-validation-required-message="Please enter alernative Number." />
                                                        <div className="form-control-position">
                                                            <i className="la ft-phone" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.alt_number ? err_msg.alt_number[0] : ''}</span>
                                                    </fieldset>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><h5>Date of Join:</h5></td>
                                                <td colspan={3}>
                                                    <fieldset className="form-group position-relative has-icon-left">
                                                        <input type="date" name="doj" id="doj" className="form-control" value={doj} onChange={(e) => { setDOJ(e.target.value) }} placeholder="Date Of Join" tabIndex={6} required data-validation-required-message="Please enter date of Join." />
                                                        <div className="form-control-position">
                                                            <i className="la la-calendar" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.doj ? err_msg.doj[0] : ''}</span>
                                                    </fieldset>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><h5>Date of Birth:</h5></td>
                                                <td colspan={3}>
                                                    <fieldset className="form-group position-relative has-icon-left">
                                                        <input type="date" name="dob" id="dob" className="form-control" value={dob} onChange={(e) => { setDOB(e.target.value) }} placeholder="Date Of Birth" tabIndex={7} required data-validation-required-message="Please enter date of birth." />
                                                        <div className="form-control-position">
                                                            <i className="la la-calendar" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.dob ? err_msg.dob[0] : ''}</span>
                                                    </fieldset>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td><h5>NID:</h5></td>
                                                <td colspan={3}>
                                                    <fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="nid" id="nid" className="form-control" value={nid} onChange={(e) => { setNID(e.target.value) }} placeholder="NID" tabIndex={8} required data-validation-required-message="Please enter your NID." />
                                                        <div className="form-control-position">
                                                            <i className="la la-credit-card" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.nid ? err_msg.nid[0] : ''}</span>
                                                    </fieldset>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><h5>Employee ID:</h5></td>
                                                <td colspan={3}>
                                                    <fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="employeeID" id="employeeID" className="form-control" value={employeeID} onChange={(e) => { setEmployeeID(e.target.value) }} placeholder="Employee ID" tabIndex={9} required data-validation-required-message="Please enter your Employee ID." />
                                                        <div className="form-control-position">
                                                            <i className="la ft-minus-square" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.employee_id ? err_msg.employee_id[0] : ''}</span>
                                                    </fieldset>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><h5>Description:</h5></td>
                                                <td colspan={3}>
                                                    <fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="description" id="description" className="form-control" value={description} onChange={(e) => { setDescription(e.target.value) }} placeholder="Description" tabIndex={10} required data-validation-required-message="Please enter description." />
                                                        <div className="form-control-position">
                                                            <i className="la la-commenting" />
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
                                                <td ><h4>Address:</h4></td>
                                                <td colspan={3}></td>

                                            </tr>
                                            <tr>
                                                <td><h5>House Name:</h5></td>
                                                <td colspan={3}>
                                                    <fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="houseName" id="houseName" className="form-control" value={houseName} onChange={(e) => { setHouseName(e.target.value) }} placeholder="House Name" tabIndex={11} required data-validation-required-message="Please enter house name." />
                                                        <div className="form-control-position">
                                                            <i className="la icon-home" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.house_name ? err_msg.House_name[0] : ''}</span>
                                                    </fieldset>
                                                </td>
                                            </tr>



                                            <tr>
                                                <td><h5>House Number:</h5></td>
                                                <td>
                                                    <fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="houseNumber" id="houseNumber" className="form-control" value={houseNumber} onChange={(e) => { setHouseNumber(e.target.value) }} placeholder="House Number" tabIndex={12} required data-validation-required-message="Please enter house number." />
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
                                                        <input type="text" name="roadNumber" id="roadNumber" className="form-control" value={roadNumber} onChange={(e) => { setRoadNumber(e.target.value) }} placeholder="Road Number" tabIndex={13} required data-validation-required-message="Please enter road number." />
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
                                                        <input type="text" name="stateName" id="stateName" className="form-control" value={stateName} onChange={(e) => { setStateName(e.target.value) }} placeholder="State Name" tabIndex={14} required data-validation-required-message="Please enter state name." />
                                                        <div className="form-control-position">
                                                            <i className="la la-flag-o" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.state_name ? err_msg.state_name[0] : ''}</span>
                                                    </fieldset>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><h5>District Name:</h5></td>
                                                <td colspan={3}>
                                                    <fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="districtName" id="districtName" className="form-control" value={districtName} onChange={(e) => { setDistrictName(e.target.value) }} placeholder="District Name" tabIndex={15} required data-validation-required-message="Please enter district name." />
                                                        <div className="form-control-position">
                                                            <i className="la la-map-marker" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.district_name ? err_msg.district_name[0] : ''}</span>
                                                    </fieldset>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><h5>Division Name:</h5></td>
                                                <td colspan={3}>
                                                    <fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="divisionName" id="divisionName" className="form-control" value={divisionName} onChange={(e) => { setDivisionName(e.target.value) }} placeholder="Division Name" tabIndex={16} required data-validation-required-message="Please enter division name." />
                                                        <div className="form-control-position">
                                                            <i className="la la-map-marker" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.district_name ? err_msg.district_name[0] : ''}</span>
                                                    </fieldset>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan={4}>
                                                    <div><input type="checkbox" id="checkbox1" name="checkbox1" onChange={ (event) =>{handleChange(event,"checkbox1")}} value={isSubscribed} checked={checkbox1 === "true"} tabIndex={17} required data-validation-required-message="Make sure all given informations are correct & must check the box." />
                                                        <label class="form-label" >&nbsp; I hereby declare that the information provided is true and currect.</label></div>
                                                    <span class="text-danger">{checkbox1error}</span>
                                                    <div><input type="checkbox" id="checkbox2" name="checkbox2" onChange={ (event) =>{handleChange(event,"checkbox2")}} value={isSubscribed} checked={checkbox2 === "true"} tabIndex={18} required data-validation-required-message="You have to follow all Tearms & Conditions of BSCL and must check this box." />
                                                        <label class="form-label" >&nbsp; Yes, I have read and agree / agreed with the tearms and conditions of BSCL.</label></div>
                                                    <span class="text-danger">{checkbox2error}</span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td colspan={4}>
                                                    <div class="pl-0">
                                                        {(() => {
                                                            if (props.mode == "Edit") {
                                                                return <button type="submit" className="btn btn-info btn-block"><i className="la la-user" />
                                                                    Update User</button>
                                                            } else {
                                                                return <button type="submit" className="btn btn-info btn-block"><i className="la la-user" />
                                                                    Submit</button>
                                                            }
                                                        })()}

                                                    </div>
                                                </td>

                                            </tr>


                                        </table>


                                        {/* 
                                        {props.mode == "Create" &&
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
                                        }

                                        <div className="row">
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





                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        </div>



    )
}
export default DeployerForm;