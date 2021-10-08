import React, {Component} from "react";
import { styled } from '@mui/material/styles';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AltRouteIcon from '@mui/icons-material/AltRoute';
import {Grid} from "@mui/material";
import DashPage from "../DashPage/DashPage";
import "./DashBoard.css"

export default function Dashboard(){
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    let index = 0;

        return (
            <div className="dashBoardLine1">
                <DashPage index={index++} title="安装设备数量" content="1"/>
                <DashPage index={index++} title="在线设备" content="1"/>
                <DashPage index={index++} title="离线设备" content="1"/>
            </div>
        );
}