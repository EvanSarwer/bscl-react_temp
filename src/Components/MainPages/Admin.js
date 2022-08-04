
import { BrowserRouter, Routes, Route,Navigate} from "react-router-dom";
import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';
import ExcelReport from '../Report/ExcelReport';
import Dashboard from '../Dashboard/Dashboard';
import LiveChannels from '../LiveChannels/LiveChannels';
import LiveMap from "../LiveChannels/LiveMap";
import ChannelStatus from '../Channel/ChannelStatus';
import DefinedChannelStatus from '../Channel/DefinedChannelStatus';
import DeviceMonitor from '../DeviceMonitor/DeviceMonitor';
import DownloadReport from '../DownloadReport/DownloadReport';
import UserStatus from '../User/UserStatus';
import UserDefined from '../User/UserDefined';
import Overview from '../Overview/Overview';
import ViewLog from '../ViewLog/ViewLog';
import AppUserList from "../AppUsers/AppUserList";
import AddAppUser from "../AppUsers/AddAppUser";
import EditAppUser from "../AppUsers/EditAppUser";
import ChangePass from "../AppUsers/ChangePass";
import DeviceInfo from "../Devices/DeviceInfo";
import Footer from "../Footer/Footer";
import DeviceUserList from "../DeviceUser/DeviceUserList";
import AddDeviceUser from "../DeviceUser/AddDeviceUser";
import EditDeviceUser from "../DeviceUser/EditDeviceUser";



function Admin() {

  return (
    <div>
    
    
    <BrowserRouter>
    <MainMenu />
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route exact path="/overview" element={<Overview />}></Route>
        <Route exact path="/excelreport" element={<ExcelReport />}></Route>
        <Route exact path="/livechannels" element={<LiveChannels />}></Route>
        <Route exact path="/map" element={<LiveMap />}></Route>
        <Route exact path="/channelstatus" element={<ChannelStatus />}></Route>
        <Route exact path="/definedchannelstatus" element={<DefinedChannelStatus />}></Route>
        <Route exact path="/userstatus" element={<UserStatus />}></Route>
        <Route exact path="/userdefined" element={<UserDefined />}></Route>
        <Route exact path="/downloadreport" element={<DownloadReport />}></Route>
        <Route exact path="/devicemonitor" element={<DeviceMonitor />}></Route>
        <Route exact path="/logs" element={<ViewLog />}></Route>
        <Route exact path="/app/users" element={<AppUserList />}></Route>
        <Route exact path="/app/user/create" element={<AddAppUser />}></Route>
        <Route exact path="/app/user/edit/:id" element={<EditAppUser />}></Route>
        {/* <Route exact path="/profile/edit" element={<EditProfile />}></Route> */}
        <Route exact path="/app/user/changepass" element={<ChangePass />}></Route>
        <Route exact path="/device/details/:id" element={<DeviceInfo />}></Route>
        <Route exact path="/device/users" element={<DeviceUserList />}></Route>
        <Route exact path="/device/user/create" element={<AddDeviceUser />}></Route>
        <Route exact path="/device/user/edit/:id" element={<EditDeviceUser />}></Route>
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

export default Admin;