
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';
import Dashboard from '../Dashboard/Dashboard';
import LiveChannels from '../LiveChannels/LiveChannels';
import ChannelStatus from '../Channel/ChannelStatus';
import DefinedChannelStatus from '../Channel/DefinedChannelStatus';
import DeviceMonitor from '../DeviceMonitor/DeviceMonitor';
import DownloadReport from '../DownloadReport/DownloadReport';
import UserStatus from '../User/UserStatus';
import UserDefined from '../User/UserDefined';
import Overview from '../Overview/Overview';

function Admin() {

  return (
    <div>
    <Header />
    <MainMenu />
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route exact path="/overview" element={<Overview />}></Route>
        <Route exact path="/livechannels" element={<LiveChannels />}></Route>
        <Route exact path="/channelstatus" element={<ChannelStatus />}></Route>
        <Route exact path="/definedchannelstatus" element={<DefinedChannelStatus />}></Route>
        <Route exact path="/userstatus" element={<UserStatus />}></Route>
        <Route exact path="/userdefined" element={<UserDefined />}></Route>
        <Route exact path="/downloadreport" element={<DownloadReport />}></Route>
        <Route exact path="/devicemonitor" element={<DeviceMonitor />}></Route>
        {/* <Route exact path="/map" element={<Map />}></Route> */}
      </Routes>
    </BrowserRouter>
    </div>
    );
}

export default Admin;