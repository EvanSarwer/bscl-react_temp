import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState, useEffect } from "react";
import axios from 'axios';



const PostGraph = (props) => {






    const [channelData, setChannelData] = useState({
        labels: [],
        datasets: []
    });
    useEffect(() => {

        axios.post("http://127.0.0.1:8000/api/" + props.url, props.credentials)
            .then(rsp => {
                //debugger;
                //console.log(rsp.data.channels);

                setChannelData(() => ({
                    labels: rsp.data.channels, datasets: [{
                        label: props.label, data: rsp.data.reach,
                        backgroundColor: props.color,
                        //borderColor: "black",
                        borderWidth: 1,
                        categoryPercentage: 0.7,
                        barPercentage: 0.7
                    }]
                }));
                console.log(channelData);
            }).catch(err => {

            })
    }, []);

    return (
        <div>
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">{props.title}</h4>

                </div>
                <div class="card-content collapse show">
                    <div class="card-body"></div>
                    <Bar
                        data={channelData}
                        options={{
                            title: {
                                display: true,
                                text: props.text,
                                fontSize: 20
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

    );
}
export default PostGraph;
