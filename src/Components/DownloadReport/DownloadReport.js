const DownloadReport = () => {
    return (
        <div class="app-content content">
            <div class="content-overlay"></div>
            <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                <div class="content-header row">
                </div>
                <div class="content-body">
                    <div class="card">
                        <div class="card-content">
                            <div class="card-body">
                                <h1>Download Channel Trend Report:</h1>
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
                                <br />
                                <br />

                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content">
                            <div class="card-body">
                                <h1>Download Channel Report:</h1>
                                <div class="row">
                                    <div class="col-md-4">
                                        <select class="custom-select d-block w-100" id="gender" required="">
                                            <option value="">Choose Channel</option>
                                            <option>Reach(000) Report</option>
                                            <option>Reach(%) Report</option>
                                            <option>TVR(000) Report</option>
                                            <option>TVR(%) Report</option>
                                            <option>Share Report</option>
                                            <option>Timespent Report</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <fieldset class="form-group form-group-style">
                                            <label for="dateTime1">Start Time</label>
                                            <input type="datetime-local" class="form-control" id="dateTime1" step="1" />
                                        </fieldset>
                                    </div>


                                    <div class="col-md-3">
                                        <fieldset class="form-group form-group-style">
                                            <label for="dateTime1">Finish Time</label>
                                            <input type="datetime-local" class="form-control" id="dateTime1" step="1" />
                                        </fieldset>
                                    </div>
                                    <div class="col-md-2">
                                        <button class="btn btn-danger">Download CSV</button>
                                    </div>
                                </div>
                                <br />
                                <br />

                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-content">
                            <div class="card-body">
                                <h1>Download Live Channels Report:</h1>

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
                                <br />

                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content">
                            <div class="card-body">
                                <h1>Download User Time Spent Report:</h1>
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
                                <br />

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}
export default DownloadReport;