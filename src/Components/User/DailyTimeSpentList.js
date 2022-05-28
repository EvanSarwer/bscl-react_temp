const DailyTimeSpentList = (props) => {
    console.log(props.channels);
    return (
        <section id="horizontal-vertical">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h4 class="card-title">{props.title}</h4>

                        </div>
                        <div class="card-content collapse show">
                            <div class="card-body card-dashboard">
                                <div class="table-responsive">
                                    <table class="table display nowrap table-striped table-bordered scroll-horizontal-vertical">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Channel</th>
                                                <th>Duration (min)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {props.channels.map((channel) =>

                                                <tr key={channel.id}>
                                                    <td>{channel.id}</td>
                                                    <td><a href="index.html"><div style={{ whiteSpace: 'nowrap' }}><img class="img-fluid" alt="" style={{ maxWidth: "3rem" }} src={"../../channels/logos/" + channel.logo} />{channel.channel_name}</div></a>
                                                    </td>
                                                    <td>{channel.totaltime}</td>
                                                </tr>

                                            )} */}
                                            <tr>
                                                <td>545564</td>
                                                <td><a href="index.html"><div style={{ whiteSpace: 'nowrap' }}><img class="img-fluid" alt="" style={{ maxWidth: "3rem" }} src={"../../channels/logos/Bangla Vision.jpg"} />Bangla Vision</div></a>
                                                </td>
                                                <td>00:54:20</td>
                                            </tr>
                                            <tr>
                                                <td>22829</td>
                                                <td><a href="index.html"><div style={{ whiteSpace: 'nowrap' }}><img class="img-fluid" alt="" style={{ maxWidth: "3rem" }} src={"../../channels/logos/Bangla Vision.jpg"} />Somoy Tv</div></a>
                                                </td>
                                                <td>01:30:20</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
export default DailyTimeSpentList;