import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState, useEffect } from "react";
import axiosConfig from '../axiosConfig';
import Select from 'react-select';
import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';




const Notification = () => {

    const [error, setError] = useState("yes");
    const [start, setStart] = useState("");
    const [finish, setFinish] = useState("");
    const [loading, setloading] = useState(false);
    const [logs, setlogs] = useState([]);

    const [notifyData, setNotifyData] = useState([]);
    const [notifyNumber, setNotifyNumber] = useState("");
    const [query, setQuery] = useState("");



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
        function pad(n) {
            return n < 10 ? '0' + n : n
        }
        var today = new Date(),
            datetime = today.getFullYear() + '-' + pad((today.getMonth() + 1)) + '-' + pad(today.getDate()) + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        var date_local = new Date(datetime).toLocaleString(undefined, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });

        exportToCsv("Notification(Issues)_" + date_local + ".csv", scsv);
    }

    const Download = () => {
        //console.log(liveChannelData.labels[0]);
        var csv = [["Issue_name", "Details", "Time"]];
        var ss = notifyData;
        //console.log(logs);
        for (var i = 0; i < ss.length; i++) {
            if (ss[i].status == "unseen") {
                csv.push([(ss[i].flag == 1 ? "Device Connection !" : ss[i].flag == 2 ? "Device Offline" : ss[i].flag == 3 ? "Warning Temperature" : ss[i].flag == 4 ? "People's Meter": ss[i].flag == 5 ? "Too much unknown & foreign":"Same Channel"),
                (ss[i].du_name + " -- " + ss[i].details),
                ss[i].created_at]);
            }

        }
        //console.log(csv);
        getCSV(csv);

    }

    const Seen = () => {

        axiosConfig.get("/dashboard/seennotification").then(rsp => {

        }).catch(err => {

        });

        axiosConfig.get("/dashboard/notification").then(rsp => {
            setNotifyNumber(rsp.data.notifyNumber)
            setNotifyData(rsp.data.data);
        }).catch(err => {

        });
    }



    // const GetData = () => {

    //     setloading(false);
    //     var data = {
    //         start: start,
    //         finish: finish
    //     };



    //     axiosConfig.post("/user/logs/all", data).then(rsp => {
    //         setlogs(rsp.data.data);
    //         if (rsp.data.error === "Error") {
    //             setError("yes");
    //         } else {
    //             setError("no");
    //         }
    //         setloading(true);
    //         console.log(rsp.data.data);
    //         console.log("logslogs");
    //     }).catch(err => {

    //     });


    // }

    useEffect(() => {
        axiosConfig.get("/dashboard/notification").then(rsp => {
            setNotifyNumber(rsp.data.notifyNumber)
            setNotifyData(rsp.data.data);
        }).catch(err => {

        });
    }, []);


    const Search = (data) => {
        return data.filter(
            (item) =>
                item.du_name.toLowerCase().includes(query.toLowerCase())
        );
    };


    return (
        <div><Header title="Notifications" />
            <MainMenu menu="" />
            <div class="app-content content" style={{ backgroundColor: "azure", minHeight: "36em" }} >
                <div class="content-overlay"></div>
                <div class="content-wrapper">
                    <div class="content-header row">
                    </div>
                    <div class="content-body">


                        <div class="row justify-content-md-center">
                            <div class="col-xl-12  col-12">
                                <section id="horizontal-vertical">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="card">
                                                {/* <div class="card-header">
                                                                <div class="row">
                                                                    <div class="col-md-7"><h4 class="card-title">{props.title}</h4></div>
                                                                    <div class="col-md-5"><input type="text" class="search form-control round border-primary mb-1" placeholder="Search" onChange={e => setQuery(e.target.value)} />
                                                                    </div>
                                    
                                                                </div>
                                    
                                                            </div> */}
                                                <div class="card-content collapse show">
                                                    <div class="card-body card-dashboard">

                                                        <div class="row">
                                                            <div class="col-md-5"><div class="h3 font-weight-bold">Notification List {(() => {
                                                                if (notifyNumber > 0) {
                                                                    return <button type="button" onClick={Download} class="btn btn-sm btn-danger" >Download</button>
                                                                } else {
                                                                    return <button type="button" onClick={Download} class="btn btn-sm btn-danger " disabled>Download</button>

                                                                }
                                                            })()}
                                                            </div></div>
                                                            <div class="col-md-2">
                                                                {(() => {
                                                                    if (notifyNumber > 0) {
                                                                        return <i type="button" onClick={Seen} class="btn la la-eye-slash la-lg" style={{ fontSize: '30px' }}></i>
                                                                    } else {
                                                                        return <i class="la la-eye la-lg" style={{ fontSize: '30px' }}></i>

                                                                    }
                                                                })()}
                                                            </div>
                                                            <div class="col-md-5"><input type="text" class="search form-control round border-primary mb-1" placeholder="Search" onChange={e => setQuery(e.target.value)} />
                                                            </div>

                                                        </div>

                                                        <div class="table-responsive" style={{ maxHeight: '400px', minHeight: '500px' }}>
                                                            <table class="table display nowrap table-striped table-bordered ">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Issue Name</th>
                                                                        <th>Details</th>
                                                                        <th>Time</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {Search(notifyData).map((notify) => {
                                                                        if (notify.flag === 1) {
                                                                            if (notify.status === "unseen") {
                                                                                return <tr key={notify.id}>
                                                                                    <td >
                                                                                        <div class="media-left align-self-center" style={{ whiteSpace: 'nowrap' }}><h6 class="media-heading font-weight-bold"><i class="ft-plus-square icon-bg-circle bg-cyan mr-0"></i> Device Connection !</h6></div>

                                                                                    </td>
                                                                                    <td>
                                                                                        <div class="media-body">
                                                                                            <p class="notification-text font-small-5 text-muted font-weight-bold"><span class="text-warning ">{notify.du_name}</span> {notify.details}</p>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td><medium>
                                                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">{notify.created_at}</time></medium>

                                                                                    </td>
                                                                                </tr>
                                                                            } else {
                                                                                return <tr key={notify.id}>
                                                                                    <td >
                                                                                        <div class="media-left align-self-center" style={{ whiteSpace: 'nowrap' }}><h6 class="media-heading"><i class="ft-plus-square icon-bg-circle bg-cyan mr-0"></i> Device Connection !</h6></div>

                                                                                    </td>
                                                                                    <td>
                                                                                        <div class="media-body">
                                                                                            <p class="notification-text font-small-5 text-muted"><span class="text-warning ">{notify.du_name}</span> {notify.details}</p>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td><medium>
                                                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">{notify.created_at}</time></medium>

                                                                                    </td>
                                                                                </tr>
                                                                            }


                                                                        } else if (notify.flag === 2) {
                                                                            if (notify.status === "unseen") {
                                                                                return <tr key={notify.id}>
                                                                                    <td>
                                                                                        <div class="media-left align-self-center"><h6 class="media-heading red darken-1 font-weight-bold"><i class="ft-download-cloud icon-bg-circle bg-red bg-darken-1 mr-0"></i> Device Offline</h6></div>

                                                                                    </td>
                                                                                    <td >
                                                                                        <div class="media-body">
                                                                                            <p class="notification-text font-small-5 text-muted font-weight-bold"><span class="text-warning ">{notify.du_name}</span> {notify.details}</p>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td >
                                                                                        <medium>
                                                                                            <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">{notify.created_at}</time></medium>

                                                                                    </td>
                                                                                </tr>
                                                                            } else {
                                                                                return <tr key={notify.id}>
                                                                                    <td>
                                                                                        <div class="media-left align-self-center"><h6 class="media-heading red darken-1"><i class="ft-download-cloud icon-bg-circle bg-red bg-darken-1 mr-0"></i> Device Offline</h6></div>

                                                                                    </td>
                                                                                    <td >
                                                                                        <div class="media-body">
                                                                                            <p class="notification-text font-small-5 text-muted"><span class="text-warning ">{notify.du_name}</span> {notify.details}</p>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td >
                                                                                        <medium>
                                                                                            <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">{notify.created_at}</time></medium>

                                                                                    </td>
                                                                                </tr>
                                                                            }

                                                                        } else if (notify.flag === 3) {
                                                                            if (notify.status === "unseen") {
                                                                                return <tr key={notify.id}>
                                                                                    <td >
                                                                                        <div class="media-left align-self-center"> <h6 class="media-heading yellow darken-3 font-weight-bold"><i class="ft-alert-triangle icon-bg-circle bg-yellow bg-darken-3 mr-0"></i> Warning Temperature</h6></div>

                                                                                    </td>
                                                                                    <td >
                                                                                        <div class="media-body">
                                                                                            <p class="notification-text font-small-5 text-muted font-weight-bold"><span class="text-warning ">{notify.du_name}</span> {notify.details} </p>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td ><medium>
                                                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">{notify.created_at}</time></medium>

                                                                                    </td>
                                                                                </tr>
                                                                            } else {
                                                                                return <tr key={notify.id}>
                                                                                    <td >
                                                                                        <div class="media-left align-self-center"> <h6 class="media-heading yellow darken-3"><i class="ft-alert-triangle icon-bg-circle bg-yellow bg-darken-3 mr-0"></i> Warning Temperature</h6></div>

                                                                                    </td>
                                                                                    <td >
                                                                                        <div class="media-body">
                                                                                            <p class="notification-text font-small-5 text-muted"><span class="text-warning ">{notify.du_name}</span> {notify.details} </p>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td ><medium>
                                                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">{notify.created_at}</time></medium>

                                                                                    </td>
                                                                                </tr>
                                                                            }

                                                                        } else if (notify.flag === 4) {
                                                                            if (notify.status === "unseen") {
                                                                                return <tr key={notify.id}>
                                                                                    <td >
                                                                                        <div class="media-left align-self-center"> <h6 class="media-heading yellow darken-3 font-weight-bold"><i class="ft-alert-triangle icon-bg-circle bg-yellow bg-darken-3 mr-0"></i>People's Meter</h6></div>

                                                                                    </td>
                                                                                    <td >
                                                                                        <div class="media-body">
                                                                                            <p class="notification-text font-small-5 text-muted font-weight-bold"><span class="text-warning ">{notify.du_name}</span> {notify.details} </p>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td ><medium>
                                                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">{notify.created_at}</time></medium>

                                                                                    </td>
                                                                                </tr>
                                                                            } else {
                                                                                return <tr key={notify.id}>
                                                                                    <td >
                                                                                        <div class="media-left align-self-center"> <h6 class="media-heading yellow darken-3"><i class="ft-alert-triangle icon-bg-circle bg-yellow bg-darken-3 mr-0"></i>People's Meter</h6></div>

                                                                                    </td>
                                                                                    <td >
                                                                                        <div class="media-body">
                                                                                            <p class="notification-text font-small-5 text-muted"><span class="text-warning ">{notify.du_name}</span> {notify.details} </p>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td ><medium>
                                                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">{notify.created_at}</time></medium>

                                                                                    </td>
                                                                                </tr>
                                                                            }

                                                                        } else if (notify.flag === 5) {
                                                                            if (notify.status === "unseen") {
                                                                                return <tr key={notify.id}>
                                                                                    <td >
                                                                                        <div class="media-left align-self-center"> <h6 class="media-heading yellow darken-3 font-weight-bold"><i class="ft-eye-off icon-bg-circle bg-yellow bg-darken-3 mr-0"></i>Unknown/Foreign</h6></div>

                                                                                    </td>
                                                                                    <td >
                                                                                        <div class="media-body">
                                                                                            <p class="notification-text font-small-5 text-muted font-weight-bold"><span class="text-warning ">{notify.du_name}</span> {notify.details} </p>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td ><medium>
                                                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">{notify.created_at}</time></medium>

                                                                                    </td>
                                                                                </tr>
                                                                            } else {
                                                                                return <tr key={notify.id}>
                                                                                    <td >
                                                                                        <div class="media-left align-self-center"> <h6 class="media-heading yellow darken-3"><i class="ft-eye-off icon-bg-circle bg-yellow bg-darken-3 mr-0"></i>Unknown/Foreign</h6></div>

                                                                                    </td>
                                                                                    <td >
                                                                                        <div class="media-body">
                                                                                            <p class="notification-text font-small-5 text-muted"><span class="text-warning ">{notify.du_name}</span> {notify.details} </p>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td ><medium>
                                                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">{notify.created_at}</time></medium>

                                                                                    </td>
                                                                                </tr>
                                                                            }

                                                                        }
                                                                        else if (notify.flag === 6) {
                                                                            if (notify.status === "unseen") {
                                                                                return <tr key={notify.id}>
                                                                                    <td >
                                                                                        <div class="media-left align-self-center"> <h6 class="media-heading yellow darken-3 font-weight-bold"><i class="ft-minus-circle icon-bg-circle bg-yellow bg-darken-3 mr-0"></i>Same Channel</h6></div>

                                                                                    </td>
                                                                                    <td >
                                                                                        <div class="media-body">
                                                                                            <p class="notification-text font-small-5 text-muted font-weight-bold"><span class="text-warning ">{notify.du_name}</span> {notify.details} </p>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td ><medium>
                                                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">{notify.created_at}</time></medium>

                                                                                    </td>
                                                                                </tr>
                                                                            } else {
                                                                                return <tr key={notify.id}>
                                                                                    <td >
                                                                                        <div class="media-left align-self-center"> <h6 class="media-heading yellow darken-3"><i class="ft-minus-circle icon-bg-circle bg-yellow bg-darken-3 mr-0"></i>Same Channel</h6></div>

                                                                                    </td>
                                                                                    <td >
                                                                                        <div class="media-body">
                                                                                            <p class="notification-text font-small-5 text-muted"><span class="text-warning ">{notify.du_name}</span> {notify.details} </p>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td ><medium>
                                                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">{notify.created_at}</time></medium>

                                                                                    </td>
                                                                                </tr>
                                                                            }

                                                                        }
                                                                    }
                                                                        //             <tr key={notify.id}>
                                                                        //     <td>{notify.device_name}</td>
                                                                        // </tr>


                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </section >
                            </div>
                        </div>


                        <br />



                        <br />


                    </div>
                </div>

            </div>
        </div>

    )
}
export default Notification;