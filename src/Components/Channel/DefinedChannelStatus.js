import React from 'react';
import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import Select from 'react-select';
import PostLineGraph from "../Graph/PostLineGraph";
import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';


const DefinedChannelStatus = () => {

    const [update, setUpdate] = useState(0);
    const [time, setTime] = useState("15");
    const [id, setId] = useState("0");
    const [channelName, setChannelName] = useState("");
    const [channels, setchannels] = useState([]);
    const [start, setstart] = useState("");
    const [finish, setfinish] = useState("");

    const [reachZeroCSV, setReachZeroCSV] = useState({});
    const [reachPercentCSV, setReachPercentCSV] = useState([]);



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
        exportToCsv(channelName+"-Day_Parts.csv", scsv)
    }

    const Downloadfunc = () => {
        //console.log(liveChannelData.labels[0]);
        var csv = [["Time-Frame", "Reach(000)", "Reach(%)"]];
        var sampleLive = reachZeroCSV;
        var sampleLive1 = reachPercentCSV;

        for (var i = 0; i < sampleLive.labels.length; i++) {
            csv.push([sampleLive.labels[i], sampleLive.values[i], sampleLive1[i]]);
        }
        console.log(csv);
        getCSV(csv);
    }



    useEffect(() => {
        if(update>0){
        var data = {
            id: id, range: time, start: start, finish: finish
        };

        axiosConfig.post("/trend/dayrangedreach0", data).then(rsp => {

            setReachZeroCSV(() => ({
                labels: rsp.data.label, values: rsp.data.values
            }));
        }).catch(err => {

        });

        axiosConfig.post("/trend/dayrangedreachp", data).then(rsp => {

            setReachPercentCSV(rsp.data.values);
        }).catch(err => {

        });

    }

    }, [update]);








    useEffect(() => {

        axiosConfig.get("/trend/channels").then(rsp => {
            //console.log(rsp.data);
            setchannels(rsp.data.channels);
            console.log(channels);


        }).catch(err => {

        })

    }, [])
    const updater = () => {
        setUpdate(update + 1);
        var credentials = { "id": id, "range": time, "start": start, "finish": finish };
        console.log(credentials);
    }
    return (
        <div><Header title="Trend Analysis-Day Parts" />
            <MainMenu menu="trenddaypart" />

            <div class="app-content content" style={{ backgroundColor: "azure", minHeight: "36em" }}>
                <div class="content-overlay"></div>
                <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                    <div class="content-header row">
                    </div>
                    <div class="content-body">
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <Select
                                                placeholder="Select channel"
                                                options={channels.map(channel => ({ label: channel.name, value: channel.id }))}
                                                onChange={opt => setId(opt.value) & setChannelName(opt.label)}
                                            />
                                        </div>
                                        <div class="col-md-3">
                                            <select class="custom-select d-block w-100" id="range" required="" onChange={(e) => { setTime(e.target.value) }}>
                                                <option value="15">Choose Range</option>
                                                <option value="15">15 Minutes</option>
                                                <option value="30">30 Minutes</option>
                                            </select>
                                        </div>



                                        <div class="col-md-5">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <fieldset class="form-group form-group-style">
                                                        <label for="dateTime1">Start Time</label>
                                                        <input type="date" class="form-control" id="start" onChange={(e) => { setstart(e.target.value) }} />
                                                    </fieldset>
                                                </div>
                                                <div class="col-md-6">
                                                    <fieldset class="form-group form-group-style">
                                                        <label for="dateTime1">Finish Time</label>
                                                        <input type="date" class="form-control" id="finish" onChange={(e) => { setfinish(e.target.value) }} />
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-1">
                                            <button onClick={updater} class="btn btn-info">Get Data</button>
                                        </div>
                                    </div>


                                    <div class="row">

                                        <div class="col-md-2">
                                            <label>Type (STB/OTT)</label>
                                            <select class="custom-select d-block w-100" onChange={(e) => { }}>
                                                <option value="">All</option>
                                                <option value="STB">STB</option>
                                                <option value="OTT">OTT</option>
                                            </select>
                                        </div>

                                        <div class="col-md-7"></div>

                                        {/* <div class="col-md-2">
                                            <label>Region</label>
                                            <select class="custom-select d-block w-100" onChange={(e) => { }}>
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
                                            <select class="custom-select d-block w-100" onChange={(e) => { }}>
                                                <option value="">All Gender</option>
                                                <option value="m">Male</option>
                                                <option value="f">Female</option>
                                            </select>
                                        </div>

                                        <div class="col-md-2">
                                            <label>SEC</label>
                                            <select class="custom-select d-block w-100" onChange={(e) => { }}>
                                                <option value="">All SEC</option>
                                                <option value="a1">Lower Class</option>
                                                <option value="c1">Upper Middle Class</option>
                                                <option value="d1">Lower Middle Class</option>
                                                <option value="b1">Upper Class</option>
                                            </select>
                                        </div>

                                        <div class="col-md-2">
                                            <label>Urban/Rural</label>
                                            <select class="custom-select d-block w-100" onChange={(e) => { }}>
                                                <option value="">Urban & Rural</option>
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
                                        </div> */}

                                        {(() => {
                                            if (reachPercentCSV.length > 0) {
                                                return <div class="col-md-2">
                                                    <label>Download All In One</label>
                                                    <button onClick={Downloadfunc} class="btn btn-danger">Download CSV</button>

                                                </div>
                                                
                                            } else {
                                                return null;
                                                

                                            }
                                        })()}

                                    </div>



                                </div>
                            </div>
                        </div>
                        <br />



                        <div class="row">
                            <div class="col-md-12">
                                <PostLineGraph title="Reach (%)" text="Active Channels" url="trend/dayrangedreachp" label="Reach (%)" color="blue" credentials={{ "id": id, "range": time, "start": start, "finish": finish }} update={update} />

                            </div>
                            <div class="col-md-12">
                                <PostLineGraph title="Reach (000)" text="Active Channels" url="trend/dayrangedreach0" label="Reach (000)" color="red" credentials={{ "id": id, "range": time, "start": start, "finish": finish }} update={update} />

                            </div>

                        </div>
                        <div class="row">
                        <div class="col-md-12">
                                <PostLineGraph title="TVR (000)" text="Active Channels" url="trend/dayrangedtvr0" label="TVR (000)" color="violet" credentials={{ "id": id, "range": time, "start":start,"finish":finish }} update={update} />

                            </div>
                            <div class="col-md-12">
                                <PostLineGraph title="TVR (%)" text="Active Channels" url="trend/dayrangedtvrp" label="TVR (%)" color="green" credentials={{ "id": id, "range": time, "start":start,"finish":finish }} update={update} />

                            </div>

                        </div> 

                    </div>
                </div>
            </div>
        </div>



    )
}
export default DefinedChannelStatus;