import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

const MainMenuUser = () => {
    const open_channel_menu=(event)=>{
        if(document.querySelector("#channelmenu").innerHTML==""){
            document.querySelector("#channelmenu").innerHTML=`<ul class="menu-content">
            <li><a class="menu-item" href="/channelstatus"><i></i><span data-i18n="Crypto">General</span></a>
            </li>
            <li><a class="menu-item" href="/definedchannelstatus"><i></i><span data-i18n="Crypto">User Defined</span></a>
            </li>
        </ul>`
        }
        else{
            document.querySelector("#channelmenu").innerHTML="";
        }
        
    }
    const open_user_menu=(event)=>{
        if(document.querySelector("#usermenu").innerHTML==""){
            document.querySelector("#usermenu").innerHTML=`<ul class="menu-content">
            <li><a class="menu-item" href="/userstatus"><i></i><span data-i18n="Crypto">General</span></a>
            </li>
            <li><a class="menu-item" href="/userdefined"><i></i><span data-i18n="Crypto">User Defined</span></a>
            </li>
        </ul>`
        }
        else{
            document.querySelector("#usermenu").innerHTML="";
        }
        
    }
    return (
        // <!-- BEGIN: Main Menu-->

        <div class="main-menu menu-fixed menu-light menu-accordion    menu-shadow " data-scroll-to-active="true">
            <div class="main-menu-content">
                <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
                    <li class=" nav-item"><a href="/"><i class="la la-home"></i><span class="menu-title" data-i18n="Dashboard">Dashboard</span><span class="badge badge badge-info badge-pill float-right mr-2"></span></a>
                    </li>
                    <li class=" nav-item"><a href="/overview"><i class="la la-history"></i><span class="menu-title" data-i18n="Templates">Basic Reports</span></a>
                    </li>
                    <li class=" nav-item"><a href="/livechannels"><i class="la la-tencent-weibo"></i><span class="menu-title" data-i18n="Templates">Live Channels</span></a>
                    </li>
                    
                </ul>
            </div>
        </div>



    )
}
export default MainMenuUser;