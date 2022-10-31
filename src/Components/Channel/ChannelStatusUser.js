import React from 'react';
import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import CurrentStatus from "../CurrentStatus/CurrentStatus";
import Graph from "../Graph/Graph";
import DemoGraph from "../Graph/DemoGraph";
import Select from 'react-select';
import GetLineGraph from "../Graph/GetLineGraph";
import PostLineGraph from "../Graph/PostLineGraph";
import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';
import MainMenuUser from '../MainMenu/MainMenuUser';


const ChannelStatusUser = () => {

    const [update, setUpdate] = useState(0);
    const [time, setTime] = useState("Daily");
    const [id, setId] = useState("");
    const [channels, setchannels] = useState([]);
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
            <MainMenuUser menu="trendgeneral" />
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
                                            <button onClick={updater} class="btn btn-info">Get Data</button>
                                        </div>

                                    </div>

                                    <br />

                                    <div class="row">

                                        <div class="col-md-2">
                                            <label>Type (STB/OTT)</label>
                                            <select class="custom-select d-block w-100" onChange={(e) => { }}>
                                                <option value="">All</option>
                                                <option value="STB">STB</option>
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
                                <PostLineGraph title="Reach (%)" text="Active Channels" url="trend/reach/percent" label="Reach (%)" color="blue" credentials={{ "id": id, "time": time }} update={update} />

                            </div>
                            <div class="col-md-6">
                                <PostLineGraph title="Reach (000)" text="Active Channels" url="trend/reach/zero" label="Reach (000)" color="red" credentials={{ "id": id, "time": time }} update={update} />

                            </div>

                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <PostLineGraph title="TVR (000)" text="Active Channels" url="trend/tvr/zero" label="TVR (000)" color="violet" credentials={{ "id": id, "time": time }} update={update} />

                            </div>
                            <div class="col-md-6">
                                <PostLineGraph title="TVR (%)" text="Active Channels" url="trend/tvr/percent" label="TVR (%)" color="green" credentials={{ "id": id, "time": time }} update={update} />

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}
export default ChannelStatusUser;