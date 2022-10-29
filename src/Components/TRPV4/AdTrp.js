import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';

const ProgramTrp=()=>{

    return(
        <div>
            <Header title="Ad TRP" />
            <MainMenu menu="Ad TRP" />
            <div class="app-content content" style={{ backgroundColor: "azure", minHeight: "36em" }} >
                <div class="content-wrapper">
                    <h3 class="text-center">Ad TRP </h3>
                    <div class="row">
                        <div class="col-md-2">
                            <input type="text" class="form-control" placeholder="New Keyword"/>
                        </div>
                        <div class="col-md-2"><input type="text" class="btn btn-success" value="Add"/></div>
                        <div class="col-md-2"><a href="https://drive.google.com/file/d/1stj6tyjirTFfzRiT3Ag4vz3Vv2xhlGVP/view?usp=share_link" class="btn btn-success text-right">Download TRP of Yesterday</a></div>
                        <div class="col-md-2"><h4 class="text-right">Archieve</h4></div>
                        <div class="col-md-2">
                            <input type="date" class="form-control"></input>
                        </div>
                        <div class="col-md-2">
                            <input type="button" class="btn btn-success" value="Download"></input>
                        </div>
                        
                    </div>
                    <br></br>
                    <div class="row">
                        
                        <table class="col-md-5 table table-bordered">
                            <tr>
                                <th>Keyword</th>
                                <th>Action</th>
                            </tr>
                            <tr>
                                <td>ffghth</td>
                                <td><a class="btn btn-danger" href="#">Remove</a></td>
                            </tr>
                            <tr>
                                <td>ffghth</td>
                                <td><a class="btn btn-danger" href="#">Remove</a></td>
                            </tr>
                            <tr>
                                <td>ffghth</td>
                                <td><a class="btn btn-danger" href="#">Remove</a></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProgramTrp;