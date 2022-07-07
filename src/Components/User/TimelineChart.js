import React, { Component } from "react";
import { useState, useEffect } from "react";
import axiosConfig from '../axiosConfig';
import Chart from "react-apexcharts";

const TimelineChart = (props) => {

  const [last72hrData, setLast72hrData] = useState([]);
  const [rows, setRows] = useState([]);
  const [lData, setLData] = useState([]);
  const [lasthrData, setLasthrData] = useState([]);
  let dArray = [];
  let demo_data = [];

  useEffect(() => {
    var data = {
      user: props.user,

    };

    axiosConfig.post(props.url, data).then(rsp => {
      setRows(rsp.data.rows);
      var sample = rsp.data.channels;

      for (var i = 0; i < sample.length; i++) {
        var obj = { x: sample[i].channel_name, y: [new Date(sample[i].start).getTime(), new Date(sample[i].finish).getTime()] };
        dArray.push(obj);
      }
      setLasthrData(dArray);

    }).catch(err => {

    });

  }, [props.user]);

  console.log(lasthrData);



  var state = {
    series: [
      {
        name: 'Watched Data',
        data: lasthrData
      },

    ],
    options: {
      chart: {
        height: 50,
        type: 'rangeBar'
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '30%',
          dataLabels: {
            enabled:true,
            position: 'top',
          },          
        },
      },
      xaxis: {
        type: 'datetime'
      },
      stroke: {
        width: 1
      },
      fill: {
        type: 'solid',
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      },
      tooltip: {
        enabled: true,
        x: {
            show: false,
            format: 'HH:mm:ss',
            formatter: undefined,
        },
        y: {
          show: false,
          format: 'HH:MM',
          formatter: undefined,
            
        },
        z: {
            formatter: undefined,
            title: 'Size: '
        },
        marker: {
            show: true,
        },
        
    }
      
    },
  };



  return (
<div>
{(() => {
      if (rows>0) {
        
          return <Chart
          options={state.options}
          series={state.series}
          type="rangeBar"
          height="360rem"
    
        />

      } else {
        
          return <span><h4 class="p-2" >Nothing Watched In Last {props.time} Hours</h4></span>

      }
  })()}
</div>
    
  

    

  );

}

export default TimelineChart;