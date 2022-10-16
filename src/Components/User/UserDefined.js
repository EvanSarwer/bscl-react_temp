import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState, useEffect } from "react";
import axiosConfig from '../axiosConfig';
import TotalTimeSpentList, { Products } from "./TotalTimeSpentList";
import DailyTimeSpentList from "./DailyTimeSpentList";
import Select from 'react-select';
import Table from './Table';
import 'chartjs-adapter-date-fns';
import 'chartjs-adapter-moment';
import TimelineChart from './TimelineChart';
import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';




const UserDefined = () => {

    const [user, setUser] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const [userName, setUserName] = useState("");
    const [start, setStart] = useState("");
    const [finish, setFinish] = useState("");
    const [msg, setMsg] = useState("");
    const [errorChannelData, setErrorChannelData] = useState("Error");
    const [erroralltime, setErroralltime] = useState("");
    const [errordaytime, setErrordaytime] = useState("");
    const [channeldaytime, setChanneldaytime] = useState([]);
    const [users, setUsers] = useState([]);
    const [channelalltime, setChannelalltime] = useState([]);
    const [timeSpentCSV, setTimeSpentCSV] = useState({});
    const [channelData, setChannelData] = useState({
        labels: [],
        datasets: []
    });
    const [last24hrData, setLast24hrData] = useState([]);
    let last24Array = [];
    const [allTimeData, setAllTimeData] = useState([]);
    let allTimeArray = [];



    function exportToCsv(filename, rows) {
        var processRow = function (row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
                var innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                };
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (j > 0)
                    finalVal += ',';
                finalVal += result;
            }
            return finalVal + '\n';
        };
        var csvFile = '';
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }
        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    var getCSV = (scsv, user, username) => {
        var today = new Date(),
            datetime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        exportToCsv(user + "_" + username + "-Time_Spent(" + datetime + ").csv", scsv)
    }

    const AllTogetherDownloadfunc = () => {
        //console.log(liveChannelData.labels[0]);
        var csv = [["Channel", "Time Spent(min)/ (" + start + " To " + finish + ")", "Time Spent(min)/All Time Spent", "Time Spent(min)/Last 24hr"]];
        var sampleLive = timeSpentCSV;
        var sampleLive1 = channelalltime;
        var sampleLive2 = channeldaytime;
        for (var i = 0; i < sampleLive.labels.length; i++) {
            csv.push([sampleLive.labels[i], sampleLive.values[i], sampleLive1[i].totaltime, sampleLive2[i].totaltime]);
        }
        //console.log(csv);
        getCSV(csv, user, userName);
    }
    const TimeSpentTimeFrameDownloadfunc = () => {
        //console.log(liveChannelData.labels[0]);
        var csv = [["Channel", "Time Spent (min)/ (" + start + " To " + finish + ")"]];
        var sampleLive = timeSpentCSV;
        for (var i = 0; i < sampleLive.labels.length; i++) {
            csv.push([sampleLive.labels[i], sampleLive.values[i]]);
        }
        //console.log(csv);
        getCSV(csv, user, userName);
    }
    const AlltimeDownloadfunc = () => {
        //console.log(liveChannelData.labels[0]);
        var csv = [["Channel", "Time Spent (min)/All Time Spent"]];
        var sampleLive = channelalltime;
        for (var i = 0; i < sampleLive.length; i++) {
            csv.push([sampleLive[i].channel_name, sampleLive[i].totaltime]);
        }
        //console.log(csv);
        getCSV(csv, user, userName);
    }
    const OneDayDownloadfunc = () => {
        //console.log(liveChannelData.labels[0]);
        var csv = [["Channel", "Time Spent (min)/Last 24hr"]];
        var sampleLive = channeldaytime;
        for (var i = 0; i < sampleLive.length; i++) {
            csv.push([sampleLive[i].channel_name, sampleLive[i].totaltime]);
        }
        //console.log(csv);
        getCSV(csv, user, userName);
    }

    useEffect(() => {

        axiosConfig.get("/getuserlist").then(rsp => {
            //console.log(rsp.data.users);
            setUsers(rsp.data.users);

        }).catch(err => {

        })

    }, [])

    useEffect(() => {
        var data = {
            user: user
        };

        axiosConfig.post("/user/userinfo", data).then(rsp => {
            setUserInfo(rsp.data.user);
        }).catch(err => {

        });

        axiosConfig.post("/user/useralltimeview", data).then(rsp => {
            setErroralltime(rsp.data.error);
            setChannelalltime(rsp.data.channels);
            for (var i = 0; i < rsp.data.channels.length; i++) {
                if (rsp.data.channels[i].totaltime > 0) {
                    allTimeArray.push(rsp.data.channels[i]);
                }
            }
            setAllTimeData(allTimeArray);
        }).catch(err => {

        });

        axiosConfig.post("/user/userdaytimeviewlist", data).then(rsp => {
            setErrordaytime(rsp.data.error);
            setChanneldaytime(rsp.data.channels);
            for (var i = 0; i < rsp.data.channels.length; i++) {
                if (rsp.data.channels[i].totaltime > 0) {
                    last24Array.push(rsp.data.channels[i]);
                }
            }
            setLast24hrData(last24Array);

        }).catch(err => {

        });


    }, [user]);

    const handleForm = (e) => {
        e.preventDefault();
        var data = {
            user: user,
            start: start,
            finish: finish,
        };

        axiosConfig.post("/user/userdefined/usertimespent", data).then(rsp => {
            console.log(rsp.data);
            setMsg(rsp.data.error);
            setErrorChannelData("");
            setChannelData(() => ({
                labels: rsp.data.channels, datasets: [{
                    label: "Time Spent(min)", data: rsp.data.totaltime,
                    backgroundColor: ["#2a71d0"],
                    //borderColor: "black",
                    borderWidth: 1,
                    categoryPercentage: 0.9,
                    barPercentage: 1
                }]
            }));
            setTimeSpentCSV(() => ({
                labels: rsp.data.channels, values: rsp.data.totaltime
            }));
        }).catch(err => {

        });


    }


    var start_string = new Date(start).toLocaleString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
    var finish_string = new Date(finish).toLocaleString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });


    return (
        <div><Header title="Audience Profile-User Defined" />
            <MainMenu menu="audiencedefined" />
            <div class="app-content content">
                <div class="content-overlay"></div>
                <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                    <div class="content-header row">
                    </div>
                    <div class="content-body">
                        <div class="card">
                            <div class="card-body">
                                <form onSubmit={handleForm}>
                                    <div class="row">

                                        <div class="col-3">
                                            <label for="dateTime1">User List</label>
                                            <Select
                                                placeholder="Select User"
                                                options={users.map(user => ({ label: user.user_name, value: user.id }))}
                                                onChange={opt => setUser(opt.value) & setUserName(opt.label)}
                                            />
                                        </div>
                                        <div class="row col-3">

                                            <fieldset class="form-group form-group-style">
                                                <label for="dateTime1">Start Time</label>
                                                <input type="datetime-local" class="form-control" id="dateTime1" step="1" onChange={(e) => { setStart(e.target.value) }} />
                                            </fieldset>
                                        </div>
                                        <div class="row col-3">
                                            <fieldset class="form-group form-group-style">
                                                <label for="dateTime1">Finish Time</label>
                                                <input type="datetime-local" class="form-control" id="dateTime1" step="1" onChange={(e) => { setFinish(e.target.value) }} />
                                            </fieldset>
                                        </div>

                                        <div class="col-1">
                                            <button type="submit" className="btn btn-sm btn-success">Get Data</button>
                                        </div>


                                        <div class="col-2">

                                            <div class="dropdown">
                                                <button class="btn btn-danger dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Download
                                                    <span class="caret"></span></button>
                                                <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                                                    {(() => {
                                                        if (errorChannelData === "Error" || msg === "Error") {
                                                            return null;
                                                        } else {
                                                            return <li role="presentation"><button onClick={TimeSpentTimeFrameDownloadfunc} class="btn btn-info btn-sm btn-block" role="menuitem" tabindex="-1" >Time Spent (Time Frame)</button></li>

                                                        }
                                                    })()}

                                                    {(() => {
                                                        if (channelalltime) {
                                                            return <div><li role="presentation"><button onClick={AlltimeDownloadfunc} class="btn btn-info btn-sm btn-block" role="menuitem" tabindex="-1" >Time Spent All Time</button></li></div>
                                                        } else {

                                                            return null;
                                                        }
                                                    })()}
                                                    {(() => {
                                                        if (last24hrData.length > 0) {
                                                            return <div><li role="presentation"><button onClick={OneDayDownloadfunc} class="btn btn-info btn-block btn-sm" role="menuitem" tabindex="-1" >Time Spent 24 hr</button></li></div>
                                                        } else {

                                                            return null;
                                                        }
                                                    })()}

                                                    {(() => {
                                                        if (errorChannelData === "Error" || msg === "Error") {
                                                            return null;

                                                        } else {
                                                            if (channelalltime) {
                                                                return <li role="presentation"><button onClick={AllTogetherDownloadfunc} class="btn btn-info btn-sm btn-block" role="menuitem" tabindex="-1" >All In One</button></li>
                                                            } else {
                                                                return null;
                                                            }

                                                        }
                                                    })()}

                                                    {/* <li role="presentation" class="divider"></li>
                                        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Information</a></li> */}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>

                        {(() => {
                            if (user !== "") {

                                if (userInfo) {
                                    return <table class="table table-bordered " style={{ backgroundColor: "#FFFF" }}>
                                    <tr>
                                        <th>User Name</th>
                                        <th>Device</th>
                                        <th>Gender</th>
                                        <th>Age</th>
                                        <th>Economic Status</th>
                                    </tr>
                                    <tr>
                                        <td>{userInfo.user_name}</td>
                                        <td>{userInfo.device_name} ({userInfo.device_id})</td>
                                        <td>{userInfo.gender}</td>
                                        <td>{userInfo.age}</td>
                                        <td>{userInfo.economic_status}</td>
                                    </tr>
                                    </table>
                                }




                            }
                        })()}

                        <br />


                        <div class="row justify-content-md-center">
                            <div class="col">

                                {(() => {
                                    if (errorChannelData === "Error" || msg === "Error") {
                                        return <div class="card">
                                            <div class="card-header">
                                                <h4 class="card-title">Time Spent</h4>
                                                <h4><span class="danger">Please Select User & Time Frame</span></h4>
                                            </div>
                                        </div>


                                    } else {
                                        return <div class="card">
                                            <div class="card-header">
                                                <div class="row"><div class="col-6 h2 card-title font-weight-bold">Time Spent (minute)</div><div class="row col h2 card-title text-left">From [<p class="text-primary bold"> {start_string}</p>] to [<p class="text-primary bold">{finish_string}</p>] </div></div>

                                            </div>
                                            <div class="card-content collapse show">
                                                <div>
                                                    <Bar
                                                        data={channelData}
                                                        options={{
                                                            title: {
                                                                display: true,
                                                                text: "Channels",
                                                                fontSize: 20
                                                            },
                                                            scales: {
                                                                y: {
                                                                    beginAtZero: true,
                                                                    ticks: {
                                                                        // Include a dollar sign in the ticks
                                                                        callback: function (value, index, ticks) {
                                                                            return value + ' min';
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            legend: {
                                                                display: true,
                                                                position: 'right'
                                                            }, plugins: {
                                                                legend: {
                                                                    display: false  //remove if want to show label 
                                                                }
                                                            }
                                                        }}
                                                    />
                                                </div>

                                            </div>
                                        </div>

                                    }
                                })()}


                            </div>
                        </div>

                        <br />

                        <div class="row justify-content-md-center">
                            <div class="col" >

                                {(() => {
                                    if (user === "") {
                                        return <div class="card">
                                            <div class="card-header">
                                                <h4 class="card-title">Watch History Of Last 24 Hours</h4>
                                                <h4><span class="danger">Please Select User To See Last 24 Hour Data</span></h4>
                                            </div>
                                        </div>


                                    } else {
                                        return <div class="card">
                                            <div class="card-header">
                                                <h4 class="card-title">Watch History Of Last 24 Hours</h4>
                                            </div>
                                            <div class="card-content collapse show">

                                                <TimelineChart class="w-100" user={user} url="/user/last24WatchingData" time="24" />


                                            </div>
                                        </div>

                                    }
                                })()}

                            </div>
                        </div>



                        <br />

                        <div class="row justify-content-md-center">
                            <div class="col" >

                                {(() => {
                                    if (user === "") {
                                        return <div class="card">
                                            <div class="card-header">
                                                <h4 class="card-title">Watch History Of Last 72 Hours</h4>
                                                <h4><span class="danger">Please Select User To See Last 72 Hour Data</span></h4>
                                            </div>
                                        </div>


                                    } else {
                                        return <div class="card">
                                            <div class="card-header">
                                                <h4 class="card-title">Watch History Of Last 72 Hours</h4>
                                            </div>
                                            <div class="card-content collapse show">

                                                <TimelineChart class="w-100" user={user} url="/user/last72WatchingData" time="72" />


                                            </div>
                                        </div>

                                    }
                                })()}

                            </div>
                        </div>



                        <br />

                        <div class="row match-height">
                            <div class="col-xl-6  col-12">
                                {(() => {
                                    if (channelalltime) {
                                        return <Table title="All Time Channel Views" channels={allTimeData} error={erroralltime} />

                                    } else {
                                        return <div class="card">
                                            <div class="card-header">
                                                <h4 class="card-title"><span>All Time Channel Views</span></h4>
                                            </div>
                                            <div class="card-body">
                                                <h4 ><span class="danger">Please Select User To Show The Table</span></h4>
                                            </div>
                                        </div>

                                    }
                                })()}
                            </div>
                            <div class="col-xl-6 col-12">
                                {(() => {
                                    if (channeldaytime) {
                                        if (last24hrData.length > 0) {
                                            return <Table title="Last 24 Hour Channel Views" channels={last24hrData} error={errordaytime} />
                                        } else {
                                            return <div class="card">
                                                <div class="card-header">
                                                    <h4 class="card-title"><span >Last 24 Hour Channel Views</span></h4>
                                                </div>
                                                <div class="card-body">
                                                    <h4 ><span class="danger">No Data Available For Last 24 hr</span></h4>
                                                </div>
                                            </div>
                                        }


                                    } else {
                                        return <div class="card">
                                            <div class="card-header">
                                                <h4 class="card-title"><span >Last 24 Hour Channel Views</span></h4>
                                            </div>
                                            <div class="card-body">
                                                <h4 ><span class="danger">Please Select User To Show The Table</span></h4>
                                            </div>
                                        </div>

                                    }
                                })()}
                                {/* <DailyTimeSpentList /> */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}
export default UserDefined;