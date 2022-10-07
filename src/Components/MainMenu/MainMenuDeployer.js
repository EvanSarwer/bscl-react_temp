import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

const MainMenuDeployer = (props) => {


    return (
        // <!-- BEGIN: Main Menu-->

        <div class="main-menu menu-fixed menu-light menu-accordion    menu-shadow " data-scroll-to-active="true">
            <div class="main-menu-content" style={{ "overflow-x": "hidden" }}>
                <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">

                    {(() => {
                        if (props.menu === "device") {
                            return (
                                <li class="active nav-item"><a href="/device"><i class="la la-street-view"></i><span class="menu-title" data-i18n="Templates">Devices</span></a>
                                </li>
                            )
                        } else {
                            return (
                                <li class=" nav-item"><a href="/device"><i class="la la-street-view"></i><span class="menu-title" data-i18n="Templates">Devices</span></a>
                                </li>
                            )
                        }
                    })()}



                </ul>
            </div>
        </div>



    )
}
export default MainMenuDeployer;