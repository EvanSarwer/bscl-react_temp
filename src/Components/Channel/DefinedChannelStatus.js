import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';


const ChannelStatus = () => {
    const [id, setId] = useState(1);
    const [reachp, setreachp] = useState(0);
    const [reach0, setreach0] = useState(0);
    const [tvr0, settvr0] = useState(0);
    const [tvrp, settvrp] = useState(0);
    const [year, setYear] = useState([]);
    const [month, setmonth] = useState([]);
    const [day, setday] = useState([]);
    const [start, setstart] = useState("");
    const [finish, setfinish] = useState("");
    const [channels, setchannels] = useState([]);
    useEffect(() => {

        axios.get("http://127.0.0.1:8000/api/trend/channels").then(rsp => {
            //console.log(rsp.data);
            setchannels(rsp.data.channels);
            console.log(channels);
            

        }).catch(err => {

        })

    }, [])
    const getData=(event)=>{
        console.log("sent req");
        axios.post("http://localhost:8000/api/channel/definedtrend",{id:id,month:month,year:year,day:day,start:start,finish:finish}).then(function(rsp){
        
            console.log({id:id,month:month,year:year,day:day,start:start,finish:finish});
            console.log(rsp.data);    
        setreach0(rsp.data.reach0);
            setreachp(rsp.data.reachp);
            settvrp(rsp.data.tvrp);
            settvr0(rsp.data.tvr0);
        },function(err){});
        
    }
    const checkbox=(val)=>{
        var array = [];
var checkboxes=document.querySelectorAll('input[name='+val+']:checked')

for (var i = 0; i < checkboxes.length; i++) {
  array.push(checkboxes[i].value)
}
if(val=='month'){
setmonth(array);
console.log(month);
}   
if(val=='year'){
setYear(array);
console.log(year);
}   
if(val=='day'){
setday(array);
console.log(day);
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
                            <div class="row justify-content-between">
                                    <div class="col-md-6">
                                    <Select
                                    placeholder="Select channel"
                                    options={channels.map(channel => ({ label: channel.name, value: channel.id }))}
                                    onChange={opt => setId(opt.value)}
                                />
                                    </div>
                                    <div class="col-md-2">
                                    <button class="btn btn-danger" onClick={getData}>Get Data</button>
                                    </div>

                                </div>
                                <br/>
                                <div class="h1 font-weight-bold">Select Ranges</div>
                                <div class="row">

                                    <div class="col-md-3">
                                        <div class="h3 font-weight-bold">Select Year</div>
                                        <input type="checkbox" name="year" value="2018" onChange={function(event){checkbox('year');}} />2018<br />
                                        <input type="checkbox" name="year" value="2019" onChange={function(event){checkbox('year');}} />2019<br />
                                        <input type="checkbox" name="year" value="2020" onChange={function(event){checkbox('year');}} />2020<br />
                                        <input type="checkbox" name="year" value="2021" onChange={function(event){checkbox('year');}} />2021<br />
                                        <input type="checkbox" name="year" value="2022" onChange={function(event){checkbox('year');}} />2022
                                    </div>
                                    <div class="col-md-3">
                                        <div class="h3 font-weight-bold">Select Month</div>
                                        <input type="checkbox" name="month" value="1" onChange={function(event){checkbox('month');}} />January<br />
                                        <input type="checkbox" name="month" value="2" onChange={function(event){checkbox('month');}} />February<br />
                                        <input type="checkbox" name="month" value="3" onChange={function(event){checkbox('month');}} />March<br />
                                        <input type="checkbox" name="month" value="4" onChange={function(event){checkbox('month');}} />April<br />
                                        <input type="checkbox" name="month" value="5" onChange={function(event){checkbox('month');}} />May<br />
                                        <input type="checkbox" name="month" value="6" onChange={function(event){checkbox('month');}} />June<br />
                                        <input type="checkbox" name="month" value="7" onChange={function(event){checkbox('month');}} />July<br />
                                        <input type="checkbox" name="month" value="8" onChange={function(event){checkbox('month');}} />August<br />
                                        <input type="checkbox" name="month" value="9" onChange={function(event){checkbox('month');}} />September<br />
                                        <input type="checkbox" name="month" value="10" onChange={function(event){checkbox('month');}} />October<br />
                                        <input type="checkbox" name="month" value="11" onChange={function(event){checkbox('month');}} />November<br />
                                        <input type="checkbox" name="month" value="12" onChange={function(event){checkbox('month');}} />December
                                    </div>
                                    <div class="col-md-3">
                                        <div class="h3 font-weight-bold">Select Day</div>
                                        <input type="checkbox" name="day" value="6" onChange={function(event){checkbox('day');}} />Sunday<br />
                                        <input type="checkbox" name="day" value="0" onChange={function(event){checkbox('day');}} />Monday<br />
                                        <input type="checkbox" name="day" value="1" onChange={function(event){checkbox('day');}} />Tuesday<br />
                                        <input type="checkbox" name="day" value="2" onChange={function(event){checkbox('day');}} />Wednesday<br />
                                        <input type="checkbox" name="day" value="3" onChange={function(event){checkbox('day');}} />Thursday<br />
                                        <input type="checkbox" name="day" value="4" onChange={function(event){checkbox('day');}} />Friday<br />
                                        <input type="checkbox" name="day" value="5" onChange={function(event){checkbox('day');}} />Saturday<br />
                                    </div>
                                    <div class="col-md-3">
                                        <div class="h3 font-weight-bold">Select Day</div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <fieldset class="form-group form-group-style">
                                                    <label for="start">Start Time</label>
                                                    <input type="time" class="form-control" id="start" step="1" onChange={function(event){setstart(event.target.value);}}/>
                                                </fieldset>
                                            </div>
                                            <div class="col-md-6">
                                                <fieldset class="form-group form-group-style">
                                                    <label for="finish">Finish Time</label>
                                                    <input type="time" class="form-control" id="finish" step="1" onChange={function(event){setfinish(event.target.value);}}/>
                                                </fieldset>
                                            </div>
                                        </div>
                                        <div class="row">
                                        
                                        
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card">
                            <div class="card-content">
                                <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="h6 font-weight-bold">Reach(%): </div>{reachp}%
                                    </div>
                                    <div class="col-md-6">
                                    <div class="h6 font-weight-bold">Reach(000):  </div>{reach0}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="h6 font-weight-bold">TVR(%): </div>{tvrp}%
                                    </div>
                                    <div class="col-md-6">
                                    <div class="h6 font-weight-bold">TVR(000):  </div>{tvr0}
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
export default ChannelStatus;