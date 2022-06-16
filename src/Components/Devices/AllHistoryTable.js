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

    useEffect(()=>{
        axiosConfig.post("/user/useralltimeview", data).then(rsp => {
            setErroralltime(rsp.data.error);
            setChannelalltime(rsp.data.channels);
        }).catch(err => {

        });
    },[]);
    return (
        <div class="col-xl-6  col-12">
            {(() => {
                if (channelalltime) {
                    return <Table title="All Time Channel Views" channels={channelalltime} error={erroralltime} />

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