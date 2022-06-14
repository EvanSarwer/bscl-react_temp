import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState, useEffect } from "react";
import axios from "axios";
import TotalTimeSpentList, { Products } from "./TotalTimeSpentList";
import DailyTimeSpentList from "./DailyTimeSpentList";
import Select from 'react-select';
import Table from './Table';




const UserStatus = () => {

    const [user, setUser] = useState("");
    const [userName, setUserName] = useState("");
    const [time, setTime] = useState("");
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
        exportToCsv(user+"_"+username+"-Time_Spent.csv", scsv)
    }

    const userstatusDownloadfunc = () => {
        //console.log(liveChannelData.labels[0]);
        var csv = [["Channel", "Time Spent (min)", "Time Frame"]];
        var sampleLive = timeSpentCSV;
        for (var i = 0; i < sampleLive.labels.length; i++) {
            csv.push([sampleLive.labels[i], sampleLive.values[i], time]);
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
            time: time,
        };

        axios.post("http://127.0.0.1:8000/api/user/usertimespent", data).then(rsp => {
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

                                {(() => {
                                    if (msg === "Error") {
                                        return null;
                                    } else {
                                        return <button onClick={userstatusDownloadfunc} class="btn btn-danger float-right">Download CSV</button>;

                                    }
                                })()}


                            </div>
                        </div>
                    </form>
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
export default UserStatus;