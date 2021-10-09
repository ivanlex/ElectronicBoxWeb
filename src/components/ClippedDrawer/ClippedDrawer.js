import * as React from 'react';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import {ListItem, ListItemIcon} from "@mui/material";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import LogoutIcon from '@mui/icons-material/Logout';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import RouterIcon from '@mui/icons-material/Router';
import HistoryIcon from '@mui/icons-material/History';

import Dashboard from "../Dashboard/Dashboard";
import {Preferences} from "../Preferences/Preferences";
import {DeviceStatus} from "../DeviceStatus/DeviceStatus";
import {DeviceHistory} from "../DeviceHistory/DeviceHistory";
import {DeviceMaintain} from "../DeviceMaintain/DeviceMaintain";

import "./ClippedDrawer.css"
import Login from "../Login/Login";


const drawerWidth = 240;

export default function ClippedDrawer({setToken}) {
    const handleQuit = () =>{
        setToken("");
    }


    return (
        <BrowserRouter>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        防雷箱监测控制系统
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List className="drawList">
                        <Link to="/dashboard">
                            <ListItem button key="dashboard">
                                <ListItemIcon>
                                    <AdminPanelSettingsIcon />
                                </ListItemIcon>
                                主面板
                            </ListItem>
                        </Link>
                    </List>
                    <Divider />
                    <List className="drawList">
                        <Link to="/deviceStatus">
                            <ListItem button key="allDeviceStatus">
                                <ListItemIcon>
                                    <RouterIcon />
                                </ListItemIcon>
                                设备状态
                            </ListItem>
                        </Link>
                        <Link to="/deviceHistory">
                            <ListItem button key="historyDeviceStatus">
                                <ListItemIcon>
                                    <HistoryIcon />
                                </ListItemIcon>
                                设备历史查询
                            </ListItem>
                        </Link>
                    </List>
                    <Divider />
                    <List className="drawList">
                        <Link  to="/deviceMaintain">
                            <ListItem button key="userMaintain">
                                <ListItemIcon>
                                    <ContactMailIcon />
                                </ListItemIcon>
                                设备管理
                            </ListItem>
                        </Link>
                        <ListItem button key="logout" onClick={handleQuit}>
                            <Link  to="/quit">
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                退出
                            </Link>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box className="contentPlaceHolder" component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Switch>
                        <Route path="/deviceStatus">
                            <DeviceStatus />
                        </Route>
                        <Route path="/dashboard">
                            <Dashboard />
                        </Route>
                        <Route path="/preferences">
                            <Preferences />
                        </Route>
                        <Route path="/deviceHistory">
                            <DeviceHistory />
                        </Route>
                        <Route path="/deviceMaintain">
                            <DeviceMaintain />
                        </Route>
                        <Route path="*">
                            <Dashboard />
                        </Route>
                    </Switch>

            </Box>
        </Box>
        </BrowserRouter>
    );
}