import CountComponent from "./CountComponent";
import TopCount from "./TopCount";
import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";

const CurrentStatus = () => {
    const [activeUser,setActiveUser] =useState("");
    const [activePercet,setActivePercent] = useState("");
    const [totalUser,setTotalUser] =useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            axiosConfig.get("/dashboard/CurrentStatusUser").then(rsp => {
                console.log(rsp.data);
                setTotalUser(rsp.data.total_user);
                setActiveUser(rsp.data.active_user);
                setActivePercent(rsp.data.active_percent);
            }).catch(err => {
    
            })
        }, 2000);
      
        return () => clearInterval(interval);
      }, []);


    return (
        // {/* <!-- eCommerce statistic --> */}
        <div class="row gx-1">

            <div class="col-xl-2 col-lg-1 col-12">
                <CountComponent title="Total User" count={totalUser} icon="icon-users success" color="success" percentage="100%" />
            </div>
            <div class="col-xl-2 col-lg-1 col-12">
                <CountComponent title="Active User" count={activeUser} icon="icon-user-following success" color="success" percentage={activePercet} />
            </div>
            <div class="col-xl-2 col-lg-1 col-12">
                <TopCount title="Top Reach" count="ATN" icon="icon-pie-chart warning" color="warning" percentage="" />
            </div>
            <div class="col-xl-2 col-lg-1 col-12">
                <TopCount title="Top TVR" count="BTV" icon="icon-pie-chart info" color="info" percentage="" />
            </div>
            <div class="col-xl-2 col-lg-1 col-12">
                <TopCount title="Top Share" count="NTV" icon="icon-pie-chart danger" color="danger" percentage="" />
            </div>
            <div class="col-xl-2 col-lg-1 col-12">
                <TopCount title="Top Program" count="N/A" icon="icon-pie-chart warning" color="" percentage="" />
            </div>
            
        </div>



    )
}
export default CurrentStatus;