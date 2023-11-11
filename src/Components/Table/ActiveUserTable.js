import { useState, useEffect } from 'react';
import axiosConfig from '../axiosConfig';


const ActiveUserTable = (props) => {

 
    const [ query, setQuery ] = useState("");
    // const [activeUserList, setActiveUserList] = useState([]);
    // const getData=()=>{
    //     axiosConfig.get("/dashboard/activeuserlist").then(rsp => {
    //         //console.log(rsp.data);
    
    //         setActiveUserList(rsp.data);
    //     }).catch(err => {

    //     });
    // }
    // useEffect(() => {
    //     getData();
    //     const interval = setInterval(() => { getData() },5000);
      
    //     return () => clearInterval(interval);
    //   }, []);

    const Search = (data) => {
        return data.filter(
            (item) =>
                item.user_name.toLowerCase().includes(query.toLowerCase()) ||
                item.device_name.toLowerCase().includes(query.toLowerCase()) ||
                item.id.toString().includes(query) ||
                item.channel.channel_name.toLowerCase().includes(query.toLowerCase()) ||
                item.channel.id.toString().includes(query)


        );
    };

 

    return (
        
            <div class="card">
                <div class="card-content">
                    <div class="card-body">
                        <div class="row"><h4 class="col float-left">Active Users</h4>
                            <input type="text" class="search form-control round border-primary mb-1 col float-right" placeholder="Search" onChange={e => setQuery(e.target.value)} />
                        </div>
                        <div class="table-responsive" style={{maxHeight:'290px',minHeight:'290px'}}>
                            <table class="table nowrap table-bordered">
                                <thead>
                                    <tr>
                                        <th>User Name</th>
                                        <th>Household</th>
                                        <th>Started watching</th>
                                        <th>Duration</th>
                                        <th>Channel</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {Search(props.activeUserList).map((user) =>
                                                <tr key={user.id}>
                                                    <td><a href={`/device/user/details/${user.id}`}>{user.user_name}</a></td>
                                                    <td>{user.device_name}</td>
                                                    <td style={{ whiteSpace: 'nowrap' }}>{user.started_watching_at}</td>
                                                    <td style={{ whiteSpace: 'nowrap' }}>{user.duration}</td>
                                                    <td><a href=""><div style={{ whiteSpace: 'nowrap' }}><img class="img-fluid" alt="" style={{ maxWidth: "3rem" }} src={"../../channels/logos/" + user.channel.logo} />{user.channel.channel_name}</div></a>
                                                    </td>
                                                    
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
export default ActiveUserTable;