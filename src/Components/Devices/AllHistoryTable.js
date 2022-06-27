import Table from "../User/Table";
import { useState,useEffect } from "react"; 
import axiosConfig from '../axiosConfig';

const AllHistoryTable=({id})=>{
    var data = {
        user: {user_name:id},
        time: "Daily",
    };
    const [channelalltime, setChannelalltime] = useState([]);
    const [erroralltime, setErroralltime] = useState("");
    const [allTimeData, setAllTimeData] = useState([]);
    let dArray = [];

    useEffect(()=>{
        axiosConfig.post("/user/useralltimeview", data).then(rsp => {
            setErroralltime(rsp.data.error);
            setChannelalltime(rsp.data.channels);
            for (var i = 0; i < rsp.data.channels.length; i++) {
                if (rsp.data.channels[i].totaltime > 0) {
                    dArray.push(rsp.data.channels[i]);
                }
            }
            setAllTimeData(dArray);
        }).catch(err => {

        });
    },[]);
    return (
        <div class="col-xl-6  col-12">
            {(() => {
                if (channelalltime) {
                    return <Table title="All Time Channel Views" channels={allTimeData} error={erroralltime} />

                } else {
                    return <div class="card">
                        <div class="card-header">
                            <h4 class="card-title"><span class="danger">Please Select User To Show The Table</span></h4>
                        </div>
                    </div>
                }
            })()}
        </div>
    )
}
export default AllHistoryTable ;