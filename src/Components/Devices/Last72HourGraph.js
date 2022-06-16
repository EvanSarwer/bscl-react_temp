import TimelineChart from "../User/TimelineChart";

const Last72HourGraph=({id})=>{
    const user={user_name:id};
    return (
            <div class="row justify-content-md-center">
                <div class="col" >
                    {(() => {
                        if (!user) {
                            return <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">Watch History Of Last 72 Hours</h4>
                                    <h4><span class="danger">Please Select User To See Last 72 Hour Data</span></h4>
                                </div>
                            </div>


                        } else {
                            return <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">Watch History Of Last 72 Hours</h4>
                                </div>
                                <div class="card-content collapse show">

                                    <TimelineChart class="w-100" user={user} url="/user/last72WatchingData" time="72" />


                                </div>
                            </div>

                        }
                    })()}
                </div>
        </div>
    )
}
export default Last72HourGraph;