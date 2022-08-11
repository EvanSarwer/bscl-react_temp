import React from 'react';
import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";

import BarGraph from "./Graph/BarGraph";
import Select from 'react-select';
import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';


const DefinedChannelStatus = () => {

    var cc;
    const [update, setUpdate] = useState(0);
    const [id, setId] = useState("");
    const [year, setYear] = useState([]);
    const [month, setmonth] = useState([]);
    const [months, setmonths] = useState(['Jan ', 'Feb ', 'Mar ', 'Apr ', 'May ', 'Jun ', 'July ', 'Aug ', 'Sep ', 'Oct ', 'Nov ', 'Dec']);
    const [day, setday] = useState([]);
    const [days, setdays] = useState(['Mon ', 'Tue ', 'Wed ', 'Thu ', 'Fri ', 'Sat', 'Sun ']);
    const [start, setstart] = useState("");
    const [finish, setfinish] = useState("");
    const [channels, setchannels] = useState([]);
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
        var checkboxes = document.querySelectorAll('input[name=day]')

        for (var i = 5; i < 7; i++) {
            checkboxes[i].checked = !checkboxes[i].checked;
        }
    }

    const weekday = () => {
        var checkboxes = document.querySelectorAll('input[name=day]')

        for (var i = 0; i < 5; i++) {
            checkboxes[i].checked = !checkboxes[i].checked;
        }
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
        <div><Header title="Trend Analysis-Day Parts" />
            <MainMenu menu="trenddaypart" />
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
                                    </div>
                                    <div class="row">

                                        <div class="col-md-1">
                                            <br />
                                            <div class="h4 font-weight-bold">Select Year</div>
                                            <input type="checkbox" name="year" value="2018" onChange={function (event) { checkbox('year'); }} />2018<br />
                                            <input type="checkbox" name="year" value="2019" onChange={function (event) { checkbox('year'); }} />2019<br />
                                            <input type="checkbox" name="year" value="2020" onChange={function (event) { checkbox('year'); }} />2020<br />
                                            <input type="checkbox" name="year" value="2021" onChange={function (event) { checkbox('year'); }} />2021<br />
                                            <input type="checkbox" name="year" value="2022" onChange={function (event) { checkbox('year'); }} />2022
                                        </div>


                                        <div class="col-md-3">
                                            <br />
                                            <div class="h4 font-weight-bold">Select Month</div>
                                            <div class="row">
                                                <div class="col-md-6">
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
                                        <div class="col-md-2">
                                            <div class="h4 font-weight-bold">Select Day</div>
                                            <input type="checkbox" name="day" value="0" onChange={function (event) { checkbox('day'); }} /><span class="h6">Sunday</span><br />
                                            <input type="checkbox" name="day" value="1" onChange={function (event) { checkbox('day'); }} /><span class="h6">Monday</span><br />
                                            <input type="checkbox" name="day" value="2" onChange={function (event) { checkbox('day'); }} /><span class="h6">Tuesday</span><br />
                                            <input type="checkbox" name="day" value="3" onChange={function (event) { checkbox('day'); }} /><span class="h6">Wednesday</span><br />
                                            <input type="checkbox" name="day" value="4" onChange={function (event) { checkbox('day'); }} /><span class="h6">Thursday</span><br />
                                            <input type="checkbox" name="day" value="5" onChange={function (event) { checkbox('day'); }} /><span class="h6">Friday</span><br />
                                            <input type="checkbox" name="day" value="6" onChange={function (event) { checkbox('day'); }} /><span class="h6">Saturday</span><br />
                                        </div>
                                        <div class="col-md-2">
                                            <br></br><br /><br></br><br />
                                            <input type="checkbox" name="day" value="4" onChange={weekday} />Weekdays<br />
                                            <input type="checkbox" name="day" value="5" onChange={weekend} />Weekends<br />
                                        </div>
                                        <div class="col-md-3">
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
                                                <div class="col-md-6">

                                                </div><div class="col-md-6">
                                                    <button onClick={updater} class="btn btn-info">Get Data</button>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
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
                                <BarGraph title="Reach(%)" text="Channel vs Reach(%)" url="channel/definedtrendreachp" color="#28D094" get={false} credentials={{ id: id, month: month, year: year, day: day, start: start, finish: finish }} update={update} />
                            </div>
                            <div class="col-md-6">
                                <BarGraph title="Reach(000)" text="Channel vs Reach(000)" url="channel/definedtrendreach0" color="yellow" get={false} credentials={{ id: id, month: month, year: year, day: day, start: start, finish: finish }} update={update} />
                            </div>



                        </div>
                        <div class="row">


                            <div class="col-md-6">
                                <BarGraph title="TVR(%)" text="Channel vs TVR(%)" url="channel/definedtrendtvrp" color="#68D094" get={false} credentials={{ id: id, month: month, year: year, day: day, start: start, finish: finish }} update={update} />
                            </div>
                            <div class="col-md-6">
                                <BarGraph title="TVR(000)" text="Channel vs TVR(000)" url="channel/definedtrendtvr0" color="#8D0394" get={false} credentials={{ id: id, month: month, year: year, day: day, start: start, finish: finish }} update={update} />
                            </div>



                        </div>


                    </div>
                </div>
            </div>
        </div>



    )
}
export default DefinedChannelStatus;