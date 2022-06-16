import { useState, useEffect } from 'react';
import axiosConfig from '../axiosConfig';


const ActiveUserTable = () => {

 
    const [ query, setQuery ] = useState("");
    const [activeUserList, setActiveUserList] = useState([]);

    useEffect(() => {

        axiosConfig.get("/dashboard/activeuserlist").then(rsp => {
            console.log(rsp.data);
            setActiveUserList(rsp.data.activeUsers);
        }).catch(err => {

        })

    },[])

    const Search = (data) => {
        return data.filter(
            (item) =>
                item.user_name.toLowerCase().includes(query.toLowerCase()) ||
                item.user_id.toString().includes(query) ||
                item.channel_name.toLowerCase().includes(query.toLowerCase()) ||
                item.channel_id.toString().includes(query)


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
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Started watching</th>
                                        <th>Duration</th>
                                        <th>Channel</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {Search(activeUserList).map((user) =>
                                                <tr key={user.user_id}>
                                                    <td>{user.user_id}</td>
                                                    <td><a href={`/device/details/${user.user_id}`}>{user.user_name}</a></td>
                                                    <td style={{ whiteSpace: 'nowrap' }}>{user.start_watching}</td>
                                                    <td style={{ whiteSpace: 'nowrap' }}>{user.duration}</td>
                                                    <td><a href=""><div style={{ whiteSpace: 'nowrap' }}><img class="img-fluid" alt="" style={{ maxWidth: "3rem" }} src={"../../channels/logos/" + user.channel_logo} />{user.channel_name}</div></a>
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