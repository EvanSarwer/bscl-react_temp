import { useState, useEffect } from 'react';
import axiosConfig from '../axiosConfig';

const DeviceOff = () => {
    const [channeldata, setChannelData] = useState([]);
    const [ query, setQuery ] = useState("");
    const [deviceoffList, setdeviceoffList] = useState([]);

    const getData=()=>{
        axiosConfig.get("/device/deviceoff").then(rsp => {
            console.log(rsp.data);
            setdeviceoffList(rsp.data.data);
        }).catch(err => {

        })
    }
    useEffect(() => {
        getData();
        const interval = setInterval(() => {getData()}, 5000);
      
        return () => clearInterval(interval);
      }, []);

    // useEffect(() => {
    //     setChannelData(props.data);

    // }, [props.data])

    const Search = (data) => {
        return data.filter(
            (item) =>
                item.device_name.toLowerCase().includes(query.toLowerCase()) ||
                item.id.toString().includes(query) ||
                item.box_id.toString().includes(query)
        );
    };





    return (
        
            <div class="card" style={{maxHeight:'600px',minHeight:'600px'}}>
                <div class="card-content"> 
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                            <h4>Device Off</h4>
                            </div>
                            <div class="col-md-6">
                            <input type="text" class="search form-control round border-primary mb-1" placeholder="Search" onChange={e => setQuery(e.target.value)}/>
                            </div>
                        </div>
                        <div class="table-responsive " style={{maxHeight:'500px',minHeight:'290px'}}>
                            <table id="users-list-datatable" class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Household ID</th>
                                        <th>Household</th>
                                        <th>Device Box ID</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {Search(deviceoffList).map((device) =>
                                                <tr key={device.id}>
                                                    
                                                    <td>{device.id}</td>
                                                    <td>{device.device_name}</td>
                                                    <td>{device.box_id}</td>
                                                    <td><span style={{ height: "1em",  width: "1em",  backgroundColor: "red",  borderRadius: "50%",  display: "inline-block"}}></span></td>            
                                        </tr>
                                            )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    
    )
}
export default DeviceOff;