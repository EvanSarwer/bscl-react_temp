import React from 'react';
import CurrentStatus from "../CurrentStatus/CurrentStatus";
import ActiveUserTable from "../Table/ActiveUserTable";
import ActiveChannelTable from "../Table/ActiveChannelTable";
import BarGraph from "../Graph/BarGraph";
import TvrGraph from "../Graph/TvrGraph";
import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosConfig from "../axiosConfig";
import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';
import PieGraph from '../Graph/PieGraph';
import Cookies from 'universal-cookie';
import BarGraphData from '../Graph/BarGraphData';



const Dashboard = () => {
    const cookies = new Cookies();

    const [reachZeroChannel, setReachZeroChannel] = useState("");
    const [reachZeroValue, setReachZeroValue] = useState("");
    const [reachChannel, setReachChannel] = useState("");
    const [reachValue, setReachValue] = useState("");
    const [tvrZeroChannel, setTvrZeroChannel] = useState("");
    const [tvrZeroValue, setTvrZeroValue] = useState("");
    const [tvrChannel, setTvrChannel] = useState("");
    const [tvrValue, setTvrValue] = useState("");
    const [shareChannel, setShareChannel] = useState("");
    const [shareValue, setShareValue] = useState("");
    const [timeSpentChannel, setTimeSpentChannel] = useState("");
    const [timeSpentValue, setTimeSpentValue] = useState("");

    const [startrange, setStartRange] = useState("");
    const [loading, setloading] = useState(false);
    const [finishrange, setFinishRange] = useState("");
    useEffect(() => {

        setloading(false);
        axiosConfig.get("allgraph/dashboard")
            .then(rsp => {
                setloading(true);

                setReachZeroChannel(rsp.data.reachZero_channel);
                setReachZeroValue(rsp.data.reachZero_value);
                setReachChannel(rsp.data.reach_channel);
                setReachValue(rsp.data.reach_value);
                setTvrZeroChannel(rsp.data.tvrZero_channel);
                setTvrZeroValue(rsp.data.tvrZero_value);
                setTvrChannel(rsp.data.tvr_channel);
                setTvrValue(rsp.data.tvr_value);
                setShareChannel(rsp.data.share_channel);
                setShareValue(rsp.data.share_value);
                setTimeSpentChannel(rsp.data.timeSpent_channel);
                setTimeSpentValue(rsp.data.timeSpent_value);

                setStartRange(rsp.data.start);
                setFinishRange(rsp.data.finish);


            }).catch(err => {

            })

    }, []);





    return (
        <div>
            <Header title="Dashboard" />
            <MainMenu menu="dashboard" />

            <div class="app-content content">
                <div class="content-overlay"></div>
                <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                    <div class="content-header row">
                    </div>
                    <div class="content-body">

                        <CurrentStatus />

                        {/* Dashboard Table Start */}
                        {cookies.get('_role') === "admin" &&
                            <div class="row" style={{ minHeight: '390px' }}>
                                <div class="col-xl-8 col-12">
                                    <ActiveUserTable />
                                </div>
                                <div class="col-xl-4 col-12">
                                    <ActiveChannelTable />
                                </div>
                            </div>
                        }

                        {(cookies.get('_role') === "general" || cookies.get('_role') === "add-agency") &&
                            <div class="row" >
                                {/* <div class="col-xl-12 col-12">
                                <ActiveUserTable />
                            </div> */}
                                <div class="card col-xl-6 col-12" style={{ minHeight: '500px', maxHeight: '550px' }}>
                                    <ActiveChannelTable />
                                </div>
                                <div class="col-xl-6 col-12" style={{ minHeight: '500px', maxHeight: '550px' }}>
                                    <PieGraph title="Daily Top Share" text="Channel vs TVR" channel={shareChannel} value={shareValue} color="yellow" loading={loading} start={startrange} finish={finishrange} />
                                </div>
                            </div>
                        }



                        {/* Dashboard Graph Start */}
                        <div class="row">
                            <div class="col-md-6">
                                <BarGraphData title="Daily Top Reach(000)" text="Channel vs Reach" channel={reachZeroChannel} value={reachZeroValue} color="red" loading={loading} start={startrange} finish={finishrange} />
                            </div>
                            <div class="col-md-6">
                                <BarGraphData title="Daily Top Reach(%)" text="Channel vs Reach" channel={reachChannel} value={reachValue} color="#28D094" loading={loading} start={startrange} finish={finishrange} />
                            </div>

                        </div>

                        <div class="row">

                            <div class="col-md-6">
                                <BarGraphData title="Daily Top TVR(000)" text="Channel vs TVR" channel={tvrZeroChannel} value={tvrZeroValue} color="cyan" loading={loading} start={startrange} finish={finishrange} />
                            </div>


                            <div class="col-md-6">
                                <BarGraphData title="Daily Top TVR(%)" text="Channel vs TVR" channel={tvrChannel} value={tvrValue} color="black" loading={loading} start={startrange} finish={finishrange} />
                            </div>



                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <BarGraphData title="Daily Top Share" text="Channel vs TVR" channel={shareChannel} value={shareValue} color="yellow" loading={loading} start={startrange} finish={finishrange} />
                            </div>

                            <div class="col-md-6">
                                <BarGraphData title="Daily Top Time Spent-Universe(minute)" text="Channel vs Reach" channel={timeSpentChannel} value={timeSpentValue} color="blue" loading={loading} start={startrange} finish={finishrange} />
                            </div>

                        </div>


                        {/* <ReachPercent/> */}






                    </div>
                </div>

            </div>
        </div>


    )
}
export default Dashboard;