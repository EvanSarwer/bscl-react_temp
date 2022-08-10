import axiosConfig from '../axiosConfig';
const HeaderUser = (props) => {
    var logout=()=>{
        axiosConfig.get("/logout").then((rsp)=>{
            localStorage.clear();
            window.open("/","_self");
        },(err)=>{

        });
        
    }
    return (
        // <!-- BEGIN: Header-->
        <nav class="header-navbar navbar-expand-md navbar navbar-with-menu navbar-without-dd-arrow fixed-top navbar-semi-light bg-info navbar-shadow">
            <div class="navbar-wrapper">
                <div class="navbar-header">
                    <ul class="nav navbar-nav flex-row">
                        <li class="nav-item mobile-menu d-md-none mr-auto"><a class="nav-link nav-menu-main menu-toggle hidden-xs" href="#"><i class="ft-menu font-large-1"></i></a></li>
                        <li class="nav-item"><a class="navbar-brand" href="/"><img style={{zoom:1.7}} class="brand-logo" alt="modern admin logo" src="../../../app-assets/images/logo/bscl-logo.png"></img>
                            <h3 class="brand-text"> </h3>
                        	&nbsp;	&nbsp;	&nbsp;	&nbsp;    
                        <img  style={{zoom:1.2}} class="brand-logo" alt="modern admin logo" src="../../../app-assets/images/logo/aiub-logo.png"></img>
                            <h3 class="brand-text"></h3>
                            
                        </a>


                        </li>
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
                            
                            
                            <li class="dropdown dropdown-user nav-item"><a class="dropdown-toggle nav-link dropdown-user-link" href="#" data-toggle="dropdown"><span class="mr-1 user-name text-bold-700">{localStorage.getItem("username")}</span><span class="avatar avatar-online"><img src="/app-assets/images/portrait/small/avater-bd.png" alt="avatar" /><i></i></span></a>
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
export default HeaderUser;