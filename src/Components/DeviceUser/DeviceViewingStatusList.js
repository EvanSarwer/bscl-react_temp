
import { useState, useEffect } from "react";
import axiosConfig from '../axiosConfig';
import Header from "../Header/Header";
import MainMenu from "../MainMenu/MainMenu";




const DeviceViewingStatusList = () => {

    const [devices, setDevices] = useState([]);
    const [query, setQuery] = useState("");
    useEffect(() => {
        axiosConfig.get("/device-viewing-status/list").then((rsp) => {
            setDevices(rsp.data);
            console.log(rsp.data[0]);
        }, (err) => { });


    }, []);

    

    const Search = (data) => {
        return data.filter(
            (item) =>
                item.device_name.toLowerCase().includes(query.toLowerCase()) ||
                item.deviceBoxId && item.deviceBoxId.toString().includes(query)
        );
    };

    

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
        exportToCsv("Device_Viewing_Status"+new Date().toLocaleString()+".csv", scsv)
    }

    const exportDevices = () => {
        //console.log(liveChannelData.labels[0]);
        var csv = [["Household ID","Household Name","Box Id","Connected At","Last Req. From Viewlog","Days Since Last Viewlog","Selection Status"]];
        
        for (var i = 0; i < devices.length; i++) {
                csv.push([
                            devices[i].id,
                            devices[i].device_name,
                            devices[i].deviceBoxId ?? "Box Not Connected",
                            devices[i].deviceBoxId ? devices[i].connected_at : '',
                            devices[i].last_request_fromViewlog,
                            devices[i].days_since_last_viewlog,
                            devices[i].deselect,
                            
                        ]);
            
                
        }
        console.log(csv);
        getCSV(csv);
    }



    return (
        <div><Header title="Devices Viewing Status" />
            <MainMenu menu="deviceViewingStatus" />
            <div class="app-content content">
                <div class="content-overlay"></div>
                <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                    <div class="content-header row">
                    </div>
                    <div class="content-body">



                        <div class="row justify-content-md-center">
                            <div class="col-xl-12  col-12">
                                <section id="horizontal-vertical">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="card">

                                                <div class="card-content collapse show">
                                                    <div class="card-body card-dashboard">

                                                        <div class="row">
                                                            <div class="col-md-7"><div class="h3 font-weight-bold">Device Viewing Status</div></div>
                                                            <div class="col-md-5"><input type="text" class="search form-control round border-primary mb-1" placeholder="Search by Device Name or Box ID" onChange={e => setQuery(e.target.value)} />
                                                            </div>

                                                        </div>
                                                        {/* <a class="btn btn-primary" href="/device/create">Create New</a> */}
                                                        <button class="btn btn-success pull-right" onClick={exportDevices}>Export</button>
                                                        <div class="table-responsive" style={{ maxHeight: '400px', minHeight: '500px' }}>
                                                            <table class="table display nowrap table-striped table-bordered">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Household ID</th>
                                                                        <th>Household Name</th>
                                                                        <th>Box Id</th>
                                                                        <th>Connected At</th>
                                                                        <th>Last Req. From Viewlog</th>
                                                                        <th>Days Since Last Viewlog</th>
                                                                        <th>Selection Status</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {Search(devices).map((device) =>
                                                                        <tr key={device.id}>
                                                                            <td>{device.id}</td>
                                                                            <td>{device.device_name}</td>
                                                                            <td>{device.deviceBoxId ?? <span class="text-danger">Box Not Contented</span>}</td>
                                                                            <td>{device.connected_at ?? ''}</td>
                                                                            <td>{device.last_request_fromViewlog ?? ''}</td>
                                                                            <td>{device.days_since_last_viewlog ?? ''}</td>
                                                                            <td>{device.deselect ?? ''}</td>

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
                                </section >





                            </div>
                        </div>


                        <br />



                        <br />


                    </div>
                </div>

            </div>
        </div>
    )

}
export default DeviceViewingStatusList;