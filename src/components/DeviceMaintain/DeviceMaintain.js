import React from "react";
import {Button, TextField} from "@mui/material";
import {DeviceHistoryTable} from "../DeviceHistoryTable/DeviceHistoryTable";
import {DeviceMaintainTable} from "../DeviceMaintainTable/DeviceMaintainTable";

export class DeviceMaintain extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            allDevice:[]
        };
    }


    render() {
        return (
            <div>
                <div className="queryLine">
                    <TextField id="outlined-basic" label="设备识别码" variant="outlined" />
                    <TextField id="outlined-basic2" label="安装位置" variant="outlined" />
                    <Button size="medium" variant="contained">新增</Button>
                </div>

                <div>
                    <DeviceMaintainTable rows={this.state.allDevice} />
                </div>
            </div>
        );
    }
}