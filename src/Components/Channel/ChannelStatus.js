import React from 'react';
import CurrentStatus from "../CurrentStatus/CurrentStatus";
import Graph from "../Graph/Graph";
import PostGraph from "../Graph/PostGraph";
import TvrGraph from "../Graph/TvrGraph";
import ActiveChannelTable from "../Table/ActiveChannelTable";
import ActiveUserTable from "../Table/ActiveUserTable";


const ChannelStatus =()=>{
    var credential = {start:"2021-01-01 00:00:00",finish:"2022-01-01 00:00:00"};
    return(
        <div class="app-content content">
                <div class="content-overlay"></div>
                <div class="content-wrapper" style={{backgroundColor: "azure"}} >
                    <div class="content-header row">
                    </div>
                    <div class="content-body">

                        <div class="row">
                        <div class="col-md-5">
                        <select class="custom-select d-block w-100" id="gender" required="">
                                <option value="">Choose Time Frame</option>
                                <option>Daily</option>
                                <option>Weekly</option>
                                <option>Montly</option>
                                <option>Yearly</option>
                            </select>
                            </div>
                                                    
                        </div>  
                        <br/>  
                        
                        </div>    
                              
                    </div>

                    <div class="row">
                        <div class="col-md-4">
                        <PostGraph title="Reach (%)" text="Active Channels" url="reach/percent" label="Active Users" color="blue" credentials={credential} />
                        
                        </div>
                        <div class="col-md-4">
                        <PostGraph title="Reach (000)" text="Active Channels" url="reach/percent" label="Active Users" color="pink" credentials={credential} />
                        
                        </div>
                        <div class="col-md-4">
                        <PostGraph title="TVR (000)" text="Active Channels" url="reach/percent" label="Active Users" color="green" credentials={credential} />
                        
                        </div>
                        </div>  
                    <div class="row">
                        <div class="col-md-4">
                        <PostGraph title="TVR (%)" text="Active Channels" url="reach/percent" label="Active Users" color="red" credentials={credential} />
                        
                        </div>
                        <div class="col-md-4">
                        <PostGraph title="Share" text="Active Channels" url="reach/percent" label="Active Users" color="yellow" credentials={credential} />
                        
                        </div>
                        <div class="col-md-4">
                        <PostGraph title="Time Spent(Universe)" text="Active Channels" url="reach/percent" label="Active Users" color="blue" credentials={credential} />
                        
                        </div>
                        </div>  
                </div>

        

        
    )
}
export default ChannelStatus;