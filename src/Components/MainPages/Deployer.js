
import { BrowserRouter, Routes, Route,Navigate} from "react-router-dom";
import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';
import ExcelReport from '../Report/ExcelReport';
import AdTrp from '../AdTrp/AdTrp';
import Dashboard from '../Dashboard/Dashboard';
import LiveChannels from '../LiveChannels/LiveChannels';
import LiveMap from "../LiveChannels/LiveMap";
import ChannelStatus from '../Channel/ChannelStatus';
import DayRangedChannelStatus from '../Channel/DayRangedChannelStatus';
import RangedChannelStatus from '../Channel/RangedChannelStatus';
import DefinedChannelStatus from '../Channel/DefinedChannelStatus';
import DeviceMonitor from '../DeviceMonitor/DeviceMonitor';
import DownloadReport from '../DownloadReport/DownloadReport';
import UserStatus from '../User/UserStatus';
import UserDefined from '../User/UserDefined';
import Overview from '../Overview/Overview';
import ViewLog from '../ViewLog/ViewLog';
import ViewLog2 from '../ViewLog/ViewLog2';
import AppUserList from "../AppUsers/AppUserList";
import AddAppUser from "../AppUsers/AddAppUser";
import EditAppUser from "../AppUsers/EditAppUser";
import ChangePass from "../AppUsers/ChangePass";
import DeviceInfo from "../Devices/DeviceInfo";
import Footer from "../Footer/Footer";
import EditProfile from "../AppUsers/EditProfile";
import DeviceList from "../DeviceUser/DeployerUser/DeviceList";
import AddDevice from "../DeviceUser/DeployerUser/AddDevice";
import EditDevice from "../DeviceUser/DeployerUser/EditDevice";
import AddUser from "../DeviceUser/DeployerUser/User/AddUser";
import EditUser from "../DeviceUser/DeployerUser/User/EditUser";
import DeviceDetails from "../DeviceUser/DeployerUser/DeviceDetails";



function Deployer() {

  return (
    <div>
    
    
    <BrowserRouter>
    <MainMenu />
      <Routes>
        <Route exact path="/" element={<DeviceList />}></Route>
        <Route exact path="/device/create" element={<AddDevice />}></Route>
        <Route exact path="/device/details/:id" element={<DeviceDetails />}></Route>



        <Route exact path="/device/edit/:id" element={<EditDevice />}></Route>

        <Route exact path="/device/user/create/:device_id/:user_index/:from" element={<AddUser />}></Route>
        <Route exact path="/device/user/edit/:id/:from" element={<EditUser />}></Route>
        

        {/* <Navigate to="/" /> */}
        <Route
        path="*"
        element={<Navigate to="/" replace />}
    />
        {/* <Route exact path="/map" element={<Map />}></Route> */}
      </Routes>
    </BrowserRouter>
    <Footer/>
    </div>
    );
}

export default Deployer;