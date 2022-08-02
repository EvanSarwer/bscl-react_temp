import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

const MainMenu = (props) => {


    return (
        // <!-- BEGIN: Main Menu-->

        <div class="main-menu menu-fixed menu-light menu-accordion    menu-shadow " data-scroll-to-active="true">
            <div class="main-menu-content" style={{ "overflow-x": "hidden" }}>
                <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">


                    {(() => {
                        if (props.menu === "dashboard") {
                            return (
                                <li class="active nav-item"><a href="/"><i class="la la-home"></i><span class="menu-title" data-i18n="Dashboard">Dashboard</span><span class="badge badge badge-info badge-pill float-right mr-2"></span></a>
                                </li>
                            )
                        } else {
                            return (
                                <li class=" nav-item"><a href="/"><i class="la la-home"></i><span class="menu-title" data-i18n="Dashboard">Dashboard</span><span class="badge badge badge-info badge-pill float-right mr-2"></span></a>
                                </li>
                            )
                        }
                    })()}

                    {(() => {
                        if (props.menu === "basicreports") {
                            return (
                                <li class="active nav-item"><a href="/overview"><i class="la la-history"></i><span class="menu-title" data-i18n="Templates">Basic Reports</span></a>
                                </li>
                            )
                        } else {
                            return (
                                <li class=" nav-item"><a href="/overview"><i class="la la-history"></i><span class="menu-title" data-i18n="Templates">Basic Reports</span></a>
                                </li>
                            )
                        }
                    })()}


                    {(() => {
                        if (props.menu === "livechannels") {
                            return (
                                <li class="active nav-item"><a href="/livechannels"><i class="la la-tencent-weibo"></i><span class="menu-title" data-i18n="Templates">Live Channels</span></a>
                                </li>
                            )
                        } else {
                            return (
                                <li class=" nav-item"><a href="/livechannels"><i class="la la-tencent-weibo"></i><span class="menu-title" data-i18n="Templates">Live Channels</span></a>
                                </li>
                            )
                        }
                    })()}



                    <li class=" nav-item"><a  ><i class="la la-user"></i><span class="menu-title" data-i18n="Dashboard">Audience Profiles</span><span class="badge badge badge-info badge-pill float-right mr-2"></span></a>
                        {/* <div id="usermenu"></div> */}
                        <div id="usermenu">
                            <ul class="menu-content">

                                {(() => {
                                    if (props.menu === "audiencegeneral") {
                                        return (
                                            <li class="active" ><a class="menu-item" href="/userstatus"><i></i><span data-i18n="Crypto">General</span></a>
                                            </li>
                                        )
                                    } else {
                                        return (
                                            <li><a class="menu-item" href="/userstatus"><i></i><span data-i18n="Crypto">General</span></a>
                                            </li>
                                        )
                                    }
                                })()}

                                {(() => {
                                    if (props.menu === "audiencedefined") {
                                        return (
                                            <li class="active"><a class="menu-item" href="/userdefined"><i></i><span data-i18n="Crypto">User Defined</span></a>
                                            </li>
                                        )
                                    } else {
                                        return (
                                            <li><a class="menu-item" href="/userdefined"><i></i><span data-i18n="Crypto">User Defined</span></a>
                                            </li>
                                        )
                                    }
                                })()}

                                {(() => {
                                    if (props.menu === "viewlogs") {
                                        return (
                                            <li class="active"><a class="menu-item" href="/logs"><i></i><span data-i18n="Crypto">View Logs</span></a>
                                            </li>
                                        )
                                    } else {
                                        return (
                                            <li><a class="menu-item" href="/logs"><i></i><span data-i18n="Crypto">View Logs</span></a>
                                            </li>
                                        )
                                    }
                                })()}

                            </ul>
                        </div>

                    </li>
                    <li class=" nav-item"><a  ><i class="la la-television"></i><span class="menu-title" data-i18n="Templates">Trend Analysis</span></a>
                        <div>
                            <ul class="menu-content">

                                {(() => {
                                    if (props.menu === "trendgeneral") {
                                        return (
                                            <li class="active"><a class="menu-item" href="/channelstatus"><i></i><span data-i18n="Crypto">General</span></a>
                                            </li>
                                        )
                                    } else {
                                        return (
                                            <li><a class="menu-item" href="/channelstatus"><i></i><span data-i18n="Crypto">General</span></a>
                                            </li>
                                        )
                                    }
                                })()}

                                {(() => {
                                    if (props.menu === "trenddaypart") {
                                        return (
                                            <li class="active"><a class="menu-item" href="/definedchannelstatus"><i></i><span data-i18n="Crypto">Day Parts</span></a>
                                            </li>
                                        )
                                    } else {
                                        return (
                                            <li><a class="menu-item" href="/definedchannelstatus"><i></i><span data-i18n="Crypto">Day Parts</span></a>
                                            </li>
                                        )
                                    }
                                })()}





                            </ul>
                        </div>
                    </li>

                    {(() => {
                        if (props.menu === "reportgeneration") {
                            return (
                                <li class="active nav-item"><a href="/downloadreport"><i class="la la-download"></i><span class="menu-title" data-i18n="Templates">Report Generation</span></a>
                                </li>
                            )
                        } else {
                            return (
                                <li class=" nav-item"><a href="/downloadreport"><i class="la la-download"></i><span class="menu-title" data-i18n="Templates">Report Generation</span></a>
                                </li>
                            )
                        }
                    })()}

                    {(() => {
                        if (props.menu === "devicemonitor") {
                            return (
                                <li class="active nav-item"><a href="/devicemonitor"><i class="la la-cogs"></i><span class="menu-title" data-i18n="Templates">Device Monitor</span></a>
                                </li>
                            )
                        } else {
                            return (
                                <li class=" nav-item"><a href="/devicemonitor"><i class="la la-cogs"></i><span class="menu-title" data-i18n="Templates">Device Monitor</span></a>
                                </li>
                            )
                        }
                    })()}

                    {(() => {
                        if (props.menu === "deviceusers") {
                            return (
                                <li class="active nav-item"><a href="/device/users"><i class="la la-street-view"></i><span class="menu-title" data-i18n="Templates">Device Users</span></a>
                                </li>
                            )
                        } else {
                            return (
                                <li class=" nav-item"><a href="/device/users"><i class="la la-street-view"></i><span class="menu-title" data-i18n="Templates">Device Users</span></a>
                                </li>
                            )
                        }
                    })()}

                    {(() => {
                        if (props.menu === "appusers") {
                            return (
                                <li class="active nav-item"><a href="/app/users"><i class="la la-users"></i><span class="menu-title" data-i18n="Templates">App Users</span></a>
                                </li>
                            )
                        } else {
                            return (
                                <li class=" nav-item"><a href="/app/users"><i class="la la-users"></i><span class="menu-title" data-i18n="Templates">App Users</span></a>
                                </li>
                            )
                        }
                    })()}




                </ul>
            </div>
        </div>



    )
}
export default MainMenu;