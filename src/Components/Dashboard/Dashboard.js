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
                        
                        <div class="col-md-4">
                        <Graph title="Reach(%) Graph" text="Channel vs Reach" url="reach/percent/dashboard" label="Reach of Channels" color="#28D094" />
                        </div>
                        <div class="col-md-4">
                        <Graph title="Reach(000) Graph" text="Channel vs Reach" url="reachuser/dashboard" label="Reach of Channels" color="red" />
                        </div>
                        
                        <div class="col-md-4">
                        <Graph title="Reach(%) Graph" text="Channel vs Reach" url="reach/percent/dashboard" label="Reach of Channels" color="blue" />
                        </div>
                        </div>
                        <div class="row">
                        
                        <div class="col-md-4">
                        <TvrGraph title="TVR(%) Graph" text="Channel vs TVR" url="tvrgraph/dashboard" label="TVR of Channels" color="yellow" />
                        </div>
                        <div class="col-md-4">
                        <TvrGraph title="TVR(000) Graph" text="Channel vs TVR" url="tvrgraphzero/dashboard" label="TVR of Channels" color="cyan" />
                        </div>
                        
                        <div class="col-md-4">
                        <TvrGraph title="TVR(%) Graph" text="Channel vs TVR" url="tvrgraph/dashboard" label="TVR of Channels" color="black" />
                        </div>
                        </div>
                        
                        
                        {/* <ReachPercent/> */}




                    
                    </div>
                </div>

        </div>

        
    )
}
export default Dashboard;