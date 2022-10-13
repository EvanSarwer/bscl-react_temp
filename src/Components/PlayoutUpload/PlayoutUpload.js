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
const PlayoutUpload = () => {
  const [badf, setbadf] = useState(false);
  const [updater, setupdater] = useState(0);
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
    if (updater > 0) {
      var data = {
        
      }
      console.log(data.id);
      console.log(updater);
      console.log(data.ranges);


      // axiosConfig.post("/adtrpv3/reach0", data).then(rsp => {
      //   setreach0f(true);
      //   setreach0(rsp.data.value);
      //   console.log(reach0);
      //   console.log("done");
      // }).catch(err => {
      //   setbadf(true);
      //   setbadf(false);
      // });

      // axiosConfig.post("/adtrpv3/reachp", data).then(rsp => {
      //   setreachpf(true);
      //   setreachp(rsp.data.value);
      //   console.log(reachp);
      //   console.log("done");
      //   setbadf(false);
      // }).catch(err => {

      //   setbadf(true);
      // });

    }
  }, [updater]);

  
 
  var his2sec = (time) => {
    var actualTime = time.split(':');
    console.log("The time=" + time);
    var totalSeconds = (+actualTime[0]) * 60 * 60 + (+actualTime[1]) * 60 + (+actualTime[2]);
    return totalSeconds;
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
        const json = xlsx.utils.sheet_to_json(worksheet, { raw: false });//
        //console.log(json);
        var arr = [];
        for (var i = 0; i < json.length; i++) {
          //var obj = json[i];
          //console.log((json[i].Duration).substr(0, 8));
          arr.push({ channel: id, start: (json[i].Date + " " + (json[i].Time).substr(0, 8)), duration: his2sec((json[i].Duration).substr(0, 8)) });

        }
        console.log(arr);
        range = arr;
        wholejson = json;
        //GetData(arr);

      };
      Reader.readAsArrayBuffer(e.target.files[0]);
    }

  }


  return (
    <div><Header title="Playout Log Upload" />
      <MainMenu menu="playoutupload" />

      <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
          <div class="content-header row">
          </div>
          <div class="content-body">



            <div class="card">
              <div class="card-content">
                <div class="card-body">
                  <h1>Download User(General) Report:</h1>

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

                      <button onClick={IncrementCount} class="btn btn-info">Process Data</button>
                    </div>
                    <br />
                    {(() => {
                      if (!badf) {// tvr0f && tvrpf &&
                        return <button onClick={console.log("clicked")} class="btn btn-danger">Download CSV</button>


                      } else {
                        return

                      }
                    })()}
                    
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
export default PlayoutUpload;