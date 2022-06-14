import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState, useEffect } from "react";
import axios from "axios";
import TotalTimeSpentList, { Products } from "./TotalTimeSpentList";
import DailyTimeSpentList from "./DailyTimeSpentList";
import Select from 'react-select';
import Table from './Table';
import 'chartjs-adapter-date-fns';
import 'chartjs-adapter-moment';




const UserDefined = () => {

    const [user, setUser] = useState("");
    const [userName, setUserName] = useState("");
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
    const [row1, setRow1] = useState("");
    const [channel72Data, setChannel72Data] = useState({
        labels: [],
        datasets: []
    });
    const [row2, setRow2] = useState("");
    const [channel24Data, setChannel24Data] = useState({
        labels: ['BTV', 'unknown', 'Asian TV HD', 'Channel 24', 'T Sports HD', 'nexus', 'Nagorik TV HD'],
        datasets: [{
            label: 'View',
            data:[
                ['2022-02-01', '2022-02-03'],
                ['2022-02-03', '2022-02-06'],
                ['2022-02-06', '2022-02-07'],
                ['2022-02-07', '2022-02-09'],
                ['2022-02-09', '2022-02-13'],
                ['2022-02-13', '2022-02-15'],
                ['2022-02-15', '2022-02-21'],
            ],
            
            backgroundColor: ["#50AF95", "#f3ba2f", "#2a71d0"],
            //borderColor: "black",
            borderWidth: 1,
            categoryPercentage: 0.9,
            barPercentage: 1
        }]
    });



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
    var getCSV = (scsv,user,username) => {
        exportToCsv(user+"-"+username+"-Time_Spent.csv", scsv)
    }

    const userstatusDownloadfunc = () => {
        //console.log(liveChannelData.labels[0]);
        var csv = [["Channel", "Time Spent (min)"]];
        var sampleLive = timeSpentCSV;
        for (var i = 0; i < sampleLive.labels.length; i++) {
            csv.push([sampleLive.labels[i], sampleLive.values[i]]);
        }
        console.log(csv);
        getCSV(csv,user,userName);
    }

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
            start: start,
            finish: finish,
        };

        axios.post("http://127.0.0.1:8000/api/user/userdefined/usertimespent", data).then(rsp => {
            setMsg(rsp.data.error);
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

        axios.post("http://127.0.0.1:8000/api/user/LastSeventyTwoViewsGraph", data).then(rsp => {
            setRow1(rsp.data.rows);
            setChannel72Data(() => ({
                labels: rsp.data.chart_labels, 
                datasets: rsp.data.chart_data
            }));
        }).catch(err => {

        }); 

        axios.post("http://127.0.0.1:8000/api/user/useralltimeview", data).then(rsp => {
            setErroralltime(rsp.data.error);
            setChannelalltime(rsp.data.channels);
        }).catch(err => {

        });

        axios.post("http://127.0.0.1:8000/api/user/userdaytimeviewlist", data).then(rsp => {
            setErrordaytime(rsp.data.error);
            setChanneldaytime(rsp.data.channels);
        }).catch(err => {

        });


    }, [user, start, finish]);




    return (
        <div class="app-content content">
            <div class="content-overlay"></div>
            <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                <div class="content-header row">
                </div>
                <div class="content-body">
                    <div class="card">
                        <div class="card-content">
                            <div class="card-body">
                                
                                    <div class="row col-md-12">

                                        <div class="col-md-4">
                                            <label for="dateTime1">User List</label>
                                            <Select
                                                placeholder="Select User"
                                                options={users.map(user => ({ label: user.user_name, value: user.id }))}
                                                onChange={opt => setUser(opt.value) & setUserName(opt.label)}
                                            />
                                        </div>
                                        <div class="row col-md-3">

                                            <fieldset class="form-group form-group-style">
                                                <label for="dateTime1">Start Time</label>
                                                <input type="datetime-local" class="form-control" id="dateTime1" step="1" onChange={(e)=> {setStart(e.target.value)}}/>
                                            </fieldset>
                                        </div>
                                        <div class="row col-md-3">
                                            <fieldset class="form-group form-group-style">
                                                <label for="dateTime1">Finish Time</label>
                                                <input type="datetime-local" class="form-control" id="dateTime1" step="1" onChange={(e)=> {setFinish(e.target.value)}}/>
                                            </fieldset>
                                        </div>




                                        <div class="col-md-2">

                                            {(() => {
                                                if (msg === "Error") {
                                                    return null;
                                                } else {
                                                    return <button onClick={userstatusDownloadfunc} class="btn btn-danger float-right">Download CSV</button>;

                                                }
                                            })()}


                                        </div>
                                    </div>

                            </div>
                        </div>
                    </div>
                    <br />


                    <div class="row justify-content-md-center">
                        <div class="col">
                            {/* <PostGraph title="Time Spent" text="Channels" url="reach/percent" label="Time Spent" color="blue" credentials={credential} /> */}


                            {(() => {
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
                                            <h4 class="card-title">Time Spent</h4>
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
                            })()}


                        </div>
                    </div>

                    <br/>

                    <div class="row justify-content-md-center">
                        <div class="col">
                            {/* <PostGraph title="Time Spent" text="Channels" url="reach/percent" label="Time Spent" color="blue" credentials={credential} /> */}


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
                                            <div>
                                                <Bar
                                                    data={channel24Data}
                                                    options={{
                                                        title: {
                                                            display: true,
                                                            text: "Channels",
                                                            fontSize: 20
                                                        },
                                                        indexAxis: 'y',
                                                        scales: {
                                                            
                                                            x: {
                                                                min: '2022-02-02',
                                                                type: 'time',
                                                                time: {
                                                                    unit: 'minute'
                                                                },
                                                                stacked: true,
                                                            },
                                                            y: {
                                                                stacked: true,
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
                            })()}


                        </div>
                    </div>
                
                    <br/>

                    <div class="row justify-content-md-center">
                        <div class="col">
                            {/* <PostGraph title="Time Spent" text="Channels" url="reach/percent" label="Time Spent" color="blue" credentials={credential} /> */}


                            {(() => {
                                if (!row1) {
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
                                            <div>
                                                <Bar
                                                    data={channel72Data}
                                                    options={{
                                                        title: {
                                                            display: true,
                                                            text: "Channels",
                                                            fontSize: 20
                                                        },
                                                        indexAxis: 'y',
                                                        scales: {
                                                            
                                                            x: {
                                                                min: '2022-05-15T11:57:29.000000Z',
                                                                type: 'time',
                                                                time: {
                                                                    unit: 'minute'
                                                                },
                                                                stacked: true,
                                                            },
                                                            y: {
                                                                stacked: true,
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
                                    return <Table title="Last 24 Hour Channel Views" channels={channeldaytime} error={errordaytime} />

                                } else {
                                    return <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title"><span class="danger">Please Select User To Show The Table</span></h4>
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

    )
}
export default UserDefined;