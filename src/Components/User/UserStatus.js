import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState, useEffect } from "react";
import axios from "axios";
import TotalTimeSpentList from "./TotalTimeSpentList";
import DailyTimeSpentList from "./DailyTimeSpentList";




const UserStatus = () => {

    const [user, setUser] = useState("");
    const [time, setTime] = useState("");
    const [msg, setMsg] = useState("");
    const [erroralltime, setErroralltime] = useState("");
    const [users, setUsers] = useState([]);
    const [channelalltime, setChannelalltime] = useState([]);
    const [channelData, setChannelData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {

        axios.get("http://127.0.0.1:8000/api/getuserlist").then(rsp => {
            console.log(rsp.data.users);
            setUsers(rsp.data.users);

        }).catch(err => {

        })

    }, [])

    useEffect(() => {
        var data = {
            user: user,
            time: time,
        };

        axios.post("http://127.0.0.1:8000/api/user/usertimespent", data).then(rsp => {
            setMsg(rsp.data.error);
            setChannelData(() => ({
                labels: rsp.data.channels, datasets: [{
                    label: "Time Spent", data: rsp.data.totaltime,
                    backgroundColor: ["#50AF95", "#f3ba2f", "#2a71d0"],
                    //borderColor: "black",
                    borderWidth: 1,
                    categoryPercentage: 0.9,
                    barPercentage: 1
                }]
            }));
            //console.log(channelData);
        }).catch(err => {

        });

        axios.post("http://127.0.0.1:8000/api/user/useralltimeview", data).then(rsp => {
            setErroralltime(rsp.data.error);
            setChannelalltime(rsp.data.channels);
            
            //console.log(channelData);
        }).catch(err => {

        });


    }, [user, time]);




    // const handleForm = (e) => {
    //     e.preventDefault();
    //     var data = {
    //         user: user,
    //         time: time,
    //     };
    //     axios.post("http://127.0.0.1:8000/api/user/usertimespent", data).then((rsp) => {
    //         console.log(rsp.data);
    //         setMsg(rsp.data.error);
    //         setChannelData(() => ({
    //             labels: rsp.data.channels, datasets: [{
    //                 label: "Time Spent", data: rsp.data.totaltime,
    //                 backgroundColor: ["#50AF95", "#f3ba2f", "#2a71d0"],
    //                 //borderColor: "black",
    //                 borderWidth: 1,
    //                 categoryPercentage: 0.9,
    //                 barPercentage: 1
    //             }]
    //         }));
    //         //console.log(channelData);

    //         //console.warn("all data", user, time);
    //         //window.location.href="/url";
    //     }, (err) => {

    //     })
    // }




    // var credential = { start: "2021-01-01 00:00:00", finish: "2022-01-01 00:00:00" };
    return (
        <div class="app-content content">
            <div class="content-overlay"></div>
            <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                <div class="content-header row">
                </div>
                <div class="content-body">
                    <form  >
                        <div class="row">

                            <div class="col-md-5">
                                <select type="Text" class="custom-select d-block w-100" onChange={(e) => { setUser(e.target.value) }}>
                                    <option value="">Select User</option>

                                    {users.map((user) =>
                                        <option key={user.id} value={user.id}>{user.user_name}</option>

                                    )}

                                </select>
                            </div>
                            <div class="col-md-5">
                                <select class="custom-select d-block w-100" onChange={(e) => { setTime(e.target.value) }}>
                                    <option value="">Select Time Frame</option>
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

                                    {/* <PostGraph title="Time Spent" text="Channels" url="reach/percent" label="Time Spent" color="blue" credentials={credential} /> */}
                                    <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title">Time Spent
                                                {(() => {
                                                    if (msg === "Error") {
                                                        return null;
                                                    } else {
                                                        return <button class="btn btn-danger float-right">Download CSV</button>;

                                                    }
                                                })()}

                                            </h4>
                                        </div>
                                        <div class="card-content collapse show">

                                            {(() => {
                                                if (msg === "Error") {
                                                    return <h4><span class="danger">Please Select User & Time Frame</span></h4>;
                                                } else {
                                                    return <div>
                                                        <Bar
                                                            data={channelData}
                                                            options={{
                                                                title: {
                                                                    display: true,
                                                                    text: "Channels",
                                                                    fontSize: 20
                                                                },
                                                                legend: {
                                                                    display: true,
                                                                    position: 'right'
                                                                }
                                                            }}
                                                        />
                                                    </div>;

                                                }
                                            })()}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <br />

                    <div class="row match-height">
                        <div class="col-xl-6  col-12">
                            <TotalTimeSpentList channels={channelalltime} error={erroralltime} />
                        </div>
                        <div class="col-xl-6 col-12">
                            <DailyTimeSpentList />
                        </div>
                    </div>


                </div>
            </div>

        </div>




    )
}
export default UserStatus;