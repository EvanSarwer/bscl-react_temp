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
const AdLogUpload = () => {
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


      axiosConfig.post("/ad/receive", data).then(rsp => {
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
             json[i].Ad_Date && json[i].Company && json[i].Ad_Type  && json[i].Peak && json[i].Telecast_Time && json[i].duration  && 
            isValidDateFormat(json[i].start) && isValidDateFormat(json[i].finish)  && json[i].Ad_Name && json[i].Brand  && json[i].Sub_Brand && json[i].Product_Type && json[i].Product && json[i].Program_Type && json[i].Program_Name 
            && json[i].Break_Type && json[i].Ad_Qty && json[i].Ad_Pos && json[i].ad_price
          ){
            //alert(11);
            //break;
          //var obj = json[i];
          
          var obj={
            ad_date:json[i].Ad_Date,
            channel_id:getIdFromChannelName(json[i]['Channel Name']),
            company:json[i].Company,
            ad_type:json[i].Ad_Type,
            peak:json[i].Peak,
            telecast_time:json[i].Telecast_Time,
            duration:json[i].duration,
            start:json[i].start,
            finish:json[i].finish,
            ad_name:json[i].Ad_Name,
            brand:json[i].Brand,
            sub_brand:json[i].Sub_Brand,
            product_type:json[i].Product_Type,
            product:json[i].Product,
            program_type:json[i].Program_Type,
            program_name:json[i].Program_Name,
            break_type:json[i].Break_Type,
            ad_qty:json[i].Ad_Qty,
            ad_pos:json[i].Ad_Pos,
            ad_price:json[i].ad_price,
            //campaign:json[i].campaign,
            //incomplete_ad:json[i].incomplete_ad
            }
            if(json[i].Campaign){
                obj.campaign=json[i].Campaign;
                }
            if(json[i].incomplete_ad){
                obj.incomplete_ad=json[i].incomplete_ad;
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
    <div><Header title="Ad Log Upload" />
      <MainMenu menu="adlogupload" />

      <div class="app-content content"  style={{ backgroundColor: "azure", minHeight: "36em" }}>
        <div class="content-overlay"></div>
        <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
          <div class="content-header row">
          </div>
          <div class="content-body">


            <div class="card">
              <div class="card-content">
                <div class="card-body">
                  <h1>Ad Log Upload:</h1>

                  
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

                      <button onClick={IncrementCount} class="btn btn-info">Upload Ad Log</button>
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
export default AdLogUpload;