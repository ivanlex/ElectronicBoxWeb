import {Box, TextField} from "@mui/material";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import React, {useContext, useEffect, useState} from "react";
import {appContext} from "../../App";
import addToFormBody from "../Utility/Utility";


export default function DeviceOnlineStatics() {
    const appService = useContext(appContext);

    const width = 650;
    const height = 100;
    const titleText = '联网设备统计';
    const titleColor = '#E1F5FE';
    const backgroundColor = '#424242';
    const column1MarginLeft = 180;
    const column2MarginLeft = 20;
    const refreshTime = 1000; //ms

    const [installedDevice, setInstalledDevice] = useState(0);
    const [onlineDevice, setOnlineDevice] = useState(0);
    const [dashItems, setDashItems] = useState([]);

    const data = [
        {name: 'Online', value: installedDevice},
        {name: 'Offline', value: onlineDevice},
    ];

    const COLORS = ['#00C49F', '#FFBB28',];

    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    }

        const refreshMcuStatics = () => {
            const self = this;

            let formData = {
                'token': appService.token,
            };

            let formBody = addToFormBody(formData);

            fetch('mcuStatics',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    body: formBody
                })
                .then(
                    data => {
                        data.json().then(function (result) {
                            // here you can use the result of promiseB
                            console.log(result);
                            setInstalledDevice(result.installedMCU);
                            setOnlineDevice(result.onlineMCU);
                        })
                    }
                )
                .catch(data => console.log("failed"));
        };

       // const refreshTopMcu = () => {
       //      const self = this;
       //
       //      fetch('mcuTopStatics',
       //          {
       //              method: 'POST',
       //              headers: {
       //                  'Content-Type': 'application/text'
       //              }
       //          })
       //          .then(
       //              data => {
       //                  data.json().then(function (result) {
       //                      // here you can use the result of promiseB
       //                      console.log(result);
       //                      setDashItems(result);
       //                  })
       //              }
       //          )
       //          .catch(data => console.log("failed"));
       //  };`

        useEffect(() => {
            const func = setInterval(function () {
                refreshMcuStatics();
            }, refreshTime);


            return () => {
                clearInterval(func);
            };
        })

        return (
            <div>
                <Box
                    sx={{
                        margin: 2,
                        boxShadow: 8,
                        borderRadius: 3,
                        width: width,
                        height: height + 200,
                        backgroundColor: backgroundColor,
                        '&:hover': {
                            backgroundColor: backgroundColor,
                            // opacity: [0.9, 0.8, 0.7],
                        },
                    }}>
                    <div style={{"display": "flex", "flex-decoration": "row"}}>
                        <h2 style={{'margin-left': '20px', 'color': titleColor}}>{titleText}</h2>
                    </div>

                    <div style={{'display':'flex','flex-decoration':'row'}}>
                        <PieChart width={200} height={200}>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                                ))}
                            </Pie>
                        </PieChart>

                        <div style={{'display':'flex','flex-decoration':'column'}}>
                            <div style={{'margin-left':column1MarginLeft}}>
                                <h2 style={{'color':titleColor}}>设备总数</h2>
                                <h2 style={{'color':COLORS[0]}}>在线设备</h2>
                                <h2 style={{'color':COLORS[1]}}>离线设备</h2>
                            </div>
                            <div style={{'margin-left':column2MarginLeft}}>
                                <h2 style={{'color':titleColor}}>{installedDevice}</h2>
                                <h2 style={{'color':COLORS[0]}}>{onlineDevice}</h2>
                                <h2 style={{'color':COLORS[1]}}>{installedDevice - onlineDevice}</h2>
                            </div>

                        </div>
                    </div>


                </Box>
            </div>
        )
}