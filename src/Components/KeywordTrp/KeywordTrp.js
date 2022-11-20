import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';

import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import Select from 'react-select';
const KeywordTrp = () => {

    const [keywords, setkeywords] = useState([]);
    const [frontkeywords, setfrontkeywords] = useState([]);
    const [date, setdate] = useState("");
    const [tmpdate, settmpdate] = useState("");
    const [datestr, setdatestr] = useState("");
    const [updater, setupdater] = useState(0);
    var DownloadY=()=>{
        settmpdate("");
        IncrementCount();
    }
    var DownloadA=() => {
        settmpdate(date);
        IncrementCount();

    }
    const IncrementCount = () => {
        // Update state with incremented value
        setupdater(updater + 1);
        //setnotLoaded(true);

    }
    useEffect(() => {
     if(updater>0){   
        console.log("all"+updater);
            var data = {
                date: tmpdate,
                keywords:frontkeywords
            }
            console.log(JSON.stringify(data));
            //setnotLoaded(true);
            axiosConfig.post("/keywordadtrp", data).then(rsp => {
                //setallDataf(true);
                //setallData(rsp.data.value);
                console.log(rsp.data.value);
                DownloadData(rsp.data.value);
                //setnotLoaded(false);


            }).catch(err => {
            });

            // }
            // else{
            //   alert("No Data For This Channel")
            // }
    }
    }, [updater]);
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
    var AddKeywords = (key) => {
        var keys = frontkeywords;
        if(!keys.includes(key)){
        keys.push(key);
        setfrontkeywords([...keys]);
        console.log(frontkeywords);
        }
    }
    var AddKeywords2 = () => {

        var key=document.querySelector("#horizontal-vertical > div > div > div > div > div > div.row > div.col-md-4 > input").value;
        if(key!=""){
        var keys = frontkeywords;
        if(!keys.includes(key)){
        keys.push(key);
        setfrontkeywords([...keys]);
        console.log(frontkeywords);
        document.querySelector("#horizontal-vertical > div > div > div > div > div > div.row > div.col-md-4 > input").value="";
        }
        else{
            alert("already exists");
        }
    }
    }
    var Remove = (key) => {
        let value = key;

        let arr = frontkeywords;

        arr = arr.filter(item => item !== value);
        setfrontkeywords([...arr]);
        console.log(arr);
        //alert(key);
    }
    useEffect(() => {

        axiosConfig.get("/allkeyword").then(rsp => {
            //console.log(rsp.data);
            //setkeywords(rsp.data.keywords);
            var cc = rsp.data.value;
            //cc.unshift({ id: "", name: 'All keywords' });

            setkeywords(cc);
            //console.log(rsp.data.keywords);
            console.log(keywords);


        }).catch(err => {

        })

    }, [])
    const DownloadData = (all) => {
        //console.log(liveChannelData.labels[0]);
        var greach0 = 0;
        var greachp = 0;
        var gtvr0 = 0;
        var gtvrp = 0;
        var csv = [["Channel", "Commercial", "Date", "Start", "Duration", "Time Watched", "Reach(000)", " Gross Reach(000)", "Reach(%)", "Gross Reach(%)", "TVR(000)", "Gross TVR(000)", "TVR(%)", "Gross TVR(%)"]];
        //var all = allData;
        for (var i = 0; i < all.length; i++) {

            greach0 = greach0 + all[i].reach0;
            greachp = greachp + all[i].reachp;
            gtvr0 = gtvr0 + all[i].tvr0;
            gtvrp = gtvrp + all[i].tvrp;
            csv.push([all[i].channel_name
                ,  all[i].commercial_name
                , all[i].date, all[i].start
                , all[i].duration, all[i].timewatched
                , all[i].reach0, greach0
                , all[i].reachp, greachp
                , all[i].tvr0, gtvr0
                , all[i].tvrp, gtvrp]);
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
        exportToCsv("Keyword wise Trp.csv", scsv)
    }
    return (
        <div>
            <Header title="Ad TRP" />
            <MainMenu menu="dailyadtrp" />
            <div class="app-content content" style={{ minHeight: "39em" }}>
                <div class="content-overlay"></div>
                <div class="content-wrapper" style={{ backgroundColor: "azure", minHeight: "39em" }} >
                    <div class="content-header row">
                    </div>
                    <div class="content-body" style={{ minHeight: "39em" }}>



                        <div class="row justify-content-md-center" style={{ minHeight: "39em" }}>
                            <div class="col-xl-12  col-12">
                                <section id="horizontal-vertical" style={{ minHeight: "39em" }}>
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="card">

                                                <div class="card-content collapse show">
                                                    <div class="card-body card-dashboard">
                                                        <div class="row">
                                                            {/* <div class="col-md-4">
                                                                <Select
                                                                    placeholder="Select keyword"
                                                                    options={keywords.map(keyword => ({ label: keyword, value: keyword }))}
                                                                    onChange={opt => AddKeywords(opt.value)}
                                                                />
                                                            </div> */}
                                                            <div class="col-md-4"><input type="text" class="form-control" placeholder="New Keyword"/>
                                                            </div>
                                                            <div class="col-md-1"><input type="button" class="btn btn-success" onClick={AddKeywords2} value="Add"/>
                                                            </div>
                                                            <div class="col-md-2"><button class="offset-1 btn btn-danger" onClick={DownloadY} >Download Trp of Yesterday</button></div>
                                                            <div class="col-md-1"></div>
                                                            <div class="col-md-2">
                                                            <strong>Archieve</strong>
                                                            <input type="date" class="form-control" id="date" onChange={(e) => { ChangeDate(e.target.value) }} />
                                                            </div>
                                                            <div class="col-md-2">
                                                            <button class="offset-1 btn btn-danger" onClick={DownloadA} >Download From Archive</button>
                                                            </div>

                                                        </div>
                                                        <br></br>


                                                        <div class="table-responsive" style={{ maxHeight: '400px', minHeight: '500px' }}>
                                                            <table class="table display nowrap table-striped table-bordered">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Index</th>
                                                                        <th>Keyword</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {frontkeywords.map((keyword, i) =>
                                                                        <tr key={i}>
                                                                            <td>{i + 1}</td>
                                                                            <td>{keyword}</td>
                                                                            <td><button class="offset-1 btn btn-danger" onClick={() => { if (true) { Remove(keyword)}; }} >Remove</button></td>



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
export default KeywordTrp;