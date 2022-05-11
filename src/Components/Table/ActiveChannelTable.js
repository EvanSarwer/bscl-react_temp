const ActiveChannelTable =()=>{
    return(
        <div class="users-list-table">
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body">
                                    <h4>Active Channels</h4>
                                    <div class="table-responsive">
                                        <table id="users-list-datatable" class="table">
                                            <thead>
                                                <tr>
                                                    <th>Channel</th>
                                                    <th>Active User</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>BTV Chattrogram</td>
                                                    <td>7</td>
                                                </tr>
                                                <tr><td>BTV</td>
                                                    <td>6 </td>
                                                </tr>
                                                <tr>
                                                    <td>ATN News</td>
                                                    <td>3</td>
                                                </tr>
                                                
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