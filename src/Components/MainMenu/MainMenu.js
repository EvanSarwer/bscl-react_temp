import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import { useState, useEffect } from "react";

const MainMenu = (props) => {
    const cookies = new Cookies();
console.log(cookies.get('_role'));
    return (
        // <!-- BEGIN: Main Menu-->

        <div class="main-menu menu-fixed menu-light menu-accordion    menu-shadow " data-scroll-to-active="true">
            <div class="main-menu-content" style={{ "overflow-x": "hidden" }}>
                <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">


                    {(() => {
                        if (cookies.get('_role') === "admin" ||cookies.get('_role') === "operator" || cookies.get('_role') === "general" || cookies.get('_role') === "add-agency") {
                            if (props.menu === "dashboard") {
                                return (
                                    <li class="active nav-item"><Link to="/"><i class="la la-home"></i><span class="menu-title" data-i18n="Dashboard">Dashboard</span><span class="badge badge badge-info badge-pill float-right mr-2"></span></Link>
                                    </li>
                                )
                            } else {
                                return (
                                    <li class=" nav-item"><Link to="/"><i class="la la-home"></i><span class="menu-title" data-i18n="Dashboard">Dashboard</span><span class="badge badge badge-info badge-pill float-right mr-2"></span></Link>
                                    </li>
                                )
                            }
                        }

                    })()}

                    {(() => {
                        if (cookies.get('_role') === "admin"||cookies.get('_role') === "operator" || cookies.get('_role') === "general" || cookies.get('_role') === "add-agency") {
                            if (props.menu === "basicreports") {
                                return (
                                    <li class="active nav-item"><Link to="/overview"><i class="la la-history"></i><span class="menu-title" data-i18n="Templates">Basic Reports</span></Link>
                                    </li>
                                )
                            } else {
                                return (
                                    <li class=" nav-item"><a href="/overview"><i class="la la-history"></i><span class="menu-title" data-i18n="Templates">Basic Reports</span></a>
                                    </li>
                                )
                            }
                        }
                    })()}

                    {(() => {
                        if (cookies.get('_role') === "admin" || cookies.get('_role') === "operator" || cookies.get('_role') === "general" || cookies.get('_role') === "add-agency") {
                            return (
                                <li class="nav-item"><Link to="https://tvr.bscl.gov.bd:8443/" target="_blank" ><i class="la la-sliders"></i><span class="menu-title" data-i18n="Templates">Media Analysis</span></Link>
                                </li>
                            )
                        }
                    })()}


                    {(() => {
                        if (cookies.get('_role') === "admin"||cookies.get('_role') === "operator" || cookies.get('_role') === "general" || cookies.get('_role') === "add-agency") {
                            if (props.menu === "livechannels") {
                                return (
                                    <li class="active nav-item"><Link to="/livechannels"><i class="la la-tencent-weibo"></i><span class="menu-title" data-i18n="Templates">Live Channels</span></Link>
                                    </li>
                                )
                            } else {
                                return (
                                    <li class="nav-item"><a href="/livechannels"><i class="la la-tencent-weibo"></i><span class="menu-title" data-i18n="Templates">Live Channels</span></a>
                                    </li>
                                )
                            }
                        }
                    })()}


                    {(() => {
                        if (cookies.get('_role') === "admin") {
                            if (props.menu === "LiveDevices") {
                                return (
                                    <li class="active nav-item"><Link to="/LiveDevices"><i class="la la-tencent-weibo"></i><span class="menu-title" data-i18n="Templates">Live Devices</span></Link>
                                    </li>
                                )
                            } else {
                                return (
                                    <li class="nav-item"><a href="/LiveDevices"><i class="la la-tencent-weibo"></i><span class="menu-title" data-i18n="Templates">Live Devices</span></a>
                                    </li>
                                )
                            }
                        }
                    })()}



                    {(() => {
                        if (cookies.get('_role') === "admin"||cookies.get('_role') === "operator") {
                            return <li class=" nav-item"><a  ><i class="la la-user"></i><span class="menu-title" data-i18n="Dashboard">Audience Profiles</span><span class="badge badge badge-info badge-pill float-right mr-2"></span></a>
                                {/* <div id="usermenu"></div> */}
                                <div id="usermenu">
                                    <ul class="menu-content">

                                        {(() => {
                                            if (cookies.get('_role') === "admin"||cookies.get('_role') === "operator") {
                                                if (props.menu === "audiencegeneral") {
                                                    return (
                                                        <li class="active" ><Link class="menu-item" to="/userstatus"><i></i><span data-i18n="Crypto">General</span></Link>
                                                        </li>
                                                    )
                                                } else {
                                                    return (
                                                        <li><Link class="menu-item" to="/userstatus"><i></i><span data-i18n="Crypto">General</span></Link>
                                                        </li>
                                                    )
                                                }
                                            }
                                        })()}

                                        {(() => {
                                            if (cookies.get('_role') === "admin"||cookies.get('_role') === "operator") {
                                                if (props.menu === "audiencedefined") {
                                                    return (
                                                        <li class="active"><Link class="menu-item" to="/userdefined"><i></i><span data-i18n="Crypto">User Defined</span></Link>
                                                        </li>
                                                    )
                                                } else {
                                                    return (
                                                        <li><Link class="menu-item" to="/userdefined"><i></i><span data-i18n="Crypto">User Defined</span></Link>
                                                        </li>
                                                    )
                                                }
                                            }
                                        })()}

                                        {(() => {
                                            if (cookies.get('_role') === "admin"||cookies.get('_role') === "operator") {
                                                if (props.menu === "viewlogs") {
                                                    return (
                                                        <li class="active"><Link class="menu-item" to="/logs"><i></i><span data-i18n="Crypto">View Logs</span></Link>
                                                        </li>
                                                    )
                                                } else {
                                                    return (
                                                        <li><Link class="menu-item" to="/logs"><i></i><span data-i18n="Crypto">View Logs</span></Link>
                                                        </li>
                                                    )
                                                }
                                            }
                                        })()}

                                    </ul>
                                </div>

                            </li>
                        }
                    })()}

                    {(() => {
                        if (cookies.get('_role') === "admin"||cookies.get('_role') === "operator" || cookies.get('_role') === "general" || cookies.get('_role') === "add-agency") {
                            return <li class=" nav-item"><a  ><i class="la la-television"></i><span class="menu-title" data-i18n="Templates">Trend Analysis</span></a>
                                <div>
                                    <ul class="menu-content">

                                        {(() => {
                                            if (cookies.get('_role') === "admin"||cookies.get('_role') === "operator" || cookies.get('_role') === "general" || cookies.get('_role') === "add-agency") {
                                                if (props.menu === "trendgeneral") {
                                                    return (
                                                        <li class="active"><Link class="menu-item" to="/channelstatus"><i></i><span data-i18n="Crypto">General</span></Link>
                                                        </li>
                                                    )
                                                } else {
                                                    return (
                                                        <li><Link class="menu-item" to="/channelstatus"><i></i><span data-i18n="Crypto">General</span></Link>
                                                        </li>
                                                    )
                                                }
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
{/* 
                                        {(() => {
                                            if (cookies.get('_role') === "admin" ||cookies.get('_role') === "operator" || cookies.get('_role') === "general" || cookies.get('_role') === "add-agency") {
                                                if (props.menu === "daytrendranged") {
                                                    return (
                                                        <li class="active"><Link class="menu-item" to="/dayrangedchannelstatus"><i></i><span data-i18n="Crypto">Day-Ranged</span></Link>
                                                        </li>
                                                    )
                                                } else {
                                                    return (
                                                        <li><Link class="menu-item" to="/dayrangedchannelstatus"><i></i><span data-i18n="Crypto">Day-Ranged</span></Link>
                                                        </li>
                                                    )
                                                }
                                            }
                                        })()} */}

                                        {(() => {
                                            if (cookies.get('_role') === "admin" ||cookies.get('_role') === "operator" || cookies.get('_role') === "general" || cookies.get('_role') === "add-agency") {
                                                if (props.menu === "trenddaypart") {
                                                    return (
                                                        <li class="active"><Link class="menu-item" to="/definedchannelstatus"><i></i><span data-i18n="Crypto">Day Parts</span></Link>
                                                        </li>
                                                    )
                                                } else {
                                                    return (
                                                        <li><Link class="menu-item" to="/definedchannelstatus"><i></i><span data-i18n="Crypto">Day Parts</span></Link>
                                                        </li>
                                                    )
                                                }
                                            }
                                        })()}





                                    </ul>
                                </div>
                            </li>
                        }
                    })()}
{/* 
                    {(() => {
                        if (cookies.get('_role') === "admin"||cookies.get('_role') === "operator" || cookies.get('_role') === "general" || cookies.get('_role') === "add-agency") {
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
                        }
                    })()} */}

                    {(() => {
                        if (cookies.get('_role') === "admin"||cookies.get('_role') === "operator" || cookies.get('_role') === "deployer") {
                            if (props.menu === "devicemonitor") {
                                return (
                                    <li class="active nav-item"><Link to="/devicemonitor"><i class="la la-cogs"></i><span class="menu-title" data-i18n="Templates">Device Monitor</span></Link>
                                    </li>
                                )
                            } else {
                                return (
                                    <li class=" nav-item"><Link to="/devicemonitor"><i class="la la-cogs"></i><span class="menu-title" data-i18n="Templates">Device Monitor</span></Link>
                                    </li>
                                )
                            }
                        }
                    })()}

                    {(() => {
                        if (cookies.get('_role') === "admin"||cookies.get('_role') === "operator") {
                            if (props.menu === "devicehealth") {
                                return (
                                    <li class="active nav-item"><Link to="/devicehealth"><i class="la la-cogs"></i><span class="menu-title" data-i18n="Templates">Device Health</span></Link>
                                    </li>
                                )
                            } else {
                                return (
                                    <li class=" nav-item"><Link to="/devicehealth"><i class="la la-cogs"></i><span class="menu-title" data-i18n="Templates">Device Health</span></Link>
                                    </li>
                                )
                            }
                        }
                    })()}



                    {(() => { 
                        if (cookies.get('_role') === "admin"|| cookies.get('_role') === "deployer") {
                            if (props.menu === "device") {
                                return (
                                    <li class="active nav-item"><Link to="/device"><i class="la la-street-view"></i><span class="menu-title" data-i18n="Templates">Devices</span></Link>
                                    </li>
                                )
                            } else {
                                return (
                                    <li class=" nav-item"><Link to="/device"><i class="la la-street-view"></i><span class="menu-title" data-i18n="Templates">Devices</span></Link>
                                    </li>
                                )
                            }
                        }
                    })()}

                    {(() => {
                        if (cookies.get('_role') === "admin") {
                            if (props.menu === "appusers") {
                                return (
                                    <li class="active nav-item"><Link to="/app/users"><i class="la la-users"></i><span class="menu-title" data-i18n="Templates">App Users</span></Link>
                                    </li>
                                )
                            } else {
                                return (
                                    <li class=" nav-item"><Link to="/app/users"><i class="la la-users"></i><span class="menu-title" data-i18n="Templates">App Users</span></Link>
                                    </li>
                                )
                            }
                        }
                    })()}
                    {/* {(() => {
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
                    })()} */}
{/*                     
                    {(() => {
                        if (cookies.get('_role') === "admin"||cookies.get('_role') === "operator" || cookies.get('_role') === "general" || cookies.get('_role') === "add-agency") {
                            if (props.menu === "programtrp") {
                                return (
                                    <li class="active nav-item"><Link to="/programtrp"><i class="la la-download"></i><span class="menu-title" data-i18n="Templates">Program Trp</span></Link>
                                    </li>
                                )
                            } else {
                                return (
                                    <li class=" nav-item"><Link to="/programtrp"><i class="la la-download"></i><span class="menu-title" data-i18n="Templates">Program Trp</span></Link>
                                    </li>
                                )
                            }
                        }
                    })()} */}
                    {/* {(() => {
                        if (props.menu === "adtrpv1") {
                            return (
                                <li class="active nav-item"><a href="/adtrpv1"><i class="la la-download"></i><span class="menu-title" data-i18n="Templates">Ad Trp v1</span></a>
                                </li>
                            )
                        } else {
                            return (
                                <li class=" nav-item"><a href="/adtrpv1"><i class="la la-download"></i><span class="menu-title" data-i18n="Templates">Ad Trp v1</span></a>
                                </li>
                            )
                        }
                    })()} */}
                    {/* {(() => {
                        if (cookies.get('_role') === "admin"||cookies.get('_role') === "operator" || cookies.get('_role') === "add-agency") {
                            if (props.menu === "dailyadtrp") {
                                return (
                                    <li class="active nav-item"><Link to="/dailyadtrp"><i class="la la-download"></i><span class="menu-title" data-i18n="Templates">Ad Trp</span></Link>
                                    </li>
                                )
                            } else {
                                return (
                                    <li class=" nav-item"><Link to="/dailyadtrp"><i class="la la-download"></i><span class="menu-title" data-i18n="Templates">Ad Trp</span></Link>
                                    </li>
                                )
                            }
                        }
                    })()} */}
                    {/* {(() => {
                        if (props.menu === "adtrpv2") {
                            return (
                                <li class="active nav-item"><a href="/adtrpv2"><i class="la la-download"></i><span class="menu-title" data-i18n="Templates">Ad Trp v2</span></a>
                                </li>
                            )
                        } else {
                            return (
                                <li class=" nav-item"><a href="/adtrpv2"><i class="la la-download"></i><span class="menu-title" data-i18n="Templates">Ad Trp v2</span></a>
                                </li>
                            )
                        }
                    })()} */}
                    {(() => {
                        if (cookies.get('_role') === "admin") {
                            if (props.menu === "adlogupload") {
                                return (
                                    <li class="active nav-item"><Link to="/adlogupload"><i class="la la-upload"></i><span class="menu-title" data-i18n="Templates">Ad Log Upload</span></Link>
                                    </li>
                                )
                            } else {
                                return (
                                    <li class=" nav-item"><Link to="/adlogupload"><i class="la la-upload"></i><span class="menu-title" data-i18n="Templates">Ad Log Upload</span></Link>
                                    </li>
                                )
                            }
                        }
                    })()}
                    {(() => {
                        if (cookies.get('_role') === "admin") {
                            if (props.menu === "programlogupload") {
                                return (
                                    <li class="active nav-item"><Link to="/ProgramLogUpload"><i class="la la-upload"></i><span class="menu-title" data-i18n="Templates">Program Log Upload</span></Link>
                                    </li>
                                )
                            } else {
                                return (
                                    <li class=" nav-item"><Link to="/ProgramLogUpload"><i class="la la-upload"></i><span class="menu-title" data-i18n="Templates">Program Log Upload</span></Link>
                                    </li>
                                )
                            }
                        }
                    })()}

                    {(() => {
                        if (cookies.get('_role') === "admin"||cookies.get('_role') === "operator") {
                            if (props.menu === "userdatafilter") {
                                return (
                                    <li class="active nav-item"><Link to="/userdatafilter"><i class="la la-search-plus"></i><span class="menu-title" data-i18n="Templates">User Data Filter</span></Link>
                                    </li>
                                )
                            } else {
                                return (
                                    <li class=" nav-item"><Link to="/userdatafilter"><i class="la la-search-plus"></i><span class="menu-title" data-i18n="Templates">User Data Filter</span></Link>
                                    </li>
                                )
                            }
                        }
                    })()}

                    {(() => {
                        if (cookies.get('_role') === "admin"||cookies.get('_role') === "operator") {
                            if (props.menu === "datacleansing") {
                                return (
                                    <li class="active nav-item"><Link to="/datacleansing"><i class="la la-cut"></i><span class="menu-title" data-i18n="Templates">Data Cleansing</span></Link>
                                    </li>
                                )
                            } else {
                                return (
                                    <li class=" nav-item"><Link to="/datacleansing"><i class="la la-cut"></i><span class="menu-title" data-i18n="Templates">Data Cleansing</span></Link>
                                    </li>
                                )
                            }
                        }
                    })()}

                    {(() => {
                        if (cookies.get('_role') === "admin") {
                            if (props.menu === "passreset") {
                                return (
                                    <li class="active nav-item"><Link to="/user-passreset"><i class="la la-key"></i><span class="menu-title" data-i18n="Templates">Pass-Reset</span></Link>
                                    </li>
                                )
                            } else {
                                return (
                                    <li class=" nav-item"><Link to="/user-passreset"><i class="la la-key"></i><span class="menu-title" data-i18n="Templates">Pass-Reset</span></Link>
                                    </li>
                                )
                            }
                        }
                    })()}         



                </ul>
            </div>
        </div>



    )
}
export default MainMenu;
