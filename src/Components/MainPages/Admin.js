
import { BrowserRouter, Routes, Route,Navigate} from "react-router-dom";
import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';
import Report from '../Report/Report';
import Dashboard from '../Dashboard/Dashboard';
import LiveChannels from '../LiveChannels/LiveChannels';
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


function Admin() {

  return (
    <div>
    <Header />
    <MainMenu />
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route exact path="/overview" element={<Overview />}></Route>
        <Route exact path="/report" element={<Report />}></Route>
        <Route exact path="/livechannels" element={<LiveChannels />}></Route>
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
        <Route exact path="/app/user/changepass" element={<ChangePass />}></Route>
        <Route exact path="/device/details/:id" element={<DeviceInfo />}></Route>
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