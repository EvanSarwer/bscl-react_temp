import React from 'react';
import {Line} from 'react-chartjs-2';
import CurrentStatus from "../CurrentStatus/CurrentStatus";
import Graph from "../Graph/Graph";
import ReachGraph from "../Graph/ReachGraph";
import ReachPercent from "../Graph/ReachPercent";
import TvrGraph from "../Graph/TvrGraph";
import ShareGraph from "../Graph/ShareGraph";
import TimeSpent from "../Graph/TimeSpent";
import ActiveChannelTable from "../Table/ActiveChannelTable";
import ActiveUserTable from "../Table/ActiveUserTable";


const Dashboard =()=>{
    return(
        <div class="app-content content">
                <div class="content-overlay"></div>
                <div class="content-wrapper">
                    <div class="content-header row">
                    </div>
                    <div class="content-body">

                        <CurrentStatus/>
                        
                        {/* Dashboard Table Start */}
                        <div class="row match-height">
                            <div class="col-xl-8 col-12">
                                <ActiveUserTable/>
                            </div>
                            <div class="col-xl-4 col-lg-12">
                                <ActiveChannelTable/>
                            </div>
                        </div>
                        

                        {/* Dashboard Graph Start */}
                        <div class="row">
                            <div class="col-md-6">
                                <ReachPercent/>
                            </div>
                            <div class="col-md-6">
                                <TvrGraph/>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <ShareGraph/>
                            </div>
                            <div class="col-md-6">
                                <TimeSpent/>
                            </div>
                        </div>




                    
                    </div>
                </div>

        </div>

        
    )
}
export default Dashboard;