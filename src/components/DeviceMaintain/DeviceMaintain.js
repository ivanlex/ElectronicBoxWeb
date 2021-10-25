import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {DeviceMaintainTable} from "../DeviceMaintainTable/DeviceMaintainTable";
import {MyMap} from "../MyMap/MyMap";
import AutoComplete from 'react-bmapgl/Services/AutoComplete'

export class DeviceMaintain extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            openDialog:false,
            deviceId : "",
            deviceAddress : "",
            desc : "",
            group : "",
            longitude : 0,
            latitude : 0,
            allDevice:[],
            errorTitle:"",
            errorContent:""
        };

        this.handleDeviceIdInput = this.handleDeviceIdInput.bind(this);
        this.handleAddressInput = this.handleAddressInput.bind(this);
        this.handleDescInput = this.handleDescInput.bind(this);
        this.handleGroupInput = this.handleGroupInput.bind(this);
        this.handleAddDevice = this.handleAddDevice.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdatelatlng = this.handleUpdatelatlng.bind(this);
        this.handleBaiduAutoComplete = this.handleBaiduAutoComplete.bind(this);
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
                        deviceAddress : this.state.deviceAddress,
                        desc : this.state.desc,
                        group : this.state.group,
                        longitude : this.state.longitude,
                        latitude : this.state.latitude,
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
                            else
                            {
                                self.setState({
                                    openDialog:true,
                                    errorTitle:"添加失败",
                                    errorContent:"已存在相同的设备识别码，请更换后重试",
                                })
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

    handleDescInput(event){
        this.setState({
            desc : event.target.value
        })
    }

    handleGroupInput(event){
        this.setState({
            group : event.target.value
        })
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

    handleUpdatelatlng(latlng){
        console.log(latlng);
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
                        else
                        {
                           self.setState({
                               openDialog:true,
                               errorTitle:"删除失败",
                               errorContent:"无法删除该设备，请重试",
                           })
                        }
                    })
                }
            )
            .catch(data => console.log("failed"));
    }

    handleBaiduAutoComplete(event){
        const BMapGL = window.BMapGL;
        const myGeo = new BMapGL.Geocoder();
        myGeo.getPoint(this.state.deviceAddress,function (point)
        {
           if(point)
           {
               console.log(point);
           }else
           {
               console.log('解析失败');
           }
        });
        // console.log(event);
        // this.setState(
        //     {
        //         longitude : event.latlng.lng,
        //         latitude : event.latlng.lat,
        //     }
        // )
    }

    render() {
        return (
            <div>
                <div className="queryLine">
                    <TextField id="outlined-basic" label="设备识别码" variant="outlined" onChange={this.handleDeviceIdInput} />
                    <TextField id="outlined-basic" label="设备描述" variant="outlined" onChange={this.handleDescInput} />
                    <TextField id="outlined-basic" label="分组" variant="outlined" onChange={this.handleGroupInput} />
                    <TextField id="ac" label="安装位置" variant="outlined" onChange={this.handleAddressInput} />
                    <AutoComplete input="ac" onSearchComplete={this.handleBaiduAutoComplete} onConfirm={this.handleBaiduAutoComplete} />
                    <Button size="medium" variant="contained" onClick={this.handleAddDevice}>新增</Button>
                </div>

                <div>
                    <DeviceMaintainTable handleDelete={this.handleDelete} rows={this.state.allDevice} />
                </div>

                <div>
                    <MyMap mcuId="1" desc={this.state.longitude + " " + this.state.latitude} enableEdit={true} handleUpdatelatlng={this.handleUpdatelatlng} />
                </div>


                <Dialog
                    open={this.state.openDialog}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {this.state.errorTitle}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.state.errorContent}
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