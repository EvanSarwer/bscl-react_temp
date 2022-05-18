import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter,Routes,Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Header from './Components/Header/Header';
import MainMenu from './Components/MainMenu/MainMenu';
import Dashboard from './Components/Dashboard/Dashboard';
import LiveChannels from './Components/LiveChannels/LiveChannels';
import ChannelStatus from './Components/Channel/ChannelStatus';
//import ChannelStatus from './Components/Channel/ChannelStatus';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <Header/>
    <MainMenu/>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="/livechannels" element={<LiveChannels/>}></Route>
          <Route path="/channelstatus" element={<ChannelStatus/>}></Route>
        </Routes>
      </BrowserRouter>
    {/* <Dashboard/> */}



  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();