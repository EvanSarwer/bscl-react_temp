
import { BrowserRouter, Routes, Route,Navigate} from "react-router-dom";
import Header from '../Header/Header';

import Cookies from 'universal-cookie';
import MainMenu from '../MainMenu/MainMenu';
import ExcelReport from '../Report/ExcelReport';
import Dashboard from '../Dashboard/Dashboard';
import LiveChannels from '../LiveChannels/LiveChannels';
import LiveMap from "../LiveChannels/LiveMap";
import ChannelStatus from '../Channel/ChannelStatus';
import AdLogUpload from '../LogUpload/AdLogUpload';
import ProgramLogUpload from '../LogUpload/ProgramLogUpload';
import DayRangedChannelStatus from '../Channel/DayRangedChannelStatus';
import RangedChannelStatus from '../Channel/RangedChannelStatus';
import DefinedChannelStatus from '../Channel/DefinedChannelStatus';
import DeviceMonitor from '../DeviceMonitor/DeviceMonitor';
import DeviceHealth from '../DeviceHealth/DeviceHealth';
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
import DeviceList from "../DeviceUser/DeviceList";
import AddDevice from "../DeviceUser/AddDevice";
import EditDevice from "../DeviceUser/EditDevice";
import AddUser from "../DeviceUser/User/AddUser";
import EditUser from "../DeviceUser/User/EditUser";
import DeviceDetails from "../DeviceUser/DeviceDetails";
import DeviceDetailsView from "../DeviceUser/DeviceDetailsView";
import Notification from "../Header/Notification";
import UserDataFilter from "../User/UserDataFilter";
import DataCleanse from "../User/DataCleanse";
import UserPassReset from "../AppUsers/PassReset/UserPassReset";
import ResetPass from "../AppUsers/PassReset/ResetPass";
import DeviceHistoryLog from "../DeviceUser/DeviceHistoryLog";



function Admin() {

  const cookies = new Cookies();
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
        <Route exact path="/dayrangedChannelstatus" element={<DayRangedChannelStatus />}></Route>
        <Route exact path="/rangedchannelstatus" element={<RangedChannelStatus />}></Route>
        <Route exact path="/userstatus" element={<UserStatus />}></Route>
        <Route exact path="/userdefined" element={<UserDefined />}></Route>
        <Route exact path="/devicemonitor" element={<DeviceMonitor />}></Route>
        <Route exact path="/devicehealth" element={<DeviceHealth />}></Route>
        <Route exact path="/logs" element={<ViewLog />}></Route>
        <Route exact path="/testlogs" element={<ViewLog2 />}></Route>
        
        { (cookies.get('_role')==='admin') && 
          <Route exact path="/app/users" element={<AppUserList />}></Route>
          
        }
        { (cookies.get('_role')==='admin') && 
          <Route exact path="/ProgramLogUpload" element={<ProgramLogUpload />}></Route>
          
        }
        { (cookies.get('_role')==='admin') && 
          <Route exact path="/AdLogUpload" element={<AdLogUpload />}></Route>
          
        }
        { (cookies.get('_role')==='admin') && 
          <Route exact path="/device" element={<DeviceList />}></Route>
          
        }
        <Route exact path="/app/user/create" element={<AddAppUser />}></Route>
        <Route exact path="/app/user/edit/:id" element={<EditAppUser />}></Route>
        <Route exact path="/profile/edit" element={<EditProfile />}></Route>
        <Route exact path="/app/user/changepass" element={<ChangePass />}></Route>
        <Route exact path="/device/user/details/:id" element={<DeviceInfo />}></Route>
        <Route exact path="/device/create" element={<AddDevice />}></Route>
        <Route exact path="/device/edit/:id" element={<EditDevice />}></Route>
        <Route exact path="/notification" element={<Notification />}></Route>

        <Route exact path="/device/user/create/:device_id/:user_index/:from" element={<AddUser />}></Route>
        <Route exact path="/device/user/edit/:id/:from" element={<EditUser />}></Route>
        <Route exact path="/device/details/:id" element={<DeviceDetails />}></Route>
        <Route exact path="/device/detail/:id" element={<DeviceDetailsView />}></Route>
        <Route exact path="/device/box/history/:id" element={<DeviceHistoryLog />}></Route>
        <Route exact path="/userdatafilter" element={<UserDataFilter />}></Route>
        <Route exact path="/datacleansing" element={<DataCleanse />}></Route>
        <Route exact path="/user-passreset" element={<UserPassReset />}></Route>
        <Route exact path="/user-passreset/:username" element={<ResetPass />}></Route>
        

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