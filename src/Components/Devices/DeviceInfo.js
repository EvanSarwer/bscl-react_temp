import AllHistoryTable from "./AllHistoryTable";
import Last24HourGraph from "./Last24HourGraph";
import Last24HourHistory from "./Last24HourHistory";
import Last72HourGraph from "./Last72HourGraph";
import TimeSpentGraph from "./TimeSpentGraph";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosConfig from '../axiosConfig';
import Header from "../Header/Header";
import MainMenu from "../MainMenu/MainMenu";

const DeviceInfo = () => {
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        var data = {
            user: id
        };
        axiosConfig.post("/user/userinfo", data).then(rsp => {
            setUserInfo(rsp.data.user);
        }).catch(err => {

        });

    }, [id]);


    return (
        <div><Header title="Audience Profile" />
            <MainMenu menu="dashboard" />
            <div class="app-content content">
                <div class="content-overlay"></div>
                <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                    <div class="content-header row">
                    </div>
                    <div class="content-body">
                        {(() => {
                            if (userInfo) {
                                return <table class="table table-bordered " style={{ backgroundColor: "#FFFF" }}>
                                    <tr>
                                        <th>User Name</th>
                                        <th>Household Name</th>
                                        <th>Device Box ID</th>
                                        <th>Gender</th>
                                        <th>Age</th>
                                        <th>Economic Status</th>
                                    </tr>
                                    <tr>
                                        <td>{userInfo.user_name}</td>
                                        <td>{userInfo.device_name}</td>
                                        <td>{userInfo.device_box_id}</td>
                                        <td>{userInfo.gender}</td>
                                        <td>{userInfo.age}</td>
                                        <td>{userInfo.economic_status}</td>
                                    </tr>
                                </table>
                            }
                        })()}

                        <br />

                        {/* <TimeSpentGraph/> */}
                        <Last24HourGraph id={id} />
                        <Last72HourGraph id={id} />
                        <div class="row match-height">
                            <AllHistoryTable id={id} />
                            <Last24HourHistory id={id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DeviceInfo;