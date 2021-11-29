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
import DeviceOnlineStatics from "../DeviceOnlineStatics/DeviceOnlineStatics";
import {Cell, Pie, PieChart} from "recharts";
import {MyMap} from "../MyMap/MyMap";

export default function Dashboard(){
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));



    let index = 0;

        return (
                <div style={{'display':'flex','flex-decoration':'row'}}>
                    <div style={{'display':'flex','flex-decoration':'column'}}>
                        <div style={{'margin-left':1}}>
                                <DeviceOnlineStatics />
                                <LightningCountStatics />
                        </div>
                        <div style={{'margin-left':1}}>
                                {/*<MyMap />*/}
                        </div>

                    </div>
                </div>
        );
}