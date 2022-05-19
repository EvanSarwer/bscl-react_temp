const ActiveChannelTable = () => {
    return (
        <div class="users-list-table">
            <div class="card">
                <div class="card-content">
                    <div class="card-body">
                        <h4>Active Channels</h4>
                        <input type="text" class="search form-control round border-primary mb-1" placeholder="Search"></input>
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
                                        <td><div style={{ whiteSpace: 'nowrap' }}><img class="img-fluid" alt="" style={{ maxWidth: "3rem" }} src={require('../../channels/logos/BTV Chattogram.jpg')} />BTV Chattrogram</div></td>
                                        <td>7</td>
                                    </tr>
                                    <tr><td><img class="img-fluid" alt="" style={{ maxWidth: "3rem" }} src={require('../../channels/logos/BTV.png')} />BTV</td>
                                        <td>6 </td>
                                    </tr>
                                    <tr>
                                        <td><img class="img-fluid" alt="" style={{ maxWidth: "3rem" }} src={require('../../channels/logos/ATN News.png')} />ATN News</td>
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