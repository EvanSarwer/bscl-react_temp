import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import CurrentStatus from "../CurrentStatus/CurrentStatus";
import Graph from "../Graph/Graph";
import DemoGraph from "../Graph/DemoGraph";
import GetLineGraph from "../Graph/GetLineGraph";
import PostLineGraph from "../Graph/PostLineGraph";


const ChannelStatus = () => {
    const [time, setTime] = useState("Daily");
    const [id, setId] = useState(1);
    const [channels, setchannels] = useState([]);
    const [channellist, setchannellist] = useState([]);
    useEffect(() => {

        axios.get("http://127.0.0.1:8000/api/trend/channels").then(rsp => {
            //console.log(rsp.data);
            setchannels(rsp.data.channels);
            //console.log(channels);
            setchannellist(channels.map((channel) => 
                <option key={channel.id} value={channel.id}>{channel.name}</option>

            ))

        }).catch(err => {

        })

    }, [])
    var credential = { start: "2021-01-01 00:00:00", finish: "2022-01-01 00:00:00" };
    return (
        <div class="app-content content">
            <div class="content-overlay"></div>
            <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                <div class="content-header row">
                </div>
                <div class="content-body">

                    <div class="row">
                        <div class="col-md-5">
                            <select class="custom-select d-block w-100" id="gender" required="" onChange={(e) => { setId(parseInt(e.target.value)) }}>
                                <option value="">Choose Channel</option>
                                {channels.map((channel) => 
                <option key={channel.id} value={channel.id}>{channel.name}</option>

            )}
                            </select>
                        </div>
                        <div class="col-md-5">
                            <select class="custom-select d-block w-100" id="gender" required="" onChange={(e) => { setTime(e.target.value) }}>
                                <option value="">Choose Time Frame</option>
                                <option>Daily</option>
                                <option>Weekly</option>
                                <option>Monthly</option>
                                <option>Yearly</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <button class="btn btn-danger">Download CSV</button>
                        </div>

                    </div>
                    <br />



                    <div class="row">
                        <div class="col-md-4">
                            <GetLineGraph title="Reach (%)" text="Active Channels" url="trend/reach/percent" label="Reach (%)" color="blue"  />

                        </div>
                        <div class="col-md-4">
                            <PostLineGraph title="Reach (%)" text="Active Channels" url="trend/reach/percent" label="Reach (%)" color="blue" credentials={{"id":id,"time":time}} />

                        </div>
                        <div class="col-md-4">
                            <PostLineGraph title="Reach (000)" text="Active Channels" url="trend/reach/zero" label="Reach (%)" color="blue" credentials={{"id":id,"time":time}} />

                        </div>
                        <div class="col-md-4">
                            <GetLineGraph title="Reach (000)" text="Active Channels" url="trend/reach/percent" label="Reach (000)" color="pink"  />

                        </div>
                        <div class="col-md-4">
                            <GetLineGraph title="TVR (000)" text="Active Channels" url="trend/tvr/percent" label="TVR (000)" color="green"  />

                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <GetLineGraph title="TVR (%)" text="Active Channels" url="trend/tvr/percent" label="TVR (%)" color="red"  />

                        </div>
                        <div class="col-md-4">
                            <GetLineGraph title="Share" text="Active Channels" url="trend/tvr/percent" label="Share" color="yellow"  />

                        </div>
                        <div class="col-md-4">
                            <GetLineGraph title="Time Spent(Universe)" text="Active Channels" url="trend/reach/percent" label="Time Spent(Universe)" color="blue"  />

                        </div>
                    </div>
                </div>
            </div>
<h1>{id}</h1>
        </div>




    )
}
export default ChannelStatus;