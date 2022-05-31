import { useState, useEffect } from 'react';

const ActiveChannelTable = (props) => {
    const [channeldata, setChannelData] = useState([]);
    const [ query, setQuery ] = useState("");

    useEffect(() => {
        setChannelData(props.data);

    }, [props.data])

    const Search = (data) => {
        return data.filter(
            (item) =>
                item.channel_name.toLowerCase().includes(query.toLowerCase()) ||
                item.channel_id.toString().includes(query)
        );
    };





    return (
        <div class="users-list-table">
            <div class="card">
                <div class="card-content"> 
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                            <h4>Active Channels</h4>
                            </div>
                            <div class="col-md-6">
                            <input type="text" class="search form-control round border-primary mb-1" placeholder="Search" onChange={e => setQuery(e.target.value)}/>
                            </div>
                        </div>
                        <div class="table-responsive " style={{maxHeight:'260px'}}>
                            <table id="users-list-datatable" class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Channel Name</th>
                                        <th>Active User</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {Search(channeldata).map((channel) =>
                                                <tr key={channel.channel_id}>
                                                    <td>{channel.channel_id}</td>
                                                    <td><a href="index.html"><div style={{ whiteSpace: 'nowrap' }}><img class="img-fluid" alt="" style={{ maxWidth: "3rem" }} src={"../../channels/logos/" + channel.channel_logo} />{channel.channel_name}</div></a>
                                                    </td>
                                                    <td>{channel.user_count}</td>
                                                </tr>
                                            )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ActiveChannelTable;