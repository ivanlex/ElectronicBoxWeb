import React from "react";
import {DeviceHistoryTable} from "../DeviceHistoryTable/DeviceHistoryTable";
import {Button, TextField} from "@mui/material";
import "./DeviceHistory.css"

export class DeviceHistory extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            queryDeviceId:"",
            deviceHistory:[]
        };

        this.handleQuery =  this.handleQuery.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }

    handleQuery(){
            const self = this;

            console.log("query device history " + this.state.queryDeviceId);

            fetch('mcuHistory',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        deviceId : this.state.queryDeviceId
                    })
                })
                .then(
                    data=>{

                        data.json().then(function(result) {
                            // here you can use the result of promiseB
                            console.log(result);
                            self.setState({
                                deviceHistory : result
                            })
                        })



                    }
                )
                .catch(data => console.log("failed"));
    }

    updateInput(event){
        this.setState({
            queryDeviceId : event.target.value
        });

        console.log(this.state.queryDeviceId);
    }


    render() {
        return (
            <div>
                <div className="queryLine">
                    <TextField id="deviceId" label="设备识别码" variant="outlined" onChange={this.updateInput}  />
                    <Button size="medium" variant="contained" onClick={this.handleQuery}>查询</Button>
                </div>

                <div>
                    <DeviceHistoryTable rows={this.state.deviceHistory} />
                </div>
            </div>
        );
    }
}