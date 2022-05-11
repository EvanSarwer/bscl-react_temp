import CurrentStatus from "../CurrentStatus/CurrentStatus";
import Graph from "../Graph/Graph";
import ReachGraph from "../Graph/ReachGraph";

const Dashboard =()=>{
    return(
        <div class="app-content content">
                <div class="content-overlay"></div>
                <div class="content-wrapper">
                    <div class="content-header row">
                    </div>
                    <div class="content-body">

                        <CurrentStatus/>
                        
                        <div class="row match-height"><ReachGraph/></div>
                        
                        <Graph/>




                    
                    </div>
                </div>

        </div>

        
    )
}
export default Dashboard;