import { useState, useEffect } from "react"

const Table = (props) => {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        setData(props.channels);

    }, [props.channels])

    const Search = (data) => {
        return data.filter(
            (item) =>
                item.channel_name.toLowerCase().includes(query.toLowerCase()) ||
                item.id.toString().includes(query)
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
                                <div class="col-md-7"><h4 class="card-title">{props.title}</h4></div>
                                <div class="col-md-5"><input type="text" class="search form-control round border-primary mb-1" placeholder="Search" onChange={e => setQuery(e.target.value)} />
                                </div>

                            </div>

                                <div class="table-responsive" style={{maxHeight:'400px',minHeight:'400px'}}>
                                    <table class="table display nowrap table-striped table-bordered scroll-horizontal-vertical">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Channel</th>
                                                <th>Duration (min)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Search(data).map((channel) =>
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
        </section >
    )

}
export default Table;