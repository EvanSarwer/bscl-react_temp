import React, { Component } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

const TimelineChart = (props) => {

    const [last72hrData,setLast72hrData] = useState([]);

    
    useEffect(() => {
        var data = {
            user: props.user,
            
        };

        axios.post("http://127.0.0.1:8000/api/user/last72from18", data).then(rsp => {
            //setMsg(rsp.data.error);
            console.log(rsp.data.channels);
            setLast72hrData(rsp.data.channels);

        }).catch(err => {

        });

        


    }, [props.user]);

    
        

        var state = {
            series: [
                {
                    name: 'Bob',
                    data: [
                        // last72hrData.map(dataa => (
                        //     { 
                            
                        //     x: dataa.channel_name,
                        //     y: [
                        //         new Date(dataa.start).getTime(),
                        //         new Date(dataa.finish).getTime()
                        //     ]
                        //  }
                        //  ))

                        {
                            x: 'Design',
                            y: [
                              new Date('2022-05-16 11:57:29').getTime(),
                              new Date('2022-05-16 12:55:04').getTime()
                            ]
                          },
                          {
                            x: 'Code',
                            y: [
                              new Date('2022-05-16 12:55:43').getTime(),
                              new Date('2022-05-16 13:54:33').getTime()
                            ]
                          },
                          {
                            x: 'Code',
                            y: [
                              new Date('2022-05-16 14:12:14').getTime(),
                              new Date('2022-05-16 14:29:56').getTime()
                            ]
                          },
                          {
                            x: 'Test',
                            y: [
                              new Date('2022-05-16 14:38:28').getTime(),
                              new Date('2022-05-16 14:51:33').getTime()
                            ]
                          },
                          {
                            x: 'Test',
                            y: [
                              new Date('2022-05-16 14:59:25').getTime(),
                              new Date('2022-05-16 15:00:05').getTime()
                            ]
                          },
                          {
                            x: 'Validation',
                            y: [
                              new Date('2022-05-16 15:09:12').getTime(),
                              new Date('2022-05-16 15:25:33').getTime()
                            ]
                          },
                          {
                            x: 'Design',
                            y: [
                              new Date('2022-05-16 15:26:12').getTime(),
                              new Date('2022-05-16 16:03:29').getTime()
                            ],
                          }
                        
                    ]
                },

            ],
            options: {
                chart: {
                    height: 450,
                    type: 'rangeBar'
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        barHeight: '80%'
                    }
                },
                xaxis: {
                    type: 'datetime'
                },
                stroke: {
                    width: 1
                },
                fill: {
                    type: 'solid',
                    opacity: 0.6
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'left'
                }
            },
        };
    

    
        return (
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={state.options}
                            series={state.series}
                            type="rangeBar"
                            height="350"
                            width="900"
                        />
                    </div>
                </div>
            </div>
        );
    
}

export default TimelineChart;