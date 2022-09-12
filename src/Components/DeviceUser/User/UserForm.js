import { useState, useEffect } from "react";
import axios from "axios";
import axiosConfig from '../../axiosConfig';

const UserForm = (props) => {
    const [user_name, setUsername] = useState("");
    const [gender, setGender] = useState("");
    const [deviceID, setDeviceID] = useState("");
    const [dob, setDob] = useState("");



    useEffect(() => {
        if (props.mode == "Edit") {
            axiosConfig.get("/deviceuser/get/" + props.id).then((rsp) => {
                var obj = rsp.data;
                setUsername(obj.user_name);
                setDob(obj.dob);
                setGender(obj.gender);
                setDeviceID(obj.device_id);
            }, (err) => {
                if (err.response.status === 422) {
                    setErrMsg(err.response.data);

                }
            });
        }


    }, []);



    const [err_msg, setErrMsg] = useState({});


    const handleForm = (e) => {
        e.preventDefault();
        if (props.mode == "Edit") {
            const obj = { id:props.id, dob:dob, gender: gender };
            axiosConfig.post("/deviceuser/edit", obj).then((rsp) => {

                alert(rsp.data.message);
                window.location.href = `/device/edit/${deviceID}`;

            }, (err) => {
                if (err.response.status === 422) {
                    setErrMsg(err.response.data);

                }
            });
        }

        else {
            const obj = { user_name: user_name, dob: dob, gender: gender , device_id: props.device_id, user_index: props.user_index};
            console.log(obj);
            axiosConfig.post("/deviceuser/create", obj).then((rsp) => {
                alert(rsp.data.message);
                window.location.href = `/device/edit/${props.device_id}`;

            }, (err) => {
                if (err.response.status === 422) {
                    setErrMsg(err.response.data);

                }
            });
        }

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
                                    <h6 className="card-subtitle line-on-side text-muted text-center font-medium-5 pt-2"><span>{props.mode} Device User</span>
                                    </h6>
                                </div>
                                <div className="card-content" >
                                    <div className="card-body">
                                        <form className="form-horizontal" onSubmit={handleForm} noValidate>
                                            <table class="table table-borderless">
                                                <tr>
                                                    <td class="form-label">User Name</td>
                                                    <td><fieldset className="form-group position-relative has-icon-left">
                                                        <input type="text" name="user_name" id="user_name" value={user_name} onChange={(e) => { setUsername(e.target.value) }} readOnly={props.mode == "Edit"} className="form-control" placeholder="Username" tabIndex={1} required data-validation-required-message="Please enter username." />
                                                        <div className="form-control-position">
                                                            <i className="la la-user" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.user_name ? err_msg.user_name[0] : ''}</span>
                                                    </fieldset></td>
                                                </tr>
                                                
                                                <tr>
                                                    <td>Date Of Birth</td>
                                                    <td><fieldset className="form-group position-relative has-icon-left">
                                                        <input type="date" name="dob" id="dob" className="form-control" value={dob} onChange={(e) => { setDob(e.target.value) }} placeholder="Date Of Birth" tabIndex={6} required data-validation-required-message="Please enter date of birth." />
                                                        <div className="form-control-position">
                                                            <i className="ft-watch" />
                                                        </div>
                                                        <div className="help-block font-small-3" />
                                                        <span class="text-danger">{err_msg.dob ? err_msg.dob[0] : ''}</span>
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
                                                </tr>
                                                

                                            </table>

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
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            </div>
        </div>


    )
}
export default UserForm;