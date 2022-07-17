import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState, useEffect } from "react";
import axiosConfig from '../axiosConfig';
import Select from 'react-select';
import Table from './Table';




const ViewLog = () => {

    const [user, setUser] = useState("");
    const [userName, setUserName] = useState("");
    const [loading,setloading] = useState(false);
    const [users, setUsers] = useState([]);
    const [logs, setlogs] = useState([]);



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

    var getCSV = (scsv, user) => {
        exportToCsv(user + "-log.csv", scsv);

    }
    const Download = () => {
        if(loading){
        //console.log(liveChannelData.labels[0]);
        var csv = [["channel_name","started_watching_at","finished_watching_at","duration_minute"]];
        var ss = logs;
        //console.log(logs);
        for (var i = 0; i < ss.length; i++) {
            csv.push([ss[i].channel_name, ss[i].started_watching_at, ss[i].finished_watching_at, ss[i].duration_minute]);
        }
        //console.log(csv);
        getCSV(csv,user);
    }
    }

    useEffect(() => {

        axiosConfig.get("/getuserlist").then(rsp => {
            setUsers(rsp.data.users);

        }).catch(err => {

        })

    }, [])

    useEffect(() => {
        if(user!=""){
        
        setloading(false);
        var data = {
            user: user
        };

        

        

        axiosConfig.post("/user/logs", data).then(rsp => {
            setlogs(rsp.data.data);
            
            setloading(true);
            console.log(logs);
            console.log("logslogs");
        }).catch(err => {

        });

    }
    }, [user]);




    return (
        <div class="app-content content" style={{ backgroundColor: "azure", minHeight:"36em" }} >
            <div class="content-overlay"></div>
            <div class="content-wrapper">
                <div class="content-header row">
                </div>
                <div class="content-body">
                    <form  >
                        <div class="row">

                        <div class="col-md-5">
                                <Select
                                    placeholder="Select User"
                                    options={users.map(user => ({ label: user.user_name, value: user.id }))}
                                    onChange={opt => setUser(opt.value) & setUserName(opt.label)}
                                />
                            </div>
                            <div class="col-md-5">

                            {(() => {
                                if (loading) {
                                    return <button type="button" onClick={Download} class="btn btn-danger">Download CSV</button>

                                }if (!loading && user=="") {
                                    return 

                                } else {
                                    return <button type="button" onClick={Download} class="btn btn-danger">Loading Data</button>

                                }
                            })()}
                        
                            </div>
                            
                        </div>
                    </form>
                    <br />


                    <div class="row justify-content-md-center">
                    <div class="col-xl-12  col-12">
                            {(() => {
                                if (user!=""  || user=="0") {
                                    return <Table title="User Logs" logs={logs}  />

                                } else {
                                    return <div class="card">
                                        <div class="card-header">
                                            <h4 class="card-title"><span class="danger">Please Select User To Show The Table</span></h4>
                                        </div>
                                    </div>

                                }
                            })()}
                        </div>
                    </div>

                    
                    <br />

                    

                    <br />


                </div>
            </div>

        </div>

    )
}
export default ViewLog;