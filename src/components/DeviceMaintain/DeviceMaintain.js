import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {DeviceMaintainTable} from "../DeviceMaintainTable/DeviceMaintainTable";
import {MyMap} from "../MyMap/MyMap";
import AutoComplete from 'react-bmapgl/Services/AutoComplete'
import ExploreIcon from '@mui/icons-material/Explore';
import "./DeviceMaintain.css";

const textFieldColor = '#E0E0E0';

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
            errorContent:"",
            mapEnableEdit:false,
            mapCenterPos : {lng:0,lat:0},
            showAddUpdateDialog:false,
            modifyMode:false,
        };

        this.handleDeviceIdInput = this.handleDeviceIdInput.bind(this);
        this.handleAddressInput = this.handleAddressInput.bind(this);
        this.handleDescInput = this.handleDescInput.bind(this);
        this.handleGroupInput = this.handleGroupInput.bind(this);
        this.handleAddUpdateDevice = this.handleAddUpdateDevice.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleUpdateDevice = this.handleUpdateDevice.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdatelatlng = this.handleUpdatelatlng.bind(this);
        this.handleBaiduAutoComplete = this.handleBaiduAutoComplete.bind(this);
        this.handleShowAddDialog = this.handleShowAddDialog.bind(this);
        this.handleShowOnMap = this.handleShowOnMap.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        this.handleRefresh();
    }

    handleUpdate(row)
    {
        this.setState(
            {
                modifyMode : true,
                deviceId : row.mcuId,
                deviceAddress : row.address,
                desc : row.desc,
                group : row.group,
                longitude : row.longitude,
                latitude : row.latitude,
                mapEnableEdit : true,
                showAddUpdateDialog : true,
                mapCenterPos : {lng:row.longitude,lat:row.latitude},
        })
    }

    handleShowOnMap(longitude,latitude){
        this.setState({
            mapCenterPos : {lng:longitude,lat:latitude},
        })
    }

    handleShowAddDialog(){
        this.setState({
            showAddUpdateDialog : true,
            mapEnableEdit : true,
            modifyMode : false,
        })
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

    handleUpdateDevice(){
        this.addOrUpdateDevice(false);
    }

    handleCancel(){
        this.setState(
            {
                showAddUpdateDialog : false,
                mapEnableEdit : false,
            }
        )
    }

    handleAddUpdateDevice(){
        if(this.state.deviceId === "" || this.state.deviceAddress === "")
        {
            this.setState({
                openDialog : true,
                errorTitle : "内容检查",
                errorContent : "请确认填写内容是否完整",
            })
        }
        else
        {
            const self = this;
            console.log("Add new device deviceId:" + this.state.deviceId + ",deviceAddress:" + this.state.deviceAddress);

            fetch(!this.state.modifyMode ? 'mcuAdd' : 'mcuUpdate',
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

        this.setState(
            {
                showAddUpdateDialog : false,
                mapEnableEdit : false,
            }
        )
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
        this.setState({
            mapCenterPos:latlng,
            longitude:latlng.lng,
            latitude:latlng.lat,
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

    handleBaiduAutoComplete(){
        const BMapGL = window.BMapGL;
        const myGeo = new BMapGL.Geocoder();
        const self = this;
        myGeo.getPoint(this.state.deviceAddress,function (point)
        {
           if(point)
           {
               console.log(point);
               self.setState({
                   mapCenterPos : point,
                   longitude : point.lng,
                   latitude : point.lat,
               });
           }else
           {
               console.log('解析失败');
           }
        });
    }

    render() {
        return (
            <div>
                <div className={this.state.showAddUpdateDialog ? "hidden" : ""}>
                    <DeviceMaintainTable handleUpdate={this.handleUpdate} handleShowOnMap={this.handleShowOnMap} handleDelete={this.handleDelete} handleShowAddDialog={this.handleShowAddDialog} rows={this.state.allDevice} />
                </div>

                <div className={this.state.showAddUpdateDialog ? "" : "hidden"}>
                    <TextField color='warning' inputProps={{sx:{color:textFieldColor}}} value={this.state.deviceId} id="outlined-basic" label="设备识别码" variant="outlined" focused onChange={this.handleDeviceIdInput} />
                    <TextField color='warning' inputProps={{sx:{color:textFieldColor}}}  value={this.state.desc} id="outlined-basic" label="设备描述" variant="outlined" focused onChange={this.handleDescInput} />
                    <TextField color='warning' inputProps={{sx:{color:textFieldColor}}} value={this.state.group} id="outlined-basic" label="分组" variant="outlined" focused onChange={this.handleGroupInput} />
                    <TextField color='warning' inputProps={{sx:{color:textFieldColor}}} value={this.state.deviceAddress} id="ac" label="安装位置" variant="outlined" focused onChange={this.handleAddressInput} />
                    <Button onClick={this.handleBaiduAutoComplete}><ExploreIcon /></Button>
                    <AutoComplete input="ac"/>
                    <Button  size="medium" variant="contained" onClick={this.handleAddUpdateDevice}>确认</Button>
                    <Button  size="medium" variant="contained" onClick={this.handleCancel}>取消</Button>
                </div>

                <div>
                    <MyMap centerPos={this.state.mapCenterPos} mcuId={this.state.deviceId} desc={this.state.desc} enableEdit={this.state.mapEnableEdit} handleUpdatelatlng={this.handleUpdatelatlng} />
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