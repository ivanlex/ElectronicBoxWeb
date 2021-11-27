import * as React from 'react';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import {IconButton, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import LogoutIcon from '@mui/icons-material/Logout';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import RouterIcon from '@mui/icons-material/Router';
import HistoryIcon from '@mui/icons-material/History';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import Dashboard from "../Dashboard/Dashboard";
import {Preferences} from "../Preferences/Preferences";
import {DeviceStatus} from "../DeviceStatus/DeviceStatus";
import {DeviceHistory} from "../DeviceHistory/DeviceHistory";
import {DeviceMaintain} from "../DeviceMaintain/DeviceMaintain";

import "./ClippedDrawer.css"
import Login from "../Login/Login";
import UserMaintain from "../UserMaintain/UserMaintain";



const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(ClippedDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function ClippedDrawer({setToken}) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleQuit = () =>{
        setToken("");
    }

    return (
        <BrowserRouter>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            防雷箱监测控制系统
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List className="drawList">
                        <Link to="/dashboard">
                            <ListItem>
                                <ListItemIcon>
                                    <AdminPanelSettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="主面板" />
                            </ListItem>
                        </Link>

                        <Link to="/deviceStatus">
                            <ListItem>
                                <ListItemIcon>
                                    <RouterIcon />
                                </ListItemIcon>
                                <ListItemText primary="设备状态" />
                            </ListItem>
                        </Link>

                        <Link  to="/deviceHistory">
                            <ListItem>
                                <ListItemIcon>
                                    <HistoryIcon />
                                </ListItemIcon>
                                <ListItemText primary="历史查询" />
                            </ListItem>
                        </Link>

                        <Link to="/deviceMaintain">
                            <ListItem>
                                <ListItemIcon>
                                    <ContactMailIcon />
                                </ListItemIcon>
                                <ListItemText primary="设备管理" />
                            </ListItem>
                        </Link>

                        <Link  to="/userMaintain">
                            <ListItem>
                                <ListItemIcon>
                                    <AccessibilityIcon />
                                </ListItemIcon>
                                <ListItemText primary="用户管理" />
                            </ListItem>
                        </Link>


                            <ListItem onClick={handleQuit}>
                                <Link to="/quit">
                                    <ListItemIcon>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="退出" />
                                </Link>
                            </ListItem>

                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Switch>
                        <Route path="/deviceStatus" component={DeviceStatus} />
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/preferences" component={Preferences} />
                        <Route path="/deviceHistory/:mcuId" component={DeviceHistory} />
                        <Route path="/deviceHistory" component={DeviceHistory} />
                        <Route path="/deviceMaintain" component={DeviceMaintain}/>
                        <Route path="/userMaintain" component={UserMaintain} />
                        <Route path="*" component={Dashboard} />
                    </Switch>
                </Box>
            </Box>
        </BrowserRouter>
    );
}