import { useState, useEffect } from "react"
import * as xlsx from "xlsx";
import Header from "../Header/Header";

const Report = () => {

    var mill2date = (function() {
        var epoch = new Date(1899,11,30);
        var msPerDay = 8.64e7;
      
        return function(n) {
          // Deal with -ve values
          var dec = n - Math.floor(n);
      
          if (n < 0 && dec) {
            n = Math.floor(n) - dec;
          }
          var d = new Date(n*msPerDay + +epoch);
          var mm = d.getMonth() + 1;
          if(mm<10){
            mm='0'+mm;
          }
          var dd = d.getDate();
          if(dd<10){
            dd='0'+dd;
          }
          var yy = d.getFullYear();
          return yy + '-' + mm + '-' + dd;
        }
      }());

      var t2ms=(hms)=>{    
        var a = hms.split(':');
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
        
        return seconds*1000;
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
          var timeadd=(dt,ts)=>{
            var t=Date.parse(dt);
            return format((t+t2ms(ts)),"Y-m-d H:i:s");
            }
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");
    var js;
    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);
                //console.log(json);
                var arr=[];
                for (var i = 0; i < json.length; i++){
                    //var obj = json[i];
                    arr.push({start:(mill2date(json[i].Date)+" "+(json[i].Time).substr(0, 8)),finish:timeadd((mill2date(json[i].Date)+" "+(json[i].Time).substr(0, 8)),(json[i].Duration).substr(0, 8))});
                  }
                console.log(arr);
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    }
    
    
    return (
        <div><Header title="Program Report"/>
            
        <div class="app-content content" style={{ backgroundColor: "azure", minHeight:"36em" }} >
            <div class="content-wrapper">
            <h1>Upload excel</h1>
        <form>
    <label htmlFor="upload">Upload File</label>
    <input
        type="file"
        name="upload"
        id="upload"
        onChange={readUploadFile}
    />
</form>
{/* <button type="button" onClick={readUploadFile} class="btn btn-info">Get</button> */}
</div>
</div>
</div>
    )

}
export default Report;