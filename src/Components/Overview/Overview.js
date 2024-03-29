import React from 'react';
import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import { Bar } from 'react-chartjs-2';
import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';
import Cookies from 'universal-cookie';


const Overview = () => {
    const cookies = new Cookies();
    const [lastUpdatedDate, setLastUpdatedDate] = useState("");

    function pad(n) {
        return n < 10 ? '0' + n : n
    }
    var yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000)),
        y_datetime = yesterday.getFullYear() + '-' + pad((yesterday.getMonth() + 1)) + '-' + pad(yesterday.getDate()) + ' ' + yesterday.getHours() + ':' + yesterday.getMinutes() + ':' + yesterday.getSeconds();

    var today = new Date(),
        datetime = today.getFullYear() + '-' + pad((today.getMonth() + 1)) + '-' + pad(today.getDate()) + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    if (cookies.get('_role') === "admin" || cookies.get('_role') === "operator") {
        var role_datetime = today.getFullYear() + '-' + pad((today.getMonth() + 1)) + '-' + pad(today.getDate()) + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    } else if (cookies.get('_role') === "general" || cookies.get('_role') === "add-agency") {

        var last_updated_date = new Date(lastUpdatedDate);
        role_datetime = last_updated_date.getFullYear() + '-' + pad((last_updated_date.getMonth() + 1)) + '-' + pad(last_updated_date.getDate()) + ' 23:59:59';
    }

    console.log(new Date(lastUpdatedDate));
    console.log(role_datetime);

    const [category, setCategory] = useState("Reach(000)");
    const [start, setStart] = useState(y_datetime);
    const [finish, setFinish] = useState(datetime);
    const [userType, setUserType] = useState("STB");
    const [region, setRegion] = useState("");
    const [gender, setGender] = useState("");
    const [economic, setEconomic] = useState("");
    // const [socio, setSocio] = useState("");
    const [ageGroup, setAgeGroup] = useState(["0-14", "15-24", "25-34", "35-44", "45 & Above"]);
    const [err, setErr] = useState("error");
    const [loading, setloading] = useState(false);
    const [inputData, setInputData] = useState({});

    const [channelData, setChannelData] = useState({
        labels: [],
        datasets: []
    });

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        setAgeGroup(prevState => {
          const newState = [...prevState];
          const index = newState.indexOf(value);
          if (index === -1) {
            newState.push(value);
          } else {
            newState.splice(index, 1);
          }
          return newState;
        });
      }

    useEffect(() => {

        axiosConfig.get("/data/cleanse/alldates").then((rsp) => {
            // setCleans(rsp.data.data);
            setLastUpdatedDate(rsp.data.lastUpdatedDate);

        }, (err) => { });

        var data = {
            start: start,
            finish: finish,
            userType: userType,
            region: region,
            gender: gender,
            economic: economic,
            //socio: socio,
            ageGroup: ageGroup,
            // age1: parseInt(document.querySelector("#small-slider > div > div:nth-child(2) > div > div.noUi-tooltip").innerHTML),
            // age2: parseInt(document.querySelector("#small-slider > div > div:nth-child(3) > div > div.noUi-tooltip").innerHTML)
        };

        if (start !== "" && finish !== "" && ageGroup.length > 0 && (new Date(start).getTime() <= new Date(role_datetime).getTime()) && (new Date(finish).getTime() <= new Date(role_datetime).getTime())) {
            setErr("");
            setloading(false);
            axiosConfig.post("/overview/reachusergraphh", data).then(rsp => {
                setloading(true);
                //console.log(rsp.data);

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
                setInputData(rsp.data.input_data);
            }).catch(err => {

            });

        } else {
            setErr("error");
        }

    }, [])
    const BasicchannelDownloadfunc = () => {
        //console.log(liveChannelData.labels[0]);
        if (inputData.userType == "") {
            var csv = [["Graph Category-", inputData.category], ["Universe-", parseInt(inputData.universe)], ["Sample-", inputData.sample], ["Audience/User Type-", "All_User_type"], ["Time Duration-", "Start-" + modify_date(inputData.start) + "_Finish-" + modify_date(inputData.finish)], ["", ""], ["Channel", "Value"]];
        } else if (inputData.userType == "OTT") {
            var csv = [["Graph Category-", inputData.category], ["Universe-", parseInt(inputData.universe)], ["Sample-", inputData.sample], ["Audience/User Type-", inputData.userType], ["Time Duration-", "Start-" + modify_date(inputData.start) + "_Finish-" + modify_date(inputData.finish)], ["", ""], ["Channel", "Value"]];
        } else if (inputData.userType == "STB") {
            var csv = [
                ["Graph Category-", inputData.category],
                ["Universe-", parseInt(inputData.universe)],
                ["Sample-", inputData.sample],
                ["Audience/User Type-", inputData.userType],
                ["Region-", (inputData.region ? inputData.region : "All_Region")],
                ["Gender-", (inputData.gender ? inputData.gender == "m" ? "Male" : "Female" : "All-Gender")],
                ["SEC-", (inputData.economic ? (inputData.economic === "a" ? "SEC A" : inputData.economic === "b" ? "SEC B" : inputData.economic === "c" ? "SEC C" : inputData.economic === "d" ? "SEC D" : "SEC E") : "All SEC")],
                ["Age Group-", ageGroup.join(', ')],
                ["Time Duration-", "Start- " + modify_date(inputData.start) + " _ Finish- " + modify_date(inputData.finish)],
                ["", ""],
                ["Channel", "Value"]
            ];        
        }

        //var csv = [["Channel", "Value"]];
        var sampleLive = channelData;
        //console.log(sampleLive);
        for (var i = 0; i < sampleLive.labels.length; i++) {
            csv.push([sampleLive.labels[i], sampleLive.datasets[0].data[i]]);
        }
        //console.log(csv);
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
        if (inputData.userType == "") {
            exportToCsv("Basic_Report(" + inputData.category + "_All-User-Type_" + modify_date(inputData.start) + " - " + modify_date(inputData.finish) + ").csv", scsv)
        } else if (inputData.userType == "OTT") {
            exportToCsv("Basic_Report(" + inputData.category + "_" + inputData.userType + "_" + modify_date(inputData.start) + " - " + modify_date(inputData.finish) + ").csv", scsv)
        } else if (inputData.userType == "STB") {
            exportToCsv("Basic_Report(" + inputData.category + "_" + inputData.userType + "_" + (inputData.region ? inputData.region : "All_Region") + "_" + (inputData.gender ? inputData.gender == "m" ? "Male" : "Female" : "All-Gender") + "_" + (inputData.economic ? (inputData.economic === "a" ? "SEC A" : inputData.economic === "b" ? "SEC B" : inputData.economic === "c" ? "SEC C" : inputData.economic === "d" ? "SEC D" : "SEC E") : "All SEC") +"_Age-" + "invalid" + " - " + "invalid" + "_" + modify_date(inputData.start) + " - " + modify_date(inputData.finish) + ").csv", scsv)
        }

    }

    const GetData = () => {
        var data = {
            start: start,
            finish: finish,
            userType: userType,
            region: region,
            gender: gender,
            economic: economic,
            //socio: socio,
            ageGroup: ageGroup,
            // age1: parseInt(document.querySelector("#small-slider > div > div:nth-child(2) > div > div.noUi-tooltip").innerHTML),
            // age2: parseInt(document.querySelector("#small-slider > div > div:nth-child(3) > div > div.noUi-tooltip").innerHTML)
        };

        if (start !== "" && finish !== "" && ageGroup.length > 0 && (new Date(start).getTime() <= new Date(role_datetime).getTime()) && (new Date(finish).getTime() <= new Date(role_datetime).getTime())) {
            setErr("");
            if (category === "Reach(000)") {
                setloading(false);
                axiosConfig.post("/overview/reachusergraph", data).then(rsp => {
                    setloading(true);
                    //console.log(rsp.data);
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
                    setInputData(rsp.data.input_data);
                }).catch(err => {

                });
            }
            else if (category === "Reach(%)") {
                setloading(false);
                axiosConfig.post("/overview/reachpercentgraph", data).then(rsp => {
                    setloading(true);
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
                    setInputData(rsp.data.input_data);
                }).catch(err => {

                });
            }
            else if (category === "TVR(000)") {
                setloading(false);
                axiosConfig.post("/overview/tvrgraphallchannelzero", data).then(rsp => {
                    setloading(true);
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
                    setInputData(rsp.data.input_data);
                }).catch(err => {

                });
            }
            else if (category === "TVR(%)") {
                setloading(false);
                axiosConfig.post("/overview/tvrgraphallchannelpercent", data).then(rsp => {
                    setloading(true);
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
                    setInputData(rsp.data.input_data);
                }).catch(err => {

                });
            }
            else if (category === "TVR Share(%)") {
                setloading(false);
                axiosConfig.post("/overview/tvrsharegraph", data).then(rsp => {
                    setloading(true);
                    //console.log(rsp.data);
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
                    setInputData(rsp.data.input_data);
                }).catch(err => {

                });
            }
            else if (category === "Time Spent-Universe(minute)") {
                setloading(false);
                axiosConfig.post("/overview/timespentgraph", data).then(rsp => {
                    setloading(true);
                    //console.log(rsp.data);
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
                    setInputData(rsp.data.input_data);
                }).catch(err => {

                });
            }

        } else {
            setErr("error");
        }



    }

    var start_string = new Date(inputData.start).toLocaleString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
    var finish_string = new Date(inputData.finish).toLocaleString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });



    const modify_date = (date) => {

        return new Date(date).toLocaleString(undefined, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    }


    return (
        <div>
            <Header title="Basic Reports" />
            <MainMenu menu="basicreports" />

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
                                                <option value="Time Spent-Universe(minute)">Time Spent (Uni)</option>
                                            </select>
                                        </div>
                                        <div class="col-md-2">
                                            <label>Type (STB/OTT)</label>
                                            <select class="custom-select d-block w-100" disabled value={userType} onChange={(e) => { setUserType(e.target.value) }}>
                                                <option value="">All</option>
                                                <option value="STB">STB</option>
                                                <option value="OTT">OTT</option>

                                            </select>
                                        </div>

                                        <div class="col-md-2">
                                            <label>Region</label>
                                            <select class="custom-select d-block w-100" disabled={userType == "OTT" || userType == ""} onChange={(e) => { setRegion(e.target.value) }}>
                                                <option value="">All Region</option>
                                                <option value="Dhaka">Dhaka</option>
                                                <option value="Chattogram">Chattogram</option>
                                                <option value="Rajshahi">Rajshahi</option>
                                                <option value="Sylhet">Sylhet</option>
                                                <option value="Mymensingh">Mymensingh</option>
                                                <option value="Khulna">Khulna</option>
                                                <option value="Rangpur">Rangpur</option>
                                                <option value="Barishal">Barishal</option>
                                            </select>
                                        </div>
                                        <div class="col-md-2">
                                            <label>Gender</label>
                                            <select class="custom-select d-block w-100" disabled={userType == "OTT" || userType == ""} onChange={(e) => { setGender(e.target.value) }}>
                                                <option value="">All Gender</option>
                                                <option value="m">Male</option>
                                                <option value="f">Female</option>
                                            </select>
                                        </div>

                                        
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Age Group
                                                </label>
                                                <div className="border border-secondary p-1" >
                                                    <label className=""><input type="checkbox" value="0-14" checked={ageGroup.includes("0-14")} onChange={handleCheckboxChange} /> 0-14 Yrs </label>
                                                    <label className="ml-1"><input type="checkbox" value="15-24" checked={ageGroup.includes("15-24")} onChange={handleCheckboxChange} /> 15-24 Yrs</label>
                                                    <label className="ml-1"><input type="checkbox" value="25-34" checked={ageGroup.includes("25-34")} onChange={handleCheckboxChange} /> 25-34 Yrs</label>
                                                    <label className="ml-1"><input type="checkbox" value="35-44" checked={ageGroup.includes("35-44")} onChange={handleCheckboxChange} /> 35-44 Yrs</label>
                                                    <label className="ml-1"><input type="checkbox" value="45 & Above" checked={ageGroup.includes("45 & Above")} onChange={handleCheckboxChange} /> 45 & Above Yrs</label>
                                                </div>
                                            </div>
                                        </div>



                                        {/* <div class="col-md-2">
                                            <div class="price-range">
                                                <div class="form-group">
                                                    <div class="slider-sm slider-success my-1" id="small-slider"></div>
                                                </div>
                                                <div class="price-slider">
                                                    <div class="price_slider_amount mb-2">
                                                        <div class="range-amt"><strong>Age Range : </strong> 1
                                                            - 100</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}


                                    </div>


                                    <div class="row" style={{ paddingTop: '25px' }}>
                                        <div class="col-md-2"></div>

                                        <div class="col-md-2">
                                            <label>SEC</label>
                                            <select class="custom-select d-block w-100" disabled={userType == "OTT" || userType == ""} onChange={(e) => { setEconomic(e.target.value) }}>
                                                <option value="">All SEC</option>
                                                <option value="a">SEC A</option>
                                                <option value="b">SEC B</option>
                                                <option value="c">SEC C</option>
                                                <option value="d">SEC D</option>
                                                <option value="e">SEC D</option>

                                            </select>
                                        </div>

                                        {/* <div class="col-md-2">
                                            <select class="custom-select d-block w-100" disabled={userType == "OTT" || userType == ""} onChange={(e) => { setSocio(e.target.value) }}>
                                                <option value="">Urban & Rural</option>
                                                <option value="u">Urban</option>
                                                <option value="r">Rural</option>
                                            </select>
                                        </div> */}

                                        <fieldset class="form-group form-group-style col-md-2">
                                            <label for="dateTime1">Start Time</label>
                                            <input type="datetime-local" class="form-control" id="dateTime1" step="1" onChange={(e) => { setStart(e.target.value) }} />
                                        </fieldset>

                                        <fieldset class="form-group form-group-style col-md-2">
                                            <label for="dateTime1">Finish Time</label>
                                            <input type="datetime-local" class="form-control" id="dateTime1" step="1" onChange={(e) => { setFinish(e.target.value) }} />
                                        </fieldset>

                                        <div class="col-md-2 ">
                                            <button onClick={GetData} class="btn btn-info">View</button>

                                        </div>
                                        {(() => {
                                            if (loading === true) {
                                                return (
                                                    <div class="col-md-2 ">
                                                        <button onClick={BasicchannelDownloadfunc} class="btn btn-danger">Download CSV</button>

                                                    </div>
                                                )
                                            }
                                        })()}

                                    </div>







                                </div>
                            </div>
                        </div>



                        <div class="row justify-content-md-center">
                            <div class="col">
                                {/* <PostGraph title="Active Users" text="Active Channels" url="reach/percent" label="Active Users" color="blue" credentials={credential} /> */}

                                {(() => {
                                    if (err === "error") {
                                        return (
                                            <div class="card">
                                                <div class="card-header">
                                                    <div class="h2 card-title text-warning font-weight-bold">Please enter a valid date until <span class="text-primary bold"> {modify_date(role_datetime)}</span></div>

                                                </div>
                                                <div class="card-body collapse show">


                                                </div>
                                            </div>
                                        )
                                    } else {

                                        if (loading) {
                                            return (
                                                <div class="card">
                                                    <div class="card-header">
                                                        <div class="row"><div class="col-6 h2 card-title font-weight-bold">Channels {inputData.category} <p><small>Universe (000): {parseInt(inputData.universe)} <br></br> Sample: {inputData.sample}</small></p></div><div class="row col h2 card-title text-left">From [<p class="text-primary bold"> {start_string}</p>] to [<p class="text-primary bold">{finish_string}</p>] </div></div>

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
                                            )


                                        } else {
                                            return (
                                                <div class="card">
                                                    <div class="card-header">
                                                        <div class="row"><div class="col-6 h2 card-title font-weight-bold">Channels {category}</div></div>

                                                    </div>
                                                    <div class="card-body collapse show" style={{ height: "35em" }}>

                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831" class="rounded mx-auto d-block" alt="..." />


                                                    </div>
                                                </div>

                                            )

                                        }


                                    }
                                })()}



                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}
export default Overview;