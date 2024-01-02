import React from 'react';
import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import Select from 'react-select';
import Header from '../Header/Header';
import LineGraph from "../Graph/LineGraph";
import MainMenu from '../MainMenu/MainMenu';


const ChannelStatus = () => {

    const [update, setUpdate] = useState(0);
    const [time, setTime] = useState("Daily");
    const [id, setId] = useState("");
    const [type, setType] = useState("STB");
    const [channels, setchannels] = useState([]);
    
    const [label, setlabel] = useState([]);
    const [reach0, setReach0] = useState([]);
    const [reachp, setReachp] = useState([]);
    const [tvr0, setTvr0] = useState([]);
    const [tvrp, setTvrp] = useState([]);
    
    const [loading,setloading] = useState(false);

    useEffect(() => {
        if(update>0){
            var credentials={ "id": id, "time": time,"type":type };
        console.log(JSON.stringify(credentials));
            setloading(false);
                axiosConfig.post("/trend/general/all",credentials)
                    .then(rsp => {
                        
                    setloading(true);
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

    useEffect(() => {

        axiosConfig.get("/trend/channels").then(rsp => {
            //console.log(rsp.data);
            setchannels(rsp.data.channels);
            console.log(channels);


        }).catch(err => {

        })

    }, [])
    var credential = { start: "2021-01-01 00:00:00", finish: "2022-01-01 00:00:00" };
    const updater = () => {
        setUpdate(update + 1);
    }
    return (
        <div><Header title="Trend Analysis-General" />
            <MainMenu menu="trendgeneral" />
            <div class="app-content content" style={{ backgroundColor: "azure", minHeight: "36em" }}>
                <div class="content-overlay"></div>
                <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                    <div class="content-header row">
                    </div>
                    <div class="content-body">

                    {/* <div class="row">
                        <div class="col-md-12">
                            <div class="card p-1 text-white bg-warning">
                                <div class="card-content">
                                    <div class="card-body">
                                        <div class="float-left">
                                            <p class="white"><strong>Upgrade in Progress</strong></p>
                                        </div>
                                        <div class="float-right">
                                            <p class="card-title"><i class="la la-info-circle"></i> Warning</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}






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
                                        <div class="col-md-5">
                                            <select class="custom-select d-block w-100" id="gender" required="" onChange={(e) => { setTime(e.target.value) }}>
                                                <option value="">Choose Time Frame</option>
                                                <option value="Daily">Last 24 Hour</option>
                                                <option value="Weekly">Last 7 Days</option>
                                                <option value="Monthly">Last 30 Days</option>
                                                <option value="Yearly">Last 365 Days</option>
                                            </select>
                                        </div>

                                        <div class="col-md-2">
                                            <button onClick={updater} class="btn btn-info">View</button>
                                        </div>

                                    </div>

                                    <br />

                                    <div class="row">

                                        <div class="col-md-2">
                                            <label>Type (STB/OTT)</label>
                                            <select class="custom-select d-block w-100" disabled onChange={(e) => { setType(e.target.value)}}>
                                                <option value="STB">STB</option>
                                                <option value="">All</option>
                                                <option value="OTT">OTT</option>
                                            </select>
                                        </div>

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
                                    </div>
                                    
                                </div>
                            </div>
                        </div>


                        <br />


                        <div class="row">
                            <div class="col-md-6">
                                <LineGraph title="Reach (%)" text="Active Channels" loading={loading} labels={label} values={reachp} color="blue"  update={update} />

                            </div>
                            <div class="col-md-6">
                                <LineGraph title="Reach (000)" text="Active Channels" loading={loading} labels={label} values={reach0}  color="red"  update={update} />

                            </div>

                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <LineGraph title="TVR (000)" text="Active Channels" loading={loading} labels={label} values={tvr0} color="violet"  update={update} />

                            </div>
                            <div class="col-md-6">
                                <LineGraph title="TVR (%)" text="Active Channels" loading={loading} labels={label} values={tvrp} color="green"  update={update} />

                            </div>

                        </div>

                        
                    </div>
                </div>
            </div>
        </div>



    )
}
export default ChannelStatus;