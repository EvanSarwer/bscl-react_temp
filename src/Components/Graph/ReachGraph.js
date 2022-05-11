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
      /*
      var ctx = $("#column-chart");

    // Chart Options
    var chartOptions = {
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each bar to be 2px wide and green
        elements: {
            rectangle: {
                borderWidth: 1,//edited
                borderColor: 'rgb(0, 255, 0)',
                borderSkipped: 'bottom'
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration:500,
        legend: {
            position: 'top',
        },
        scales: {
            xAxes: [{
                display: true,
                gridLines: {
                    color: "#f3f3f3",
                    drawTicks: false,
                },
                scaleLabel: {
                    display: true,
                }
            }],
            yAxes: [{
                display: true,
                ticks: {
                    precision: 0,
                },
                gridLines: {
                    color: "#f3f3f3",
                    drawTicks: false,
                },
                scaleLabel: {
                    display: true,
                }
            }]
        },
        title: {
            display: true,
            text: 'Channel vs Reach(000)'
        }
    };

    // Chart Data
    var chartData = {
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
    };

    var config = {
        type: 'bar',

        // Chart Options
        options : chartOptions,

        data : chartData
    };

    // Create the chart
    var lineChart = new Chart(ctx, config);
      */
    return (
        <div>
        
    <div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">Column Chart</h4>
                <a class="heading-elements-toggle"><i class="la la-ellipsis-v font-medium-3"></i></a>
                <div class="heading-elements">
                    <ul class="list-inline mb-0">
                        <li><a data-action="collapse"><i class="ft-minus"></i></a></li>
                        <li><a data-action="reload"><i class="ft-rotate-cw"></i></a></li>
                        <li><a data-action="expand"><i class="ft-maximize"></i></a></li>
                        <li><a data-action="close"><i class="ft-x"></i></a></li>
                    </ul>
                </div>
            </div>
            <div class="card-content collapse show">
                <div class="card-body">
                    <canvas id="column-chart" height="400" width="400"></canvas>
                </div>
            </div>
        </div>
    </div>
    </div></div>
    )
} 
export default Graph;