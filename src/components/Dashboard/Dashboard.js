import React, {Component, useContext, useEffect, useState} from "react";
import { styled } from '@mui/material/styles';
import Paper from "@mui/material/Paper";
import "./DashBoard.css"
import LightningCountStatics from "../LightningCountStatics/LightningCountStatics";
import DeviceOnlineStatics from "../DeviceOnlineStatics/DeviceOnlineStatics";
import AlertCountStatics from "../AlertCountStatics/AlertCountStatics";
import {MyMap} from "../MyMap/MyMap";
import DeviceLocationStatics from "../DeviceLocationStatics/DeviceLocationStatics";


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
                                <AlertCountStatics />
                        </div>
                        <div style={{'margin-left':1}}>
                                <DeviceLocationStatics />
                        </div>
                    </div>
                </div>
        );
}