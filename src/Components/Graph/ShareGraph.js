import React from 'react';
import {Bar} from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';


const ShareGraph =() =>{


    const state = {
        labels: [
        "BTV",
        "BTV World",
        "BTV Sangsad",
        "BTV Chattrogram",
        "Independent TV",
        "ATN Bangla",
        "Channel I HD",
        "Ekushey TV",
        "NTV",
        "RTV HD"
    ],
        datasets: [{
            label: "Number of user",
            data: [
        8,
        8,
        7,
        9,
        9,
        9,
        6,
        8,
        8,
        9
    ],
            backgroundColor: "#28D094",
            hoverBackgroundColor: "rgba(22,211,154,.9)",
            borderColor: "transparent"
        }]
    }


    return (
      <div>
          <div>
        
    
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">Daily Top 10 Share</h4>
                
            </div>
            <div class="card-content collapse show">
                <div class="card-body"></div>
        <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Reach Vs Channel',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
      </div>
            </div>
        </div>
    
    );
}
export default ShareGraph;
