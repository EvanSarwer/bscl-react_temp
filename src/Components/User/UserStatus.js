import React from 'react';
import CurrentStatus from "../CurrentStatus/CurrentStatus";
import Graph from "../Graph/Graph";
import PostGraph from "../Graph/PostGraph";
import TvrGraph from "../Graph/TvrGraph";
import ActiveChannelTable from "../Table/ActiveChannelTable";
import ActiveUserTable from "../Table/ActiveUserTable";


const UserStatus =()=>{
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
                                    <option value="">Select User</option>
                                    <option>AIUB_Prototype</option>
                                    <option>BSCL_Prototype_1</option>
                                    <option>BSCL_Prototype_2</option>
                                    <option>BSCL_CHAIRMAN_SIR_HOME</option>
                                    <option>BSCL_Prototype_4</option>
                                    <option>BSCL_Prototype_5</option>
                                    <option>BSCL_Prototype_6</option>
                                    <option>BSCL_CHAIRMAN_SIR_OFFICE</option>
                                    <option>BSCL_Prototype_8</option>
                                    <option>BSCL_Prototype_9</option>
                                    <option>BSCL_Prototype_10</option>
                                </select>
                            </div>
                            <div class="col-md-5">
                            <select class="custom-select d-block w-100" id="gender" required="">
                                    <option value="">Choose Time Frame</option>
                                    <option>Daily</option>
                                    <option>Weekly</option>
                                    <option>Monthly</option>
                                    <option>Yearly</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                            <button class="btn btn-danger">Download CSV</button>
                            </div>
                                                    
                        </div>  
                        <br/>  
                        
                        

                    {/* <div class="row">
                        <div class="col-md-4">
                        <DemoGraph title="Reach (%)" text="Active Channels" url="channel/reach/percent" label="Reach (%)" color="blue" credentials={credential} />
                        
                        </div>
                        <div class="col-md-4">
                        <DemoGraph title="Reach (000)" text="Active Channels" url="channel/reach/percent" label="Reach (000)" color="pink" credentials={credential} />
                        
                        </div>
                        <div class="col-md-4">
                        <DemoGraph title="TVR (000)" text="Active Channels" url="channel/reach/percent" label="TVR (000)" color="green" credentials={credential} />
                        
                        </div>
                        </div>   */}
                    <div class="row">
                        {/* <div class="col-md-4">
                        <DemoGraph title="TVR (%)" text="Active Channels" url="channel/reach/percent" label="TVR (%)" color="red" credentials={credential} />
                        
                        </div>
                        <div class="col-md-4">
                        <DemoGraph title="Share" text="Active Channels" url="channel/reach/percent" label="Share" color="yellow" credentials={credential} />
                        
                        </div> */}
                        <div class="col-md-12">
                        <PostGraph title="Time Spent" text="Channels" url="reach/percent" label="Time Spent" color="blue" credentials={credential} />
                        
                        </div>
                        </div>  
                </div>
                </div>    
                              
                </div>

        

        
    )
}
export default UserStatus;