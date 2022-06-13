import React from 'react';
import CurrentStatus from "../CurrentStatus/CurrentStatus";
import ActiveUserTable from "../Table/ActiveUserTable";
import ActiveChannelTable from "../Table/ActiveChannelTable";



const DashboardUser = () => {

    return (
        <div class="app-content content">
            <div class="content-overlay"></div>
            <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                <div class="content-header row">
                </div>
                <div class="content-body">

                    <CurrentStatus />

                    {/* Dashboard Table Start */}
                    <div class="row" style={{minHeight:'390px'}}>
                        <div class="col-xl-8 col-12">
                            <ActiveUserTable/>
                        </div>
                        <div class="col-xl-4 col-12">
                            <ActiveChannelTable/>
                        </div>
                    </div>




                    {/* <ReachPercent/> */}






                </div>
            </div>

        </div>


    )
}
export default DashboardUser;