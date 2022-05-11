import React from 'react';
import {Line} from 'react-chartjs-2';
import CurrentStatus from "../CurrentStatus/CurrentStatus";
import Graph from "../Graph/Graph";
import ReachGraph from "../Graph/ReachGraph";
import ReachPercent from "../Graph/ReachPercent";
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
                        <div class="row">
                        <div class="col-md-8">
                        <ActiveUserTable/>
                        </div>
                        
                        <div class="col-md-4">
                        <ActiveChannelTable/>
                        </div>
                        </div>
{/* 
                        <div class="row">
                        
                        <div class="col-md-6">
                        <ReachGraph/>
                        </div>
                        <div class="col-md-6">
                        <ReachGraph/>
                        </div>
                        </div>
                        <div class="row">
                        
                        <div class="col-md-6">
                        <ReachGraph/>
                        </div>
                        <div class="col-md-6">
                        <ReachGraph/>
                        </div>
                        </div> */}
                        
                        <div class="row">
                        
                        <div class="col-md-6">
                        <ReachPercent/>
                        </div>
                        <div class="col-md-6">
                        <ReachPercent/>
                        </div>
                        </div>
                        <div class="row">
                        
                        <div class="col-md-6">
                        <ReachPercent/>
                        </div>
                        <div class="col-md-6">
                        <ReachPercent/>
                        </div>
                        </div>
                        
                        {/* <ReachPercent/> */}




                    
                    </div>
                </div>

        </div>

        
    )
}
export default Dashboard;