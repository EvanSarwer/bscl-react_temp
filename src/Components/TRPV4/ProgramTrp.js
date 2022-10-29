import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';

const ProgramTrp=()=>{

    return(
        <div>
            <Header title="Program TRP" />
            <MainMenu menu="Program TRP" />
            
            <div class="app-content content" style={{ backgroundColor: "azure", minHeight: "36em" }} >
                <div class="content-wrapper">
                    <h3 class="text-center">Program TRP of Yesterday </h3>
                    <table class="table table-bordered">
                        <tr>
                            <th>Sl#</th>
                            <th>Channel </th>
                            <th>Action </th>
                            <th>Remark</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>ATN Bangla</td>
                            <td><a target="_blank" href="https://drive.google.com/file/d/1rfVf86aW9CvOWcpHugGZCQa0MpWrO9oE/view?usp=share_link" class="btn btn-success">Download</a></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Channel 9</td>
                            <td><a href="#" class="btn btn-success">Download</a></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>SA TV</td>
                            <td><a href="#" class="btn btn-success">Download</a></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Durontno</td>
                            <td><a href="#" class="btn btn-success">Download</a></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>ATN News</td>
                            <td>N/A</td>
                            <td>Playout not uploaded</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default ProgramTrp;