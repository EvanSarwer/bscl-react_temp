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
    const [userType, setUserType] = useState("");
    const [region, setRegion] = useState("");
    const [gender, setGender] = useState("");
    const [economic, setEconomic] = useState("");
    const [socio, setSocio] = useState("");

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
                    backgroundColor: ["#50AF95"],
                    //borderColor: "black",
                    borderWidth: 1,
                    categoryPercentage: 0.9,
                    barPercentage: 1
                }]
            }));
        }).catch(err => {

        });

    }, [])
    const BasicchannelDownloadfunc = () => {
        //console.log(liveChannelData.labels[0]);
        var csv = [["Channel", "Value"]];
        var sampleLive = channelData;
        console.log(sampleLive);
        for (var i = 0; i < sampleLive.labels.length; i++) {
            csv.push([sampleLive.labels[i], sampleLive.datasets[0].data[i]]);
        }
        console.log(csv);
        getCSV(csv);
    }

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
    var getCSV = (scsv) => {
        exportToCsv("Export.csv", scsv)
    }
    const GetData = () => {



        var data = {
            start: start,
            finish: finish,
            userType: userType,
            region: region,
            gender: gender,
            economic: economic,
            socio: socio,
            age1: parseInt(document.querySelector("#small-slider > div > div:nth-child(2) > div > div.noUi-tooltip").innerHTML),
            age2: parseInt(document.querySelector("#small-slider > div > div:nth-child(3) > div > div.noUi-tooltip").innerHTML)
        };

        if (start !== "" && finish !== "") {
            if (category === "Reach(000)") {
                axiosConfig.post("/overview/reachusergraph", data).then(rsp => {
                    setChannelData(() => ({
                        labels: rsp.data.channels, datasets: [{
                            label: "Reach (000)", data: rsp.data.reach,
                            backgroundColor: ["#2a71d0"],
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
                            backgroundColor: ["#f3ba2f"],
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
                            backgroundColor: ["#50AF95"],
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
                            backgroundColor: ["#2a71d0"],
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
                            backgroundColor: ["#f3ba2f"],
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
                            backgroundColor: ["#50AF95"],
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



    }




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
                                    <div class="col-md-2">
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
                                    <div class="col-md-2">
                                        <label>Type (STB/OTT)</label>
                                        <select class="custom-select d-block w-100" onChange={(e) => { setUserType(e.target.value) }}>
                                            <option value="">All</option>
                                            <option value="STB">STB</option>
                                            <option value="OTT">OTT</option>
                                        </select>
                                    </div>

                                    <div class="col-md-2">
                                        <label>Region</label>
                                        <select class="custom-select d-block w-100" onChange={(e) => { setRegion(e.target.value) }}>
                                            <option value="">All Region</option>
                                            <option value="Dhaka">Dhaka</option>
                                            <option value="Tangail">Tangail</option>
                                            <option value="Chittagong">Chittagong</option>
                                            <option value="Rajshahi">Rajshahi</option>
                                            <option value="Sylhet">Sylhet</option>
                                            <option value="Mymensingh">Mymensingh</option>
                                            <option value="Khulna">Khulna</option>
                                            <option value="Rongpur">Rongpur</option>
                                            <option value="Barishal">Barishal</option>
                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <label>Gender</label>
                                        <select class="custom-select d-block w-100" onChange={(e) => { setGender(e.target.value) }}>
                                            <option value="">All Gender</option>
                                            <option value="m">Male</option>
                                            <option value="f">Female</option>
                                        </select>
                                    </div>

                                    <div class="col-md-2">
                                        <label>SEC</label>
                                        <select class="custom-select d-block w-100" onChange={(e) => { setEconomic(e.target.value) }}>
                                            <option value="">All SEC</option>
                                            <option value="a1">Lower Class</option>
                                            <option value="c1">Upper Middle Class</option>
                                            <option value="d1">Lower Middle Class</option>
                                            <option value="b1">Upper Class</option>
                                        </select>
                                    </div>

                                    <div class="col-md-2">
                                        <div class="price-range">
                                            <div class="form-group">
                                                <div class="slider-sm slider-success my-1" id="small-slider"></div>
                                            </div>
                                            <div class="price-slider">
                                                <div class="price_slider_amount mb-2">
                                                    <div class="range-amt"><strong>Age Range : </strong> 15
                                                        - 100</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                

                                <div class="row" style={{paddingTop:'25px'}}>
                                    <div class="col-md-2"></div>
                                    
                                    <div class="col-md-2">
                                        <select class="custom-select d-block w-100" onChange={(e) => { setSocio(e.target.value) }}>
                                            <option value="">Urban & Rural</option>
                                            <option value="u">Urban</option>
                                            <option value="r">Rural</option>
                                        </select>
                                    </div>

                                    <fieldset class="form-group form-group-style col-md-2">
                                        <label for="dateTime1">Start Time</label>
                                        <input type="datetime-local" class="form-control" id="dateTime1" step="1" onChange={(e) => { setStart(e.target.value) }} />
                                    </fieldset>

                                    <fieldset class="form-group form-group-style col-md-2">
                                        <label for="dateTime1">Finish Time</label>
                                        <input type="datetime-local" class="form-control" id="dateTime1" step="1" onChange={(e) => { setFinish(e.target.value) }} />
                                    </fieldset>
                                    
                                    <div class="col-md-2 ">
                                        <button onClick={GetData} class="btn btn-info">Get Data</button>

                                    </div>
                                    <div class="col-md-2 ">
                                        <button onClick={BasicchannelDownloadfunc} class="btn btn-danger">Download CSV</button>

                                    </div>

                                </div>







                            </div>
                        </div>
                    </div>



                    <div class="row justify-content-md-center">
                        <div class="col">
                            {/* <PostGraph title="Active Users" text="Active Channels" url="reach/percent" label="Active Users" color="blue" credentials={credential} /> */}
                            <div class="card">
                                <div class="card-header">
                                    <div class="row"><div class="col h2 card-title font-weight-bold">Channels {category}</div><div class="col h2 card-title text-right">From {start} to {finish} </div></div>

                                </div>
                                <div class="card-body collapse show" style={{ height: "35em" }}>


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
                    </div>
                </div>

            </div>
        </div>

    )
}
export default Overview;