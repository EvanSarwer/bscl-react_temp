import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState, useEffect } from "react";
import axiosConfig from '../axiosConfig';



const PieGraph = (props) => {


    const [Data, setData] = useState({
        labels: [],
        datasets: []
    });
    const [startrange, setStartRange] = useState("");
    const [loading, setloading] = useState(false);
    const [finishrange, setFinishRange] = useState("");
    useEffect(() => {
        if (props.get) {

            setloading(false);
            axiosConfig.get(props.url)
                .then(rsp => {

                    setloading(true);
                    //debugger;
                    //console.log(rsp.data.label);
                    if (props.timerange) {
                        setStartRange(rsp.data.start);
                        setFinishRange(rsp.data.finish);
                    }

                    setData(() => ({
                        labels: rsp.data.label, 
                        datasets: [{
                            data: rsp.data.value,
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 205, 86)',
                                'rgb(153, 204, 0)',
                                'rgb(0, 255, 0)',
                                'rgb(255, 0, 255)',
                                'rgb(255, 102, 0)',
                                'rgb(102, 0, 102)',
                                'rgb(51, 204, 204)',
                                'rgb(255, 128, 128)',
                              ],
                            //backgroundColor: props.color,
                            //borderColor: "black",
                            //borderWidth: 1,
                            //categoryPercentage: 0.7,
                            //barPercentage: 0.7
                            hoverOffset: 4
                        }]
                    }));
                    console.log(Data);
                }).catch(err => {

                })
        }
        else {

            setloading(false);
            axiosConfig.post("/" + props.url, props.credentials)
                .then(rsp => {

                    setloading(true);
                    //debugger;
                    //console.log(rsp.data.label);
                    if (props.timerange) {
                        setStartRange(rsp.data.start);
                        setFinishRange(rsp.data.finish);
                    }

                    setData(() => ({
                        labels: rsp.data.label, 
                        datasets: [{
                            data: rsp.data.value,
                            //backgroundColor: props.color,
                            //borderColor: "black",
                            borderWidth: 1,
                            //categoryPercentage: 0.7,
                            //barPercentage: 0.7
                        }]
                    }));
                    console.log(Data);
                }).catch(err => {

                })
        }
    }, [props]);

    var start_string = new Date(startrange).toLocaleString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
    var finish_string = new Date(finishrange).toLocaleString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div>
            <div class="card">

                <div class="card-content collapse show" >
                    <div class="card-header">
                        <h4 class="card-title">{props.title}</h4>
                        {(() => {
                            if (props.timerange && start_string != "Invalid Date") {
                                return <h4 class="h6">From {start_string} To {finish_string}</h4>


                            } else {
                                return

                            }
                        })()}
                    </div>
                    {(() => {

                        if (loading) {
                            return <Pie style={{  maxHeight: '440px' }}
                                data={Data}
                                options={{
                                    // title: {
                                    //     display: true,
                                    //     text: props.text,
                                    //     fontSize: 20
                                    // },
                                    // legend: {
                                    //     display: true,
                                    //     position: 'right'
                                    // }
                                    // , plugins: {
                                    //     legend: {
                                    //         display: false  //remove if want to show label
                                    //     }
                                    // }
                                    //cutout: '50',
                                    radius: '100%',




                                }}
                            />


                        } else {
                            return <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831" class="rounded mx-auto d-block" alt="..." />

                        }

                    })()}
                </div>
            </div>

        </div>

    );
}
export default PieGraph;