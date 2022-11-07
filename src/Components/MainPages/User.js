
import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import Header from '../Header/Header';
import LiveChannels from '../LiveChannels/LiveChannels';
import ChannelStatus from '../Channel/ChannelStatus';
import DefinedChannelStatus from '../Channel/DefinedChannelStatus';
import DeviceMonitor from '../DeviceMonitor/DeviceMonitor';
import DownloadReport from '../DownloadReport/DownloadReport';
import UserStatus from '../User/UserStatus';
import UserDefined from '../User/UserDefined';
import Overview from '../Overview/Overview';
import ChangePass from "../AppUsers/ChangePass";
import Footer from "../Footer/Footer";
import MainMenu from "../MainMenu/MainMenu";
import ExcelReport from "../Report/ExcelReport";
import DayRangedChannelStatus from "../Channel/DayRangedChannelStatus";
import RangedChannelStatus from "../Channel/RangedChannelStatus";
import KeywordTrpV2 from "../KeywordTrp/KeywordTrpV2";
import Dashboard from "../Dashboard/Dashboard";

function User() {

  return (
    <div>
    
    
    <BrowserRouter>
    <Header />
    <MainMenu />
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        {/* <Route exact path="/app/user/changepass" element={<ChangePassUser />}></Route> */}
        <Route exact path="/app/user/changepass" element={<ChangePass />}></Route>
        <Route exact path="/overview" element={<Overview />}></Route>
        <Route exact path="/livechannels" element={<LiveChannels />}></Route>
        <Route exact path="/channelstatus" element={<ChannelStatus />}></Route>
        <Route exact path="/definedchannelstatus" element={<DefinedChannelStatus />}></Route>
        <Route exact path="/dayrangedChannelstatus" element={<DayRangedChannelStatus />}></Route>
        <Route exact path="/rangedchannelstatus" element={<RangedChannelStatus />}></Route>
        <Route exact path="/downloadreport" element={<DownloadReport />}></Route>
        <Route exact path="/dailyadtrp" element={<KeywordTrpV2 />}></Route>
        <Route exact path="/excelreport" element={<ExcelReport />}></Route>
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