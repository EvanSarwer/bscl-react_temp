import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState, useEffect } from "react";
import axiosConfig from '../axiosConfig';



const BarGraphData = (props) => {


    const [Data, setData] = useState({
        labels: [],
        datasets: []
    });
    useEffect(() => {

        setData(() => ({
            labels: props.channel, datasets: [{
                data: props.value,
                backgroundColor: props.color,
                //borderColor: "black",
                borderWidth: 1,
                categoryPercentage: 0.7,
                barPercentage: 0.7
            }]
        }));

    }, [props]);

    var start_string = new Date(props.start).toLocaleString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
    var finish_string = new Date(props.finish).toLocaleString(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    return (
        <div>
            <div class="card">

                <div class="card-content collapse show" >
                    <div class="card-header">
                        <h4 class="card-title">{props.title}</h4>
                        {(() => {
                            if (start_string != "Invalid Date") {
                                return <h4 class="h6">From {start_string} To {finish_string}</h4>


                            } else {
                                return

                            }
                        })()}
                    </div>
                    {(() => {

                        if (props.loading) {
                            return <Bar
                                data={Data}
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
                                    , plugins: {
                                        legend: {
                                            display: false  //remove if want to show label
                                        }
                                    }




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
export default BarGraphData;
