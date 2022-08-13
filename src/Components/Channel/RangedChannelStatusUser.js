import React from 'react';
import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import Select from 'react-select';
import PostLineGraph from "../Graph/PostLineGraph";
import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';
import MainMenuUser from '../MainMenu/MainMenuUser';
import HeaderUser from '../Header/HeaderUser';


const RangedChannelStatusUser = () => {

    const [update, setUpdate] = useState(0);
    const [time, setTime] = useState("15");
    const [id, setId] = useState("0");
    const [channels, setchannels] = useState([]);
    const [start, setstart] = useState("");
    const [finish, setfinish] = useState("");
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
        <div><HeaderUser title="Trend Analysis-Ranged" />
            <MainMenuUser menu="trendranged" />
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
                                                onChange={opt => setId(opt.value)}
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
                                                        <input type="datetime-local" class="form-control" id="dateTime1" step="1" onChange={(e) => { setstart(e.target.value) }} />
                                                    </fieldset>
                                                </div>
                                                <div class="col-md-6">
                                                    <fieldset class="form-group form-group-style">
                                                        <label for="dateTime1">Finish Time</label>
                                                        <input type="datetime-local" class="form-control" id="dateTime1" step="1" onChange={(e) => { setfinish(e.target.value) }} />
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

                                        <div class="col-md-2">
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
                                        </div>
                                    </div>






                                </div>
                            </div>
                        </div>
                        <br />



                        <div class="row">
                            <div class="col-md-12">
                                <PostLineGraph title="Reach (%)" text="Active Channels" url="channel/rangedtrendreach0" label="Reach (%)" color="blue" credentials={{ "id": id, "range": time, "start": start, "finish": finish }} update={update} />

                            </div>
                            <div class="col-md-12">
                                <PostLineGraph title="Reach (000)" text="Active Channels" url="channel/rangedtrendreach0" label="Reach (000)" color="red" credentials={{ "id": id, "range": time, "start": start, "finish": finish }} update={update} />

                            </div>

                        </div>
                        {/* <div class="row">
                            <div class="col-md-12">
                                <PostLineGraph title="TVR (000)" text="Active Channels" url="channel/rangedtrendtvr0" label="TVR (000)" color="violet" credentials={{ "id": id, "range": time, "start":start,"finish":finish }} update={update} />

                            </div>
                            <div class="col-md-12">
                                <PostLineGraph title="TVR (%)" text="Active Channels" url="channel/rangedtrendtvr0" label="TVR (%)" color="green" credentials={{ "id": id, "range": time, "start":start,"finish":finish }} update={update} />

                            </div>

                        </div> */}

                    </div>
                </div>
            </div>
        </div>



    )
}
export default RangedChannelStatusUser;