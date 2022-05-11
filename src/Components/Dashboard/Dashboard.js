import CurrentStatus from "../CurrentStatus/CurrentStatus";
import Graph from "../Graph/Graph";
import ReachGraph from "../Graph/ReachGraph";
import ActiveChannelTable from "../Table/ActiveChannelTable";


const Dashboard =()=>{
    return(
        <div class="app-content content">
                <div class="content-overlay"></div>
                <div class="content-wrapper">
                    <div class="content-header row">
                    </div>
                    <div class="content-body">

                        <CurrentStatus/>
                        <div class="row">
                        <div class="col-md-8">
                        <ActiveChannelTable/>
                        </div>
                        
                        <div class="col-md-4">
                        <ActiveChannelTable/>
                        </div>
                        </div>
                        
                        <div class="row">
                        
                        <div class="col-md-6">
                        <ReachGraph/>
                        </div>
                        <div class="col-md-6">
                        <ReachGraph/>
                        </div>
                        </div>
                        <div class="row">
                        
                        <div class="col-md-6">
                        <ReachGraph/>
                        </div>
                        <div class="col-md-6">
                        <ReachGraph/>
                        </div>
                        </div>
                        
                        




                    
                    </div>
                </div>

        </div>

        
    )
}
export default Dashboard;