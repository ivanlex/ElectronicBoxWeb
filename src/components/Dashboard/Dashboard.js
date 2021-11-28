import React, {Component, useEffect, useState} from "react";
import { styled } from '@mui/material/styles';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AltRouteIcon from '@mui/icons-material/AltRoute';
import {Grid} from "@mui/material";
import DashPage from "../DashPage/DashPage";
import "./DashBoard.css"
import {DashPanel} from "../DashPanel/DashPanel";
import LightningCountStatics from "../LightningCountStatics/LightningCountStatics";

export default function Dashboard(){
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const [installedDevice,setInstalledDevice] = useState(0);
    const [onlineDevice,setOnlineDevice] = useState(0);
    const [dashItems,setDashItems] = useState([]);

    const refreshMcuStatics = () => {
        const self =this;

        fetch('mcuStatics',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/text'
                },
                // body: JSON.stringify(credentials)
            })
            .then(
                data=>{
                    data.json().then(function(result) {
                        // here you can use the result of promiseB
                        console.log(result);
                        setInstalledDevice(result.installedMCU);
                        setOnlineDevice(result.onlineMCU);
                    })
                }
            )
            .catch(data => console.log("failed"));
    };

    const refreshTopMcu = () => {
        const self =this;

        fetch('mcuTopStatics',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/text'
                }
            })
            .then(
                data=>{
                    data.json().then(function(result) {
                        // here you can use the result of promiseB
                        console.log(result);
                        setDashItems(result);
                    })
                }
            )
            .catch(data => console.log("failed"));
    };

    useEffect(()=>{
        const func =  setInterval(function () {
            refreshMcuStatics();
            refreshTopMcu();
        },2000);


        return ()=>{
            clearInterval(func);
        };
    })

    let index = 0;

        return (
            <div>
                <div className="dashBoardLine1">
                    <DashPage index={index++} title="安装设备数量" content={installedDevice}/>
                    <DashPage index={index++} title="在线设备" content={onlineDevice}/>
                    <DashPage index={index++} title="离线设备" content={installedDevice - onlineDevice}/>
                </div>
                <div>
                    <LightningCountStatics />
                    {/*<DashPanel dashItems={dashItems} />*/}
                </div>
            </div>



        );
}