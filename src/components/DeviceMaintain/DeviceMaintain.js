import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {DeviceMaintainTable} from "../DeviceMaintainTable/DeviceMaintainTable";

export class DeviceMaintain extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            openDialog:false,
            deviceId : "",
            deviceAddress : "",
            allDevice:[]
        };

        this.handleDeviceIdInput = this.handleDeviceIdInput.bind(this);
        this.handleAddressInput = this.handleAddressInput.bind(this);
        this.handleAddDevice = this.handleAddDevice.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.handleRefresh();
    }

    handleRefresh(){
        const self = this;

        fetch('getAllMcu',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(
                data=>{
                    data.json().then(function(result) {
                        // here you can use the result of promiseB
                        console.log(result);
                        self.setState({
                            allDevice : result
                        })
                    })
                }
            )
            .catch(data => console.log("failed"));
    }

    handleAddDevice(){
        if(this.state.deviceId === "" || this.state.deviceAddress === "")
        {
            this.setState({
                openDialog : true
            })
        }
        else{
            const self = this;
            console.log("Add new device deviceId:" + this.state.deviceId + ",deviceAddress:" + this.state.deviceAddress);

            fetch('mcuAdd',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        deviceId : this.state.deviceId,
                        deviceAddress : this.state.deviceAddress
                    })
                })
                .then(
                    data=>{
                        data.json().then(function(result) {
                            // here you can use the result of promiseB
                            console.log(result);
                            if(result.actionComplete && !result.duiplicateMCU){
                                self.handleRefresh();
                            }
                        })
                    }
                )
                .catch(data => console.log("failed"));
        }
    }

    handleDeviceIdInput(event){
        this.setState({
            deviceId : event.target.value
        });
    }

    handleAddressInput(event)
    {
        this.setState({
            deviceAddress: event.target.value
        })
    }

    handleClose(){
        this.setState({
            openDialog : false
        })
    }

    handleDelete(mcuId){
        const self = this;
        console.log("Delete device deviceId:" + mcuId);
        const deleteId = mcuId;

        fetch('mcuRemove',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    deviceId : mcuId,
                })
            })
            .then(
                data=>{
                    data.json().then(function(result) {
                        // here you can use the result of promiseB
                        console.log(result);
                        if(result.actionComplete){
                            self.handleRefresh();
                        }
                    })
                }
            )
            .catch(data => console.log("failed"));
    }

    render() {
        return (
            <div>
                <div className="queryLine">
                    <TextField id="outlined-basic" label="设备识别码" variant="outlined" onChange={this.handleDeviceIdInput} />
                    <TextField id="outlined-basic2" label="安装位置" variant="outlined" onChange={this.handleAddressInput} />
                    <Button size="medium" variant="contained" onClick={this.handleAddDevice}>新增</Button>
                </div>

                <div>
                    <DeviceMaintainTable handleDelete={this.handleDelete} rows={this.state.allDevice} />
                </div>


                <Dialog
                    open={this.state.openDialog}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        信息填写不完整
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            请将设备ID，安装地址填写完整。
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={this.handleClose}>
                            好的
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}