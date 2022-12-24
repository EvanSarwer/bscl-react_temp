import CountComponent from "./CountComponent";
import TopCount from "./TopCount";
import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";

const CurrentStatus = (props) => {
    // const [activeUser, setActiveUser] = useState("");
    // const [stbCountActive, setSTBCountActive] = useState("");
    // const [ottCountActive, setOTTCountActive] = useState("");
    // const [activePercet, setActivePercent] = useState("");
    // const [stbCountTotal, setSTBCountTotal] = useState("");
    // const [ottCountTotal, setOTTCountTotal] = useState("");
    // const [totalUser, setTotalUser] = useState("");
    //const [topReach, setTopReach] = useState("");
    //const [topTVR, setTopTVR] = useState("");

    // useEffect(() => {

    //     axiosConfig.get("/dashboard/CurrentStatusUser").then(rsp => {
    //         setTotalUser(rsp.data.total_user);
    //         setSTBCountTotal(rsp.data.stb_total);
    //         setOTTCountTotal(rsp.data.ott_total);
    //         setActiveUser(rsp.data.active_user);
    //         setActivePercent(rsp.data.active_percent);
    //         setSTBCountActive(rsp.data.stb_active);
    //         setOTTCountActive(rsp.data.ott_active);

    //     }).catch(err => {

    //     });

    //     // axiosConfig.get("/dashboard/CurrentStatusTopReach").then(rsp => {
    //     //     setTopReach(rsp.data.top_reach);
    //     // }).catch(err => {

    //     // });

    //     // axiosConfig.get("/dashboard/CurrentStatusTopTvr").then(rsp => {
    //     //     setTopTVR(rsp.data.top_tvr);
    //     // }).catch(err => {

    //     // });


    //     const interval = setInterval(() => {
    //         axiosConfig.get("/dashboard/CurrentStatusUser").then(rsp => {
    //             setTotalUser(rsp.data.total_user);
    //             setSTBCountTotal(rsp.data.stb_total);
    //             setOTTCountTotal(rsp.data.ott_total);
    //             setActiveUser(rsp.data.active_user);
    //             setActivePercent(rsp.data.active_percent);
    //             setSTBCountActive(rsp.data.stb_active);
    //             setOTTCountActive(rsp.data.ott_active);
    //         }).catch(err => {

    //         });


    //     }, 10000);

    //     return () => clearInterval(interval);
    // }, []);


    return (
        // {/* <!-- eCommerce statistic --> */}
        <div class="row gx-1">

            <div class="col-xl-2 col-lg-1 col-12">
                <CountComponent title="Total Device" count={props.totalUser} stb={props.stbAll} ott={props.ottCountTotal} icon="la la-hdd-o success" color="success" percentage="100%" />
            </div>
            <div class="col-xl-2 col-lg-1 col-12">
                <CountComponent title="Total Viewer" count={props.totalUser} stb={props.stbCountTotal} ott={props.ottCountTotal} icon="icon-users success" color="success" percentage="100%" />
            </div>
            <div class="col-xl-2 col-lg-1 col-12">
                <CountComponent title="Active Device & Viewer" count={props.activeUser} stb={props.stbCountActive} ott={props.ottCountActive} icon="icon-user-following success" color="success" percentage={props.activePercet+"%"} />
            </div>
            <div class="col-xl-2 col-lg-1 col-12">
                <TopCount title="Top Reach" count={props.topReach} icon="icon-pie-chart warning" color="warning" percentage="" />
            </div>
            <div class="col-xl-2 col-lg-1 col-12">
                <TopCount title="Top TVR" count={props.topTVR} icon="icon-pie-chart info" color="info" percentage="" />
            </div>
            <div class="col-xl-2 col-lg-1 col-12">
                <TopCount title="Top Share" count={props.topTVR} icon="icon-pie-chart danger" color="danger" percentage="" />
            </div>
            {/* <div class="col-xl-2 col-lg-1 col-12">
                <TopCount title="Top Program" count="N/A" icon="icon-pie-chart warning" color="" percentage="" />
            </div> */}

        </div>



    )
}
export default CurrentStatus;