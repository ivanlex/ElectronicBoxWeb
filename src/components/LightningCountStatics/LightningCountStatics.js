import React, {PureComponent, useState} from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {Box, TextField} from "@mui/material";

export default function LightningCountStatics()
{
    const width = 650;
    const height = 260;
    const titleText = '雷击次数统计';
    const titleColor = '#E1F5FE';
    const backgroundColor = '#424242';
    const xStrokeColor = '#E1F5FE';
    const yStrokeColor = '#E1F5FE';
    const legendName = 'LightningCountStatics';
    const barColor = '#EF6C00';
    const selectAddressWidth = 150;
    const selectYearWidth = 110;

    const currentDate = new Date();

    const [selectedAddress, setSelectedAddress] = useState('ChangShu');
    const [selectedYear, setSelectYear] = useState(currentDate.getFullYear());

    const handleAddressChanged = (event)=>{
        setSelectedAddress(event.target.value);
    }

    const handleYearChanged = (event)=>{
        setSelectYear(event.target.value);
    }

    const data = [
        {
            "name": "Page A",
            'LightningCountStatics': 4000,
        },
        {
            "name": "Page B",
            'LightningCountStatics': 3000,
        },
        {
            "name": "Page C",
            'LightningCountStatics': 2000,
        },
        {
            "name": "Page D",
            'LightningCountStatics': 2780,
        },
        {
            "name": "Page E",
            'LightningCountStatics': 1890,
        },
        {
            "name": "Page F",
            'LightningCountStatics': 2390,
        },
        {
            "name": "Page G",
            'LightningCountStatics': 3490,
        }
    ]

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
                }}
            >
                <div style={{"display":"flex","flex-decoration":"row"}}>
                    <h2 style={{'margin-left':'20px','color':titleColor}}>{titleText}</h2>
                </div>

                <BarChart width={width} height={height} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke={xStrokeColor} />
                    <YAxis stroke={yStrokeColor} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={legendName} fill={barColor} />
                </BarChart>

                <div style={{"display":"flex","flex-decoration":"row","margin-top":"30px","margin-left":width-selectAddressWidth-10-selectYearWidth-10}}>
                    <TextField select label='设备位置' className="staticsTitleItem" sx={{width:selectAddressWidth,color:titleColor}}
                               color="warning"
                               value={selectedAddress}
                               size="small"
                               onChange={handleAddressChanged}
                               focused
                    />
                    <TextField select label='时间' className="staticsTitleItem" sx={{width:selectYearWidth,marginLeft:'5px'}}
                               color="warning"
                               value={selectedYear}
                               size="small"
                               onChange={handleYearChanged}
                               focused
                    />
                </div>
            </Box>
        </div>
    )
}