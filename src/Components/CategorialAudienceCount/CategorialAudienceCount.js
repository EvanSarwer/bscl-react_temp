import React from 'react';
import { useState, useEffect } from "react"
import * as xlsx from "xlsx";
import Header from "../Header/Header";
import axiosConfig from "../axiosConfig";
import Select from 'react-select';

import * as XLSX from "xlsx";

import MainMenu from '../MainMenu/MainMenu';
var range;
var wholejson;
var comm;
const CategorialAudienceCount = () => {
  const [badf, setbadf] = useState(false);
  const [updater, setupdater] = useState(0);
  const [ranges, setranges] = useState([]);
  
  const [channels, setchannels] = useState([]);
  //get data from api "/getsystemuniverse" and Download
  const getsystemuniverse=async()=>{
    const res=await axiosConfig.get("/getsystemuniverse");
    console.log(res.data);
    Download(res.data.data);
    }
    const getsystemuniverseall=async()=>{
      const res=await axiosConfig.get("/getsystemuniverseall");
      console.log(res.data);
      Download(res.data.data);
      }
  const Download = (csv) => {
    

    const wb = XLSX.utils.book_new();

    var ws = XLSX.utils.aoa_to_sheet(csv);
    XLSX.utils.book_append_sheet(wb, ws, "Day Ranged");

    XLSX.writeFile(wb, "Data.xlsx");

}

  return (
    <div><Header title="Categorial Audience Count" />
      <MainMenu menu="CategorialAudienceCount" />

      <div class="app-content content"  style={{ backgroundColor: "azure", minHeight: "36em" }}>
        <div class="content-overlay"></div>
        <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
          <div class="content-header row">
          </div>
          <div class="content-body">


          <div class="card">
              <div class="card-content">
                <div class="card-body">

                  
                  <br/>
                  <br/>
                  <br/>
                  <h1>Only Selected Audience</h1>
                  
                  <div class="text-left">
                    
                      <br />

                      <button onClick={getsystemuniverse} class="btn btn-info">Download</button>
                    
                    <br />
                    
                    
                  </div>
                </div>

              </div>
            </div>
            

            <div class="card">
              <div class="card-content">
                <div class="card-body">

                  
                  <br/>
                  <br/>
                  <br/>
                  <h1>including Deselected Audience</h1>
                  
                  <div class="text-left">
                    
                      <br />

                      <button onClick={getsystemuniverseall} class="btn btn-info">Download</button>
                    
                    <br />
                    
                    
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
export default CategorialAudienceCount;