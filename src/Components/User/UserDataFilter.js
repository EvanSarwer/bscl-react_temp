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
import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';
import Cookies from 'universal-cookie';
import Select from 'react-select';



const UserDataFilter = () => {
    const cookies = new Cookies();
    const [channelId, setChannelId] = useState("");
    const [filterName, setFilterName] = useState("");
    const [region, setRegion] = useState("");
    const [gender, setGender] = useState("");
    const [economic, setEconomic] = useState("");
    const [socio, setSocio] = useState("");
    const [fromAge, setFromAge] = useState("");
    const [toAge, setToAge] = useState("");
    const [userType, setUserType] = useState("STB");
    const [activeUserCSV, setActiveUserCSV] = useState({});
    const [channels, setchannels] = useState([]);
    const [allUserFilterData, setAllUserFilterData] = useState([]);
    const [start, setStart] = useState("");
    const [finish, setFinish] = useState("");
    const [err_msg, setErrMsg] = useState({});
    const [query, setQuery] = useState("");
    const [channelData, setChannelData] = useState({
        labels: [],
        datasets: []
    });

    function pad(n) {
        return n < 10 ? '0' + n : n
    }
    var today = new Date(),
        datetime = today.getFullYear() + '-' + pad((today.getMonth() + 1)) + '-' + pad(today.getDate()) + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();


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
        if (userType == "") {
            exportToCsv("Active_User(_All-User-Type_" + modify_date(datetime) + ").csv", scsv)
        } else if (userType == "OTT") {
            exportToCsv("Active_User(" + userType + "_" + modify_date(datetime) + ").csv", scsv)
        } else if (userType == "STB") {
            exportToCsv("Active_User(" + userType + "_" + (region ? region : "All_Region") + "_" + (gender ? gender == "m" ? "Male" : "Female" : "All-Gender") + "_" + (economic ? (economic === "a" ? "Poorest" : economic === "b" ? "Poorer" : economic === "c" ? "Middle" : economic === "d" ? "Richer" : "Richest") : "All SEC") + "_" + (socio ? socio == "u" ? "Urban" : "Rural" : "Urban&Rural") + "_Age-" + parseInt(document.querySelector("#small-slider > div > div:nth-child(2) > div > div.noUi-tooltip").innerHTML) + " - " + parseInt(document.querySelector("#small-slider > div > div:nth-child(3) > div > div.noUi-tooltip").innerHTML) + "_" + modify_date(datetime) + ").csv", scsv)
        }

        //exportToCsv("Acive-User.csv", scsv)
    }

    const LivechannelDownloadfunc = () => {
        //console.log(liveChannelData.labels[0]);
        if (userType == "") {
            var csv = [["All_User_type", "Time-" + modify_date(datetime)], ["Channel", "Active_Users"]];
        } else if (userType == "OTT") {
            var csv = [[userType, "Time-" + modify_date(datetime)], ["Channel", "Active_Users"]];
        } else if (userType == "STB") {
            var csv = [[userType, (region ? region : "All_Region"), (gender ? gender == "m" ? "Male" : "Female" : "All-Gender"), (economic ? (economic === "a" ? "Poorest" : economic === "b" ? "Poorer" : economic === "c" ? "Middle" : economic === "d" ? "Richer" : "Richest") : "All SEC"), (socio ? socio == "u" ? "Urban" : "Rural" : "Urban&Rural"), "Age-Range-" + parseInt(document.querySelector("#small-slider > div > div:nth-child(2) > div > div.noUi-tooltip").innerHTML) + " to " + parseInt(document.querySelector("#small-slider > div > div:nth-child(3) > div > div.noUi-tooltip").innerHTML), "Time-" + modify_date(datetime)], ["Channel", "Active_Users"]];
        }


        //var csv = [["Channel", "Active Users"]];
        var sampleLive = activeUserCSV;
        for (var i = 0; i < sampleLive.labels.length; i++) {
            csv.push([sampleLive.labels[i], sampleLive.values[i]]);
        }
        //console.log(csv);
        getCSV(csv);
    }

    useEffect(() => {
        axiosConfig.get("/user/userfilterdata/list").then((rsp) => {
            setAllUserFilterData(rsp.data);
            console.log(rsp.data[0]);
        }, (err) => { });

        axiosConfig.get("/trend/channels").then(rsp => {
            //console.log(rsp.data);
            setchannels(rsp.data.channels);
            //console.log(channels);


        }).catch(err => {

        })

    }, []);

    const ViewData = () => {

        var data = {
            filter_name: filterName,
            channel_id: channelId,
            start: start,
            finish: finish,
            gender: gender,
            from_age: fromAge,
            to_age: toAge
        };

        axiosConfig.post("/user/userfilterdata/add", data).then((rsp) => {
            alert(rsp.data.message);
            //window.location.href = "/device";
            //window.location.href = `/userdatafilter`;

        }, (err) => {
            if (err.response.status === 422) {
                setErrMsg(err.response.data);

            }
        });

        axiosConfig.get("/user/userfilterdata/list").then((rsp) => {
            setAllUserFilterData(rsp.data);
            console.log(rsp.data[0]);
        }, (err) => { });



    }


    const Search = (data) => {
        return data.filter(
            (item) =>
                item.start.toLowerCase().includes(query.toLowerCase())
            // || item.id.toString().includes(query)
        );
    };


    const modify_date = (date) => {

        return new Date(date).toLocaleString(undefined, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }


    return (
        <div><Header title="User Data Filter" />
            <MainMenu menu="userdatafilter" />

            {/* <div class="app-content content"> */}
            <div class=" content">
                <div class="content-wrapper" style={{ backgroundColor: "azure" }} >

                    <div class="content-body">

                        <div class="card">
                            <br/>
                            <div class="row card-content collapse show">

                            <div class="col-md pl-2">
                                <br />
                                <button type="submit" onClick={ViewData} class="form-control btn-sm btn-info font-weight-bold" >+ Add filter</button>
                            </div>
                            <div class="col-md">
                                <label for="dateTime1" class="font-weight-bold">Filter Name</label>
                                <input type="text" class="form-control" onChange={(e) => { setFilterName(e.target.value) }} name="filter_name" placeholder="name" />
                                <span class="text-danger">{err_msg.filter_name ? err_msg.filter_name[0] : ''}</span>
                            </div>
                            <div class="col-md">
                                <label for="dateTime1" class="font-weight-bold">Channel Name</label>
                                <Select
                                    placeholder="Select channel"
                                    options={channels.map(channel => ({ label: channel.name, value: channel.id }))}
                                    onChange={opt => setChannelId(opt.value)}
                                />
                                <span class="text-danger">{err_msg.channel_id ? err_msg.channel_id[0] : ''}</span>
                            </div>

                            <div class="col-md-4">
                                <div class="row">
                                    <fieldset class="form-group form-group-style col-md-6">
                                        <label for="dateTime1">Start Time</label>
                                        <input type="datetime-local" class="form-control" id="dateTime1" step="1" onChange={(e) => { setStart(e.target.value) }} />
                                    </fieldset>

                                    <fieldset class="form-group form-group-style col-md-6">
                                        <label for="dateTime1">Finish Time</label>
                                        <input type="datetime-local" class="form-control" id="dateTime1" step="1" onChange={(e) => { setFinish(e.target.value) }} />
                                    </fieldset>
                                </div>
                                <span class="text-danger">{err_msg.start ? err_msg.start[0] : ''}</span><br />
                                <span class="text-danger">{err_msg.finish ? err_msg.finish[0] : ''}</span>
                            </div>


                            <div class="col-md">
                                <label for="dateTime1" class="font-weight-bold">Gender</label>
                                <select class="custom-select d-block w-100" onChange={(e) => { setGender(e.target.value) }}>
                                    <option value="">All Gender</option>
                                    <option value="m">Male</option>
                                    <option value="f">Female</option>
                                </select>
                                <span class="text-danger">{err_msg.gender ? err_msg.gender[0] : ''}</span>
                            </div>

                            <div class="col-md pr-3">
                                <label class="font-weight-bold">Age Range</label>
                                <div class="row">
                                    <input type="text" class="col-md form-control" onChange={(e) => { setFromAge(e.target.value) }} name="from_age" placeholder="from" />
                                    <input type="text" class="col-md form-control" onChange={(e) => { setToAge(e.target.value) }} name="to_age" placeholder="to" />
                                    <span class="text-danger">{err_msg.from_age ? err_msg.from_age[0] : ''}</span>
                                    <span class="text-danger">{err_msg.to_age ? err_msg.to_age[0] : ''}</span>
                                </div>

                            </div>

                            </div>

                            


                        </div>



                        <div class="row justify-content-md-center">
                            <div class="col-12">
                                <div class="card">

                                    <div class="card-content collapse show">
                                        <div class="card-body card-dashboard">

                                            <div class="row">
                                                <div class="col-md-7"><div class="h3 font-weight-bold">User Data Filter List</div></div>
                                                {/* <div class="col-md-5"><input type="text" class="search form-control round border-primary mb-1" placeholder="Search" onChange={e => setQuery(e.target.value)} />
                                                            </div> */}


                                            </div>
                                            <br />
                                            <div class="table-responsive" style={{ maxHeight: '400px', minHeight: '500px' }}>
                                                <table class="table display nowrap table-striped table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Filter Name</th>
                                                            <th>Channel Name</th>
                                                            <th>Start</th>
                                                            <th>Finish</th>
                                                            <th>Gender</th>
                                                            <th>Age Range</th>
                                                            <th>Operation</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Search(allUserFilterData).map((userFilterData) =>
                                                            <tr key={userFilterData.id}>
                                                                <td>{userFilterData.id}</td>
                                                                {/* <td><a href={`/device/details/${device.id}`}>{device.device_name}</a></td> */}
                                                                {/*<td><a data-toggle="modal" data-target={`#exampleModal_${device.id}`}>{device.device_name}</a>*<PopUpDetails id={device.id}/></td>*/}
                                                                <td>{userFilterData.filter_name}</td>
                                                                <td>{userFilterData.channel_name}</td>
                                                                <td>{userFilterData.start}</td>
                                                                {/* <td>{user.gender}</td>
                                                                            <td>{user.age}</td> */}
                                                                <td>{userFilterData.finish}</td>
                                                                <td>{userFilterData.gender}</td>
                                                                <td>{userFilterData.from_age} - {userFilterData.to_age}</td>
                                                                <td style={{ whiteSpace: 'nowrap' }}>
                                                                    <a class="btn btn-secondary disabled" href={`/device/edit/${userFilterData.id}`} >Download</a>
                                                                    {/* <button class="offset-1 btn btn-danger" onClick={() => { if (window.confirm('Delete the item?')) { deleteDevice(device.id) }; }} >Delete</button> */}
                                                                </td>
                                                                {/* <td><div><input type="checkbox" id="deselect" onChange={ (event) =>{ if (window.confirm('Want to run This Deselection operation?')) {handleChange(event, device.id)}else {window.location.reload(false)} }} value={isSubscribed} checked={device.deselect === "deselect"} name="deselect" />
                                                                                <label class="form-label" >&nbsp; Deselect</label></div>
                                                                            </td> */}


                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>


                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>



                    </div>

                </div>
            </div>
        </div>

    )
}
export default UserDataFilter;