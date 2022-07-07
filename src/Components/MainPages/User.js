
import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import HeaderUser from '../Header/HeaderUser';
import MainMenuUser from '../MainMenu/MainMenuUser';
import DashboardUser from '../Dashboard/DashboardUser';
import LiveChannels from '../LiveChannels/LiveChannels';
import ChannelStatus from '../Channel/ChannelStatus';
import DefinedChannelStatus from '../Channel/DefinedChannelStatus';
import DeviceMonitor from '../DeviceMonitor/DeviceMonitor';
import DownloadReport from '../DownloadReport/DownloadReport';
import UserStatus from '../User/UserStatus';
import UserDefined from '../User/UserDefined';
import Overview from '../Overview/Overview';

function User() {

  return (
    <div>
    <HeaderUser />
    <MainMenuUser />
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<DashboardUser />}></Route>
        <Route exact path="/overview" element={<Overview />}></Route>
        <Route exact path="/livechannels" element={<LiveChannels />}></Route>
        <Route exact path="/channelstatus" element={<ChannelStatus />}></Route>
        <Route exact path="/definedchannelstatus" element={<DefinedChannelStatus />}></Route>
        <Route exact path="/userstatus" element={<UserStatus />}></Route>
        <Route exact path="/userdefined" element={<UserDefined />}></Route>
        <Route exact path="/downloadreport" element={<DownloadReport />}></Route>
        <Route exact path="/devicemonitor" element={<DeviceMonitor />}></Route>
        <Route
        path="*"
        element={<Navigate to="/" replace />}
        />
        {/* <Route exact path="/map" element={<Map />}></Route> */}
      </Routes>
    </BrowserRouter>
    </div>
    );
}

export default User;