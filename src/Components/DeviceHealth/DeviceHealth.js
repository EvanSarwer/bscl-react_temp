import React from 'react';

import Reliability from "./Reliability";
import UnknownForeign from "./UnknownForeign";
import BlackScreen from "./BlackScreen";
import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';


const DeviceHealth = () => {


    return (
        <div><Header title="Device Health" />
            <MainMenu menu="devicehealth" />
            <div class="app-content content" style={{ backgroundColor: "azure", minHeight: "36em" }} >
                <div class="content-overlay"></div>
                <div class="content-wrapper">
                    <div class="content-header row">
                    </div>
                    <div class="content-body">
                        {/* Dashboard Table Start */}
                        <div class="row match-height">
                            <div class="col-xl-4 col-12">
                                <Reliability />
                            </div>
                            <div class="col-xl-4 col-12">
                                <UnknownForeign />
                            </div>
                            <div class="col-xl-4 col-12">
                                <BlackScreen />
                            </div>
                        </div>






                    </div>
                </div>

            </div>
        </div>


    )
}
export default DeviceHealth;