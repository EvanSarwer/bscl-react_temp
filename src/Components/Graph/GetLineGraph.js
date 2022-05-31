import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState, useEffect } from "react";
import axios from 'axios';



const GetLineGraph = (props) => {






    const [graphData, setGraphData] = useState({
        labels: [],
        datasets: []
    });
    useEffect(() => {

        axios.get("http://127.0.0.1:8000/api/" + props.url)
            .then(rsp => {
                //debugger;
                //console.log(rsp.data.channels);

                setGraphData(() => ({
                    labels: rsp.data.range, datasets: [{
                        label: props.label, data: rsp.data.values,
                        backgroundColor: props.color,
                        fill: false,
                        pointRadius: 1,
                        borderColor: props.color,
                        borderWidth: 3
                    }]
                }));
                //console.log(graphData);
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
                        data={graphData}
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
export default GetLineGraph;