import React, { Component } from "react";
import { useState, useEffect } from "react";
import axiosConfig from '../axiosConfig';
import { Chart as ChartJS } from 'chart.js/auto';


const NewTimeline = () => {

    const [chartLabels, setChartLabels] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        var data = {
            user: 7,

        };

        axiosConfig.post("/user/LastSeventyTwoViewsGraph", data).then(rsp => {
            setRows(rsp.data.rows);
            setChartData(rsp.data.chart_data);
            setChartLabels(rsp.data.chart_labels);

        }).catch(err => {

        });

    }, []);


    var gradientChartOptionsConfigurationWithTooltipPurple = {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        elements: {
            colorFunction: function (text, data, dataset, index) {
                return 'green';
            },
            showText: true,
            textPadding: 4,
            minBarWidth: 1,
            keyStart: 0,
            keyEnd: 1,
            keyValue: 2
        },
        tooltips: {
            backgroundColor: '#f5f5f5',
            titleFontColor: '#333',
            bodyFontColor: '#666',
            bodySpacing: 4,
            xPadding: 12,
            mode: "nearest",
            intersect: 0,
            position: "nearest"
        },
        scales: {
            xAxes: [{
                type: 'timeline',
                position: 'bottom',
                distribution: 'linear',
                categoryPercentage: 0.8,
                barPercentage: 0.9,

                gridLines: {
                    display: true,
                    offsetGridLines: true,
                    drawBorder: true,
                    drawTicks: true
                },
                ticks: {
                    maxRotation: 0
                },
                unit: 'minute'
            }],
            yAxes: [{
                type: 'category',
                position: 'left',
                barThickness: 20,
                categoryPercentage: 0.8,
                barPercentage: 0.9,
                offset: true,
                gridLines: {
                    display: true,
                    offsetGridLines: true,
                    drawBorder: true,
                    drawTicks: true
                }
            }]
        },
        responsive: true
    };

    var chart_labels = chartLabels;
    var chart_data = chartData;
    var ctx = document.getElementById("chartBig2000").getContext('2d');

    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(72,72,176,0.1)');
    gradientStroke.addColorStop(0.4, 'rgba(72,72,176,0.0)');
    gradientStroke.addColorStop(0, 'rgba(119,52,169,0)'); //purple colors
    var config = {
        type: "timeline",
        data: {
            labels: chart_labels,
            datasets: chart_data
        },
        options: gradientChartOptionsConfigurationWithTooltipPurple
    };
    window.myLine = new Chart(ctx, config);
 
    return (
            <canvas class="p-2" id="chartBig2000" style={{height: "{{ 150 + (8 * $rows) }}px"}}></canvas>
        
    )


}
export default NewTimeline;