import React from 'react';
import CurrentStatus from "../CurrentStatus/CurrentStatus";
import Graph from "../Graph/Graph";
import DemoGraph from "../Graph/DemoGraph";
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
                                    <option value="">Choose Channel</option>
                                    <option>BTV</option>
                                    <option>BTV World</option>
                                    <option>BTV Chattogarm</option>
                                    <option>NTV</option>
                                    <option>ATN Bangla</option>
                                    <option>ATN News</option>
                                    <option>Bijoy TV</option>
                                    <option>Channel I</option>
                                    <option>Bangla Vision</option>
                                    <option>Ekattor</option>
                                    <option>Ekushey ETV</option>
                                </select>
                            </div>
                            <div class="col-md-5">
                            <select class="custom-select d-block w-100" id="gender" required="">
                                    <option value="">Choose Time Frame</option>
                                    <option>Daily</option>
                                    <option>Weekly</option>
                                    <option>Montly</option>
                                    <option>Yearly</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                            <button class="btn btn-danger">Download CSV</button>
                            </div>
                                                    
                        </div>  
                        <br/>  
                        
                        

                    <div class="row">
                        <div class="col-md-4">
                        <DemoGraph title="Reach (%)" text="Active Channels" url="channel/reach/percent" label="Reach (%)" color="blue" credentials={credential} />
                        
                        </div>
                        <div class="col-md-4">
                        <DemoGraph title="Reach (000)" text="Active Channels" url="channel/reach/percent" label="Reach (000)" color="pink" credentials={credential} />
                        
                        </div>
                        <div class="col-md-4">
                        <DemoGraph title="TVR (000)" text="Active Channels" url="channel/reach/percent" label="TVR (000)" color="green" credentials={credential} />
                        
                        </div>
                        </div>  
                    <div class="row">
                        <div class="col-md-4">
                        <DemoGraph title="TVR (%)" text="Active Channels" url="channel/reach/percent" label="TVR (%)" color="red" credentials={credential} />
                        
                        </div>
                        <div class="col-md-4">
                        <DemoGraph title="Share" text="Active Channels" url="channel/reach/percent" label="Share" color="yellow" credentials={credential} />
                        
                        </div>
                        <div class="col-md-4">
                        <DemoGraph title="Time Spent(Universe)" text="Active Channels" url="channel/reach/percent" label="Time Spent(Universe)" color="blue" credentials={credential} />
                        
                        </div>
                        </div>  
                </div>
                </div>    
                              
                </div>

        

        
    )
}
export default ChannelStatus;