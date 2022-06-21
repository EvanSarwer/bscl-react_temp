import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState, useEffect } from "react";
import axiosConfig from '../axiosConfig';
import TotalTimeSpentList, { Products } from "./TotalTimeSpentList";
import DailyTimeSpentList from "./DailyTimeSpentList";
import Select from 'react-select';
import Table from './Table';
import TimelineChart from './TimelineChart';




const UserStatus = () => {

    const [user, setUser] = useState("");
    const [userName, setUserName] = useState("");
    const [time, setTime] = useState("");
    const [start, setStart] = useState("");
    const [finish, setFinish] = useState("");
    const [msg, setMsg] = useState("");
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
    let dArray = [];



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
        var csv = [["Channel", "Time Spent(min)/" + time + "(" + start + " to " + finish + ")", "Time Spent(min)/All Time Spent", "Time Spent(min)/Last 24hr"]];
        var sampleLive = timeSpentCSV;
        var sampleLive1 = channelalltime;
        var sampleLive2 = channeldaytime;
        for (var i = 0; i < sampleLive.labels.length; i++) {
            csv.push([sampleLive.labels[i], sampleLive.values[i], sampleLive1[i].totaltime, sampleLive2[i].totaltime]);
        }
        console.log(csv);
        getCSV(csv, user, userName);
    }

    const TimeSpentTimeFrameDownloadfunc = () => {
        //console.log(liveChannelData.labels[0]);
        var csv = [["Channel", "Time Spent (min)/" + time + "(" + start + " to " + finish + ")"]];
        var sampleLive = timeSpentCSV;
        for (var i = 0; i < sampleLive.labels.length; i++) {
            csv.push([sampleLive.labels[i], sampleLive.values[i]]);
        }
        console.log(csv);
        getCSV(csv, user, userName);
    }
    const AlltimeDownloadfunc = () => {
        //console.log(liveChannelData.labels[0]);
        var csv = [["Channel", "Min/All Time Spent"]];
        var sampleLive = channelalltime;
        for (var i = 0; i < sampleLive.length; i++) {
            csv.push([sampleLive[i].channel_name, sampleLive[i].totaltime]);
        }
        console.log(csv);
        getCSV(csv, user, userName);
    }
    const OneDayDownloadfunc = () => {
        //console.log(liveChannelData.labels[0]);
        var csv = [["Channel", "Min/Last 24hr"]];
        var sampleLive = channeldaytime;
        for (var i = 0; i < sampleLive.length; i++) {
            csv.push([sampleLive[i].channel_name, sampleLive[i].totaltime]);
        }
        console.log(csv);
        getCSV(csv, user, userName);
    }

    useEffect(() => {

        axiosConfig.get("/getuserlist").then(rsp => {
            setUsers(rsp.data.users);

        }).catch(err => {

        })

    }, [])

    useEffect(() => {
        var data = {
            user: user,
            time: time,
        };

        axiosConfig.post("/user/usertimespent", data).then(rsp => {
            setMsg(rsp.data.error);
            setStart(rsp.data.start);
            setFinish(rsp.data.finish);
            setChannelData(() => ({
                labels: rsp.data.channels, datasets: [{
                    label: "Time Spent(min)", data: rsp.data.totaltime,
                    backgroundColor: ["#50AF95", "#f3ba2f", "#2a71d0"],
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

        axiosConfig.post("/user/useralltimeview", data).then(rsp => {
            setErroralltime(rsp.data.error);
            setChannelalltime(rsp.data.channels);
        }).catch(err => {

        });

        axiosConfig.post("/user/userdaytimeviewlist", data).then(rsp => {
            setErrordaytime(rsp.data.error);
            setChanneldaytime(rsp.data.channels);
            for (var i = 0; i < rsp.data.channels.length; i++) {
                if (rsp.data.channels[i].totaltime > 0) {
                    dArray.push(rsp.data.channels[i]);
                }
            }
            setLast24hrData(dArray);
        }).catch(err => {

        });

    }, [user, time]);


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
                                <Select
                                    placeholder="Select User"
                                    options={users.map(user => ({ label: user.user_name, value: user.id }))}
                                    onChange={opt => setUser(opt.value) & setUserName(opt.label)}
                                />
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
                                <div class="dropdown">
                                    <button class="btn btn-danger dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Download
                                        <span class="caret"></span></button>
                                    <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                                        {(() => {
                                            if (msg === "Error") {
                                                return null;
                                            } else {
                                                return <li role="presentation"><button onClick={TimeSpentTimeFrameDownloadfunc} class="btn btn-info btn-sm btn-block" role="menuitem" tabindex="-1" >Time Spent (Time Frame)</button></li>

                                            }
                                        })()}

                                        {(() => {
                                            if (channelalltime) {
                                                return <div><li role="presentation"><button onClick={AlltimeDownloadfunc} class="btn btn-info btn-sm btn-block" role="menuitem" tabindex="-1" >Time Spent All Time</button></li>
                                                    <li role="presentation"><button onClick={OneDayDownloadfunc} class="btn btn-info btn-block btn-sm" role="menuitem" tabindex="-1" >Time Spent 24 hr</button></li></div>
                                            } else {

                                                return null;
                                            }
                                        })()}

                                        {(() => {
                                            if (msg === "Error") {
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
                    <br />


                    <div class="row justify-content-md-center">
                        <div class="col">


                            {(() => {
                                if (!user) {
                                    return <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title">Time Spent</h4>
                                            <h4><span class="danger">Please Select User & Time Frame</span></h4>
                                        </div>
                                    </div>
                                } else {
                                    if (msg === "Error") {
                                        return <div class="card">
                                            <div class="card-header">
                                                <h4 class="card-title">Time Spent</h4>
                                                <h4><span class="danger">Please Select User & Time Frame</span></h4>
                                            </div>
                                        </div>


                                    } else {
                                        return <div class="card">
                                            <div class="card-header">
                                                <div class="row card-title"><div class="col h5 font-weight-bold">Time Spent</div><div class="col h5 card-title text-right">From {start} to {finish}</div></div>
                                            </div>
                                            <div class="card-content collapse show ">
                                                <div style={{ height: "35em" }}>
                                                    <Bar
                                                        data={channelData}
                                                        options={{
                                                            responsive: true,
                                                            maintainAspectRatio: false,
                                                            title: {
                                                                display: true,
                                                                text: "Channels",
                                                                fontSize: 20
                                                            },
                                                            scales: {
                                                                y: {
                                                                    beginAtZero: true
                                                                }
                                                            },
                                                            legend: {
                                                                display: true,
                                                                position: 'right'
                                                            }
                                                        }}
                                                    />
                                                </div>

                                            </div>
                                        </div>

                                    }

                                }
                            })()}


                        </div>
                    </div>


                    <br />

                    <div class="row justify-content-md-center">
                        <div class="col" >

                            {(() => {
                                if (!user) {
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
                                if (!user) {
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
                                    return <Table title="All Time Channel Views" channels={channelalltime} error={erroralltime} />

                                } else {
                                    return <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title"><span class="danger">Please Select User To Show The Table</span></h4>
                                        </div>
                                    </div>

                                }
                            })()}
                        </div>
                        <div class="col-xl-6 col-12">
                            {(() => {
                                if (channeldaytime) {
                                    return <Table title="Last 24 Hour Channel Views" channels={last24hrData} error={errordaytime} />

                                } else {
                                    return <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title"><span class="danger">Please Select User To Show The Table</span></h4>
                                        </div>
                                    </div>

                                }
                            })()}
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}
export default UserStatus;