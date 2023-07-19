import { useState, useEffect } from "react";
import axiosConfig from '../../axiosConfig';
import Header from "../../Header/Header";
import MainMenu from "../../MainMenu/MainMenu";
import { Link } from "react-router-dom";

const UserPassReset = () => {
    const [appuser, setAppuser] = useState({});
    // useEffect(() => {
    //     axiosConfig.get("/data/cleanse/alldates").then((rsp) => {
    //         setCleans(rsp.data.data);
    //         setLastUpdatedDate(rsp.data.lastUpdatedDate);

    //     }, (err) => { });


    // }, []);


    const Search = (e) => {
        var data = e.target.value;
        axiosConfig.get("/appuser/" + data).then((rsp) => {

            setAppuser(rsp.data);


        }, (err) => { });
    };


    return (

        <div><Header title="Reset Password" />
            <MainMenu menu="passreset" />
            <div class="app-content content">
                <div class="content-overlay"></div>
                <div class="content-wrapper" style={{ backgroundColor: "azure" }} >
                    <div class="content-header row">
                    </div>
                    <div class="content-body">
                        <div class="row">
                            <div class="col-md-5"></div>
                            <div className="col-md-3"><div class="h3 text-center font-weight-bold">App User</div></div>
                            <div class="col-md-4"><input type="text" class="search form-control round border-primary mb-1" placeholder="Search with Username" onChange={e => Search(e)} />
                            </div>

                        </div>

                        
                            <div class="row">
                                
                                <div className="col-md-12">
                                    <div class="table-responsive" style={{ maxHeight: '400px', minHeight: '500px' }}>
                                        <table class="table display nowrap table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Username</th>
                                                    <th>Email</th>

                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <td>{appuser.user_name}</td>
                                                <td>{appuser.email}</td>
                                                <td>{appuser.id !== null && appuser.id !== undefined && <Link to={`/user-passreset/${appuser.user_name}`} className="btn btn-danger">Reset</Link>}</td>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                    
                    </div>
                </div>
            </div>
        </div>
    )

}

export default UserPassReset;