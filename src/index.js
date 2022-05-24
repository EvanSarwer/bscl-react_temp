import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Header from './Components/Header/Header';
import MainMenu from './Components/MainMenu/MainMenu';
import Dashboard from './Components/Dashboard/Dashboard';
import LiveChannels from './Components/LiveChannels/LiveChannels';
import ChannelStatus from './Components/Channel/ChannelStatus';
import DeviceMonitor from './Components/DeviceMonitor/DeviceMonitor';
import DownloadReport from './Components/DownloadReport/DownloadReport';
import UserStatus from './Components/User/UserStatus';
//import Map from './Components/Map/Map';
//import ChannelStatus from './Components/Channel/ChannelStatus';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Header />
    <MainMenu />
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route exact path="/livechannels" element={<LiveChannels />}></Route>
        <Route exact path="/channelstatus" element={<ChannelStatus />}></Route>
        <Route exact path="/userstatus" element={<UserStatus />}></Route>
        <Route exact path="/downloadreport" element={<DownloadReport />}></Route>
        <Route exact path="/devicemonitor" element={<DeviceMonitor />}></Route>
        {/* <Route exact path="/map" element={<Map />}></Route> */}
      </Routes>
    </BrowserRouter>



  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();