
import { useState, useEffect } from "react";
import axiosConfig from '../axiosConfig';
import Header from "../Header/Header";
import MainMenu from "../MainMenu/MainMenu";
import PopUpDetails from "./PopUpDetails";




const DeviceList = () => {

    const [devices, setDevices] = useState([]);
    const [deselect, setDselect] = useState("");
    const [userId, setUserId] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [query, setQuery] = useState("");
    useEffect(() => {
        axiosConfig.get("/device/list").then((rsp) => {
            setDevices(rsp.data);
            console.log(rsp.data[0].users[0].user_name);
        }, (err) => { });


    }, []);

    const deleteDevice = (id) => {

        const obj = { id: id };
        axiosConfig.post("/device/delete", obj).then((rsp) => {
            window.location.reload(false);
        }, (err) => {
        });
    };

    const Search = (data) => {
        return data.filter(
            (item) =>
                item.device_name.toLowerCase().includes(query.toLowerCase()) ||
                item.id.toString().includes(query)
        );
    };

    const handleChange = (event, device_id) => {

        if (event.target.checked) {
            //console.log('✅ Checkbox is checked');
            const obj = { device_id: device_id, deselect: 'deselect' };
            axiosConfig.post("/device/deselect", obj).then((rsp) => {
                window.location.reload(false);
            }, (err) => {
            });


        } else {
            //console.log('⛔️ Checkbox is NOT checked');
            const obj = { device_id: device_id, deselect: '' };
            axiosConfig.post("/device/deselect", obj).then((rsp) => {
                window.location.reload(false);
            }, (err) => {
            });



        }
        setIsSubscribed(current => !current);

        console.log(event.target.checked);


        

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
        exportToCsv("deployed_"+new Date().toLocaleString()+".csv", scsv)
    }

    const exportDevices = () => {
        //console.log(liveChannelData.labels[0]);
        var csv = [["Id", "Name","Contact Person","Contact No","Alt No","Email","SEC","Adress","Area/State","Ward","City Corp","District","Lat, Lang","Household Cond","TV Details","GSM Status","Wifi","STB Provider","STB Subscription","Installation Date","Deployer","Survey Date","1st_Index_User_Name","1st_Index_User_Info","2nd_Index_User_Name","2nd_Index_User_Info","3rd_Index_User_Name","3rd_Index_User_Info","4th_Index_User_Name","4th_Index_User_Info","5th_Index_User_Name","5th_Index_User_Info","6th_Index_User_Name","6th_Index_User_Info","7th_Index_User_Name","7th_Index_User_Info","8th_Index_User_Name","8th_Index_User_Info"]];
        
        for (var i = 0; i < devices.length; i++) {
            if(devices[i].contact_person){
                csv.push([
                            devices[i].id, 
                            devices[i].device_name,
                            devices[i].contact_person,
                            devices[i].contact_number,
                            devices[i].alt_number,
                            devices[i].contact_email,
                            devices[i].economic_status,
                            "House:" +devices[i].house_number +", "+devices[i].house_name+ ", Road#:"+devices[i].road_number,
                            devices[i].state_name,
                            devices[i].ward_no,
                            devices[i].city_corporation,
                            devices[i].district,
                            devices[i].lat+", "+devices[i].lng,
                            devices[i].household_condition,
                            devices[i].tv_type+" "+devices[i].tv_brand+",Placed in " +devices[i].tv_placement,
                            devices[i].gsm_signal_strength,
                            devices[i].wifi_signal_strength,
                            devices[i].stb_provider_name,
                            devices[i].stb_subscription_type+", "+devices[i].stb_subscription_charge,
                            devices[i].installation_date,
                            devices[i].installer_name,
                            devices[i].survey_date,
                            (devices[i]?.users[0]?.user_name? devices[i].users[0].user_name : ""),
                            (devices[i]?.users[0]?.gender? ("Gender:" +(devices[i].users[0].gender =="m"? "Male":"Female")) : "") +""+(devices[i]?.users[0]?.dob? ", DOB:"+devices[i].users[0].dob : ""),
                            (devices[i]?.users[1]?.user_name? devices[i].users[1].user_name : ""),
                            (devices[i]?.users[1]?.gender? ("Gender:" +(devices[i].users[1].gender =="m"? "Male":"Female")) : "") +""+(devices[i]?.users[1]?.dob? ", DOB:"+devices[i].users[1].dob : ""),
                            (devices[i]?.users[2]?.user_name? devices[i].users[2].user_name : ""),
                            (devices[i]?.users[2]?.gender? ("Gender:" +(devices[i].users[2].gender =="m"? "Male":"Female")) : "") +""+(devices[i]?.users[2]?.dob? ", DOB:"+devices[i].users[2].dob : ""),
                            (devices[i]?.users[3]?.user_name? devices[i].users[3].user_name : ""),
                            (devices[i]?.users[3]?.gender? ("Gender:" +(devices[i].users[3].gender =="m"? "Male":"Female")) : "") +""+(devices[i]?.users[3]?.dob? ", DOB:"+devices[i].users[3].dob : ""),
                            (devices[i]?.users[4]?.user_name? devices[i].users[4].user_name : ""),
                            (devices[i]?.users[4]?.gender? ("Gender:" +(devices[i].users[4].gender =="m"? "Male":"Female")) : "") +""+(devices[i]?.users[4]?.dob? ", DOB:"+devices[i].users[4].dob : ""),
                            (devices[i]?.users[5]?.user_name? devices[i].users[5].user_name : ""),
                            (devices[i]?.users[5]?.gender? ("Gender:" +(devices[i].users[5].gender =="m"? "Male":"Female")) : "") +""+(devices[i]?.users[5]?.dob? ", DOB:"+devices[i].users[5].dob : ""),
                            (devices[i]?.users[6]?.user_name? devices[i].users[6].user_name : ""),
                            (devices[i]?.users[6]?.gender? ("Gender:" +(devices[i].users[6].gender =="m"? "Male":"Female")) : "") +""+(devices[i]?.users[6]?.dob? ", DOB:"+devices[i].users[6].dob : ""),
                            (devices[i]?.users[7]?.user_name? devices[i].users[7].user_name : ""),
                            (devices[i]?.users[7]?.gender? ("Gender:" +(devices[i].users[7].gender =="m"? "Male":"Female")) : "") +""+(devices[i]?.users[7]?.dob? ", DOB:"+devices[i].users[7].dob : ""),
                        ]);
            }
                
        }
        console.log(csv);
        getCSV(csv);
    }



    return (
        <div><Header title="Devices" />
            <MainMenu menu="device" />
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
                                                            <div class="col-md-7"><div class="h3 font-weight-bold">Device List</div></div>
                                                            <div class="col-md-5"><input type="text" class="search form-control round border-primary mb-1" placeholder="Search" onChange={e => setQuery(e.target.value)} />
                                                            </div>

                                                        </div>
                                                        <a class="btn btn-primary" href="/device/create">Create New</a>
                                                        <button class="btn btn-success pull-right" onClick={exportDevices}>Export</button>
                                                        <div class="table-responsive" style={{ maxHeight: '400px', minHeight: '500px' }}>
                                                            <table class="table display nowrap table-striped table-bordered">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Device ID</th>
                                                                        <th>Device Name</th>
                                                                        <th>Address</th>
                                                                        <th>Type</th>
                                                                        <th>Economic Status</th>
                                                                        <th>Socio Status</th>
                                                                        <th>Status</th>
                                                                        <th>Operation</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {Search(devices).map((device) =>
                                                                        <tr key={device.id}>
                                                                            <td>{device.id}</td>
                                                                            {/* <td><a href={`/device/details/${device.id}`}>{device.device_name}</a></td> */}
                                                                            {/*<td><a data-toggle="modal" data-target={`#exampleModal_${device.id}`}>{device.device_name}</a>*<PopUpDetails id={device.id}/></td>*/}
                                                                            <td><a href={`/device/detail/${device.id}`}>{device.device_name}</a></td>
                                                                            <td>{device.district}</td>
                                                                            <td>{device.type}</td>
                                                                            {/* <td>{user.gender}</td>
                                                                            <td>{user.age}</td> */}
                                                                            <td>{device.economic_status}</td>
                                                                            <td>{device.socio_status}</td>
                                                                            <td style={{ whiteSpace: 'nowrap' }}>
                                                                                <a class="btn btn-secondary" href={`/device/edit/${device.id}`}>Edit</a>
                                                                                <button class="offset-1 btn btn-danger" onClick={() => { if (window.confirm('Delete the item?')) { deleteDevice(device.id) }; }} >Delete</button>
                                                                            </td>
                                                                            <td><div><input type="checkbox" id="deselect" onChange={ (event) =>{ if (window.confirm('Want to run This Deselection operation?')) {handleChange(event, device.id)}else {window.location.reload(false)} }} value={isSubscribed} checked={device.deselect === "deselect"} name="deselect" />
                                                                                <label class="form-label" >&nbsp; Deselect</label></div>
                                                                            </td>


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
export default DeviceList;