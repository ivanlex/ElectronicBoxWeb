import React from "react";
import {DeviceHistoryTable} from "../DeviceHistoryTable/DeviceHistoryTable";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import "./DeviceHistory.css"
import styled from "@emotion/styled";

const textFieldColor = '#E0E0E0';

export class DeviceHistory extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            queryDeviceId:this.props.match.params.mcuId,
            deviceHistory:[]
        };

        this.handleQuery =  this.handleQuery.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }

    handleQuery(){
            const self = this;
            this.setState({
                deviceHistory:[]
            })

            console.log("query device history " + this.state.queryDeviceId);

            fetch('/mcuHistory',
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

    componentDidMount() {
        if(this.state.queryDeviceId != "")
        {
            this.handleQuery()
        }
    }


    render() {
        return (
            <div>
                <div className="queryLine">
                    <TextField id="deviceId" color='warning' inputProps={{sx:{color:textFieldColor}}} value={this.state.queryDeviceId} label="设备识别码" variant="outlined" onChange={this.updateInput} focused  />
                    <Button size="medium" variant="contained" onClick={this.handleQuery}>查询</Button>
                </div>

                <div>
                    <DeviceHistoryTable rows={this.state.deviceHistory} />
                </div>

            </div>
        );
    }
}