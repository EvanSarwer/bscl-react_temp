import React from 'react';
import { useState, useEffect } from "react"
import * as xlsx from "xlsx";
import Header from "../Header/Header";
import axiosConfig from "../axiosConfig";
import Select from 'react-select';

import MainMenu from '../MainMenu/MainMenu';
var range;
var wholejson;
var comm;
const AdTrpv2 = () => {
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


  const IncrementCount = () => {
    // Update state with incremented value
    setupdater(updater + 1);
  }
  useEffect(() => {
    if (updater > 0) {
      setreach0f(false);
      setreachpf(false);
      settvr0f(false);
      settvrpf(false);
      var data = {
        allrange: JSON.parse(`
        [
          {
             "commercial":"CM-LUX-CORE-PINK-REVISED-APRIL-22-20sec",
             "ranges":[
                {
                   "channel":"Shomoy TV",
                   "start":"9/21/22 12:57:53",
                   "duration":"300"
                },
                {
                   "channel":"Shomoy TV",
                   "start":"9/21/22 13:57:53",
                   "duration":"300"
                },
                {
                   "channel":"Shomoy TV",
                   "start":"9/21/22 14:57:53",
                   "duration":"300"
                }
             ]
          },
          {
             "commercial":"CM-SINGER-EID-UL-ADHA-2022-30sec",
             "ranges":[
                {
                   "channel":"Shomoy TV",
                   "start":"4/23/22 14:25:13",
                   "duration":"20"
                },
                {
                   "channel":"Shomoy TV",
                   "start":"5/26/21 14:25:13",
                   "duration":"300"
                }
             ]
          },
          {
             "commercial":"CM-TEER-SUGAR-RESULT-15sec",
             "ranges":[
                {
                   "channel":"Shomoy TV",
                   "start":"4/22/22 14:25:43",
                   "duration":"40"
                },
                {
                   "channel":"Shomoy TV",
                   "start":"5/24/22 15:25:43",
                   "duration":"200"
                }
             ]
          },
          {
             "commercial":"CM-SINGER-REFRIGERATOR-CATEGORY-2022-30sec",
             "ranges":[
                {
                   "channel":"Shomoy TV",
                   "start":"4/21/22 15:25:58",
                   "duration":"15"
                },
                {
                   "channel":"Shomoy TV",
                   "start":"5/25/22 14:25:58",
                   "duration":"100"
                }
             ]
          }
       ]
        `)
      }
      console.log(data.id);
      console.log(updater);
      console.log(data.ranges);


      axiosConfig.post("/adtrpv3/reach0", data).then(rsp => {
        setreach0f(true);
        setreach0(rsp.data.value);
        console.log(reach0);
        console.log("done");
      }).catch(err => {
        setbadf(true);
        setbadf(false);
      });

      axiosConfig.post("/adtrpv3/reachp", data).then(rsp => {
        setreachpf(true);
        setreachp(rsp.data.value);
        console.log(reachp);
        console.log("done");
        setbadf(false);
      }).catch(err => {

        setbadf(true);
      });

      // axiosConfig.post("/adtrp/tvr0", data).then(rsp => {
      //   settvr0f(true);
      //   settvr0(rsp.data.value);
      //   console.log(tvr0);
      //   console.log("done");
      //   setbadf(false);
      // }).catch(err => {

      //   setbadf(true);
      // });

      // axiosConfig.post("/adtrp/tvrp", data).then(rsp => {
      //   settvrpf(true);
      //   settvrp(rsp.data.value);
      //   console.log(tvrp);
      //   console.log("done");
      //   setbadf(false);
      // }).catch(err => {

      //   setbadf(true);
      // });

    }
  }, [updater]);

  const DownloadData = () => {
    //console.log(liveChannelData.labels[0]);
    var csv = [["Commercial", "Reach(%)", "Reach(000)"]];

    for (var i = 0; i < reach0.length; i++) {
      csv.push([range[i].commercial, reachp[i], reach0[i]]);
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

  
  const ReadUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const Reader = new FileReader();
      Reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet,{raw: false});//,{raw: false}
        console.log(json);
        var arr = [];
        var cmm = [];
        var vmm = [];

        for (var i = 0; i < json.length; i++) {
          cmm.push(json[i].Commercial);
          //var obj = json[i];
          //console.log((json[i].Duration).substr(0, 8));
          arr.push({commercial:json[i].Commercial, channel:json[i].Channel,start:(json[i].Date+ " " + (json[i].Time).substr(0, 8)), duration: json[i].Duration });

        }
        cmm = [...new Set(cmm)];

        console.log(cmm);
        for (var i = 0; i < cmm.length; i++) {
          var obj={commercial:cmm[i],ranges:[]}
          //var obj = json[i];
          //console.log((json[i].Duration).substr(0, 8));
          for (var j = 0; j < arr.length; j++) {
            if(arr[j].commercial==cmm[i]){
          obj.ranges.push({channel:arr[j].channel, start:arr[j].start,duration: arr[j].duration});
          }
        }
        vmm.push(obj);
        }
        console.log(JSON.stringify(vmm));
        console.log(vmm);
        console.log(arr);
        range = vmm;
        wholejson = json;
        //GetData(arr);
        document.querySelector("#excelld").style.display = "block";


      };
      Reader.readAsArrayBuffer(e.target.files[0]);
    }

  }


  return (
    <div><Header title="Ad TRP v2" />
      <MainMenu menu="adtrpv2" />

      <div class="app-content content" style={{ backgroundColor: "azure", minHeight: "36em" }} >
        <div class="content-wrapper">


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
              if (reach0f && reachpf && !badf) {// tvr0f && tvrpf &&
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
export default AdTrpv2;