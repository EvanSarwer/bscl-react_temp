import React from 'react';
import CurrentStatus from "../CurrentStatus/CurrentStatus";
import Graph from "../Graph/Graph";
import TvrGraph from "../Graph/TvrGraph";
import ActiveChannelTable from "../Table/ActiveChannelTable";
import ActiveUserTable from "../Table/ActiveUserTable";
import { useState, useEffect } from 'react';
import axios from 'axios';


const Dashboard = () => {
    const [activeChannelList, setActiveChannelList] = useState([]);
    const [activeUserList, setActiveUserList] = useState([]);

    useEffect(() => {

        axios.get("http://127.0.0.1:8000/api/dashboard/activechannellist").then(rsp => {
            console.log(rsp.data);
            setActiveChannelList(rsp.data.activeChannels);
        }).catch(err => {

        })

        axios.get("http://127.0.0.1:8000/api/dashboard/activeuserlist").then(rsp => {
            console.log(rsp.data);
            setActiveUserList(rsp.data.activeUsers);
        }).catch(err => {

        })



    },[])



    return (
        <div class="app-content content">
            <div class="content-overlay"></div>
            <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                <div class="content-header row">
                </div>
                <div class="content-body">

                    <CurrentStatus />

                    {/* Dashboard Table Start */}
                    <div class="row">
                        <div class="col-xl-8 col-12"  style={{maxHeight:'400px'}}>
                            <ActiveUserTable data={activeUserList}/>
                        </div>
                        <div class="col-xl-4 col-12" style={{maxHeight:'400px'}}>
                            <ActiveChannelTable data={activeChannelList} />
                        </div>
                    </div>


                    {/* Dashboard Graph Start */}
                    <div class="row">


                        <div class="col-md-4">
                            <Graph title="Daily Top Reach(%)" text="Channel vs Reach" url="reach/percent/dashboard" label="Reach of Channels" color="#28D094" />
                        </div>
                        <div class="col-md-4">
                            <TvrGraph title="Daily Top Share" text="Channel vs TVR" url="tvrgraph/dashboard" label="TVR of Channels" color="yellow" />
                        </div>

                        <div class="col-md-4">
                            <Graph title="Daily Top Time Spent(Universe)" text="Channel vs Reach" url="reach/percent/dashboard" label="Reach of Channels" color="blue" />
                        </div>

                    </div>

                    <div class="row">



                        <div class="col-md-4">
                            <TvrGraph title="Daily Top TVR(000)" text="Channel vs TVR" url="tvrgraphzero/dashboard" label="TVR of Channels" color="cyan" />
                        </div>

                        <div class="col-md-4">
                            <Graph title="Daily Top Reach(000)" text="Channel vs Reach" url="reachuser/dashboard" label="Reach of Channels" color="red" />
                        </div>
                        <div class="col-md-4">
                            <TvrGraph title="Daily Top TVR(%)" text="Channel vs TVR" url="tvrgraph/dashboard" label="TVR of Channels" color="black" />
                        </div>
                    </div>


                    {/* <ReachPercent/> */}






                </div>
            </div>

        </div>


    )
}
export default Dashboard;