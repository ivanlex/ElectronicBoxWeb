import React, {Component, useContext, useEffect, useState} from "react";
import {MyMap} from "../MyMap/MyMap";
import Box from "@mui/material/Box";


export default function DeviceLocationStatics()
{
    const width = 1900;
    const height = 1300;
    const backgroundColor = '#424242';

    const mapCenterPos = [{lng:121.607271,lat:31.214652}];


    return (
        <div>
            <Box
                sx={{
                    margin: 2,
                    boxShadow: 8,
                    borderRadius: 3,
                    height: "80vh",
                    width: "70vw",
                    backgroundColor: backgroundColor,
                    '&:hover': {
                        backgroundColor: backgroundColor,
                        // opacity: [0.9, 0.8, 0.7],
                    },
                }}
            >
                <MyMap width={width} height={height} poses={mapCenterPos} hideInfoWindow={true}/>
            </Box>
        </div>
    );
}