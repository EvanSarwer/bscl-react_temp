import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from "react";
const TimeSpentGraph =()=>{
    const [msg, setMsg] = useState("");
    const [channelData, setChannelData] = useState({
        labels: [],
        datasets: []
    });
    const [timeSpentCSV, setTimeSpentCSV] = useState({});
    return (
        <div class="row justify-content-md-center">
            <div class="col">
                {/* <PostGraph title="Time Spent" text="Channels" url="reach/percent" label="Time Spent" color="blue" credentials={credential} /> */}


                {(() => {
                    if (msg === "Error") {
                        return <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Time Spent</h4>
                                <h4><span class="danger">Please Select User & Time Frame</span></h4>
                            </div>
                        </div>


                    } else {
                        return <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Time Spent</h4>
                            </div>
                            <div class="card-content collapse show ">
                                <div  style={{height:"35em"}}>
                                    <Bar
                                        data={channelData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            title: {
                                                display: true,
                                                text: "Channels",
                                                fontSize: 20
                                            },
                                            scales: {
                                                y: {
                                                    beginAtZero: true
                                                }
                                            },
                                            legend: {
                                                display: true,
                                                position: 'right'
                                            }
                                        }}
                                    />
                                </div>

                            </div>
                        </div>

                    }
                })()}


            </div>
        </div>
    )
}
export default TimeSpentGraph;