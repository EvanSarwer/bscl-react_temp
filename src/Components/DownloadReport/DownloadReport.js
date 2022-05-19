const DownloadReport = () => {
    return (
        <div class="app-content content">
            <div class="content-overlay"></div>
            <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                <div class="content-header row">
                </div>
                <div class="content-body">
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

                </div>
            </div>

        </div>




    )
}
export default DownloadReport;