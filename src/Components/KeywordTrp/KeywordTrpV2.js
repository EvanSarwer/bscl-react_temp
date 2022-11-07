import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';

import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import Select from 'react-select';

const KeywordTrpV2 = () => {

    const formatdate=(date)=>{
        let d = date.getDate();
        let m = date.getMonth()+1;
        let y = date.getFullYear();
        if(m <10){
            m='0'+m;
        }
        if(d <10){
            d = '0'+d;
        }
        return y+'-'+m+'-'+d; 
    }
    var dateObj = new Date();                   
    dateObj.setDate(dateObj.getDate() - 1); 
    var yesterday = formatdate(dateObj); 

    const [keywords, setkeywords] = useState([]);
    const [globaldate, setgdate] = useState("");
    const [nkeyword,setnkeyword] = useState("");
    const [switch_,setswitch] = useState(false);
    const [archive, setArchive] = useState("");
   
   
    useEffect(() => {
        axiosConfig.get("/adtrp/keywords/get").then((rsp)=>{
            setkeywords(rsp.data);
        },(err)=>{

        });

    }, [switch_]);

    const Add =()=>{
        if(nkeyword =="") {
            alert("Keywords Can't be Empty");
            return;
        }
        var data = {keyword:nkeyword};
        axiosConfig.post("/adtrp/keywords/add",data).then((rsp)=>{
            setswitch (!switch_);
            //setkeywords(rsp.data);
        },(err)=>{
        });
    }

    const Remove=(key)=>{
        var data = {id:key};
        axiosConfig.post("/adtrp/keywords/remove",data).then((rsp)=>{
            setswitch (!switch_);
            //setkeywords(rsp.data);
        },(err)=>{
        })
    }
    
    const getTrp=(date)=>{
        setgdate(date);
        var data = {date:date};
        axiosConfig.post("/adagency/adtrp",data).then((rsp)=>{
            if(rsp.data.trps.length==0) {
                alert("No data found for "+date);
                return;
            }
            
            DownloadData(rsp.data.trps,rsp.data.date);
        },(err)=>{
            debugger;
        });
    }

    const DownloadData = (all,date) => {
        //console.log(liveChannelData.labels[0]);
        var greach0 = 0;
        var greachp = 0;
        var gtvr0 = 0;
        var gtvrp = 0;
        var csv = [["Channel", "Program", "Commercial", "Date", "Start", "Duration", "Time Watched", "Reach(000)", " Gross Reach(000)", "Reach(%)", "Gross Reach(%)", "TVR(000)", "Gross TVR(000)", "TVR(%)", "Gross TVR(%)"]];
        //var all = allData;
        for (var i = 0; i < all.length; i++) {

            greach0 = greach0 + all[i].reach0;
            greachp = greachp + all[i].reachp;
            gtvr0 = gtvr0 + all[i].tvr0;
            gtvrp = gtvrp + all[i].tvrp;
            csv.push([all[i].channel_name
                , all[i].program, all[i].commercial_name
                , all[i].date, all[i].start
                , all[i].duration, all[i].timewatched
                , all[i].reach0, greach0
                , all[i].reachp, greachp
                , all[i].tvr0, gtvr0
                , all[i].tvrp, gtvrp]);
        }
        console.log(csv);
        getCSV(csv,date);
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
    var getCSV = (scsv,date) => {
        //if(id==""){return;}
        exportToCsv("keyword_based_trp_of_"+date+"_"+new Date().toLocaleString()+".csv", scsv)
    }

    const downloadArchive=()=>{
        getTrp(archive);
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
                                                            <div class="col-md-4"><input type="text" class="form-control" onChange={(e)=>{setnkeyword(e.target.value)}} placeholder="New Keyword"/>
                                                            </div>
                                                            <div class="col-md-1"><input type="button" class="btn btn-success" onClick={Add} value="Add"/>
                                                            </div>
                                                            <div class="col-md-2"><button class="offset-1 btn btn-danger" onClick={()=>{getTrp(yesterday)}}  >Download Trp of {yesterday}</button></div>
                                                            <div class="col-md-1"></div>
                                                            <div class="col-md-2">
                                                            <strong>Archieve</strong>
                                                            <input type="date" class="form-control" onChange={(e)=>{setArchive(e.target.value)}} id="date"  />
                                                            </div>
                                                            <div class="col-md-2">
                                                            <button class="offset-1 btn btn-danger" onClick={downloadArchive} >Download From Archive</button>
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
                                                                    {keywords.map((keyword, i) =>
                                                                        <tr key={i}>
                                                                            <td>{i + 1}</td>
                                                                            <td>{keyword.keyword}</td>
                                                                            <td><button class="offset-1 btn btn-danger" onClick={() => { if (true) { Remove(keyword.id)}; }} >Remove</button></td>



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
export default KeywordTrpV2;