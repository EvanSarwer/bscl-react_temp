import { useState, useEffect } from "react"

const Table = (props) => {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        setData(props.logs);

    }, [props.logs])

    const Search = (data) => {
        return data.filter(
            (item) =>
            item.channel_name.toString().includes(query)
        );
    };

    console.log(Search(data));
    return (
        <section id="horizontal-vertical">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        {/* <div class="card-header">
                            <div class="row">
                                <div class="col-md-7"><h4 class="card-title">{props.title}</h4></div>
                                <div class="col-md-5"><input type="text" class="search form-control round border-primary mb-1" placeholder="Search" onChange={e => setQuery(e.target.value)} />
                                </div>

                            </div>

                        </div> */}
                        <div class="card-content collapse show">
                            <div class="card-body card-dashboard">

                            <div class="row">
                                <div class="col-md-7"><div class="h3 font-weight-bold">{props.title}</div></div>
                                <div class="col-md-5"><input type="text" class="search form-control round border-primary mb-1" placeholder="Search" onChange={e => setQuery(e.target.value)} />
                                </div>

                            </div>

                                <div class="table-responsive" style={{maxHeight:'400px',minHeight:'500px'}}>
                                    <table class="table display nowrap table-striped table-bordered ">
                                        <thead>
                                            <tr>
                                                <th>Channel Name</th>
                                                <th>started_watching_at</th>
                                                <th>finished_watching_at</th>
                                                <th>Duration (min)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Search(data).map((log) =>
                                                <tr key={log.id}>
                                                    <td>{log.channel_name}</td>
                                                    <td>{log.started_watching_at}</td>
                                                    <td>{log.finished_watching_at}</td>
                                                    <td>{log.duration_minute}</td>
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
        </section >
    )

}
export default Table;