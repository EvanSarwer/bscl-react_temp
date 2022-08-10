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
import MainMenuUser from '../MainMenu/MainMenuUser';
import HeaderUser from '../Header/HeaderUser';



const DashboardUser = () => {

    return (
        <div>
            <HeaderUser title="Dashboard" />
            <MainMenuUser menu="dashboard" />

            <div class="app-content content">
                <div class="content-overlay"></div>
                <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                    <div class="content-header row">
                    </div>
                    <div class="content-body">

                        <CurrentStatus />

                        {/* Dashboard Table Start */}
                        <div class="row" style={{ minHeight: '390px' }}>
                            {/* <div class="col-xl-12 col-12">
                                <ActiveUserTable />
                            </div> */}
                            <div class="col-xl-12 col-12">
                                <ActiveChannelTable />
                            </div>
                        </div>


                        {/* Dashboard Graph Start */}
                        <div class="row">
                            <div class="col-md-6">
                                <BarGraph title="Daily Top Reach(000)" text="Channel vs Reach" url="reachuser/dashboard" color="red" get={true} timerange={true} />
                            </div>
                            <div class="col-md-6">
                                <BarGraph title="Daily Top Reach(%)" text="Channel vs Reach" url="reach/percent/dashboard" color="#28D094" get={true} timerange={true} />
                            </div>

                        </div>

                        <div class="row">

                            <div class="col-md-6">
                                <BarGraph title="Daily Top TVR(000)" text="Channel vs TVR" url="tvrgraphzero/dashboard" color="cyan" get={true} timerange={true} />
                            </div>


                            <div class="col-md-6">
                                <BarGraph title="Daily Top TVR(%)" text="Channel vs TVR" url="tvrgraph/dashboard" color="black" get={true} timerange={true} />
                            </div>



                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <BarGraph title="Daily Top Share" text="Channel vs TVR" url="sharegraph/dashboard" color="yellow" get={true} timerange={true} />
                            </div>

                            <div class="col-md-6">
                                <BarGraph title="Daily Top Time Spent-Universe(minute)" text="Channel vs Reach" url="/dashboard/timespentuni" color="blue" get={true} timerange={true} />
                            </div>

                        </div>


                        {/* <ReachPercent/> */}






                    </div>
                </div>

            </div>
        </div>


    )
}
export default DashboardUser;