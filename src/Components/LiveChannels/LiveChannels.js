import React from 'react';
import CurrentStatus from "../CurrentStatus/CurrentStatus";
import Graph from "../Graph/Graph";
import PostGraph from "../Graph/PostGraph";
import TvrGraph from "../Graph/TvrGraph";
import ActiveChannelTable from "../Table/ActiveChannelTable";
import ActiveUserTable from "../Table/ActiveUserTable";


const LiveChannels = () => {
    var credential = { start: "2021-01-01 00:00:00", finish: "2022-01-01 00:00:00" };
    return (
        <div class="app-content content">
            <div class="content-overlay"></div>
            <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                <div class="content-header row">
                </div>
                <div class="content-body">

                    <div class="row">
                        <div class="col-md-2">
                            <select class="custom-select d-block w-100" id="gender" required="">
                                <option value="">Choose Region</option>
                                <option>Dhaka</option>
                                <option>Chittagong</option>
                                <option>Rajshahi</option>
                                <option>Sylhet</option>
                                <option>Mymensingh</option>
                                <option>Khulna</option>
                                <option>Rongpur</option>
                                <option>Barishal</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <select class="custom-select d-block w-100" id="gender" required="">
                                <option value="">Choose Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                        <div class="col-md-2">

                            <select class="custom-select d-block w-100" id="gender" required="">
                                <option value="">Economic Status</option>
                                <option>Lower Class</option>
                                <option>Upper Middle Class</option>
                                <option>Lower Middle Class</option>
                                <option>Upper Class</option>
                            </select>
                        </div>
                        <div class="col-md-2">


                            <select class="custom-select d-block w-100" id="gender" required="">
                                <option value="">Socio Status</option>
                                <option>Urban</option>
                                <option>Rural</option>
                            </select>
                        </div>
                        <div class="col-md-2">

                            <div class="price-range">
                                <div class="form-group">
                                    <div class="slider-sm slider-success my-1" id="small-slider"></div>
                                </div>
                                <div class="price-slider">
                                    <div class="price_slider_amount mb-2">
                                        <div class="range-amt"><strong>Age Range : </strong> 15
                                            - 100</div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <button class="btn btn-danger">Download CSV</button>
                        </div>


                    </div>

                </div>

            </div>

            <div class="row justify-content-md-center">
                <div class="col-md-11">
                    <PostGraph title="Active Users" text="Active Channels" url="reach/percent" label="Active Users" color="blue" credentials={credential} />

                </div>
            </div>
        </div>




    )
}
export default LiveChannels;