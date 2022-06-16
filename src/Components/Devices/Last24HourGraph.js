import TimelineChart from "../User/TimelineChart";

const Last24HourGraph =({id})=>{
    const user={user_name:id};
    return (
        <div class="row justify-content-md-center">
            <div class="col" >

                {(() => {
                    if (!user) {
                        return <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Watch History Of Last 24 Hours</h4>
                                <h4><span class="danger">Please Select User To See Last 24 Hour Data</span></h4>
                            </div>
                        </div>


                    } else {
                        return <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Watch History Of Last 24 Hours</h4>
                            </div>
                            <div class="card-content collapse show">

                                <TimelineChart class="w-100" user={user} url="/user/last24WatchingData" time="24" />


                            </div>
                        </div>

                    }
                })()}

            </div>
        </div>
    )
}
export default Last24HourGraph;