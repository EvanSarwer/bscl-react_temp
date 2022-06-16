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

    axiosConfig.post("/user/userdaytimeviewlist", data).then(rsp => {
        setErrordaytime(rsp.data.error);
        setChanneldaytime(rsp.data.channels);
    }).catch(err => {

    });
    return(
        <div class="col-xl-6 col-12">
            {(() => {
                if (channeldaytime) {
                    return <Table title="Last 24 Hour Channel Views" channels={channeldaytime} error={errordaytime} />

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