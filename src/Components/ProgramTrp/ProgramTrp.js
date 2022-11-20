import React from 'react';
import { useState, useEffect } from "react"
import * as xlsx from "xlsx";
import Header from "../Header/Header";
import axiosConfig from "../axiosConfig";
//import Select from 'react-select';

import MainMenu from '../MainMenu/MainMenu';
var range;
var wholejson;
const ProgramTrp = () => {
    const [notLoaded, setnotLoaded] = useState(true);

    //const [channels, setchannels] = useState([]);
    const [errorf, seterrorf] = useState(false);
    const [errorp, seterrorp] = useState(false);
    const [archive, setarchive] = useState(false);
    const [updater, setupdater] = useState(0);
    const [allData, setallData] = useState([]);
    const [date, setdate] = useState("");
    const [datestr, setdatestr] = useState("");

    const [query, setQuery] = useState("");
    const [channels, setchannels] = useState([]);

    const [id, setId] = useState("-1");
    const [name, setName] = useState("");
    const Search = (data) => {
        return data.filter(
            (item) =>
                item.name.toLowerCase().includes(query.toLowerCase())
        );
    };
    useEffect(() => {

        axiosConfig.get("/trend/channels").then(rsp => {
            //console.log(rsp.data);
            setchannels(rsp.data.channels);
            console.log(channels);


        }).catch(err => {

        })
        const yesterday = new Date()

        yesterday.setDate(yesterday.getDate() - 1);
        setdatestr(
            yesterday.toLocaleString(undefined, {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }));

    }, [])

    const ChangeDate = (dates) => {
        if (dates != '') {
            var datep = new Date();
            datep.setDate(datep.getDate() - 30);
            var datef = new Date();
            datef.setDate(datef.getDate() + 1);
            var dd = new Date(dates);
            if (!(datep < dd)) {
                // seterrorp(true);
                // seterrorf(false);
                alert("Time exceeded 30 days");
                document.querySelector("#date").value = date;
                return;
            }
            if (!(datef > dd)) {
                // seterrorf(true);
                // seterrorp(false);

                alert("Futute time not allowed");
                document.querySelector("#date").value = date;
                return;
            }
        }
        setdate(dates);
        console.log(date);
        var t = new Date(document.querySelector("#date").value).toLocaleString(undefined, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        setdatestr(t);

        console.log(datestr);
    }
    const IncrementCount = () => {
        // Update state with incremented value
        setupdater(updater + 1);
        setnotLoaded(true);

    }
    const UpdateChannel = (id, name) => {
        // Update state with incremented value
        //setupdater(updater + 1);
        //setchannels(id);
        setId(id);
        setName(name);
        IncrementCount();
        //setnotLoaded(true);
        console.log("kk" + id)

    }
    useEffect(() => {
        if (parseInt(id) == -1) {
            console.log("Id null")
        }
        else {
            var data = {
                date: ((archive)?date:""),
                id: id
            }
            console.log(JSON.stringify(data));
            //setnotLoaded(true);
            axiosConfig.post("/channelwiseadtrp", data).then(rsp => {
                //setallDataf(true);
                setallData(rsp.data.value);
                console.log(rsp.data.value);
                DownloadData(rsp.data.value);
                setnotLoaded(false);


            }).catch(err => {

                setnotLoaded(true);
            });

            // }
            // else{
            //   alert("No Data For This Channel")
            // }
        }

    }, [updater]);

    const DownloadData = (all) => {
        //console.log(liveChannelData.labels[0]);
        var greach0 = 0;
        var greachp = 0;
        var gtvr0 = 0;
        var gtvrp = 0;
        var csv = [["Channel", "Commercial", "Date", "Start", "Duration", "Time Watched", "Reach(000)", " Gross Reach(000)", "Reach(%)", "Gross Reach(%)", "TVR(000)", "Gross TVR(000)", "TVR(%)", "Gross TVR(%)"
        ,"1+","2+","3+","4+","5+","6+","7+","8+","9+","10+"]];
        //var all = allData;
        for (var i = 0; i < all.length; i++) {

            greach0 = greach0 + all[i].reach0;
            greachp = greachp + all[i].reachp;
            gtvr0 = gtvr0 + all[i].tvr0;
            gtvrp = gtvrp + all[i].tvrp;
            csv.push([all[i].channel_name
                , all[i].commercial_name
                , all[i].date, all[i].start
                , all[i].duration, all[i].timewatched
                , all[i].reach0, greach0
                , all[i].reachp, greachp
                , all[i].tvr0, gtvr0
                , all[i].tvrp, gtvrp
                , all[i].c1, all[i].c2, all[i].c3, all[i].c4, all[i].c5, all[i].c6, all[i].c7, all[i].c8, all[i].c9, all[i].c10
            ]);
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
        //if(id==""){return;}
        exportToCsv(name + " - Program Trp.csv", scsv)
    }

    return (

        <div><Header title="Program Trp" />
            <MainMenu menu="programtrp" />
            <div class="app-content content">
                <div class="content-overlay"></div>
                <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                    <div class="content-header row">
                    </div>
                    <div class="content-body">



                        <div class="row justify-content-md-center">
                            <div class="col-xl-12  col-12">
                                <section id="horizontal-vertical">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="card">

                                                <div class="card-content collapse show">
                                                    <div class="card-body card-dashboard">

                                                        <div class="row">
                                                            <div class="col-md-5"><div class="h3 font-weight-bold">Program Trp of {datestr}</div></div>
                                                            <div class="col-md-1">
                                                            <div class="font-weight-bold"><input type="checkbox" id="archive" name="archive" onChange={(e) => { setarchive(e.target.checked) }} />Archive
                                                            </div>
                                                            </div>
                                                            <div class="col-md-3">
                                                                {(() => {
                                                                    if (archive) {
                                                                        return (
                                                                            <input type="date" class="form-control" id="date" onChange={(e) => { ChangeDate(e.target.value) }} />
                                                                        )


                                                                    } else {
                                                                        return

                                                                    }
                                                                })()}



                                                            </div>
                                                            <div class="col-md-3"><input type="text" class="search form-control round border-primary mb-1" placeholder="Search" onChange={e => setQuery(e.target.value)} />
                                                            </div>

                                                        </div>

                                                        <div class="table-responsive" style={{ maxHeight: '400px', minHeight: '500px' }}>
                                                            <table class="table display nowrap table-striped table-bordered">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Index</th>
                                                                        <th>Channel</th>
                                                                        <th>Download CSV</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {Search(channels).map((channel) =>
                                                                        <tr key={channel.id}>
                                                                            <td>{channel.id + 1}</td>
                                                                            <td><img class="img-fluid" alt="" style={{ maxWidth: "3rem" }} src={"../../channels/logos/" + channel.logo} />{channel.name}</td>
                                                                            <td><button class="offset-1 btn btn-danger" onClick={() => { if (window.confirm('Get Data of this Channel?')) { UpdateChannel(channel.id, channel.name) }; }} >Download CSV</button></td>



                                                                        </tr>
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )

}
export default ProgramTrp;