const MainMenu = () =>{
    return (
            // <!-- BEGIN: Main Menu-->

        <div class="main-menu menu-fixed menu-light menu-accordion    menu-shadow " data-scroll-to-active="true">
            <div class="main-menu-content">
                <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
                    <li class=" nav-item"><a href="index.html"><i class="la la-home"></i><span class="menu-title" data-i18n="Dashboard">Dashboard</span><span class="badge badge badge-info badge-pill float-right mr-2">3</span></a>
                    </li>
                    <li class=" nav-item"><a href="#"><i class="la la-history"></i><span class="menu-title" data-i18n="Templates">Overview</span></a>  
                    </li>
                    <li class=" nav-item"><a href="#"><i class="la la-tencent-weibo"></i><span class="menu-title" data-i18n="Templates">Live Channels</span></a>  
                    </li>
                    <li class=" nav-item"><a href="#"><i class="la la-user"></i><span class="menu-title" data-i18n="Templates">Users</span></a>  
                    </li>
                    <li class=" nav-item"><a href="#"><i class="la la-television"></i><span class="menu-title" data-i18n="Templates">Channels</span></a>  
                    </li>
                    <li class=" nav-item"><a href="#"><i class="la la-download"></i><span class="menu-title" data-i18n="Templates">Download Report</span></a>  
                    </li>
                    <li class=" nav-item"><a href="#"><i class="la la-cogs"></i><span class="menu-title" data-i18n="Templates">Device Monitor</span></a>  
                    </li>
                </ul>
            </div>
        </div>

        // <!-- END: Main Menu-->
    )
}
export default MainMenu;