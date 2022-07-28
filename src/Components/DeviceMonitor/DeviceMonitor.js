import React from 'react';

import CurrentlyWatching from "../DeviceMonitor/CurrentlyWatching";
import TVOFF from "../DeviceMonitor/TVOFF";
import DeviceOff from "../DeviceMonitor/DeviceOff";
import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';


const DeviceMonitor = () => {


    return (
        <div><Header title="Device Monitor" />
            <MainMenu menu="devicemonitor" />
            <div class="app-content content" style={{ backgroundColor: "azure", minHeight: "36em" }} >
                <div class="content-overlay"></div>
                <div class="content-wrapper">
                    <div class="content-header row">
                    </div>
                    <div class="content-body">
                        {/* Dashboard Table Start */}
                        <div class="row match-height">
                            <div class="col-xl-4 col-12">
                                <CurrentlyWatching />
                            </div>
                            <div class="col-xl-4 col-12">
                                <TVOFF />
                            </div>
                            <div class="col-xl-4 col-12">
                                <DeviceOff />
                            </div>
                        </div>






                    </div>
                </div>

            </div>
        </div>


    )
}
export default DeviceMonitor;