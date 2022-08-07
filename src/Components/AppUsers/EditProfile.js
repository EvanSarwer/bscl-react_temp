import Header from "../Header/Header";

const EditProfile = () => {
    return (
        <div><Header title="" />

            <div className="app-content content">
                <div className="content-overlay" />
                <div className="content-wrapper">
                    <div className="content-header row">
                    </div>
                    <div className="content-body">
                        {/* users edit start */}
                        <section className="users-edit">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card-body">
                                        <ul className="nav nav-tabs mb-2" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link d-flex align-items-center active" id="account-tab" data-toggle="tab" href="#account" aria-controls="account" role="tab" aria-selected="true">
                                                    <i className="ft-user mr-25" /><span className="d-none d-sm-block">Account</span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link d-flex align-items-center" id="information-tab" data-toggle="tab" href="#information" aria-controls="information" role="tab" aria-selected="false">
                                                    <i className="ft-info mr-25" /><span className="d-none d-sm-block">Information</span>
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="tab-content">
                                            <div className="tab-pane active" id="account" aria-labelledby="account-tab" role="tabpanel">
                                                {/* users edit media object start */}
                                                <div className="media mb-2">
                                                    <a className="mr-2" href="#">
                                                        <img src="../../../app-assets/images/portrait/small/avatar-s-26.png" alt="users avatar" className="users-avatar-shadow rounded-circle" height={64} width={64} />
                                                    </a>
                                                    <div className="media-body">
                                                        <h4 className="media-heading">Avatar</h4>
                                                        <div className="col-12 px-0 d-flex">
                                                            <a href="#" className="btn btn-sm btn-primary mr-25">Change</a>
                                                            <a href="#" className="btn btn-sm btn-secondary">Reset</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* users edit media object ends */}
                                                {/* users edit account form start */}
                                                <form noValidate>
                                                    <div className="row">
                                                        <div className="col-12 col-sm-6">
                                                            <div className="form-group">
                                                                <div className="controls">
                                                                    <label>Username</label>
                                                                    <input type="text" className="form-control" placeholder="Username" defaultValue="dean3004" required data-validation-required-message="This username field is required" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="controls">
                                                                    <label>Name</label>
                                                                    <input type="text" className="form-control" placeholder="Name" defaultValue="Dean Stanley" required data-validation-required-message="This name field is required" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="controls">
                                                                    <label>E-mail</label>
                                                                    <input type="email" className="form-control" placeholder="Email" defaultValue="deanstanley@gmail.com" required data-validation-required-message="This email field is required" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-6">
                                                            <div className="form-group">
                                                                <label>Role</label>
                                                                <select className="form-control">
                                                                    <option>User</option>
                                                                    <option>Staff</option>
                                                                </select>
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Status</label>
                                                                <select className="form-control">
                                                                    <option>Active</option>
                                                                    <option>Banned</option>
                                                                    <option>Close</option>
                                                                </select>
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Company</label>
                                                                <input type="text" className="form-control" placeholder="Company name" />
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="table-responsive">
                                                                <table className="table mt-1">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Module Permission</th>
                                                                            <th>Read</th>
                                                                            <th>Write</th>
                                                                            <th>Create</th>
                                                                            <th>Delete</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>Users</td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox"><input type="checkbox" id="users-checkbox1" className="custom-control-input" defaultChecked />
                                                                                    <label className="custom-control-label" htmlFor="users-checkbox1" />
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox"><input type="checkbox" id="users-checkbox2" className="custom-control-input" /><label className="custom-control-label" htmlFor="users-checkbox2" />
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox"><input type="checkbox" id="users-checkbox3" className="custom-control-input" /><label className="custom-control-label" htmlFor="users-checkbox3" />
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox"><input type="checkbox" id="users-checkbox4" className="custom-control-input" defaultChecked />
                                                                                    <label className="custom-control-label" htmlFor="users-checkbox4" />
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Articles</td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox"><input type="checkbox" id="users-checkbox5" className="custom-control-input" /><label className="custom-control-label" htmlFor="users-checkbox5" />
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox"><input type="checkbox" id="users-checkbox6" className="custom-control-input" defaultChecked />
                                                                                    <label className="custom-control-label" htmlFor="users-checkbox6" />
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox"><input type="checkbox" id="users-checkbox7" className="custom-control-input" /><label className="custom-control-label" htmlFor="users-checkbox7" />
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox"><input type="checkbox" id="users-checkbox8" className="custom-control-input" defaultChecked />
                                                                                    <label className="custom-control-label" htmlFor="users-checkbox8" />
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Staff</td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox"><input type="checkbox" id="users-checkbox9" className="custom-control-input" defaultChecked />
                                                                                    <label className="custom-control-label" htmlFor="users-checkbox9" />
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox"><input type="checkbox" id="users-checkbox10" className="custom-control-input" defaultChecked />
                                                                                    <label className="custom-control-label" htmlFor="users-checkbox10" />
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox"><input type="checkbox" id="users-checkbox11" className="custom-control-input" /><label className="custom-control-label" htmlFor="users-checkbox11" />
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="custom-control custom-checkbox"><input type="checkbox" id="users-checkbox12" className="custom-control-input" /><label className="custom-control-label" htmlFor="users-checkbox12" />
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 d-flex flex-sm-row flex-column justify-content-end mt-1">
                                                            <button type="submit" className="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1">Save
                                                                changes</button>
                                                            <button type="reset" className="btn btn-light">Cancel</button>
                                                        </div>
                                                    </div>
                                                </form>
                                                {/* users edit account form ends */}
                                            </div>
                                            <div className="tab-pane" id="information" aria-labelledby="information-tab" role="tabpanel">
                                                {/* users edit Info form start */}
                                                <form noValidate>
                                                    <div className="row">
                                                        <div className="col-12 col-sm-6">
                                                            <h5 className="mb-1"><i className="ft-link mr-25" />Social Links</h5>
                                                            <div className="form-group">
                                                                <label>Twitter</label>
                                                                <input className="form-control" type="text" defaultValue="https://www.twitter.com/" />
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Facebook</label>
                                                                <input className="form-control" type="text" defaultValue="https://www.facebook.com/" />
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Google+</label>
                                                                <input className="form-control" type="text" />
                                                            </div>
                                                            <div className="form-group">
                                                                <label>LinkedIn</label>
                                                                <input className="form-control" type="text" />
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Instagram</label>
                                                                <input className="form-control" type="text" defaultValue="https://www.instagram.com/" />
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-sm-6 mt-1 mt-sm-0">
                                                            <h5 className="mb-1"><i className="ft-user mr-25" />Personal Info</h5>
                                                            <div className="form-group">
                                                                <div className="controls position-relative">
                                                                    <label>Birth date</label>
                                                                    <input type="text" className="form-control birthdate-picker" required placeholder="Birth date" data-validation-required-message="This birthdate field is required" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Country</label>
                                                                <select className="form-control" id="accountSelect">
                                                                    <option>USA</option>
                                                                    <option>India</option>
                                                                    <option>Canada</option>
                                                                </select>
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Languages</label>
                                                                <select className="form-control" id="users-language-select2" multiple="multiple">
                                                                    <option value="English" selected>English</option>
                                                                    <option value="Spanish">Spanish</option>
                                                                    <option value="French">French</option>
                                                                    <option value="Russian">Russian</option>
                                                                    <option value="German">German</option>
                                                                    <option value="Arabic" selected>Arabic</option>
                                                                    <option value="Sanskrit">Sanskrit</option>
                                                                </select>
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="controls">
                                                                    <label>Phone</label>
                                                                    <input type="text" className="form-control" required placeholder="Phone number" defaultValue="(+656) 254 2568" data-validation-required-message="This phone number field is required" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <div className="controls">
                                                                    <label>Address</label>
                                                                    <input type="text" className="form-control" placeholder="Address" data-validation-required-message="This Address field is required" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label>Website</label>
                                                                <input type="text" className="form-control" placeholder="Website address" />
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Favourite Music</label>
                                                                <select className="form-control" id="users-music-select2" multiple="multiple">
                                                                    <option value="Rock">Rock</option>
                                                                    <option value="Jazz" selected>Jazz</option>
                                                                    <option value="Disco">Disco</option>
                                                                    <option value="Pop">Pop</option>
                                                                    <option value="Techno">Techno</option>
                                                                    <option value="Folk" selected>Folk</option>
                                                                    <option value="Hip hop">Hip hop</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label>Favourite movies</label>
                                                                <select className="form-control" id="users-movies-select2" multiple="multiple">
                                                                    <option value="The Dark Knight" selected>The Dark Knight
                                                                    </option>
                                                                    <option value="Harry Potter" selected>Harry Potter</option>
                                                                    <option value="Airplane!">Airplane!</option>
                                                                    <option value="Perl Harbour">Perl Harbour</option>
                                                                    <option value="Spider Man">Spider Man</option>
                                                                    <option value="Iron Man" selected>Iron Man</option>
                                                                    <option value="Avatar">Avatar</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 d-flex flex-sm-row flex-column justify-content-end mt-1">
                                                            <button type="submit" className="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1">Save
                                                                changes</button>
                                                            <button type="reset" className="btn btn-light">Cancel</button>
                                                        </div>
                                                    </div>
                                                </form>
                                                {/* users edit Info form ends */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* users edit ends */}
                    </div>
                </div>
            </div>


        </div>
    )
}
export default EditProfile;