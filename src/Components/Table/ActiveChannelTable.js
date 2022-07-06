import { useState, useEffect } from 'react';
import axiosConfig from '../axiosConfig';

const ActiveChannelTable = () => {
    const [channeldata, setChannelData] = useState([]);
    const [ query, setQuery ] = useState("");
    const [loading,setloading] = useState(false);
    const [activeChannelList, setActiveChannelList] = useState([]);
const loader=() => {
    axiosConfig.get("/dashboard/activechannellist").then(rsp => {
        
    setloading(true);
        console.log(rsp.data);
        setActiveChannelList(rsp.data.activeChannels);
    }).catch(err => {

    })
}
loader();
    useEffect(() => {

        const interval = setInterval(loader, 5000);
      
        return () => clearInterval(interval);
      }, []);

    // useEffect(() => {
    //     setChannelData(props.data);

    // }, [props.data])

    const Search = (data) => {
        return data.filter(
            (item) =>
                item.channel_name.toLowerCase().includes(query.toLowerCase()) ||
                item.channel_id.toString().includes(query)
        );
    };





    return (
        
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
                        <div class="table-responsive " style={{maxHeight:'290px',minHeight:'290px'}}>
                                {(() => {

if (loading) {
    return <table id="users-list-datatable" class="table table-bordered">
        <thead>
            <tr>
                <th>Channel Name</th>
                <th>Active User</th>
            </tr>
        </thead>
        <tbody>
    {Search(activeChannelList).map((channel) =>
        <tr key={channel.channel_id}>
            <td><a><div style={{ whiteSpace: 'nowrap' }}><img class="img-fluid" alt="" style={{ maxWidth: "3rem" }} src={"../../channels/logos/" + channel.channel_logo} />{channel.channel_name}</div></a>
            </td>
            <td>{channel.user_count}</td>
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
export default ActiveChannelTable;