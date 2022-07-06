import { useState, useEffect } from 'react';
import axiosConfig from '../axiosConfig';


const ActiveUserTable = () => {

 
    const [ query, setQuery ] = useState("");
    const [loading,setloading] = useState(false);
    const [activeUserList, setActiveUserList] = useState([]);
const loader=() => {
    axiosConfig.get("/dashboard/activeuserlist").then(rsp => {
        
    setloading(true);
        console.log(rsp.data);

        setActiveUserList(rsp.data);
    }).catch(err => {

    })
}
loader();
    useEffect(() => {
        const interval = setInterval(loader, 5000);
      
        return () => clearInterval(interval);
      }, []);

    const Search = (data) => {
        return data.filter(
            (item) =>
                item.user.user_name.toLowerCase().includes(query.toLowerCase()) ||
                item.user_id.toString().includes(query) ||
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
                            
                                {(() => {

if (loading) {
    return <table class="table nowrap table-bordered">
    <thead>
        <tr>
            <th>User Name</th>
            <th>Started watching</th>
            <th>Duration</th>
            <th>Channel</th>
        </tr>
    </thead>
    <tbody>
    {Search(activeUserList).map((user) =>
                                                <tr key={user.user_id}>
                                                    <td><a href={`/device/details/${user.user_id}`}>{user.user.user_name}</a></td>
                                                    <td style={{ whiteSpace: 'nowrap' }}>{user.started_watching_at}</td>
                                                    <td style={{ whiteSpace: 'nowrap' }}>{user.duration}</td>
                                                    <td><a href=""><div style={{ whiteSpace: 'nowrap' }}><img class="img-fluid" alt="" style={{ maxWidth: "3rem" }} src={"../../channels/logos/" + user.channel.logo} />{user.channel.channel_name}</div></a>
                                                    </td>
                                                    
                                                </tr>
                                            )}
                                            </tbody>
                            </table>
                                        } else {
                                            return <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831" class="rounded mx-auto d-block" alt="..." />
                                        
                                        }
                                        
                                        })()}
                    
                                
                        </div>
                    </div>
                </div>
            </div>
        
    )
}
export default ActiveUserTable;