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
      //console.log(channels);


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
        id:id,
        data:range
      }
      //console.log(data.id);
      //console.log(updater);
      console.log(JSON.stringify(data));


      axiosConfig.post("/playout/receive", data).then(rsp => {
        alert("Data Succesfully Inserted");
        //console.log("done");
      }).catch(err => {
        alert("Server Error");
      });

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
    //console.log("The time=" + time);
    var totalSeconds = (+actualTime[0]) * 60 * 60 + (+actualTime[1]) * 60 + (+actualTime[2]);
    return totalSeconds;
  }

  const ReadUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const Reader = new FileReader();
      Reader.onload = (e) => {
        document.querySelector("#excelld").style.display = "none";
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet, { raw: false });//
        //console.log(json[780].Program==undefined);
        var arr = [];
        for (var i = 0; i < json.length; i++) {
          if(json[i].Program!=undefined && json[i].Commercial!=undefined && json[i].Date!=undefined && json[i].Time!=undefined && json[i].Duration!=undefined){
          //var obj = json[i];
          //console.log((json[i].Duration).substr(0, 8));
          var obj={ channel_id: id,commercial_name:json[i].Commercial,program:json[i].Program, start: (json[i].Date + " " + (json[i].Time).substr(0, 8)), duration: his2sec((json[i].Duration).substr(0, 8)) };
          arr.push(obj);
          
          }
        }
        //console.log(arr[780]);
        range = arr;
        wholejson = json;
        //GetData(arr);
        if(json.length!=arr.length){
          if (window.confirm("Some data has faulty properties, If you want to skip them and continue press ok") == true) {
            document.querySelector("#excelld").style.display = "block";
          } else {
            //document.querySelector("#excelld").style.display = "block";
          }
        }
        else{
        document.querySelector("#excelld").style.display = "block";
        }

      };
      Reader.readAsArrayBuffer(e.target.files[0]);
    }

  }


  return (
    <div><Header title="Playout Log Upload" />
      <MainMenu menu="playoutupload" />

      <div class="app-content content"  style={{ backgroundColor: "azure", minHeight: "36em" }}>
        <div class="content-overlay"></div>
        <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
          <div class="content-header row">
          </div>
          <div class="content-body">


            <div class="card">
              <div class="card-content">
                <div class="card-body">
                  <h1>Playout Upload:</h1>

                  <div class="row">
                    <div class="col-md-5">
                      <Select
                        placeholder="Select channel"
                        options={channels.map(channel => ({ label: channel.name, value: channel.id }))}
                        onChange={opt => setId(opt.value)}
                      />
                    </div>
                  </div>
                  <br/>
                  <br/>
                  <br/>
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

                      <button onClick={IncrementCount} class="btn btn-info">Upload Playout Log</button>
                    </div>
                    <br />
                    {/* {(() => {
                      if (!badf) {// tvr0f && tvrpf &&
                        return <button onClick={console.log("clicked")} class="btn btn-danger">Download CSV</button>


                      } else {
                        return

                      }
                    })()} */}
                    
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