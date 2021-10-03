import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import {ListItem} from "@mui/material";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Dashboard} from "../Dashboard/Dashboard";
import {Preferences} from "../Preferences/Preferences";
import DeviceStatus from "../DeviceStatus/DeviceStatus";


const drawerWidth = 240;

export default function ClippedDrawer() {
    return (
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
                    <List>
                    {/*    TODO add items*/}
                    </List>
                    <Divider />
                    <List>
                        {/* TODO add items*/}
                        <ListItem>123</ListItem>
                        <ListItem>456</ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <BrowserRouter>
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
                    </Switch>
                </BrowserRouter>
            </Box>
        </Box>
    );
}