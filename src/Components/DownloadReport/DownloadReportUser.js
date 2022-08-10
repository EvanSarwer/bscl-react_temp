import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import React from 'react';
import Select from 'react-select';
import Header from "../Header/Header";
import MainMenu from "../MainMenu/MainMenu";
import HeaderUser from "../Header/HeaderUser";
import MainMenuUser from "../MainMenu/MainMenuUser";

const DownloadReportUser = () => {

    const [region, setRegion] = useState("");
    const [gender, setGender] = useState("");
    const [economic, setEconomic] = useState("");
    const [socio, setSocio] = useState("");
    const [age, setAge] = useState("");
    const [liveChannelData, setLiveChannelData] = useState({});


    const [category, setCategory] = useState("Reach(000)");
    const [start, setStart] = useState("2022-05-18 00:00:00");
    const [finish, setFinish] = useState("2022-05-18 23:59:59");

    const [basicChannelData, setbasicChannelData] = useState({});

    const [user, setUser] = useState("");
    const [time, setTime] = useState("");
    const [users, setUsers] = useState([]);
    const [userstatuschannelData, setuserstatusChannelData] = useState({});





    const LivechannelDownloadfunc = () => {
        //console.log(liveChannelData.labels[0]);
        var csv = [["Channel", "Value"]];
        var sampleLive = liveChannelData;
        for (var i = 0; i < sampleLive.labels.length; i++) {
            csv.push([sampleLive.labels[i], sampleLive.values[i]]);
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
    useEffect(() => {
        var data = {
            region: region,
            gender: gender,
            economic: economic,
            socio: socio,
            age1: parseInt(document.querySelector("#small-slider > div > div:nth-child(2) > div > div.noUi-tooltip").innerHTML),
            age2: parseInt(document.querySelector("#small-slider > div > div:nth-child(3) > div > div.noUi-tooltip").innerHTML)
        };

        axiosConfig.post("/livechannel/activechannellistgraph", data).then(rsp => {
            //console.log(rsp.data);
            setLiveChannelData(() => ({
                labels: rsp.data.channels, values: rsp.data.user_count
            }));
            console.log(liveChannelData);
            //             var csv=[["Channel","Value"]];
            // for(var i=0;i<rsp.data.channels.length;i++){
            //     csv.push([rsp.data.channels[i],rsp.data.user_count[i]]);
            // }
            // console.log(csv);
        }).catch(err => {

        });

    }, [region, gender, economic, socio, age]);





    //////////user status////////////

    const userstatusDownloadfunc = () => {
        //console.log(liveChannelData.labels[0]);
        var csv = [["Channel", "Value"]];
        var sampleLive = userstatuschannelData;
        for (var i = 0; i < sampleLive.labels.length; i++) {
            csv.push([sampleLive.labels[i], sampleLive.values[i]]);
        }
        console.log(csv);
        getCSV(csv);
    }

    useEffect(() => {

        axiosConfig.get("/getuserlist").then(rsp => {
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

        axiosConfig.post("/user/usertimespent", data).then(rsp => {
            console.log(rsp.data);
            setuserstatusChannelData(() => ({
                labels: rsp.data.channels, values: rsp.data.totaltime
            }));
            //console.log(userstatuschannelData);
        }).catch(err => {

        });



    }, [user, time]);



    //////////user status////////////


    //////////overview/////////////
    const BasicchannelDownloadfunc = () => {
        //console.log(liveChannelData.labels[0]);
        var csv = [["Channel", "Value"]];
        var sampleLive = basicChannelData;
        for (var i = 0; i < sampleLive.labels.length; i++) {
            csv.push([sampleLive.labels[i], sampleLive.values[i]]);
        }
        console.log(csv);
        getCSV(csv);
    }

    useEffect(() => {
        var data = {
            start: start,
            finish: finish,
        };

        if (start !== "" && finish !== "") {
            if (category === "Reach(000)") {
                axiosConfig.post("/overview/reachusergraph", data).then(rsp => {
                    setbasicChannelData(() => ({
                        labels: rsp.data.channels, values: rsp.data.reach
                    }));
                }).catch(err => {

                });
            }
            else if (category === "Reach(%)") {
                axiosConfig.post("/overview/reachpercentgraph", data).then(rsp => {
                    setbasicChannelData(() => ({
                        labels: rsp.data.channels, values: rsp.data.reach
                    }));
                }).catch(err => {

                });
            }
            else if (category === "TVR(000)") {
                axiosConfig.post("/overview/tvrgraphallchannelzero", data).then(rsp => {
                    setbasicChannelData(() => ({
                        labels: rsp.data.channels, values: rsp.data.tvrs
                    }));
                }).catch(err => {

                });
            }
            else if (category === "TVR(%)") {
                axiosConfig.post("/overview/tvrgraphallchannelpercent", data).then(rsp => {
                    setbasicChannelData(() => ({
                        labels: rsp.data.channels, values: rsp.data.tvrs
                    }));
                }).catch(err => {

                });
            }
            else if (category === "TVR Share(%)") {
                axiosConfig.post("/overview/tvrsharegraph", data).then(rsp => {
                    //console.log(rsp.data);
                    setbasicChannelData(() => ({
                        labels: rsp.data.channels, values: rsp.data.share
                    }));
                }).catch(err => {

                });
            }
            else if (category === "Time Spent(Uni)") {
                axiosConfig.post("/overview/timespentgraph", data).then(rsp => {
                    console.log(rsp.data);
                    setbasicChannelData(() => ({
                        labels: rsp.data.channels, values: rsp.data.totaltime
                    }));
                }).catch(err => {

                });
            }
            console.log(basicChannelData);
        }


    }, [category, start, finish]);







    return (
        <div><HeaderUser title="Report Generation" />
            <MainMenuUser menu="reportgeneration" />
            <div class="app-content content">
                <div class="content-overlay"></div>
                <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                    <div class="content-header row">
                    </div>
                    <div class="content-body">



                        <div class="card">
                            <div class="card-content">
                                <div class="card-body">
                                    <h1>Download User(General) Report:</h1>

                                    <div class="row">

                                        <div class="col-md-5">
                                            <Select
                                                placeholder="Select User"
                                                options={users.map(user => ({ label: user.user_name, value: user.id }))}
                                                onChange={opt => setUser(opt.value)}
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

                                            <button onClick={userstatusDownloadfunc} class="btn btn-danger">Download CSV</button>



                                        </div>
                                    </div>

                                    <br />
                                    <br />

                                </div>
                            </div>
                        </div>



                        <div class="card">
                            <div class="card-content">
                                <div class="card-body">
                                    <h1>Download Channel Trend Report:</h1>



                                    <br />
                                    <br />

                                </div>
                            </div>
                        </div>




                        <div class="card">
                            <div class="card-content">
                                <div class="card-body">
                                    <h1>Download Basic Report:</h1>
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
                                            <button onClick={BasicchannelDownloadfunc} class="btn btn-danger">Download CSV</button>
                                        </div>


                                    </div>


                                    <br />
                                    <br />

                                </div>
                            </div>
                        </div>






                        <div class="card">
                            <div class="card-content">
                                <div class="card-body">
                                    <h1>Download Live Channel Report:</h1>


                                    <div class="row">
                                        <div class="col-md-2">
                                            <select class="custom-select d-block w-100" onChange={(e) => { setRegion(e.target.value) }}>
                                                <option value="">Choose Region</option>
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
                                            <select class="custom-select d-block w-100" onChange={(e) => { setGender(e.target.value) }}>
                                                <option value="">Choose Gender</option>
                                                <option value="m">Male</option>
                                                <option value="f">Female</option>
                                            </select>
                                        </div>
                                        <div class="col-md-2">

                                            <select class="custom-select d-block w-100" onChange={(e) => { setEconomic(e.target.value) }}>
                                                <option value="">Economic Status</option>
                                                <option value="a1">Lower Class</option>
                                                <option value="c1">Upper Middle Class</option>
                                                <option value="d1">Lower Middle Class</option>
                                                <option value="b1">Upper Class</option>
                                            </select>
                                        </div>
                                        <div class="col-md-2">


                                            <select class="custom-select d-block w-100" onChange={(e) => { setSocio(e.target.value) }}>
                                                <option value="">Socio Status</option>
                                                <option value="u">Urban</option>
                                                <option value="r">Rural</option>
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
                                        <div class="col-md-2 text-right">
                                            <button onClick={LivechannelDownloadfunc} class="btn btn-danger">Download CSV</button>
                                        </div>


                                    </div>
                                    <br />
                                    <br />

                                </div>
                            </div>
                        </div>




                    </div>

                </div>
            </div>
        </div>

    )
}
export default DownloadReportUser;