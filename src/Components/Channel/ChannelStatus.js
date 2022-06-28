import React from 'react';
import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import CurrentStatus from "../CurrentStatus/CurrentStatus";
import Graph from "../Graph/Graph";
import DemoGraph from "../Graph/DemoGraph";
import Select from 'react-select';
import GetLineGraph from "../Graph/GetLineGraph";
import PostLineGraph from "../Graph/PostLineGraph";


const ChannelStatus = () => {
    
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
        setUpdate(update+1);
    }
    return (
        <div class="app-content content" style={{ backgroundColor: "azure", minHeight:"36em" }}>
            <div class="content-overlay"></div>
            <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                <div class="content-header row">
                </div>
                <div class="content-body">

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
                        <div class="col-md-6">
                            <PostLineGraph title="Reach (%)" text="Active Channels" url="trend/reach/percent" label="Reach (%)" color="blue" credentials={{"id":id,"time":time}}  update={update} />

                        </div>
                        <div class="col-md-6">
                            <PostLineGraph title="Reach (000)" text="Active Channels" url="trend/reach/zero" label="Reach (000)" color="red" credentials={{"id":id,"time":time}}  update={update} />

                        </div>
                        
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <PostLineGraph title="TVR (000)" text="Active Channels" url="trend/tvr/zero" label="TVR (000)" color="violet" credentials={{"id":id,"time":time}}  update={update} />

                        </div>
                        <div class="col-md-6">
                            <PostLineGraph title="TVR (%)" text="Active Channels" url="trend/tvr/percent" label="TVR (%)" color="green" credentials={{"id":id,"time":time}}  update={update} />

                        </div>
                        
                    </div>
                </div>
            </div>
        </div>




    )
}
export default ChannelStatus;