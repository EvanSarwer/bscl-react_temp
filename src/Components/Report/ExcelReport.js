import React from 'react';
import { useState, useEffect } from "react"
import * as xlsx from "xlsx";
import Header from "../Header/Header";
import axiosConfig from "../axiosConfig";
import Select from 'react-select';

import MainMenu from '../MainMenu/MainMenu';
var range;
const ExcelReport = () => {
  const [badf, setbadf] = useState(false);
  const [reach0f, setreach0f] = useState(false);
  const [reachpf, setreachpf] = useState(false);
  const [tvr0f, settvr0f] = useState(false);
  const [tvrpf, settvrpf] = useState(false);
  const [reach0, setreach0] = useState([]);
  const [updater, setupdater] = useState(0);
  const [reachp, setreachp] = useState([]);
  const [tvr0, settvr0] = useState([]);
  const [tvrp, settvrp] = useState([]);
  const [ranges, setranges] = useState([]);
  const [channels, setchannels] = useState([]);
  
  const [id, setId] = useState("");
  useEffect(() => {

    axiosConfig.get("/trend/channels").then(rsp => {
        //console.log(rsp.data);
        setchannels(rsp.data.channels);
        console.log(channels);


    }).catch(err => {

    })

}, [])
  const IncrementCount = () => {
    // Update state with incremented value
    setupdater(updater + 1);
  }
  useEffect(() => {
    if(updater>0){
    setreach0f(false);
    setreachpf(false);
    settvr0f(false);
    settvrpf(false);
    var data = {
      id:id,
      ranges: range
    }
console.log(data.id);
    console.log(updater);
    console.log(data.ranges);


    axiosConfig.post("/excel/reach0", data).then(rsp => {
      setreach0f(true);
      setreach0(rsp.data.value);
      console.log(reach0);
      console.log("done");
    }).catch(err => {
      setbadf(true);
      setbadf(false);
    });

    axiosConfig.post("/excel/reachp", data).then(rsp => {
      setreachpf(true);
      setreachp(rsp.data.value);
      console.log(reachp);
      console.log("done");
      setbadf(false);
    }).catch(err => {

      setbadf(true);
    });

    axiosConfig.post("/excel/tvr0", data).then(rsp => {
      settvr0f(true);
      settvr0(rsp.data.value);
      console.log(tvr0);
      console.log("done");
      setbadf(false);
    }).catch(err => {

      setbadf(true);
    });

    axiosConfig.post("/excel/tvrp", data).then(rsp => {
      settvrpf(true);
      settvrp(rsp.data.value);
      console.log(tvrp);
      console.log("done");
      setbadf(false);
    }).catch(err => {

      setbadf(true);
    });

  }
  }, [updater]);

  const DownloadData = () => {
    //console.log(liveChannelData.labels[0]);
    var csv = [["Reach(%)", "Reach(000)", "TVR(%)", "TVR(000)"]];

    for (var i = 0; i < reach0.length; i++) {
      csv.push([reachp[i], reach0[i], tvrp[i], tvr0[i]]);
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

  var mill2date = (function () {
    var epoch = new Date(1899, 11, 30);
    var msPerDay = 8.64e7;

    return function (n) {
      // Deal with -ve values
      var dec = n - Math.floor(n);

      if (n < 0 && dec) {
        n = Math.floor(n) - dec;
      }
      var d = new Date(n * msPerDay + +epoch);
      var mm = d.getMonth() + 1;
      if (mm < 10) {
        mm = '0' + mm;
      }
      var dd = d.getDate();
      if (dd < 10) {
        dd = '0' + dd;
      }
      var yy = d.getFullYear();
      return yy + '-' + mm + '-' + dd;
    }
  }());

  var t2ms = (hms) => {
    var a = hms.split(':');
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);

    return seconds * 1000;
  }
  function toDate(date) {
    if (date === void 0) {
      return new Date(0);
    }
    if (isDate(date)) {
      return date;
    } else {
      return new Date(parseFloat(date.toString()));
    }
  }

  function isDate(date) {
    return (date instanceof Date);
  }

  function format(date, format) {
    var d = toDate(date);
    return format
      .replace(/Y/gm, d.getFullYear().toString())
      .replace(/m/gm, ('0' + (d.getMonth() + 1)).substr(-2))
      .replace(/d/gm, ('0' + (d.getDate() + 1)).substr(-2))
      .replace(/H/gm, ('0' + (d.getHours() + 0)).substr(-2))
      .replace(/i/gm, ('0' + (d.getMinutes() + 0)).substr(-2))
      .replace(/s/gm, ('0' + (d.getSeconds() + 0)).substr(-2))
      .replace(/v/gm, ('0000' + (d.getMilliseconds() % 1000)).substr(-3));
  }
  var timeadd = (dt, ts) => {
    var t = Date.parse(dt);
    return format((t + t2ms(ts)), "Y-m-d H:i:s");
  }

  const ReadUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const Reader = new FileReader();
      Reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        //console.log(json);
        var arr = [];
        for (var i = 0; i < json.length; i++) {
          //var obj = json[i];
          arr.push({ start: (mill2date(json[i].Date) + " " + (json[i].Time).substr(0, 8)), finish: timeadd((mill2date(json[i].Date) + " " + (json[i].Time).substr(0, 8)), (json[i].Duration).substr(0, 8)) });
        }
        console.log(arr);
        range = arr;
        //GetData(arr);
        document.querySelector("#excelld").style.display = "block";


      };
      Reader.readAsArrayBuffer(e.target.files[0]);
    }

  }


  return (
    <div><Header title="Excel Report" />
      <MainMenu menu="excelreport" />

      <div class="app-content content" style={{ backgroundColor: "azure", minHeight: "36em" }} >
        <div class="content-wrapper">
          
        <div class="row">
                            <div class="col-md-5">
                                <Select
                                    placeholder="Select channel"
                                    options={channels.map(channel => ({ label: channel.name, value: channel.id }))}
                                    onChange={opt => setId(opt.value)}
                                />
                            </div>
                            </div>
                            <h1>Upload excel</h1>
          <form>
            <label htmlFor="upload">Upload File</label>
            <input
              type="file"
              name="upload"
              id="upload"
              onChange={ReadUploadFile}
            />


          </form>
          <div class="text-left">
            <div id="excelld" style={{ display: "none" }}>
              <div class="font-weight-bold" >Excel loaded and processed</div>
              <br />

              <button onClick={IncrementCount} class="btn btn-info">Get Data</button>
            </div>
            <br />
            {(() => {
              if (reach0f && reachpf && tvr0f && tvrpf && !badf) {
                return <button onClick={DownloadData} class="btn btn-danger">Download CSV</button>


              } else {
                return

              }
            })()}
            {/* {(() => {
              if (badf) {
                return <div class="font-weight-bold" >Data Formation not conventional</div>


              } else {
                return

              }
            })()} */}
          </div>
        </div>

      </div>

    </div>
  )

}
export default ExcelReport;