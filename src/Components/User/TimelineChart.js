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

    axiosConfig.post("/user/last24WatchingData", data).then(rsp => {
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
        
          return <span><h4 class="p-2" >Nothing Watched In Last 24 Hours</h4></span>

      }
  })()}
</div>
    
  

    

  );

}

export default TimelineChart;