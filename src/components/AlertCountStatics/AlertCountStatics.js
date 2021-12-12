import React, {PureComponent, useState} from 'react';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {Box, TextField} from "@mui/material";



export default function AlertCountStatics ()
{
    const width = 650;
    const height = 260;
    const titleText = '报警统计';
    const titleColor = '#E1F5FE';

    const statusNormalColor = "#03DAC6";
    const statusErrorColor = "#B00020";

    const backgroundColor = '#424242';
    const xStrokeColor = '#E1F5FE';
    const yStrokeColor = '#E1F5FE';
    const legendName = 'LightningCountStatics';
    const barColor = '#EF6C00';
    const selectAddressWidth = 150;
    const selectYearWidth = 110;

    const lightningAlertTitle = "雷击报警";
    const openAlertTitle = "空开断开报警";
    const crackAlertTitle = "裂化报警";
    const gourndAlerterTitle = "接地异常报警";

    const [lightningAlert, setLightningAlert] = useState();
    const [openAlert, setOpenAlert] = useState();
    const [crackAlert, setCrackAlert] = useState();
    const [groundAlert, setGroundAlert] = useState();

    const currentDate = new Date();

    const [selectedAddress, setSelectedAddress] = useState('ChangShu');
    const [selectedYear, setSelectYear] = useState(currentDate.getFullYear());

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

                <h2 style={{'margin-left':'20px'}}>
                    <span>{lightningAlertTitle}</span>
                    <span style={{'color':lightningAlert > 0 ? statusErrorColor : statusNormalColor}}>{lightningAlert}</span>
                </h2>

                <h2 style={{'margin-left':'20px','color':openAlert > 0 ? statusErrorColor : statusNormalColor}}>
                    <span >{openAlertTitle}</span>
                    <span style={{'color':openAlert > 0 ? statusErrorColor : statusNormalColor}}>{openAlert}</span>
                </h2>

                <h2 style={{'margin-left':'20px','color':crackAlert > 0 ? statusErrorColor : statusNormalColor}}>
                    <span>{crackAlertTitle}</span>
                    <span style={{'color':crackAlert > 0 ? statusErrorColor : statusNormalColor}}>{crackAlert}</span>
                </h2>

                <h2 style={{'margin-left':'20px','color':groundAlert > 0 ? statusErrorColor : statusNormalColor}}>
                    <span>{gourndAlerterTitle}</span>
                    <span style={{'color':groundAlert > 0 ? statusErrorColor : statusNormalColor}}>{groundAlert}</span>
                </h2>

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