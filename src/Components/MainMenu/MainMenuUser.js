import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

const MainMenuUser = (props) => {


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

                                {/* {(() => {
                                    if (props.menu === "trendranged") {
                                        return (
                                            <li class="active"><a class="menu-item" href="/rangedchannelstatus"><i></i><span data-i18n="Crypto">Ranged</span></a>
                                            </li>
                                        )
                                    } else {
                                        return (
                                            <li><a class="menu-item" href="/rangedchannelstatus"><i></i><span data-i18n="Crypto">Ranged</span></a>
                                            </li>
                                        )
                                    }
                                })()} */}

                                {(() => {
                                    if (props.menu === "daytrendranged") {
                                        return (
                                            <li class="active"><a class="menu-item" href="/dayrangedchannelstatus"><i></i><span data-i18n="Crypto">Day-Ranged</span></a>
                                            </li>
                                        )
                                    } else {
                                        return (
                                            <li><a class="menu-item" href="/dayrangedchannelstatus"><i></i><span data-i18n="Crypto">Day-Ranged</span></a>
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
                        if (props.menu === "excelreport") {
                            return (
                                <li class="active nav-item"><a href="/excelreport"><i class="la la-download"></i><span class="menu-title" data-i18n="Templates">Ad TRP</span></a>
                                </li>
                            )
                        } else {
                            return (
                                <li class=" nav-item"><a href="/excelreport"><i class="la la-download"></i><span class="menu-title" data-i18n="Templates">Ad TRP</span></a>
                                </li>
                            )
                        }
                    })()}







                </ul>
            </div>
        </div>



    )
}
export default MainMenuUser;