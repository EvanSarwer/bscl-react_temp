
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
import LiveChannelsUser from "../LiveChannels/LiveChannelsUser";
import OverviewUser from "../Overview/OverviewUser";
import DownloadReportUser from "../DownloadReport/DownloadReportUser";
import RangedChannelStatusUser from "../Channel/RangedChannelStatusUser";
import DefinedChannelStatusUser from "../Channel/DefinedChannelStatusUser";
import ChannelStatusUser from "../Channel/ChannelStatusUser";

function User() {

  return (
    <div>
    
    
    <BrowserRouter>
    <HeaderUser />
    <MainMenuUser />
      <Routes>
        <Route exact path="/" element={<DashboardUser />}></Route>
        <Route exact path="/overview" element={<OverviewUser />}></Route>
        <Route exact path="/livechannels" element={<LiveChannelsUser />}></Route>
        <Route exact path="/channelstatus" element={<ChannelStatusUser />}></Route>
        <Route exact path="/definedchannelstatus" element={<DefinedChannelStatusUser />}></Route>
        <Route exact path="/rangedchannelstatus" element={<RangedChannelStatusUser />}></Route>
        <Route exact path="/downloadreport" element={<DownloadReportUser />}></Route>
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