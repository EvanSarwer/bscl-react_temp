const TotalTimeSpentList = (props) => {


    return (
        <div class="users-list-table">
            <div class="card">
                <div class="card-content">
                    <div class="card-body">

                        <h4>All Time Channel Views</h4>
                        {/* <input type="text" class="search form-control round border-primary mb-1" placeholder="Search"></input> */}


                        {(() => {
                            if (props.error === "Error") {
                                return <h4><span class="danger">Please Select User</span></h4>;
                            } else {
                                return <div class="table-responsive">
                                    <table id="users-list-datatable" class="table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Channel</th>
                                                <th>Duration (min)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.channels.map((channel) => 
                                                //var log = "../../channels/logos/" + channel.logo;../../channels/logos/BTV Chattogram.jpg

                                                //<option key={user.id} value={user.id}>{user.user_name}</option>
                                               
                                                    <tr key={channel.id}>
                                                        <td>{channel.id}</td>
                                                        <td><a href="#"><div style={{ whiteSpace: 'nowrap' }}><img class="img-fluid" alt="" style={{ maxWidth: "3rem" }} src={"../../channels/logos/" + channel.logo} />{channel.channel_name}</div></a>
                                                        </td>
                                                        <td>{channel.totaltime}</td>
                                                    </tr>
                                                
                                                

                                                )}


                                        </tbody>
                                    </table>
                                </div>;

                            }
                        })()}





                    </div>
                </div>
            </div>
        </div>
    )
}
export default TotalTimeSpentList;