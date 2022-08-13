import React from 'react';
import { useState, useEffect } from "react";
import axiosConfig from "../axiosConfig";
import CurrentStatus from "../CurrentStatus/CurrentStatus";
import Graph from "../Graph/Graph";
import DemoGraph from "../Graph/DemoGraph";
import Select from 'react-select';
import GetLineGraph from "../Graph/GetLineGraph";
import PostLineGraph from "../Graph/PostLineGraph";
import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';


const Demo = (props) => {

    const [update, setUpdate] = useState(0);
    const [time, setTime] = useState("Daily");
    const [id, setId] = useState("");
    const [channels, setchannels] = useState([]);
    
    var credential = { start: "2021-01-01 00:00:00", finish: "2022-01-01 00:00:00" };
    const updater = () => {
        
        props.updaterr(11); 
    }
    return (
<div>aaa
<div class="col-md-1">
                                        <button onClick={updater} class="btn btn-info">Get Data</button>
                                    </div>
</div>

    )
}
export default Demo;