import axiosConfig from '../axiosConfig';
import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';


const Header = (props) => {
    const cookies = new Cookies();
    const [notifyData, setNotifyData] = useState([]);
    const [notifyNumber, setNotifyNumber] = useState("");


    const getData = () => {
        axiosConfig.get("/dashboard/notification").then(rsp => {
            setNotifyNumber(rsp.data.notifyNumber)
            setNotifyData(rsp.data.data);
        }).catch(err => {

        });
    }
    useEffect(() => {
        getData();
        const interval = setInterval(() => { getData() }, 600000);

        return () => clearInterval(interval);
    }, []);


    const Seen = () => {

        axiosConfig.get("/dashboard/seennotification").then(rsp => {

        }).catch(err => {

        });

        axiosConfig.get("/dashboard/notification").then(rsp => {
            setNotifyNumber(rsp.data.notifyNumber)
            setNotifyData(rsp.data.data);
        }).catch(err => {

        });
    }


    console.log(notifyData);



    var logout = () => {
        axiosConfig.get("/logout").then((rsp) => {
            //localStorage.clear();
            cookies.remove('_authToken');
            cookies.remove('_role');
            cookies.remove('username');
            window.open("/", "_self");
        }, (err) => {

        });

    }
    return (
        // <!-- BEGIN: Header-->
        <nav class="header-navbar navbar-expand-md navbar navbar-with-menu navbar-without-dd-arrow fixed-top navbar-semi-light bg-info navbar-shadow">
            <div class="navbar-wrapper">
                <div class="navbar-header">
                    <ul class="nav navbar-nav flex-row">
                        <li class="nav-item mobile-menu d-md-none mr-auto"><a class="nav-link nav-menu-main menu-toggle hidden-xs" href="#"><i class="ft-menu font-large-1"></i></a></li>
                        <li class="nav-item"><a class="navbar-brand" href="/">&nbsp;&nbsp;&nbsp;<img class="brand-logo" alt="modern admin logo" style={{ zoom: "1.7" }} src="../../../app-assets/images/logo/bscl-logo.png"></img>
                            <h3 class="brand-text">BSCL</h3>
                        </a></li>
                        <li class="nav-item d-md-none"><a class="nav-link open-navbar-container" data-toggle="collapse" data-target="#navbar-mobile"><i class="la la-ellipsis-v"></i></a></li>
                    </ul>
                </div>
                <div class="navbar-container content">
                    <div class="collapse navbar-collapse" id="navbar-mobile">
                        <ul class="nav navbar-nav mr-auto float-left">
                            <li class="nav-item d-none d-md-block"><a class="nav-link nav-menu-main menu-toggle hidden-xs" href="#"><i class="ft-menu"></i></a></li>
                            {/* <li class="nav-item d-none d-lg-block"><a class="nav-link nav-link-expand" href="#"><i class="ficon ft-maximize"></i></a></li> */}
                            <li class="dropdown nav-item mega-dropdown d-none d-lg-block"><a class="dropdown-toggle nav-link" href="#" data-toggle="dropdown">Menu</a>
                                <ul class="mega-dropdown-menu dropdown-menu row p-1">
                                    <li class="col-md bg-mega p-2">
                                        <h5 class="text-white mb-1 font-weight-bold">Bangladesh Satellite Company, Ltd</h5>
                                        <p class="text-white line-height-2">BSCL is a state owned company operating the Bangabandhu-1 satellite, named after the father of the nation, Bangabandhu Sheikh Mujibur Rahman.</p>
                                        <a href="http://www.bscl.gov.bd/" class="btn btn-outline-white" target="_blank">Learn More</a>
                                    </li>
                                    <li class="col-md px-2">
                                        <h6 class="font-weight-bold font-medium-2 ml-1">Admin Panel</h6>
                                        <ul class="row mt-2">
                                            <li class="col-6 col-xl-4"><a class="text-center mb-2 mb-xl-3" href="/overview" target="_blank"><i class="la la-history font-large-1 mr-0"></i>
                                                <p class="font-medium-2 mt-25 mb-0">Basic Reports</p>
                                            </a></li>
                                            <li class="col-6 col-xl-4"><a class="text-center mb-2 mb-xl-3" href="/userdefined" target="_blank"><i class="la la-user font-large-1 mr-0"></i>
                                                <p class="font-medium-2 mt-25 mb-0">User</p>
                                            </a></li>
                                            <li class="col-6 col-xl-4"><a class="text-center mb-2 mb-xl-3 mt-75 mt-xl-0" href="/definedchannelstatus" target="_blank"><i class="la la-television font-large-1 mr-0"></i>
                                                <p class="font-medium-2 mt-25 mb-0">Trend Analysis</p>
                                            </a></li>
                                            <li class="col-6 col-xl-4"><a class="text-center mb-2 mt-75 mt-xl-0" href="/livechannels" target="_blank"><i class="la la-tencent-weibo font-large-1 mr-0"></i>
                                                <p class="font-medium-2 mt-25 mb-50">Live Channels</p>
                                            </a></li>
                                            <li class="col-6 col-xl-4"><a class="text-center mb-2 mt-75 mt-xl-0" href="/downloadreport" target="_blank"><i class="la la-download font-large-1 mr-0"></i>
                                                <p class="font-medium-2 mt-25 mb-50">Report Generation</p>
                                            </a></li>
                                            <li class="col-6 col-xl-4"><a class="text-center mb-2 mt-75 mt-xl-0" href="/devicemonitor" target="_blank"><i class="la la-cogs font-large-1 mr-0"></i>
                                                <p class="font-medium-2 mt-25 mb-50">Device Monitor</p>
                                            </a></li>
                                        </ul>
                                    </li>
                                    {/* <li class="col-md-3">
                                        <h6 class="font-weight-bold font-medium-2">Profile</h6>
                                        <ul class="row mt-1 mt-xl-2">
                                            <li class="col-12 col-xl-6 pl-0">
                                                <ul class="mega-component-list">
                                                    <li class="mega-component-item"><a class="mb-1 mb-xl-2" href="component-alerts.html" target="_blank">FAQ</a></li>
                                                    <li class="mega-component-item"><a class="mb-1 mb-xl-2" href="component-callout.html" target="_blank">About Us</a></li>
                                                    <li class="mega-component-item"><a class="mb-1 mb-xl-2" href="component-buttons-basic.html" target="_blank">FAQ</a></li>
                                                <li class="mega-component-item"><a class="mb-1 mb-xl-2" href="component-carousel.html" target="_blank">Contact Us</a></li>
                                                </ul>
                                            </li>
                                            <li class="col-12 col-xl-6 pl-0">
                                                <ul class="mega-component-list">
                                                    <li class="mega-component-item"><a class="mb-1 mb-xl-2" href="component-dropdowns.html" target="_blank">Support</a></li>
                                                    <li class="mega-component-item"><a class="mb-1 mb-xl-2" href="component-list-group.html" target="_blank">Contact Us</a></li>
                                                    <li class="mega-component-item"><a class="mb-1 mb-xl-2" href="component-modals.html" target="_blank">Modals</a></li>
                                                <li class="mega-component-item"><a class="mb-1 mb-xl-2" href="component-pagination.html" target="_blank">Pagination</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li> */}
                                </ul>
                            </li>
                            {/* <li class="nav-item nav-search"><a class="nav-link nav-link-search" href="#"><i class="ficon ft-search"></i></a>
                                <div class="search-input">
                                    <input class="input" type="text" placeholder="Explore Modern..." tabindex="0" data-search="template-list"></input>
                                    <div class="search-input-close"><i class="ft-x"></i></div>
                                    <ul class="search-list"></ul>
                                </div>
                            </li> */}
                        </ul>


                        <ul class="nav navbar-nav mr-auto text-center">
                            <span class="h4 font-weight-bold">{props.title}</span>
                        </ul>




                        <ul class="nav navbar-nav float-right">


                            {/* <li class="dropdown dropdown-language nav-item"><a class="dropdown-toggle nav-link" id="dropdown-flag" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="flag-icon flag-icon-bd"></i><span class="selected-language"></span></a>
                                <div class="dropdown-menu" aria-labelledby="dropdown-flag"><a class="dropdown-item" href="#" data-language="en"><i class="flag-icon flag-icon-us"></i> English</a><a class="dropdown-item" href="#" data-language="fr"><i class="flag-icon flag-icon-fr"></i> French</a><a class="dropdown-item" href="#" data-language="pt"><i class="flag-icon flag-icon-pt"></i> Portuguese</a><a class="dropdown-item" href="#" data-language="de"><i class="flag-icon flag-icon-de"></i> German</a></div>
                            </li> */}

                            {cookies.get('_role') === "admin" &&
                                <li class="dropdown dropdown-notification nav-item"><a class="nav-link nav-link-label" href="#" data-toggle="dropdown"><i class="ficon ft-bell"></i>
                                    {(() => {
                                        if (notifyNumber > 0) {
                                            return <span class="badge badge-pill badge-danger badge-up badge-glow">{notifyNumber}</span>
                                        } else {
                                            return null;

                                        }
                                    })()}
                                </a>
                                    <ul class="dropdown-menu dropdown-menu-media dropdown-menu-right">
                                        <li class="dropdown-menu-header">
                                            <h6 class="dropdown-header m-0"><span class="grey darken-2">Notifications</span></h6>
                                                {(() => {
                                                    if (notifyNumber > 0) {
                                                        return <span type="button" onClick={Seen} class="btn notification-tag badge badge-danger float-right m-0"><i class="la la-eye-slash la-lg" style={{ fontSize: '20px' }}></i></span>
                                                    } else {
                                                        return <span class="notification-tag badge badge-danger float-right m-0"><i class="la la-eye la-lg" style={{ fontSize: '20px' }}></i></span>
                                                    }
                                                })()}
                                            
                                        </li>
                                        <li class="scrollable-container media-list w-100" style={{ overflowY: "overlay" }}>

                                            {notifyData.map((notify) => {
                                                if (notify.flag === 1) {
                                                    if (notify.status === "unseen") {
                                                        return <a href="javascript:void(0)">
                                                            <div class="media">
                                                                <div class="media-left align-self-center"><i class="ft-plus-square icon-bg-circle bg-cyan mr-0"></i></div>
                                                                <div class="media-body">
                                                                    <h6 class="media-heading font-weight-bold">Device Connection!</h6>
                                                                    <p class="notification-text font-small-3 text-muted font-weight-bold"><span class="text-warning ">{notify.du_name}</span> {notify.details}</p><small>
                                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">{notify.created_at}</time></small>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    } else {
                                                        return <a href="javascript:void(0)">
                                                            <div class="media">
                                                                <div class="media-left align-self-center"><i class="ft-plus-square icon-bg-circle bg-cyan mr-0"></i></div>
                                                                <div class="media-body">
                                                                    <h6 class="media-heading">Device Connection!</h6>
                                                                    <p class="notification-text font-small-3 text-muted"><span class="text-warning ">{notify.du_name}</span> {notify.details}</p><small>
                                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">{notify.created_at}</time></small>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    }

                                                } else if (notify.flag === 2) {
                                                    if (notify.status === "unseen") {
                                                        return <a href="javascript:void(0)">
                                                            <div class="media">
                                                                <div class="media-left align-self-center"><i class="ft-download-cloud icon-bg-circle bg-red bg-darken-1 mr-0"></i></div>
                                                                <div class="media-body">
                                                                    <h6 class="media-heading red darken-1 font-weight-bold">Device Offline</h6>
                                                                    <p class="notification-text font-small-3 text-muted font-weight-bold"><span class="text-warning ">{notify.du_name}</span> {notify.details}</p><small>
                                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">{notify.created_at}</time></small>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    } else {
                                                        return <a href="javascript:void(0)">
                                                            <div class="media">
                                                                <div class="media-left align-self-center"><i class="ft-download-cloud icon-bg-circle bg-red bg-darken-1 mr-0"></i></div>
                                                                <div class="media-body">
                                                                    <h6 class="media-heading red darken-1">Device Offline</h6>
                                                                    <p class="notification-text font-small-3 text-muted"><span class="text-warning ">{notify.du_name}</span> {notify.details}</p><small>
                                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">{notify.created_at}</time></small>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    }


                                                } else if (notify.flag === 3) {
                                                    if (notify.status === "unseen") {
                                                        return <a href="javascript:void(0)">
                                                            <div class="media">
                                                                <div class="media-left align-self-center"><i class="ft-alert-triangle icon-bg-circle bg-yellow bg-darken-3 mr-0"></i></div>
                                                                <div class="media-body">
                                                                    <h6 class="media-heading yellow darken-3 font-weight-bold">Warning Temperature</h6>
                                                                    <p class="notification-text font-small-3 text-muted font-weight-bold"><span class="text-warning ">{notify.du_name}</span> {notify.details} </p><small>
                                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">{notify.created_at}</time></small>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    } else {
                                                        return <a href="javascript:void(0)">
                                                            <div class="media">
                                                                <div class="media-left align-self-center"><i class="ft-alert-triangle icon-bg-circle bg-yellow bg-darken-3 mr-0"></i></div>
                                                                <div class="media-body">
                                                                    <h6 class="media-heading yellow darken-3">Warning Temperature</h6>
                                                                    <p class="notification-text font-small-3 text-muted"><span class="text-warning ">{notify.du_name}</span> {notify.details} </p><small>
                                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">{notify.created_at}</time></small>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    }

                                                }

                                                else if (notify.flag === 4) {
                                                    if (notify.status === "unseen") {
                                                        return <a href="javascript:void(0)">
                                                            <div class="media">
                                                                <div class="media-left align-self-center"><i class="ft-alert-triangle icon-bg-circle bg-yellow bg-darken-3 mr-0"></i></div>
                                                                <div class="media-body">
                                                                    <h6 class="media-heading yellow darken-3 font-weight-bold">People's Meter</h6>
                                                                    <p class="notification-text font-small-3 text-muted font-weight-bold"><span class="text-warning ">{notify.du_name}</span> {notify.details} </p><small>
                                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">{notify.created_at}</time></small>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    } else {
                                                        return <a href="javascript:void(0)">
                                                            <div class="media">
                                                                <div class="media-left align-self-center"><i class="ft-alert-triangle icon-bg-circle bg-yellow bg-darken-3 mr-0"></i></div>
                                                                <div class="media-body">
                                                                    <h6 class="media-heading yellow darken-3">People's Meter</h6>
                                                                    <p class="notification-text font-small-3 text-muted"><span class="text-warning ">{notify.du_name}</span> {notify.details} </p><small>
                                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">{notify.created_at}</time></small>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    }

                                                }
                                            })}


                                            {/* <a href="javascript:void(0)">
                                            <div class="media">
                                                <div class="media-left align-self-center"><i class="ft-plus-square icon-bg-circle bg-cyan mr-0"></i></div>
                                                <div class="media-body">
                                                    <h6 class="media-heading">You have new order!</h6>
                                                    <p class="notification-text font-small-3 text-muted">Lorem ipsum dolor sit amet, consectetuer elit.</p><small>
                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">30 minutes ago</time></small>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="javascript:void(0)">
                                            <div class="media">
                                                <div class="media-left align-self-center"><i class="ft-download-cloud icon-bg-circle bg-red bg-darken-1 mr-0"></i></div>
                                                <div class="media-body">
                                                    <h6 class="media-heading red darken-1">99% Server load</h6>
                                                    <p class="notification-text font-small-3 text-muted">Aliquam tincidunt mauris eu risus.</p><small>
                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">Five hour ago</time></small>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="javascript:void(0)">
                                            <div class="media">
                                                <div class="media-left align-self-center"><i class="ft-alert-triangle icon-bg-circle bg-yellow bg-darken-3 mr-0"></i></div>
                                                <div class="media-body">
                                                    <h6 class="media-heading yellow darken-3">Warning notifixation</h6>
                                                    <p class="notification-text font-small-3 text-muted">Vestibulum auctor dapibus neque.</p><small>
                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">Today</time></small>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="javascript:void(0)">
                                            <div class="media">
                                                <div class="media-left align-self-center"><i class="ft-check-circle icon-bg-circle bg-cyan mr-0"></i></div>
                                                <div class="media-body">
                                                    <h6 class="media-heading">Complete the task</h6><small>
                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">Last week</time></small>
                                                </div>
                                            </div>
                                        </a>
                                        <a href="javascript:void(0)">
                                            <div class="media">
                                                <div class="media-left align-self-center"><i class="ft-file icon-bg-circle bg-teal mr-0"></i></div>
                                                <div class="media-body">
                                                    <h6 class="media-heading">Generate monthly report</h6><small>
                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">Last month</time></small>
                                                </div>
                                            </div>
                                        </a> */}
                                        </li>


                                        <li class="dropdown-menu-footer"><a class="dropdown-item text-muted text-center" href="/notification">Read all notifications</a></li>
                                    </ul>
                                </li>}



                            {/* <li class="dropdown dropdown-notification nav-item"><a class="nav-link nav-link-label" href="#" data-toggle="dropdown"><i class="ficon ft-mail"></i></a>
                                <ul class="dropdown-menu dropdown-menu-media dropdown-menu-right">
                                    <li class="dropdown-menu-header">
                                        <h6 class="dropdown-header m-0"><span class="grey darken-2">Messages</span></h6><span class="notification-tag badge badge-warning float-right m-0">4 New</span>
                                    </li>
                                    <li class="scrollable-container media-list w-100"><a href="javascript:void(0)">
                                        <div class="media">
                                            <div class="media-left"><span class="avatar avatar-sm avatar-online rounded-circle"><img src="../../../app-assets/images/portrait/small/avatar-s-19.png" alt="avatar" /><i></i></span></div>
                                            <div class="media-body">
                                                <h6 class="media-heading">Margaret Govan</h6>
                                                <p class="notification-text font-small-3 text-muted">I like your portfolio, let's start.</p><small>
                                                    <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">Today</time></small>
                                            </div>
                                        </div>
                                    </a><a href="javascript:void(0)">
                                            <div class="media">
                                                <div class="media-left"><span class="avatar avatar-sm avatar-busy rounded-circle"><img src="../../../app-assets/images/portrait/small/avatar-s-2.png" alt="avatar" /><i></i></span></div>
                                                <div class="media-body">
                                                    <h6 class="media-heading">Bret Lezama</h6>
                                                    <p class="notification-text font-small-3 text-muted">I have seen your work, there is</p><small>
                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">Tuesday</time></small>
                                                </div>
                                            </div>
                                        </a><a href="javascript:void(0)">
                                            <div class="media">
                                                <div class="media-left"><span class="avatar avatar-sm avatar-online rounded-circle"><img src="../../../app-assets/images/portrait/small/avatar-s-3.png" alt="avatar" /><i></i></span></div>
                                                <div class="media-body">
                                                    <h6 class="media-heading">Carie Berra</h6>
                                                    <p class="notification-text font-small-3 text-muted">Can we have call in this week ?</p><small>
                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">Friday</time></small>
                                                </div>
                                            </div>
                                        </a><a href="javascript:void(0)">
                                            <div class="media">
                                                <div class="media-left"><span class="avatar avatar-sm avatar-away rounded-circle"><img src="../../../app-assets/images/portrait/small/avatar-s-6.png" alt="avatar" /><i></i></span></div>
                                                <div class="media-body">
                                                    <h6 class="media-heading">Eric Alsobrook</h6>
                                                    <p class="notification-text font-small-3 text-muted">We have project party this saturday.</p><small>
                                                        <time class="media-meta text-muted" datetime="2015-06-11T18:29:20+08:00">last month</time></small>
                                                </div>
                                            </div>
                                        </a></li>
                                    <li class="dropdown-menu-footer"><a class="dropdown-item text-muted text-center" href="javascript:void(0)">Read all messages</a></li>
                                </ul>
                            </li> */}


                            <li class="dropdown dropdown-user nav-item"><a class="dropdown-toggle nav-link dropdown-user-link" href="#" data-toggle="dropdown"><span class="mr-1 user-name text-bold-700">{cookies.get('username')}</span><span class="avatar avatar-online"><img src="/app-assets/images/portrait/small/avater-bd.png" alt="avatar" /><i></i></span></a>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <a class="dropdown-item" href="user-profile.html"><i class="ft-user"></i> Edit Profile</a>
                                    <a class="dropdown-item" href="/app/user/changepass"><i className="la la-key" /> Change Password</a>
                                    <div class="dropdown-divider"></div><a class="dropdown-item" onClick={logout} ><i class="ft-power"></i> Logout</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        // {/* <!-- END: Header--> */}
    )
}
export default Header;