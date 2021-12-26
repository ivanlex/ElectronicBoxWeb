import React, {PureComponent, useContext, useEffect, useState} from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {Box, TextField} from "@mui/material";
import {appContext} from "../../App";
import addToFormBody from "../Utility/Utility";

export default function LightningCountStatics()
{
    //const DEMO = true;

    const appService = useContext(appContext);

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
    const refreshTime = 2000; //ms


    const currentDate = new Date();

    const [selectedAddress, setSelectedAddress] = useState('ChangShu');
    const [selectedYear, setSelectYear] = useState(currentDate.getFullYear());
    //


    const handleAddressChanged = (event)=>{
        setSelectedAddress(event.target.value);
    }

    const handleYearChanged = (event)=>{
        setSelectYear(event.target.value);
    }

    const staticsData = [
        {
            "name": "一月",
            'LightningCountStatics': 20,
        },
        {
            "name": "二月",
            'LightningCountStatics': 10,
        },
        {
            "name": "三月",
            'LightningCountStatics': 10,
        },
        {
            "name": "四月",
            'LightningCountStatics': 5,
        },
        {
            "name": "五月",
            'LightningCountStatics': 10,
        },
        {
            "name": "六月",
            'LightningCountStatics': 3,
        }
    ]






    // if(!DEMO)
    // {
    //     const [staticsData, setStaticsData] = useState([]);
    //
    //     const refreshLightningStatics = () => {
    //         const self = this;
    //
    //         let formData = {
    //             'token': appService.token,
    //             'queryLocation': appService.deviceLocations.count() > 0 ? appService.deviceLocations[0] : "",
    //             'queryDate': appService.firstRecord != "" ? appService.firstRecord : new Date(),
    //         };
    //
    //         let formBody = addToFormBody(formData);
    //
    //         fetch('mcuAlertStatics',
    //             {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    //                 },
    //                 body: formBody
    //             })
    //             .then(
    //                 data => {
    //                     data.json().then(function (result) {
    //                         // here you can use the result of promiseB
    //                         console.log(result);
    //
    //                         let staticsInfo = [];
    //
    //                         for(let data in result){
    //                             staticsInfo.push(data);
    //                         }
    //
    //                         setStaticsData(staticsInfo);
    //                     })
    //                 }
    //             )
    //             .catch(data => console.log("failed"));
    //     };
    //
    //     useEffect(() => {
    //         const func = setInterval(function () {
    //             refreshLightningStatics();
    //         }, refreshTime);
    //
    //
    //         return () => {
    //             clearInterval(func);
    //         };
    //     })
    // }



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

                <BarChart width={width} height={height} data={staticsData}>
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