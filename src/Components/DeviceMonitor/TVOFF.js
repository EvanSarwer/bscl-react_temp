const TVOFF = () => {
    function get(){
        console.log("jjjj");
    }
    return (
        <div class="users-list-table">
            <div class="card">
                <div class="card-content">
                    <div class="card-body">
                        <h4>TV off</h4>
                        <input type="text" class="search form-control round border-primary mb-1" placeholder="Search"></input>
                        <div class="table-responsive">
                            <table id="users-list-datatable" class="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Username</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>23</td>
                                        <td>BSCL_Prototype_1</td>
                                        <td><span style={{ height: "1em",  width: "1em",  backgroundColor: "orange",  borderRadius: "50%",  display: "inline-block"}}></span></td>
                                    </tr>
                                    <tr>
                                        <td>35</td>
                                        <td>BSCL_ADMIN_8</td>
                                        <td><span style={{ height: "1em",  width: "1em",  backgroundColor: "orange",  borderRadius: "50%",  display: "inline-block"}}></span></td>
                                    </tr>
                                    <tr>
                                        <td>18</td>
                                        <td>BSCL_Prototype_4</td>
                                        <td><span style={{ height: "1em",  width: "1em",  backgroundColor: "orange",  borderRadius: "50%",  display: "inline-block"}}></span></td>
                                    </tr>
                                    <tr>
                                        <td>21</td>
                                        <td>BSCL_ADMIN_9</td>
                                        <td><span style={{ height: "1em",  width: "1em",  backgroundColor: "orange",  borderRadius: "50%",  display: "inline-block"}}></span></td>
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
export default TVOFF;