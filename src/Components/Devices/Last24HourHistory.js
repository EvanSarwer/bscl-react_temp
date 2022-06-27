import Table from "../User/Table";
import { useState,useEffect } from "react"; 
import axiosConfig from '../axiosConfig';
const Last24HourHistory = ({id})=>{
    var data = {
        user: {user_name:id},
        time: "Daily",
    };
    const [errordaytime, setErrordaytime] = useState("");
    const [channeldaytime, setChanneldaytime] = useState([]);
    const [last24hrData, setLast24hrData] = useState([]);
    let last24Array = [];

    axiosConfig.post("/user/userdaytimeviewlist", data).then(rsp => {
        setErrordaytime(rsp.data.error);
        setChanneldaytime(rsp.data.channels);
        for (var i = 0; i < rsp.data.channels.length; i++) {
            if (rsp.data.channels[i].totaltime > 0) {
                last24Array.push(rsp.data.channels[i]);
            }
        }
        setLast24hrData(last24Array);
    }).catch(err => {

    });
    return(
        <div class="col-xl-6 col-12">
            {(() => {
                if (channeldaytime) {
                    return <Table title="Last 24 Hour Channel Views" channels={last24hrData} error={errordaytime} />

                } else {
                    return <div class="card">
                        <div class="card-header">
                            <h4 class="card-title"><span class="danger">Please Select User To Show The Table</span></h4>
                        </div>
                    </div>

                }
            })()}
            {/* <DailyTimeSpentList /> */}
        </div>
    )
}
export default Last24HourHistory;