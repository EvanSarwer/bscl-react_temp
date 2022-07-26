import AllHistoryTable from "./AllHistoryTable";
import Last24HourGraph from "./Last24HourGraph";
import Last24HourHistory from "./Last24HourHistory";
import Last72HourGraph from "./Last72HourGraph";
import TimeSpentGraph from "./TimeSpentGraph";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosConfig from '../axiosConfig';
import Header from "../Header/Header";

const DeviceInfo = () => {
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        var data = {
            user: id
        };
        axiosConfig.post("/user/deviceinfo", data).then(rsp => {
            setUserInfo(rsp.data.device);
        }).catch(err => {

        });

    }, [id]);


    return (
        <div><Header title="Audience Profile"/>
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
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Location</th>
                                    <th>Type</th>
                                </tr>
                                <tr>
                                    <td>{userInfo.id}</td>
                                    <td>{userInfo.user_name}</td>
                                    <td>{userInfo.address}</td>
                                    <td>{userInfo.type}</td>
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