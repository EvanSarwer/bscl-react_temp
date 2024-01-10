import React from 'react';
import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import Select from 'react-select';
import LineGraph from "../Graph/LineGraph";
import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';
import axios from 'axios';

import * as XLSX from "xlsx";
import { fi } from 'date-fns/locale';

const DefinedChannelStatus = () => {

    const [update, setUpdate] = useState(0);
    const [time, setTime] = useState("15");
    const [id, setId] = useState("0");
    const [type, setType] = useState("STB");
    const [channelName, setChannelName] = useState("");
    const [channelNameDownload, setChannelNameDownload] = useState("");
    const [channels, setchannels] = useState([]);
    const [lastDate, setlastDate] = useState("");
    const [start, setstart] = useState("");
    const [finish, setfinish] = useState("");
    const [allchannelf, setallchannelf] = useState(false);

    const [label, setlabel] = useState([]);
    const [reach0, setReach0] = useState([]);
    const [reachp, setReachp] = useState([]);
    const [tvr0, setTvr0] = useState([]);
    const [tvrp, setTvrp] = useState([]);
    
    const [loading,setloading] = useState(false);

    useEffect(() => {
        if(update>0){
            var credentials={ "id": id,"type":type, "range": time, "start": start, "finish": finish };
        console.log(JSON.stringify(credentials));
            setloading(false);
                axiosConfig.post("/dayparts/all",credentials)
                    .then(rsp => {
                        
                    setloading(true);
                        //debugger;
                        console.log(rsp.data);
        
                        setReachp(rsp.data.value.reachp);
                        setReach0(rsp.data.value.reach0);
                        setTvrp(rsp.data.value.tvrp);
                        setTvr0(rsp.data.value.tvr0);
                        setlabel(rsp.data.value.label);
                        setChannelNameDownload(rsp.data.channel);
                    }).catch(err => {
        alert("Server Error");
        setUpdate(0);
                    })
                }
            }, [update]);

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
        exportToCsv(channelName + "-Day_Parts.csv", scsv)
    }

    const Downloadfunc = () => {
        //console.log(liveChannelData.labels[0]);
        var csv = [["Time-Frame", "Reach(000)", "Reach(%)", "TVR(000)", "TVR(%)"]];
        var sampleLive0 = label;
        var sampleLive = reach0;
        var sampleLive1 = reachp;
        var sampleLive2 = tvr0;
        var sampleLive3 = tvrp;

        for (var i = 0; i < sampleLive.length; i++) {
            csv.push([sampleLive0[i], sampleLive[i], sampleLive1[i], sampleLive2[i], sampleLive3[i]]);
        }
        csv.push(["Start:",start]);
        csv.push(["Finish:",finish]);
        csv.push(["Range:",time]);
        
        csv.push(["Channel:",channelNameDownload]);
        
        console.log(csv);
        
        const wb = XLSX.utils.book_new();
        
        var ws = XLSX.utils.aoa_to_sheet(csv);
        XLSX.utils.book_append_sheet(wb, ws, "Day Parts");
        
        XLSX.writeFile(wb, "Day Parts "+channelNameDownload+".xlsx");
        //getCSV(csv);
    }

   

    useEffect(() => {

        axiosConfig.get("/trend/channels").then(rsp => {
            //console.log(rsp.data);
            setchannels(rsp.data.channels);
            console.log(channels);


        }).catch(err => {

        });
        axiosConfig.get("/daypart_date").then(rsp => {
            //console.log(rsp.data);
            setlastDate(rsp.data.date);
            //console.log(channels);


        }).catch(err => {

        });

    }, [])

    const updater = () => {
        if(isDateGreaterThan(start,finish)){
            alert("Start Date is greater than Finish Date");
            return;
        }
        if(isDateGreaterThan(finish,lastDate)){
            alert("Finish Date is greater than last available date");
            return;
        }
        setUpdate(update + 1);
    }
    function isDateGreaterThan(date1, date2) {
        const [year1, month1, day1] = date1.split('-');
        const [year2, month2, day2] = date2.split('-');
      
        const dateObj1 = new Date(year1, month1 - 1, day1); // Month is 0-based
        const dateObj2 = new Date(year2, month2 - 1, day2);
      
        return dateObj1 > dateObj2;
      }
    var datagenerate=(label,data,channel)=>{
        var nlabel=['Mid Point of Range'];
    channel.forEach((i)=>{nlabel.push(i);})
    var alldata=[nlabel];
    for (var i=0;i<label.length;i++){
        var narr=[label[i]];
        console.log(label[i]);
        for (var j=0;j<channel.length;j++){
            console.log(data[j][i]);
        narr.push(data[j][i]);
    }
        alldata.push(narr);
    }
        return alldata;
    }
    const DownloadAll = () => {
        var nchannel=[];
        var nreachp=[];
        var nreach0=[];
        var ntvr0=[];
        var ntvrp=[];
        var nlabel=[];
        setallchannelf(true);
        const wb = XLSX.utils.book_new();
        let axiosArray = [];
        console.log(channels.length);
        channels.forEach((item) => {
            //if (item.id < 1) {
                let postData = { "id": item.id,"type":type, "range": time, "start": start, "finish": finish };
                let newPromise = axiosConfig.post('/dayparts/all', postData);
                axiosArray.push(newPromise);
            //}

        })

        Promise
            .all(axiosArray)
            .then(axios.spread((...responses) => {
                responses.forEach((res) => {
                    console.log('Success');
                    console.log(res.data.channel);
                    nchannel.push(res.data.channel);
                    nreach0.push(res.data.value.reach0);
                    nreachp.push(res.data.value.reachp);
                    ntvr0.push(res.data.value.tvr0);
                    ntvrp.push(res.data.value.tvrp);
                    if(nlabel.length==0){
                        
                    nlabel=(res.data.value.label);
                    }

                    //var ws = XLSX.utils.aoa_to_sheet(res.data.all);
                    //XLSX.utils.book_append_sheet(wb, ws, res.data.channel);

                })

                setallchannelf(false);
                console.log('submitted all axios calls');
                console.log(nreach0);
                var reach0data=datagenerate(nlabel,nreach0,nchannel);
                var reachpdata=datagenerate(nlabel,nreachp,nchannel);
                var tvr0data=datagenerate(nlabel,ntvr0,nchannel);
                var tvrpdata=datagenerate(nlabel,ntvrp,nchannel);
                var parameters=[['Start','End','Range']];
                parameters.push([start,finish,time]);

                var ws = XLSX.utils.aoa_to_sheet(reach0data);
                XLSX.utils.book_append_sheet(wb, ws,'Reach (000)');
                var ws = XLSX.utils.aoa_to_sheet(reachpdata);
                XLSX.utils.book_append_sheet(wb, ws,'Reach (%)');
                var ws = XLSX.utils.aoa_to_sheet(tvr0data);
                XLSX.utils.book_append_sheet(wb, ws,'TVR (000)');
                var ws = XLSX.utils.aoa_to_sheet(tvrpdata);
                XLSX.utils.book_append_sheet(wb, ws,'TVR (%)');
                
                var ws = XLSX.utils.aoa_to_sheet(parameters);
                XLSX.utils.book_append_sheet(wb, ws,'Parameters');
                XLSX.writeFile(wb, "Day Parts All Channel.xlsx");
            }))
            .catch(error => {
                alert('Server Error');
                setallchannelf(false);
                console.log('Error');
                console.log(error);

             })
    }
    return (
        <div><Header title="Trend Analysis-Day Parts" />
            <MainMenu menu="trenddaypart" />

            <div class="app-content content" style={{ backgroundColor: "azure", minHeight: "36em" }}>
                <div class="content-overlay"></div>
                <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                    <div class="content-header row">
                    </div>
                    <div class="content-body">

                    {/* <div class="row">
                        <div class="col-md-12">
                            <div class="card p-1 text-white bg-warning">
                                <div class="card-content">
                                    <div class="card-body">
                                        <div class="float-left">
                                            <p class="white"><strong>Upgrade in Progress</strong></p>
                                        </div>
                                        <div class="float-right">
                                            <p class="card-title"><i class="la la-info-circle"></i> Warning</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}



                        <div class="card">
                            <div class="card-content">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <Select
                                                placeholder="Select channel"
                                                options={channels.map(channel => ({ label: channel.name, value: channel.id }))}
                                                onChange={opt => setId(opt.value) & setChannelName(opt.label)}
                                            />
                                        </div>
                                        <div class="col-md-3">
                                            <select class="custom-select d-block w-100" id="range" required="" onChange={(e) => { setTime(e.target.value) }}>
                                                <option value="15">Choose Range</option>
                                                <option value="15">15 Minutes</option>
                                                <option value="30">30 Minutes</option>
                                            </select>
                                        </div>



                                        <div class="col-md-5">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <fieldset class="form-group form-group-style">
                                                        <label for="dateTime1">Start Time</label>
                                                        <input type="date" class="form-control" id="start" onChange={(e) => { setstart(e.target.value) }} />
                                                    </fieldset>
                                                </div>
                                                <div class="col-md-6">
                                                    <fieldset class="form-group form-group-style">
                                                        <label for="dateTime1">Finish Time</label>
                                                        <input type="date" class="form-control" id="finish" onChange={(e) => { setfinish(e.target.value) }} />
                                                    </fieldset>
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                        <div class="col-md-1">
                                            <button onClick={updater} class="btn btn-info">View</button>
                                        </div>
                                    </div>


                                    <div class="row">

                                        <div class="col-md-2">
                                        <label>Type (STB/OTT)</label>
                                            <select class="custom-select d-block w-100" disabled onChange={(e) => { setType(e.target.value)}}>
                                                <option value="STB">STB</option>
                                                <option value="">All</option>
                                                <option value="OTT">OTT</option>
                                            </select>
                                        </div>

                                        <div class="col-md-2">
                                            
                                        </div>
                                        <div class="col-md-3">
                                        {(() => {
                                            if (allchannelf) {
                                                return (
                                                    <div class="row">
                                                <div class="col-md-4"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831" style={{height:"5em",width:"5em"}} class="rounded mx-auto d-block" alt="..." /></div>
                                                <div class="col-md-8"> Please Wait Some Minutes</div>
                                                </div>
                                                )
                                            } else {
                                                return 


                                            }
                                        })()}</div>
                                        <div class="col-md-3">
                                            <label>Download (All Channel)</label><br/>
                                            <button onClick={DownloadAll} class="btn btn-danger">Download CSV</button>

                                        </div>
                                        {(() => {
                                            if (loading) {
                                                return <div class="col-md-2">
                                                    <label>Download Data</label><br/>
                                                    <button onClick={Downloadfunc} class="btn btn-danger">Download CSV</button>

                                                </div>

                                            } else {
                                                return null;


                                            }
                                        })()}
                                        
                                    </div>
                                    <div class="row">
                                            {(() => {
                                            if (true) {
                                                return (<div><br/> <h6>Data available upto {lastDate}</h6></div>)

                                                

                                            } else {
                                                return null;


                                            }
                                        })()}
                                            </div>


                                </div>
                            </div>
                        </div>
                        <br />



                        <div class="row">
                            <div class="col-md-12">
                                <LineGraph title="Reach (%)" text="Active Channels" loading={loading} labels={label} values={reachp} color="blue"  update={update} />

                            </div>
                            <div class="col-md-12">
                                <LineGraph title="Reach (000)" text="Active Channels" loading={loading} labels={label} values={reach0}  color="red"  update={update} />

                            </div>

                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <LineGraph title="TVR (000)" text="Active Channels" loading={loading} labels={label} values={tvr0} color="violet"  update={update} />

                            </div>
                            <div class="col-md-12">
                                <LineGraph title="TVR (%)" text="Active Channels" loading={loading} labels={label} values={tvrp} color="green"  update={update} />

                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div>



    )
}
export default DefinedChannelStatus;