const ActiveChannelTable =()=>{
    return(
        <div class="users-list-table">
                        <div class="card">
                            <div class="card-content">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table id="users-list-datatable" class="table">
                                            <thead>
                                                <tr>
                                                    <th>id</th>
                                                    <th>username</th>
                                                    <th>name</th>
                                                    <th>Started watching at</th>
                                                    <th>Channel Name</th>
                                                    <th>Channel Logo</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>300</td>
                                                    <td><a href="../../../html/ltr/vertical-menu-template/page-users-view.html">dean3004</a>
                                                    </td>
                                                    <td>Dean Stanley</td>
                                                    <td>30/04/2019</td>
                                                    <td>No</td>
                                                    <td>Staff</td>
                                                </tr>
                                                <tr>
                                                    <td>301</td>
                                                    <td><a href="../../../html/ltr/vertical-menu-template/page-users-view.html">zena0604</a>
                                                    </td>
                                                    <td>Zena Buckley</td>
                                                    <td>06/04/2020</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
                                                </tr>
                                                <tr>
                                                    <td>302</td>
                                                    <td><a href="../../../html/ltr/vertical-menu-template/page-users-view.html">delilah0301</a>
                                                    </td>
                                                    <td>Delilah Moon</td>
                                                    <td>03/01/2020</td>
                                                    <td>Yes</td>
                                                    <td>User </td>
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