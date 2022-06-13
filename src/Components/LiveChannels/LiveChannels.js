import React from 'react';
import CurrentStatus from "../CurrentStatus/CurrentStatus";
import Graph from "../Graph/Graph";
import PostGraph from "../Graph/PostGraph";
import TvrGraph from "../Graph/TvrGraph";
import ActiveChannelTable from "../Table/ActiveChannelTable";
import ActiveUserTable from "../Table/ActiveUserTable";
import Map from "../Map/Map";
import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';


const LiveChannels = () => {
    const [region, setRegion] = useState("");
    const [gender, setGender] = useState("");
    const [economic, setEconomic] = useState("");
    const [socio, setSocio] = useState("");
    const [age, setAge] = useState("");
    const [channelData, setChannelData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        var data = {
            region: region,
            gender: gender,
            economic: economic,
            socio: socio,
            age1: parseInt(document.querySelector("#small-slider > div > div:nth-child(2) > div > div.noUi-tooltip").innerHTML),
            age2: parseInt(document.querySelector("#small-slider > div > div:nth-child(3) > div > div.noUi-tooltip").innerHTML)
        };

        axios.post("http://127.0.0.1:8000/api/livechannel/activechannellistgraph", data).then(rsp => {
            console.log(rsp.data);
            setChannelData(() => ({
                labels: rsp.data.channels, datasets: [{
                    label: "Active User", data: rsp.data.user_count,
                    backgroundColor: ["#50AF95", "#f3ba2f", "#2a71d0"],
                    //borderColor: "black",
                    borderWidth: 1,
                    categoryPercentage: 0.9,
                    barPercentage: 1
                }]
            }));
        }).catch(err => {

        });

    }, [region,gender,economic,socio,age]);





    return (
        <div class="app-content content">
            <div class="content-overlay"></div>
            <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                <div class="content-header row">
                </div>
                <div class="content-body">

                    <div class="row">
                        <div class="col-md-2">
                            <select class="custom-select d-block w-100" onChange={(e) => { setRegion(e.target.value) }}>
                                <option value="">Choose Region</option>
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
                            <select class="custom-select d-block w-100" onChange={(e) => { setGender(e.target.value) }}>
                                <option value="">Choose Gender</option>
                                <option value="m">Male</option>
                                <option value="f">Female</option>
                            </select>
                        </div>
                        <div class="col-md-2">

                            <select class="custom-select d-block w-100" onChange={(e) => { setEconomic(e.target.value) }}>
                                <option value="">Economic Status</option>
                                <option value="a1">Lower Class</option>
                                <option value="c1">Upper Middle Class</option>
                                <option value="d1">Lower Middle Class</option>
                                <option value="b1">Upper Class</option>
                            </select>
                        </div>
                        <div class="col-md-2">


                            <select class="custom-select d-block w-100" onChange={(e) => { setSocio(e.target.value) }}>
                                <option value="">Socio Status</option>
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
                        <div class="col-md-2 text-right">
                            <button class="btn btn-danger">Download CSV</button>
                        </div>


                    </div>

                

            <div class="row justify-content-md-center">
                <div class="col">
                    {/* <PostGraph title="Active Users" text="Active Channels" url="reach/percent" label="Active Users" color="blue" credentials={credential} /> */}
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">Active User</h4>
                        </div>
                        <div class="card-content collapse show">


                            <Bar
                                data={channelData}
                                options={{
                                    title: {
                                        display: true,
                                        text: "Channels",
                                        fontSize: 20
                                    },
                                    legend: {
                                        display: true,
                                        position: 'right'
                                    }
                                }}
                            />


                        </div>
                    </div>
                </div>
            </div>
            </div>

            </div>
        </div>

    )
}
export default LiveChannels;