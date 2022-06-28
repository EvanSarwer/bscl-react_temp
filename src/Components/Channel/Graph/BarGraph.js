import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState, useEffect } from "react";
import axiosConfig from '../../axiosConfig';



const BarGraph = (props) => {


    const [Data, setData] = useState({
        labels: [],
        datasets: []
    });
    const [startrange,setStartRange] = useState("");
    const [loading,setloading] = useState(false);
    const [finishrange,setFinishRange] = useState("");
    useEffect(() => {
        if(props.get && props.update>0){
            setloading(false);
            axiosConfig.get(props.url)
            .then(rsp => {
                
            setloading(true);
                //debugger;
                //console.log(rsp.data.label);
                if(props.timerange){
                    setStartRange(rsp.data.start);
                    setFinishRange(rsp.data.finish);
                }

                setData(() => ({
                    labels: rsp.data.label, datasets: [{
                        data: rsp.data.value,
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
        else if(!(props.get) && props.update>0){
            
            setloading(false);
            axiosConfig.post("/" + props.url,props.credentials)
            .then(rsp => {
                
            setloading(true);
                //debugger;
                //console.log(rsp.data.label);
                if(props.timerange){
                    setStartRange(rsp.data.start);
                    setFinishRange(rsp.data.finish);
                }

                setData(() => ({
                    labels: rsp.data.label, datasets: [{
                        data: rsp.data.value,
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
            }, [props.update]);


    return (
        <div>
            <div class="card">
                
                <div class="card-content collapse show" >
                <div class="card-header">
                    <h4 class="card-title">{props.title}</h4>
                    {(() => {
                                if (props.timerange) {
                                    return <h4 class="h6">From {startrange} To {finishrange}</h4>


                                } else {
                                    return 

                                }
                            })()}
                </div>
                {(() => {
                                if(props.update==0){
                                    return <div class="col align-self-center">

                                        <h4 class="h6">Waiting for user input</h4>
                                        </div>
                                   
                                }
                                else{
                                    if (loading) {
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
                                            ,plugins: {
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
export default BarGraph;