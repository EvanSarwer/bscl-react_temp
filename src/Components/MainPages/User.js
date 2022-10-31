
import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import Header from '../Header/Header';
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
import DownloadReportUser from "../DownloadReport/DownloadReportUser";
import RangedChannelStatusUser from "../Channel/RangedChannelStatusUser";
import DefinedChannelStatusUser from "../Channel/DefinedChannelStatusUser";
import ChannelStatusUser from "../Channel/ChannelStatusUser";
import ChangePassUser from "../AppUsers/ChangePassUser";
import ExcelReportUser from "../Report/ExcelReportUser";
import DayRangedChannelStatusUser from "../Channel/DayRangedChannelStatusUser";
import Footer from "../Footer/Footer";

function User() {

  return (
    <div>
    
    
    <BrowserRouter>
    <Header />
    <MainMenuUser />
      <Routes>
        <Route exact path="/" element={<DashboardUser />}></Route>
        <Route exact path="/app/user/changepass" element={<ChangePassUser />}></Route>
        <Route exact path="/overview" element={<Overview />}></Route>
        <Route exact path="/livechannels" element={<LiveChannels />}></Route>
        <Route exact path="/channelstatus" element={<ChannelStatusUser />}></Route>
        <Route exact path="/definedchannelstatus" element={<DefinedChannelStatusUser />}></Route>
        <Route exact path="/dayrangedChannelstatus" element={<DayRangedChannelStatusUser />}></Route>
        <Route exact path="/rangedchannelstatus" element={<RangedChannelStatusUser />}></Route>
        <Route exact path="/downloadreport" element={<DownloadReportUser />}></Route>
        <Route exact path="/excelreport" element={<ExcelReportUser />}></Route>
        <Route
        path="*"
        element={<Navigate to="/" replace />}
        />
        {/* <Route exact path="/map" element={<Map />}></Route> */}
      </Routes>
    <Footer/>
    </BrowserRouter>
    </div>
    );
}

export default User;