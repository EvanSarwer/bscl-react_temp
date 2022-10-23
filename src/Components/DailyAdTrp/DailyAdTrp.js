import React from 'react';
import { useState, useEffect } from "react"
import * as xlsx from "xlsx";
import Header from "../Header/Header";
import axiosConfig from "../axiosConfig";
import Select from 'react-select';

import MainMenu from '../MainMenu/MainMenu';
var range;
var wholejson;
const DailyAdTrp = () => {
    const [notLoaded, setnotLoaded] = useState(false);
    const [errorf, seterrorf] = useState(false);
    const [errorp, seterrorp] = useState(false);
    const [reachpf, setreachpf] = useState(false);
    const [tvr0f, settvr0f] = useState(false);
    const [allDataf, setallDataf] = useState(false);
    const [reach0, setreach0] = useState([]);
    const [updater, setupdater] = useState(0);
    const [reachp, setreachp] = useState([]);
    const [tvr0, settvr0] = useState([]);
    const [allData, setallData] = useState([]);
    const [date, setdate] = useState("");


    const IncrementCount = () => {
        // Update state with incremented value
        setupdater(updater + 1);
    }
    useEffect(() => {
        if (date != '') {
            var datep = new Date();
            datep.setDate(datep.getDate() - 30);
            var datef = new Date();
            datef.setDate(datef.getDate() + 1);
            var dd = new Date(date);
            if (!(datep < dd)) {
                seterrorp(true);
                seterrorf(false);
                return;
            }
            if (!(datef > dd)) {
                seterrorf(true);
                seterrorp(false);
                return;
            }
        }
        var data = {
            date: date
        }
        setnotLoaded(true);
        axiosConfig.post("/dailyadtrp", data).then(rsp => {
            //setallDataf(true);
            setallData(rsp.data.value);
            console.log(allData);
            setnotLoaded(false);
            if (updater > 0) {
                DownloadData();
            }
        }).catch(err => {

            setnotLoaded(true);
        });


    }, [updater]);

    const DownloadData = () => {
        //console.log(liveChannelData.labels[0]);
        var greach0 = 0;
        var greachp = 0;
        var gtvr0 = 0;
        var gtvrp = 0;
        var csv = [["Channel", "Program", "Commercial", "Date", "Start", "Duration", "Time Watched", "Reach(000)", " Gross Reach(000)", "Reach(%)", "Gross Reach(%)", "TVR(000)", "Gross TVR(000)", "TVR(%)", "Gross TVR(%)"]];

        for (var i = 0; i < allData.length; i++) {
            greach0 = greach0 + allData[i].reach0;
            greachp = greachp + allData[i].reachp;
            gtvr0 = gtvr0 + allData[i].tvr0;
            gtvrp = gtvrp + allData[i].tvrp;
            csv.push([allData[i].channel_name
                , allData[i].program, allData[i].commercial_name
                , allData[i].date, allData[i].start
                , allData[i].duration, allData[i].timewatched
                , allData[i].reach0, greach0
                , allData[i].reachp, greachp
                , allData[i].tvr0, gtvr0
                , allData[i].tvrp, gtvrp]);
        }
        console.log(csv);
        getCSV(csv);
    }
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
        exportToCsv("Export.csv", scsv)
    }

    return (
        <div><Header title="Daily Ad TRP" />
            <MainMenu menu="dailyadtrp" />


            <div class="app-content content" style={{ backgroundColor: "azure", minHeight: "39em" }}>
                <div class="content-overlay"></div>
                <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                    <div class="content-header row">
                    </div>
                    <div class="content-body">


                        <div class="card">
                            <div class="card-content">
                                <div class="card-body">
                                    <br /><br />
                                    <div class="row justify-content-md-center">
                                        <div class="col-md-6">
                                            <fieldset class="form-group form-group-style">
                                                <label for="dateTime1">Date</label>
                                                <input type="date" class="form-control" id="date" onChange={(e) => { setdate(e.target.value) }} />
                                            </fieldset>
                                        </div>

                                    </div>
                                    {(() => {
                                        if (errorp) {
                                            return (
                                                <div class="row justify-content-md-center">
                                                    <div class="h3 font-weight-bold" style={{ color: "red" }}>Time Can't Exceed One Month </div>
                                                </div>
                                            )


                                        } else {
                                            return

                                        }
                                    })()}
                                    {(() => {
                                        if (errorf) {
                                            return (
                                                <div class="row justify-content-md-center">
                                                    <div class="h3 font-weight-bold" style={{ color: "red" }}>Future Date Not Allowed</div>
                                                </div>
                                            )


                                        } else {
                                            return

                                        }
                                    })()}


                                    <div class="row justify-content-md-center">
                                        <button onClick={IncrementCount} class="btn btn-danger">Download CSV</button>
                                    </div>


                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default DailyAdTrp;