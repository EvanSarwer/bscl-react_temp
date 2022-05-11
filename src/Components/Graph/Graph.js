import Plot from 'react-plotly.js';
const Graph =() =>{
    
var xArray = [
    "Ananda TV",
    "Asian TV HD",
    "ATN Bangla",
    "ATN News",
    "Bangabandhu",
    "Bangla TV",
    "Bangla Vision",
    "Bijoy TV",
    "Boishakhi ",
    "BTV",
    "BTV Chattrogram",
    "BTV Sangsad",
    "BTV World",
    "Channel 24",
    "Channel 9 HD",
    "Channel I HD",
    "DBC News HD",
    "Deepto TV HD",
    "Desh TV",
    "Duranto TV HD",
    "Ekattor TV HD",
    "Ekushey TV",
    "Gaan Bangla TV",
    "Gazi TV",
    "global",
    "Independent TV",
    "Jamuna TV",
    "Masranga TV",
    "Mohona TV",
    "My TV",
    "Nagorik TV HD",
    "News 24 HD",
    "nexus",
    "NTV",
    "RTV HD",
    "SA TV",
    "Shomoy TV",
    "spice",
    "T Sports HD",
    "unknown"
];
var yArray = [
    900,
    145,
    114,
    141,
    11,
    169,
    91,
    238,
    262,
    424,
    350,
    124,
    148,
    105,
    266,
    110,
    76,
    32,
    110,
    606,
    791,
    124,
    57,
    66,
    88,
    126,
    34,
    57,
    85,
    187,
    57,
    121,
    182,
    249,
    102,
    55,
    1364,
    4,
    1,
    10
];

// Define Data
var data = [{
x:xArray,
y:yArray,
type:"bar"
}];
    var layout = {
        xaxis: { title: "Channels"},
        yaxis: { title: "Reach (number of users)",tickformat: 'd'},
        title: "Channel vs Reach"
      };
      //debugger;
    return (
      <div class="content-wrapper">
      <div class="content-body">
        <Plot
        data={[
      
            {
              type: 'bar',
              x: xArray,
              y: yArray
            }
          ]}
        layout={ {
            xaxis: { title: "Channels"},
            yaxis: { title: "Reach (number of users)",tickformat: 'd'},
            title: "Channel vs Reach"
          }}
      /></div>
      </div>
    )
} 
export default Graph;