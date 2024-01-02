import React from 'react';
import CurrentStatus from "../CurrentStatus/CurrentStatus";
import Graph from "../Graph/Graph";
import PostGraph from "../Graph/PostGraph";
import TvrGraph from "../Graph/TvrGraph";
import ActiveChannelTable from "../Table/ActiveChannelTable";
import ActiveUserTable from "../Table/ActiveUserTable";
import Map from "../Map/Map";
import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';
import Cookies from 'universal-cookie';
import LiveMap from "./LiveMap";



const LiveDevices = () => {
    const cookies = new Cookies();
    const [redpoints, setredpoints] = useState([]);
    const [graypoints, setgraypoints] = useState([]);
    const [greenpoints, setgreenpoints] = useState([]);
    const [count, setCount] = useState(0);
    const myFunction = () => {
        console.log('Executing every 30 seconds');
        axiosConfig.get("/activedevicelistmap").then(rsp => {
          console.log(rsp.data);
          setredpoints(rsp.data.red);
          setgraypoints(rsp.data.gray);
          setgreenpoints(rsp.data.green);
          
      }).catch(err => {

      });
      };
      //myFunction();
    
      useEffect(() => {
        myFunction();
        const intervalId = setInterval(() => {
          // This can lead to an infinite setInterval
          setCount(count + 1);
        }, 30000);
    
        return () => clearInterval(intervalId);
      }, [count]);
        



    return (
        <div><Header title="Live Devices" />
            <MainMenu menu="LiveDevices" />

            {/* <div class="app-content content"> */}
            <div class=" content">
                <div class="content-wrapper" style={{ backgroundColor: "azure" }} >

                    <div class="content-body">
{/* 
                        <div class="row">
                            <div class="col-md-2">
                                <select class="custom-select d-block w-100" value={userType} onChange={(e) => { setUserType(e.target.value) }}>
                                    <option value="">All (STB/OTT)</option>
                                    <option value="STB">STB</option>
                                    <option value="OTT">OTT</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <select class="custom-select d-block w-100" disabled={userType == "OTT" || userType == ""} onChange={(e) => { setRegion(e.target.value) }}>
                                    <option value="">All Region</option>
                                    <option value="Dhaka">Dhaka</option>
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
                                <select class="custom-select d-block w-100" disabled={userType == "OTT" || userType == ""} onChange={(e) => { setGender(e.target.value) }}>
                                    <option value="">All Gender</option>
                                    <option value="m">Male</option>
                                    <option value="f">Female</option>
                                </select>
                            </div>
                            <div class="col-md-2">

                                <select class="custom-select d-block w-100" disabled={userType == "OTT" || userType == ""} onChange={(e) => { setEconomic(e.target.value) }}>
                                    <option value="">All SEC</option>
                                    <option value="a">SEC A</option>
                                    <option value="b">SEC B</option>
                                    <option value="c">SEC C</option>
                                    <option value="d">SEC D</option>
                                    <option value="e">SEC E</option>
                                </select>
                            </div>
                            <div class="col-md-2">


                                <select class="custom-select d-block w-100" disabled={userType == "OTT" || userType == ""} onChange={(e) => { setSocio(e.target.value) }}>
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
                                            <div class="range-amt"><strong>Age Range : </strong> 1
                                                - 100</div>
                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>



                        <div class="row justify-content-md-center">
                            <div class="col">
                                <div class="card">
                                    <div class="card-header">
                                        <div class="row"><div class="col-11 h2 card-title font-weight-bold">Active User</div><div class="row col card-title align-items-right"><button onClick={LivechannelDownloadfunc} class="btn btn-sm btn-secondary">Download CSV</button></div></div>

                                    </div>
                                    <div class="card-content collapse show" style={{ height: "30em" }}>


                                        <Bar
                                            data={channelData}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: false,
                                                title: {
                                                    display: true,
                                                    text: "Channels",
                                                    fontSize: 20
                                                },
                                                legend: {
                                                    display: true,
                                                    position: 'right'
                                                }, plugins: {
                                                    legend: {
                                                        display: false  //remove if want to show label 
                                                    }
                                                }
                                            }}
                                        />


                                    </div>
                                </div>
                            </div>
                        </div> */}

                        {(cookies.get('_role') === "admin"||cookies.get('_role') === "operator") &&
                            <div class="row justify-content-md-center">
                                <div class="col">
                                    {/* <PostGraph title="Active Users" text="Active Channels" url="reach/percent" label="Active Users" color="blue" credentials={credential} /> */}
                                    <div class="card">
                                        <div class="card-header">
                                            
                                        </div>
                                        <div class="card-content collapse show" style={{ height: "15em !important" }}>


                                            <LiveMap red={redpoints} gray={graypoints} green={greenpoints} />


                                        </div>
                                    </div>
                                </div>
                            </div>
                        }




                    </div>

                </div>
            </div>
        </div>

    )
}
export default LiveDevices;