import { useState, useEffect } from 'react';


const ActiveUserTable = (props) => {

    const [userdata, setUserData] = useState([]);
    const [ query, setQuery ] = useState("");

    useEffect(() => {
        setUserData(props.data);

    }, [props.data])

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
                                        <th>Channel</th>
                                        <th>Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {Search(userdata).map((user) =>
                                                <tr key={user.user_id}>
                                                    <td>{user.user_id}</td>
                                                    <td><a href="index.html">{user.user_name}</a></td>
                                                    <td style={{ whiteSpace: 'nowrap' }}>{user.start_watching}</td>
                                                    <td><a href="index.html"><div style={{ whiteSpace: 'nowrap' }}><img class="img-fluid" alt="" style={{ maxWidth: "3rem" }} src={"../../channels/logos/" + user.channel_logo} />{user.channel_name}</div></a>
                                                    </td>
                                                    <td style={{ whiteSpace: 'nowrap' }}>{user.totaltime} min ago</td>
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