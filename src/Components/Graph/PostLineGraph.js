import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState, useEffect } from "react";
import axiosConfig from '../axiosConfig';



const PostLineGraph = (props) => {






    const [loading,setloading] = useState(false);
    const [graphData, setGraphData] = useState({
        labels: [],
        datasets: []
    });
    useEffect(() => {
if(props.update>0){

    setloading(false);
        axiosConfig.post("/" + props.url,props.credentials)
            .then(rsp => {
                
                props.parentPass({
                    labels: rsp.data.label, values: rsp.data.values
                });
            setloading(true);
                //debugger;
                console.log(rsp.data);

                setGraphData(() => ({
                    labels: rsp.data.label, datasets: [{
                        label: props.label, data: rsp.data.values,
                        backgroundColor: props.color,
                        fill: false,
                        pointRadius: 1,
                        borderColor: props.color,
                        borderWidth: 3
                    }]
                }));
                console.log(graphData);
            }).catch(err => {

            })
        }
    }, [props.update]);

    return (
        <div>
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">{props.title}</h4>

                </div>
                <div class="card-content collapse show">
                    {(() => {
                                if(props.update==0){
                                    return <div class="col align-self-center">

                                        <h4 class="h6">Waiting for user input</h4>
                                        </div>
                                   
                                }
                                else{
                                    if (loading) {
                                        return <Line
                                        data={graphData}
                                        options={{
                                            
                                            tension: 0.4,
                                            title: {
                                                display: true,
                                                text: props.text,
                                                fontSize: 10
                                            },
                                            scales: {
                                                y: {
                                                    beginAtZero: true
                                                }
                                            },
                                            legend: {
                                                display: true,
                                                position: 'right'
                                            },
                                            plugins: {
                                                legend: {
                                                  display: false  //remove if want to show label
                                                }
                                              }
                                        }}
                                    />
    
    
                                    } else {
                                        return <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831" class="rounded mx-auto d-block" alt="..."/>
    
                                    }
                                }
                            })()}
                </div>
            </div>

        </div>

    );
}
export default PostLineGraph;
