import PostGraph from "../Graph/PostGraph";
import { useState, useEffect } from "react";
import axios from "axios";
import TotalTimeSpentList from "./TotalTimeSpentList";
import DailyTimeSpentList from "./DailyTimeSpentList";




const UserStatus = () => {

    const [user, setUser] = useState("");
    const [time, setTime] = useState("");
    const [msg, setMsg] = useState({});

    const handleForm = (e) => {
        e.preventDefault();


        var data = {
            user: user,
            time: time,
        };
        //debugger;
        axios.post("http://127.0.0.1:8000/api/testing", data).then((rsp) => {
            setMsg(msg => ({ ...msg, ...rsp.data }));
            console.log(msg);

            //console.warn("all data", user, time);
            //window.location.href="/url";
        }, (err) => {

        })
    }


    var credential = { start: "2021-01-01 00:00:00", finish: "2022-01-01 00:00:00" };
    return (
        <div class="app-content content">
            <div class="content-overlay"></div>
            <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                <div class="content-header row">
                </div>
                <div class="content-body">
                    <form onSubmit={handleForm} >
                        <div class="row">

                            <div class="col-md-5">
                                <select class="custom-select d-block w-100" onChange={(e) => { setUser(e.target.value); }} >
                                    <option>Select User</option>
                                    <option value="AIUB_Prototype 0000">AIUB_Prototype</option>
                                    <option value="BSCL_Prototype_11111">BSCL_Prototype_1</option>
                                    <option value="BSCL_Prototype_22222">BSCL_Prototype_2</option>
                                    <option>BSCL_CHAIRMAN_SIR_HOME</option>
                                    <option>BSCL_Prototype_4</option>
                                    <option>BSCL_Prototype_5</option>
                                    <option>BSCL_Prototype_6</option>
                                    <option>BSCL_CHAIRMAN_SIR_OFFICE</option>
                                    <option>BSCL_Prototype_8</option>
                                    <option>BSCL_Prototype_9</option>
                                    <option>BSCL_Prototype_10</option>
                                </select>
                            </div>
                            <div class="col-md-5">
                                <select class="custom-select d-block w-100" onChange={(e) => { setTime(e.target.value) }}>
                                    <option>Select Time Frame</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Yearly">Yearly</option>
                                </select>
                            </div>

                            <div class="col-md-2">
                                <input class="btn btn-success" type="submit" value="Get Data"></input>
                            </div>




                        </div>
                    </form>
                    <br />


                    <div class="row">
                        <div class="card col-md-12">
                            <div class="card-content ">
                                <div class="card-body ">
                                    <div class="col-md-2 float-right">
                                        <button class="btn btn-danger">Download CSV</button>
                                    </div>
                                    <PostGraph title="Time Spent" text="Channels" url="reach/percent" label="Time Spent" color="blue" credentials={credential} />

                                </div>
                            </div>
                        </div>

                    </div>

                    <br />

                    <div class="row match-height">
                        <div class="col-xl-6 col-12">
                            <TotalTimeSpentList/>
                        </div>
                        <div class="col-xl-6 col-12">
                            <DailyTimeSpentList/>
                        </div>
                    </div>




                </div>
            </div>

        </div>




    )
}
export default UserStatus;