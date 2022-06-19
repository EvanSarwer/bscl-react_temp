import React from 'react';
import CurrentStatus from "../CurrentStatus/CurrentStatus";
import Graph from "../Graph/Graph";
import PostGraph from "../Graph/PostGraph";
import TvrGraph from "../Graph/TvrGraph";
import ActiveChannelTable from "../Table/ActiveChannelTable";
import ActiveUserTable from "../Table/ActiveUserTable";
import Map from "../Map/Map";
import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';


const Overview = () => {

    var yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000)),
    y_datetime = yesterday.getFullYear() + '-' + (yesterday.getMonth() + 1) + '-' + yesterday.getDate() + ' ' + yesterday.getHours() + ':' + yesterday.getMinutes() + ':' + yesterday.getSeconds();

    var today = new Date(),
    datetime = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    const [category, setCategory] = useState("Reach(000)");
    const [start, setStart] = useState(y_datetime);
    const [finish, setFinish] = useState(datetime);

    const [channelData, setChannelData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        var data = {
            start: start,
            finish: finish
        };

        axiosConfig.post("/overview/reachusergraph", data).then(rsp => {
            console.log(rsp.data);
            setChannelData(() => ({
                labels: rsp.data.channels, datasets: [{
                    label: "Reach (000)", data: rsp.data.reach,
                    backgroundColor: ["#50AF95", "#f3ba2f", "#2a71d0"],
                    //borderColor: "black",
                    borderWidth: 1,
                    categoryPercentage: 0.9,
                    barPercentage: 1
                }]
            }));
        }).catch(err => {

        });

    }, [])


    useEffect(() => {
        var data = {
            start: start,
            finish: finish,
        };

        if (start !== "" && finish !== "") {
            if (category === "Reach(000)") {
                axiosConfig.post("/overview/reachusergraph", data).then(rsp => {
                    setChannelData(() => ({
                        labels: rsp.data.channels, datasets: [{
                            label: "Reach (000)", data: rsp.data.reach,
                            backgroundColor: ["#50AF95", "#f3ba2f", "#2a71d0"],
                            //borderColor: "black",
                            borderWidth: 1,
                            categoryPercentage: 0.9,
                            barPercentage: 1
                        }]
                    }));
                }).catch(err => {

                });
            }
            else if (category === "Reach(%)") {
                axiosConfig.post("/overview/reachpercentgraph", data).then(rsp => {
                    setChannelData(() => ({
                        labels: rsp.data.channels, datasets: [{
                            label: "Reach (%)", data: rsp.data.reach,
                            backgroundColor: ["#50AF95", "#f3ba2f", "#2a71d0"],
                            //borderColor: "black",
                            borderWidth: 1,
                            categoryPercentage: 0.9,
                            barPercentage: 1
                        }]
                    }));
                }).catch(err => {

                });
            }
            else if (category === "TVR(000)") {
                axiosConfig.post("/overview/tvrgraphallchannelzero", data).then(rsp => {
                    setChannelData(() => ({
                        labels: rsp.data.channels, datasets: [{
                            label: "TVR (000)", data: rsp.data.tvrs,
                            backgroundColor: ["#50AF95", "#f3ba2f", "#2a71d0"],
                            //borderColor: "black",
                            borderWidth: 1,
                            categoryPercentage: 0.9,
                            barPercentage: 1
                        }]
                    }));
                }).catch(err => {

                });
            }
            else if (category === "TVR(%)") {
                axiosConfig.post("/overview/tvrgraphallchannelpercent", data).then(rsp => {
                    setChannelData(() => ({
                        labels: rsp.data.channels, datasets: [{
                            label: "TVR (%)", data: rsp.data.tvrs,
                            backgroundColor: ["#50AF95", "#f3ba2f", "#2a71d0"],
                            //borderColor: "black",
                            borderWidth: 1,
                            categoryPercentage: 0.9,
                            barPercentage: 1
                        }]
                    }));
                }).catch(err => {

                });
            }
            else if (category === "TVR Share(%)") {
                axiosConfig.post("/overview/tvrsharegraph", data).then(rsp => {
                    console.log(rsp.data);
                    setChannelData(() => ({
                        labels: rsp.data.channels, datasets: [{
                            label: "TVR Share (%)", data: rsp.data.share,
                            backgroundColor: ["#50AF95", "#f3ba2f", "#2a71d0"],
                            //borderColor: "black",
                            borderWidth: 1,
                            categoryPercentage: 0.9,
                            barPercentage: 1
                        }]
                    }));
                }).catch(err => {

                });
            }
            else if (category === "Time Spent(Uni)") {
                axiosConfig.post("/overview/timespentgraph", data).then(rsp => {
                    console.log(rsp.data);
                    setChannelData(() => ({
                        labels: rsp.data.channels, datasets: [{
                            label: "Time Spent (Uni)", data: rsp.data.totaltime,
                            backgroundColor: ["#50AF95", "#f3ba2f", "#2a71d0"],
                            //borderColor: "black",
                            borderWidth: 1,
                            categoryPercentage: 0.9,
                            barPercentage: 1
                        }]
                    }));
                }).catch(err => {

                });
            }

        }


    }, [category, start, finish]);




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
                                <div class="row">
                                    <div class="col-md-4">
                                        <label>Graph Category</label>
                                        <select class="custom-select d-block w-100" onChange={(e) => { setCategory(e.target.value) }}>
                                            <option value="Reach(000)">Reach (000)</option>
                                            <option value="Reach(%)">Reach (%)</option>
                                            <option value="TVR(000)">TVR (000)</option>
                                            <option value="TVR(%)">TVR (%)</option>
                                            <option value="TVR Share(%)">TVR Share (%)</option>
                                            <option value="Time Spent(Uni)">Time Spent (Uni)</option>
                                        </select>
                                    </div>


                                    <fieldset class="form-group form-group-style col-md-3">
                                        <label for="dateTime1">Start Time</label>
                                        <input type="datetime-local" class="form-control" id="dateTime1" step="1" onChange={(e) => { setStart(e.target.value) }} />
                                    </fieldset>


                                    <fieldset class="form-group form-group-style col-md-3">
                                        <label for="dateTime1">Finish Time</label>
                                        <input type="datetime-local" class="form-control" id="dateTime1" step="1" onChange={(e) => { setFinish(e.target.value) }} />
                                    </fieldset>


                                    <div class="col-md-2 text-right">
                                        <button class="btn btn-danger">Download CSV</button>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>



                    <div class="row justify-content-md-center">
                        <div class="col">
                            {/* <PostGraph title="Active Users" text="Active Channels" url="reach/percent" label="Active Users" color="blue" credentials={credential} /> */}
                            <div class="card">
                                <div class="row card-header">
                                    <div class="col h2 card-title font-weight-bold">Channels {category}</div><div class="col h2 card-title text-right">From {start} to {finish} </div>
                                </div>
                                <div class="card-body collapse show" style={{height:"35em"}}>


                                    <Bar
                                        data={channelData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            title: {
                                                display: true,
                                                text: "Channels",
                                                fontSize: 1
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
                    </div>
                </div>

            </div>
        </div>

    )
}
export default Overview;