import React from 'react';
import CurrentStatus from "../CurrentStatus/CurrentStatus";
import ActiveUserTable from "../Table/ActiveUserTable";
import ActiveChannelTable from "../Table/ActiveChannelTable";
import BarGraph from "../Graph/BarGraph";
import TvrGraph from "../Graph/TvrGraph";
import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosConfig from "../axiosConfig";



const Dashboard = () => {

    return (
        <div class="app-content content">
            <div class="content-overlay"></div>
            <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                <div class="content-header row">
                </div>
                <div class="content-body">

                    <CurrentStatus />

                    {/* Dashboard Table Start */}
                    <div class="row" style={{minHeight:'390px'}}>
                        <div class="col-xl-8 col-12">
                            <ActiveUserTable/>
                        </div>
                        <div class="col-xl-4 col-12">
                            <ActiveChannelTable/>
                        </div>
                    </div>


                    {/* Dashboard Graph Start */}
                    <div class="row">


                        <div class="col-md-4">
                            <BarGraph title="Daily Top Reach(%)" text="Channel vs Reach" url="reach/percent/dashboard" label="Reach of Channels" color="#28D094" get={true} />
                        </div>
                        <div class="col-md-4">
                            <BarGraph title="Daily Top Share" text="Channel vs TVR" url="tvrgraph/dashboard" label="TVR of Channels" color="yellow"  get={true} />
                        </div>

                        <div class="col-md-4">
                            <BarGraph title="Daily Top Time Spent(Universe)" text="Channel vs Reach" url="reach/percent/dashboard" label="Reach of Channels" color="blue"  get={true}/>
                        </div>

                    </div>

                    <div class="row">



                        <div class="col-md-4">
                            <BarGraph title="Daily Top TVR(000)" text="Channel vs TVR" url="tvrgraphzero/dashboard" label="TVR of Channels" color={["cyan","blue"]}  get={true} />
                        </div>

                        <div class="col-md-4">
                            <BarGraph title="Daily Top Reach(000)" text="Channel vs Reach" url="reachuser/dashboard" label="Reach of Channels" color="red"  get={true} />
                        </div>
                        <div class="col-md-4">
                            <BarGraph title="Daily Top TVR(%)" text="Channel vs TVR" url="tvrgraph/dashboard" label="TVR of Channels" color="black"  get={true} />
                        </div>
                    </div>


                    {/* <ReachPercent/> */}






                </div>
            </div>

        </div>


    )
}
export default Dashboard;