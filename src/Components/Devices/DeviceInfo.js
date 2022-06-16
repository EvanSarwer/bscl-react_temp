import AllHistoryTable from "./AllHistoryTable";
import Last24HourGraph from "./Last24HourGraph";
import Last24HourHistory from "./Last24HourHistory";
import Last72HourGraph from "./Last72HourGraph";
import TimeSpentGraph from "./TimeSpentGraph";
import { useParams } from "react-router-dom";

const DeviceInfo=()=>{
    const {id} = useParams();
    return(
        <div class="app-content content">
            <div class="content-overlay"></div>
            <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                <div class="content-header row">
                </div>
                <div class="content-body">
                    {/* <TimeSpentGraph/> */}
                    <Last24HourGraph id={id}/>
                    <Last72HourGraph id={id}/>
                    <div class="row match-height">
                        <AllHistoryTable id={id}/>
                        <Last24HourHistory id={id}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DeviceInfo;