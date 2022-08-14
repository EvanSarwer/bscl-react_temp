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
    const [startrange, setStartRange] = useState("");
    const [loading, setloading] = useState(false);
    const [finishrange, setFinishRange] = useState("");





    

    function exportToCsv(filename, rows) {
        var processRow = function (row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
                var innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                };
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (j > 0)
                    finalVal += ',';
                finalVal += result;
            }
            return finalVal + '\n';
        };
        var csvFile = '';
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }
        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }
    var getCSV = (scsv) => {
        exportToCsv(props.title+".csv", scsv)
    }

    const Downloadfunc = () => {
        //console.log(liveChannelData.labels[0]);
        var csv = [["Channel", props.title]];
        var sampleLive = Data;
        console.log(sampleLive);
        for (var i = 0; i < sampleLive.labels.length; i++) {
            csv.push([sampleLive.labels[i], sampleLive.datasets[0].data[i]]);
        }
        console.log(csv);
        getCSV(csv);
    }







    useEffect(() => {
        if (props.get && props.update > 0) {
            setloading(false);
            axiosConfig.get(props.url)
                .then(rsp => {
 //if(props.parentPass!=null){
    props.parentPass({
        labels: rsp.data.label, values: rsp.data.value
    });
 //}
                    setloading(true);
                    //debugger;
                    //console.log(rsp.data.label);
                    if (props.timerange) {
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
        else if (!(props.get) && props.update > 0) {

            setloading(false);
            axiosConfig.post("/" + props.url, props.credentials)
                .then(rsp => {
                    props.parentPass({
                        labels: rsp.data.label, values: rsp.data.value
                    });
                    setloading(true);
                    //debugger;
                    //console.log(rsp.data.label);
                    if (props.timerange) {
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
                            if (loading) {
                                return <button onClick={Downloadfunc} class="btn btn-info btn-sm float-right">Download CSV</button>


                            } else {
                                return

                            }
                        })()}
                        {(() => {
                            if (props.timerange) {
                                return <h4 class="h6">From {startrange} To {finishrange}</h4>


                            } else {
                                return

                            }
                        })()}
                    </div>
                    {(() => {
                        if (props.update == 0) {
                            return <div class="col align-self-center">

                                <h4 class="h6">Waiting for user input</h4>
                            </div>

                        }
                        else {
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
                        }
                    })()}
                </div>
            </div>

        </div>

    );
}
export default BarGraph;
