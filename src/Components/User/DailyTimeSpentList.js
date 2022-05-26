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
                                            {props.channels.map((channel) =>

                                                <tr key={channel.id}>
                                                    <td>{channel.id}</td>
                                                    <td><a href="index.html"><div style={{ whiteSpace: 'nowrap' }}><img class="img-fluid" alt="" style={{ maxWidth: "3rem" }} src={"../../channels/logos/" + channel.logo} />{channel.channel_name}</div></a>
                                                    </td>
                                                    <td>{channel.totaltime}</td>
                                                </tr>

                                            )}
                                            
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