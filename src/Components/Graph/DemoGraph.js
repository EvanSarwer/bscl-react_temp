import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState, useEffect } from "react";
import axiosConfig from '../axiosConfig';



const DemoGraph = (props) => {






    const [channelData, setChannelData] = useState({
        labels: [],
        datasets: []
    });
    useEffect(() => {

        axiosConfig.post("/" + props.url, props.credentials)
            .then(rsp => {
                //debugger;
                //console.log(rsp.data.channels);

                setChannelData(() => ({
                    labels: rsp.data.range, datasets: [{
                        label: props.label, data: rsp.data.values,
                        backgroundColor: props.color,
                        fill: false,
                        pointRadius: 1,
                        borderColor: props.color,
                        borderWidth: 3
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
                    <Line
                        data={channelData}
                        options={{
                            scales: {
                                x: {
                                    display: false
                                }
                            },
                            tension: 0.4,
                            title: {
                                display: true,
                                text: props.text,
                                fontSize: 10
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
export default DemoGraph;
