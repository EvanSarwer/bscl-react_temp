import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState, useEffect } from "react";
import axiosConfig from '../axiosConfig';



const BarGraph = (props) => {


    const [Data, setData] = useState({
        labels: [],
        datasets: []
    });
    useEffect(() => {
        if(props.get){
            axiosConfig.get("/" + props.url)
            .then(rsp => {
                //debugger;
                //console.log(rsp.data.label);

                setData(() => ({
                    labels: rsp.data.label, datasets: [{
                        label: props.label, data: rsp.data.value,
                        backgroundColor: props.color,
                        //borderColor: "black",
                        borderWidth: 1,
                        categoryPercentage: 0.7,
                        barPercentage: 0.7
                    }]
                }));
                console.log(Data);
            }).catch(err => {

            })
        }
        else{
            axiosConfig.post("/" + props.url,props.credentials)
            .then(rsp => {
                //debugger;
                //console.log(rsp.data.label);

                setData(() => ({
                    labels: rsp.data.label, datasets: [{
                        label: props.label, data: rsp.data.value,
                        backgroundColor: props.color,
                        //borderColor: "black",
                        borderWidth: 1,
                        categoryPercentage: 0.7,
                        barPercentage: 0.7
                    }]
                }));
                console.log(Data);
            }).catch(err => {

            })
        }
            }, [props]);

    return (
        <div>
            <div class="card">
                
                <div class="card-content collapse show">
                <div class="card-header">
                    <h4 class="card-title">{props.title}</h4>

                </div>
                    <Bar
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
                        }}
                    />
                </div>
            </div>

        </div>

    );
}
export default BarGraph;
