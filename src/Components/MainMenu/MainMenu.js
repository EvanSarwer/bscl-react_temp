import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

const MainMenu = () => {

    // const open_channel_menu = () => {
    //     if (document.querySelector("#channelmenu").innerHTML == "") {

    //         document.querySelector("#channelmenu").innerHTML = `<ul class="menu-content">
    //         <li><a class="menu-item" href="/channelstatus"><i></i><span data-i18n="Crypto">General</span></a>
    //         </li>
    //         <li><a class="menu-item" href="/definedchannelstatus"><i></i><span data-i18n="Crypto">User Defined</span></a>
    //         </li>
    //     </ul>`
    //     }
    //     else {
    //         document.querySelector("#channelmenu").innerHTML = "";
    //     }

    // }

    // const open_user_menu = () => {
    //     if (document.querySelector("#usermenu").innerHTML == "") {

    //         document.querySelector("#usermenu").innerHTML = `<ul class="menu-content">
    //         <li><a class="menu-item" href="/userstatus"><i></i><span data-i18n="Crypto">General</span></a>
    //         </li>
    //         <li><a class="menu-item" href="/userdefined"><i></i><span data-i18n="Crypto">User Defined</span></a>
    //         </li>
    //     </ul>`
    //     }
    //     else {
    //         document.querySelector("#usermenu").innerHTML = "";
    //     }

    // }
    return (
        // <!-- BEGIN: Main Menu-->

        <div class="main-menu menu-fixed menu-light menu-accordion    menu-shadow " data-scroll-to-active="true">
            <div class="main-menu-content" style={{"overflow-x":"hidden"}}>
                <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
                    <li class=" nav-item"><a href="/"><i class="la la-home"></i><span class="menu-title" data-i18n="Dashboard">Dashboard</span><span class="badge badge badge-info badge-pill float-right mr-2"></span></a>
                    </li>
                    <li class=" nav-item"><a href="/overview"><i class="la la-history"></i><span class="menu-title" data-i18n="Templates">Basic Reports</span></a>
                    </li>
                    <li class=" nav-item"><a href="/livechannels"><i class="la la-tencent-weibo"></i><span class="menu-title" data-i18n="Templates">Live Channels</span></a>
                    </li>
    
                    <li class=" nav-item"><a  ><i class="la la-user"></i><span class="menu-title" data-i18n="Dashboard">Audience Profiles</span><span class="badge badge badge-info badge-pill float-right mr-2"></span></a>
                        {/* <div id="usermenu"></div> */}
                        <div id="usermenu">
                            <ul class="menu-content">
                                <li><a class="menu-item" href="/userstatus"><i></i><span data-i18n="Crypto">General</span></a>
                                </li>
                                <li><a class="menu-item" href="/userdefined"><i></i><span data-i18n="Crypto">User Defined</span></a>
                                </li>
                                <li><a class="menu-item" href="/logs"><i></i><span data-i18n="Crypto">View Logs</span></a>
                                </li>
                            </ul>
                        </div>

                    </li>
                    <li class=" nav-item"><a  ><i class="la la-television"></i><span class="menu-title" data-i18n="Templates">Trend Analysis</span></a>
                        <div>
                            <ul class="menu-content">
                                <li><a class="menu-item" href="/channelstatus"><i></i><span data-i18n="Crypto">General</span></a>
                                </li>
                                <li><a class="menu-item" href="/definedchannelstatus"><i></i><span data-i18n="Crypto">Day Parts</span></a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class=" nav-item"><a href="/downloadreport"><i class="la la-download"></i><span class="menu-title" data-i18n="Templates">Report Generation</span></a>
                    </li>
                    <li class=" nav-item"><a href="/devicemonitor"><i class="la la-cogs"></i><span class="menu-title" data-i18n="Templates">Device Monitor</span></a>
                    </li>
                    <li class=" nav-item"><a href="/app/users"><i class="la la-users"></i><span class="menu-title" data-i18n="Templates">App users</span></a>
                    </li>
                </ul>
            </div>
        </div>



    )
}
export default MainMenu;