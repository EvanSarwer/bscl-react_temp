const ActiveUserTable =()=>{
    return(
        <div class="users-list-table">
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body">
                                    
                                <h4>Active Users</h4>
                                    <div class="table-responsive">
                                        <table id="users-list-datatable" class="table">
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
                                                <tr>
                                                    <td>300</td>
                                                    <td><a href="../../../html/ltr/vertical-menu-template/page-users-view.html">BSCL_Prototype_1</a>
                                                    </td>
                                                    <td><div style={{whiteSpace: 'nowrap'}}>30/04/2019 00:10:33</div></td>
                                                    <td>ATN News</td>
                                                    <td>00:05:00</td>

                                                </tr>
                                                <tr>
                                                    <td>301</td>
                                                    <td><a href="../../../html/ltr/vertical-menu-template/page-users-view.html">BSCL_Prototype_2</a>
                                                    </td>
                                                    <td>06/04/2020 00:10:33</td>
                                                    <td>BTV</td>
                                                    <td>00:10:33</td>
                                                </tr>
                                                <tr>
                                                    <td>302</td>
                                                    <td><a href="../../../html/ltr/vertical-menu-template/page-users-view.html">BSCL_Prototype_3</a>
                                                    </td>
                                                    <td>03/01/2020 00:10:33</td>
                                                    <td ><div style={{whiteSpace: 'nowrap'}}>BTV Chattrogram</div></td>
                                                    <td>00:02:00</td>
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
export default ActiveUserTable;