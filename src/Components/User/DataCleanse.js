import { useState, useEffect } from "react";
import axiosConfig from '../axiosConfig';
import Header from "../Header/Header";
import MainMenu from "../MainMenu/MainMenu";
import Dashboard from "../Dashboard/Dashboard";

const DataCleanse = ()=>{
    const [cleans, setCleans] = useState([]);
    const [lastUpdatedDate, setLastUpdatedDate] = useState("");
    const [viewLog,setViewLog] = useState({});
    const [logs,setLogs] = useState([]);
    const  hours = new Date().getHours();
    const  mins = new Date().getMinutes();
    useEffect(() => {
        axiosConfig.get("/data/cleanse/alldates").then((rsp) => {
            setCleans(rsp.data.data);
            setLastUpdatedDate(rsp.data.lastUpdatedDate);
            
        }, (err) => { });


    }, []);

    const CleaDataDate=(id)=>{
        axiosConfig.get("/cleaning/data/date/"+id).then((rsp) => {
          
            setCleans(rsp.data.data);
            setLastUpdatedDate(rsp.data.lastUpdatedDate);
           
            
        }, (err) => { });
    };

    const DashboardGraphGenerate=(date)=>{
        axiosConfig.get("/dashboard/graphGenerate/byDate/"+date).then((rsp) => {
           
            
        }, (err) => { });
    };



    const Search = (e) => {
        var data = e.target.value;
        axiosConfig.get("/viewlog/"+data).then((rsp) => {
          
            setViewLog(rsp.data);
           
            
        }, (err) => { });
    };

    const CleaData=(id)=>{
        axiosConfig.get("/clean/data/"+id).then((rsp) => {
          
            setViewLog({});
           
            
        }, (err) => { });
    };

    console.log(new Date().getHours());

    return (

        <div><Header title="Data Cleansing" />
            <MainMenu menu="datacleansing" />
            <div class="app-content content">
                <div class="content-overlay"></div>
                <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                    <div class="content-header row">
                    </div>
                    <div class="content-body">
                        <div class="row">
                            <div class="col-md-5"><div class="h3 text-center font-weight-bold">Cleansing Status</div>
                            <div class="h6 text-center ">Last Cleaned at {lastUpdatedDate}</div></div>
                            <div className="col-md-3"><div class="h3 text-center font-weight-bold">Viewlogs</div></div>
                            <div class="col-md-4"><input type="text" class="search form-control round border-primary mb-1" placeholder="Search with ViewLog Id" onChange={e=>Search(e)} />
                            </div>

                        </div>
                        <div class="row">
                            <div className="col-md-5">
                                <div class="table-responsive" style={{ maxHeight: '400px', minHeight: '500px' }}>
                                    <table class="table display nowrap table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Status</th>
                                                
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cleans?.map((c)=>
                                                <tr>
                                                    
                                                    <td>{c.date}</td>
                                                    <td>{c.status==0? "Raw":"Clean"}</td>
                                                   
                                                    <td>
                                                        <button onClick={e=>CleaDataDate(c.id)} disabled={(c.status)} className="btn btn-danger">Proceed</button>
                                                        &nbsp; &nbsp; 
                                                        {
                                                            c.status == 1 && (hours >12 || (hours ===12 && mins >15)) &&
                                                            <button onClick={e=>DashboardGraphGenerate(c.date)} className="btn btn-success">Generate</button>
                                                        }
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-md-7">
                            <div class="table-responsive" style={{ maxHeight: '400px', minHeight: '500px' }}>
                                    <table class="table display nowrap table-striped table-bordered">
                                        <thead>
                                                <tr><th>Log Id</th>
                                                    <th>Channel Id</th>
                                                    <th>User Id</th>
                                                    <th>started</th>
                                                    <th>finished</th>
                                                    
                                                    <th></th>
                                                </tr>
                                        </thead>
                                        <tbody>
                                            <td>{viewLog.id}</td>
                                            <td>{viewLog.channel_id}</td>
                                            <td>{viewLog.user_id}</td>
                                            <td>{viewLog.started_watching_at}</td>
                                            <td>{viewLog.finished_watching_at}</td>
                                            <td><button onClick={e=>CleaData(viewLog.id)} className="btn btn-danger">Clean</button></td>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default DataCleanse;