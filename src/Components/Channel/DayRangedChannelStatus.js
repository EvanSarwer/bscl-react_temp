import React from 'react';
import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";

import PreBarGraph from "./Graph/PreBarGraph";
import Select from 'react-select';
import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';

import * as XLSX from "xlsx";

const DayRangedChannelStatus = () => {

    var cc;
    const [update, setUpdate] = useState(0);
    const [id, setId] = useState("");
    const [year, setYear] = useState([]);
    const [month, setmonth] = useState([]);
    const [months, setmonths] = useState(['Jan ', 'Feb ', 'Mar ', 'Apr ', 'May ', 'Jun ', 'July ', 'Aug ', 'Sep ', 'Oct ', 'Nov ', 'Dec']);
    const [day, setday] = useState([]);
    const [days, setdays] = useState(['Sun ', 'Mon ', 'Tue ', 'Wed ', 'Thu ', 'Fri ', 'Sat']);
    const [start, setstart] = useState("");
    const [finish, setfinish] = useState("");
    const [channels, setchannels] = useState([]);

    const [label, setlabel] = useState([]);
    const [reach0, setReach0] = useState([]);
    const [reachp, setReachp] = useState([]);
    const [tvr0, setTvr0] = useState([]);
    const [tvrp, setTvrp] = useState([]);
    const [type, setType] = useState("");

    const [loading, setloading] = useState(true);

    useEffect(() => {
        if (update > 0) {
            var credentials = { id: id, type: type, month: month, year: year, day: day, start: start, finish: finish };
            console.log(JSON.stringify(credentials));
            setloading(true);
            axiosConfig.post("/dayrangedall", credentials)
                .then(rsp => {

                    setloading(false);
                    //debugger;
                    console.log(rsp.data);

                    setReachp(rsp.data.reachp);
                    setReach0(rsp.data.reach0);
                    setTvrp(rsp.data.tvrp);
                    setTvr0(rsp.data.tvr0);
                    setlabel(rsp.data.label);
                }).catch(err => {
                    alert("Server Error");
                    setUpdate(0);
                })
        }
    }, [update]);






    const Downloadfunc = () => {
        //console.log(liveChannelData.labels[0]);
        var csv = [["Channel", "Reach(000)", "Reach(%)", "TVR(000)", "TVR(%)"]];
        //var csv = [["Time-Frame", "Reach(000)", "Reach(%)", "TVR(000)", "TVR(%)"]];
        var sampleLive0 = label;
        var sampleLive = reach0;
        var sampleLive1 = reachp;
        var sampleLive2 = tvr0;
        var sampleLive3 = tvrp;

        for (var i = 0; i < sampleLive.length; i++) {
            csv.push([sampleLive0[i], sampleLive[i], sampleLive1[i], sampleLive2[i], sampleLive3[i]]);
        }
        console.log(csv);

        const wb = XLSX.utils.book_new();

        var ws = XLSX.utils.aoa_to_sheet(csv);
        XLSX.utils.book_append_sheet(wb, ws, "Day Ranged");

        XLSX.writeFile(wb, "Day_Ranged.csv.xlsx");

    }


    //     useEffect(() => {
    // if(update>0){
    //         var data = {
    //             id: id, month: month, year: year, day: day, start: start, finish: finish
    //         };

    //         axiosConfig.post("/channel/definedtrendreach0", data).then(rsp => {

    //             setReachZeroCSV(() => ({
    //                 labels: rsp.data.label, values: rsp.data.value
    //             }));
    //         }).catch(err => {

    //         });

    //         axiosConfig.post("/channel/definedtrendreachp", data).then(rsp => {

    //             setReachPercentCSV(rsp.data.value);
    //         }).catch(err => {

    //         });

    //         axiosConfig.post("/channel/definedtrendtvr0", data).then(rsp => {

    //             setTvrZeroCSV(rsp.data.value);
    //         }).catch(err => {

    //         });

    //         axiosConfig.post("/channel/definedtrendtvrp", data).then(rsp => {

    //             setTvrPercentCSV(rsp.data.value);
    //         }).catch(err => {

    //         });

    //     }

    //     }, [update]);
















    useEffect(() => {

        axiosConfig.get("/trend/channels").then(rsp => {
            //console.log(rsp.data);
            //setchannels(rsp.data.channels);
            cc = rsp.data.channels;
            cc.unshift({ id: "", name: 'All Channels' });

            setchannels(cc);
            //console.log(rsp.data.channels);
            console.log(channels);


        }).catch(err => {

        })

    }, [])


    const updater = () => {
        setUpdate(update + 1);
    }
    const weekend = () => {
        var checkboxes = document.querySelectorAll('input[name=day]');
        var val = document.querySelector("#weekend").checked;

        for (var i = 5; i < 7; i++) {
            checkboxes[i].checked = val;
        }
        checkbox('day');

    }

    const weekday = () => {
        var checkboxes = document.querySelectorAll('input[name=day]')
        var val = document.querySelector("#weekday").checked;
        for (var i = 0; i < 5; i++) {
            checkboxes[i].checked = val;
        }
        checkbox('day');
    }
    const checkbox = (val) => {
        var array = [];
        var checkboxes = document.querySelectorAll('input[name=' + val + ']:checked')

        for (var i = 0; i < checkboxes.length; i++) {
            array.push(checkboxes[i].value)
        }
        if (val == 'month') {
            setmonth(array);
            console.log(month);
        }
        if (val == 'year') {
            setYear(array);
            console.log(year);
        }
        if (val == 'day') {
            setday(array);
            console.log(day);
        }
    }


    return (
        <div><Header title="Trend Analysis Day-Ranged" />
            <MainMenu menu="daytrendranged" />
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
                                        <div class="col-md-5">
                                            <Select
                                                placeholder="Select channel"
                                                options={channels.map(channel => ({ label: channel.name, value: channel.id }))}
                                                onChange={opt => setId(opt.value)}
                                            />
                                        </div>

                                        <div class="col-md-2">
                                            <select class="custom-select d-block w-100" onChange={(e) => { setType(e.target.value) }}>
                                                <option value="">All (STB & OTT)</option>
                                                <option value="STB">STB</option>
                                                <option value="OTT">OTT</option>
                                            </select>
                                        </div>

                                    </div>
                                    <div class="row">

                                        <div class="col-md-2">
                                            <br />
                                            <div class="h4 font-weight-bold">Select Year</div>
                                            <input type="checkbox" name="year" value="2022" onChange={function (event) { checkbox('year'); }} />2022<br />
                                            {/* <input type="checkbox" name="year" value="2023" onChange={function (event) { checkbox('year'); }} />2023 */}
                                        </div>


                                        <div class="col-md-3">
                                            <br />
                                            <div class="h4 font-weight-bold">Select Month</div>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <input type="checkbox" name="month" value="1" onChange={function (event) { checkbox('month'); }} />January<br />
                                                    <input type="checkbox" name="month" value="2" onChange={function (event) { checkbox('month'); }} />February<br />
                                                    <input type="checkbox" name="month" value="3" onChange={function (event) { checkbox('month'); }} />March<br />
                                                    <input type="checkbox" name="month" value="4" onChange={function (event) { checkbox('month'); }} />April<br />
                                                    <input type="checkbox" name="month" value="5" onChange={function (event) { checkbox('month'); }} />May<br />
                                                    <input type="checkbox" name="month" value="6" onChange={function (event) { checkbox('month'); }} />June<br />
                                                </div>

                                                <br></br><br />
                                                <br />
                                                <div class="col-md-6">
                                                    <input type="checkbox" name="month" value="7" onChange={function (event) { checkbox('month'); }} />July<br />
                                                    <input type="checkbox" name="month" value="8" onChange={function (event) { checkbox('month'); }} />August<br />
                                                    <input type="checkbox" name="month" value="9" onChange={function (event) { checkbox('month'); }} />September<br />
                                                    <input type="checkbox" name="month" value="10" onChange={function (event) { checkbox('month'); }} />October<br />
                                                    <input type="checkbox" name="month" value="11" onChange={function (event) { checkbox('month'); }} />November<br />
                                                    <input type="checkbox" name="month" value="12" onChange={function (event) { checkbox('month'); }} />December
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-3">
                                            <br />
                                            <div class="h4 font-weight-bold">Select Day</div>
                                            <div class="row">
                                                <div class="col-md-5">

                                                    <input type="checkbox" name="day" value="0" onChange={function (event) { checkbox('day'); }} /><span class="h6">Sunday</span><br />
                                                    <input type="checkbox" name="day" value="1" onChange={function (event) { checkbox('day'); }} /><span class="h6">Monday</span><br />
                                                    <input type="checkbox" name="day" value="2" onChange={function (event) { checkbox('day'); }} /><span class="h6">Tuesday</span><br />
                                                    <input type="checkbox" name="day" value="3" onChange={function (event) { checkbox('day'); }} /><span class="h6">Wednesday</span><br />
                                                    <input type="checkbox" name="day" value="4" onChange={function (event) { checkbox('day'); }} /><span class="h6">Thursday</span><br />
                                                    <input type="checkbox" name="day" value="5" onChange={function (event) { checkbox('day'); }} /><span class="h6">Friday</span><br />
                                                    <input type="checkbox" name="day" value="6" onChange={function (event) { checkbox('day'); }} /><span class="h6">Saturday</span><br />

                                                </div>

                                                <div class="col-md-6">
                                                    <br /><br /><br />
                                                    <input type="checkbox" id="weekday" name="week" value="1" onChange={weekday} />Weekdays<br />
                                                    <input type="checkbox" id="weekend" name="week" value="2" onChange={weekend} />Weekends<br />
                                                </div>
                                            </div>

                                        </div>

                                        <div class="col-md-4">
                                            <br />
                                            <div class="h4 font-weight-bold">Select Time</div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <fieldset class="form-group form-group-style">
                                                        <label for="start">Start Time</label>
                                                        <input type="time" class="form-control" id="start" step="1" onChange={function (event) { setstart(event.target.value); }} />
                                                    </fieldset>
                                                </div>
                                                <div class="col-md-6">
                                                    <fieldset class="form-group form-group-style">
                                                        <label for="finish">Finish Time</label>
                                                        <input type="time" class="form-control" id="finish" step="1" onChange={function (event) { setfinish(event.target.value); }} />
                                                    </fieldset>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-3"></div>
                                                <div class="col-md-4 pt-2">
                                                    <button onClick={updater} class="btn btn-info ">View</button>

                                                </div>

                                                {(() => {
                                                    if (!loading) {
                                                        return <div class="col-md-5">
                                                            <span class=""><small>Download All In One</small></span>
                                                            <button onClick={Downloadfunc} class="btn btn-danger">Download CSV</button>

                                                        </div>
                                                    } else {
                                                        return null;

                                                    }
                                                })()}



                                            </div>
                                        </div>


                                    </div>

                                    {/* <br />

                                    <div class="row">

                                        <div class="col-md-2">
                                            <label>Type (STB/OTT)</label>
                                            <select class="custom-select d-block w-100" onChange={(e) => { setType(e.target.value) }}>
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

                                    {/* {(() => {
                                            if (!loading) {
                                                return <div class="col-md-2">
                                                    <label>Download All In One</label>
                                                    <button onClick={Downloadfunc} class="btn btn-danger">Download CSV</button>

                                                </div>
                                            } else {
                                                return null;

                                            }
                                        })()}

                                    </div> */}


                                </div>
                            </div>
                        </div>


                        <div class="row" >
                            <div class="col-md-6">
                                <div class="content-body">

                                    <div class="card" style={{ height: "7rem" }}>
                                        <div class="card-content">
                                            <div class="card-body">


                                                <strong>Days selected: </strong>
                                                {(() => {
                                                    if (day.length === 0) {
                                                        return <span>All Days </span>
                                                    }

                                                })()}
                                                {
                                                    day.map(i => {
                                                        return <span>{days[parseInt(i)]} </span>;


                                                    }

                                                    )
                                                }

                                                <br />
                                                <strong>Months selected: </strong>
                                                {(() => {
                                                    if (month.length === 0) {
                                                        return <span>All Months </span>
                                                    }

                                                })()}
                                                {
                                                    month.map(i => {
                                                        return <span>{months[i - 1]} </span>;


                                                    }

                                                    )
                                                }

                                                <br />
                                                <strong>Years selected: </strong>
                                                {(() => {
                                                    if (year.length === 0) {
                                                        return <span>All Years </span>
                                                    }

                                                })()}
                                                {
                                                    year.map(i => {
                                                        return <span>{i} </span>;


                                                    }

                                                    )
                                                }



                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="content-body">

                                    <div class="card" style={{ height: "7rem" }}>
                                        <div class="card-content">
                                            <div class="card-body">



                                                <strong>Start Time: </strong>{start == "" ? '00:00:00' : start}

                                                <br />
                                                <strong>Finish Time: </strong>{finish == "" ? '23:59:59' : finish}




                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="row">



                            <div class="col-md-6">
                                <PreBarGraph title="Reach(%)" text="Channel vs Reach(%)" loading={loading} labels={label} values={reachp} url="channel/definedtrendreachp" color="#28D094" update={update} />
                            </div>
                            <div class="col-md-6">
                                <PreBarGraph title="Reach(000)" text="Channel vs Reach(000)" loading={loading} labels={label} values={reach0} url="channel/definedtrendreach0" color="yellow" update={update} />
                            </div>



                        </div>
                        <div class="row">


                            <div class="col-md-6">
                                <PreBarGraph title="TVR(%)" text="Channel vs TVR(%)" loading={loading} labels={label} values={tvrp} url="channel/definedtrendtvrp" color="#68D094" update={update} />
                            </div>
                            <div class="col-md-6">
                                <PreBarGraph title="TVR(000)" text="Channel vs TVR(000)" loading={loading} labels={label} values={tvr0} url="channel/definedtrendtvr0" color="#8D0394" update={update} />
                            </div>



                        </div>


                    </div>
                </div>
            </div>
        </div>



    )
}
export default DayRangedChannelStatus;