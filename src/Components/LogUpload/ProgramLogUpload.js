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
const ProgramLogUpload = () => {
  const [badf, setbadf] = useState(false);
  const [updater, setupdater] = useState(0);
  const [ranges, setranges] = useState([]);
  
  const [channels, setchannels] = useState([]);

  useEffect(() => {

    axiosConfig.get("/channels").then(rsp => {
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
        
        data:range
      }
      //console.log(data.id);
      //console.log(updater);
      console.log(JSON.stringify(data));


      axiosConfig.post("/program/receive", data).then(rsp => {
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

  
  function getIdFromChannelName(channelName) {
    const channel = channels.find(item => item.channelName === channelName);
    return channel ? channel.id : null;
  }
  function isValidDateFormat(inputString) {
    // Define the regular expression for the "yyyy-mm-dd hh:mm:ss" format
    var dateFormatRegex = /^\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/;

    // Test if the input string matches the regular expression
    return dateFormatRegex.test(inputString);
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
        
        var arr = [];
        for (var i = 0; i < json.length; i++) {
      //      console.log(json[i]['Channel Name']);
        //    console.log(JSON.stringify(channels));
            //console.log(json[i]);
          //  console.log(getIdFromChannelName(json[i]['Channel Name']));
            //break;
          if(
             (json[i].program_date||json[i]['program_date ']) && json[i].Week_No && json[i].Day && json[i]['Channel Name'] 
             && 
             json[i].peak_offpeak && isValidDateFormat(json[i].start) && isValidDateFormat(json[i].finish) && json[i].program_duration_min
              && 
             json[i].program_type_genre && ((json[i].Program_Name||json[i]['Program_Name '])) && json[i].Language
          ){
            //alert(11);
            //break;
          //var obj = json[i];
          
          var obj={
            program_date:(json[i].program_date)?json[i].program_date:json[i]['program_date '],
            week_no:json[i].Week_No,
            day:json[i].Day,
            channel_id:getIdFromChannelName(json[i]['Channel Name']),
            peak_offpeak:json[i].peak_offpeak,
            start:json[i].start,
            finish:json[i].finish,
            program_duration_min:json[i].program_duration_min,
            program_type_genre:json[i].program_type_genre,
            program_name:(json[i].Program_Name)?json[i].Program_Name:json[i]['Program_Name '],
            language:json[i].Language
            }
            
          arr.push(obj);
          //console.log(obj);
          }
          else{
            alert("Some data has faulty properties, Check row no "+(i+2)+" and try again");
            break;
          }
        }
        //console.log(arr[780]);
        range = arr;
        wholejson = json;
        //GetData(arr);
        if(json.length==arr.length){
          
        document.querySelector("#excelld").style.display = "block";
        }

      };
      Reader.readAsArrayBuffer(e.target.files[0]);
    }

  }


  return (
    <div><Header title="Program Log Upload" />
      <MainMenu menu="programlogupload" />

      <div class="app-content content"  style={{ backgroundColor: "azure", minHeight: "36em" }}>
        <div class="content-overlay"></div>
        <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
          <div class="content-header row">
          </div>
          <div class="content-body">


            <div class="card">
              <div class="card-content">
                <div class="card-body">
                  <h1>Program Log Upload:</h1>

                  
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

                      <button onClick={IncrementCount} class="btn btn-info">Upload Program Log</button>
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
export default ProgramLogUpload;
