
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
    
    </div>
    );
}

export default Admin;