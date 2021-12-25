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
import {useContext, useEffect} from "react";
import {appContext} from "../../App";



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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
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
    // const appService = useContext(appContext);
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [dateNow, setDateNow] = React.useState('');
    const [timeNow, setTimeNow] = React.useState('');

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleQuit = () =>{
        setToken("");
    }

    // appService.stompClient.subscribe(appService.socketConnection,function (msg){
    //     console.log("alert" + msg);
    // });

    useEffect(()=>{
        const currentDate = new Date();
        const daysTranslate = ['星期日', '星期一','星期二','星期三','星期四','星期五','星期六'];


        let updateTimer = setInterval(()=>{
            setDateNow(currentDate.toLocaleDateString() + ' ' + daysTranslate[currentDate.getDay()]);
            setTimeNow(currentDate.toLocaleTimeString("cn-zh",
            //     {
            //     hour: "2-digit",
            //     minute: "2-digit",
            // }
            ));
        },1000);

        return ()=>{
            clearInterval(updateTimer);
        }
    });

    return (
        <BrowserRouter>
            <Box sx={{ display: 'flex'}} >
                <CssBaseline />
                <AppBar position="fixed" open={open} sx={{backgroundColor:"#424242"}}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                color:'red',
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{color:'#0091EA'}}>
                            苏州安睿源电气有限公司
                        </Typography>
                        <Typography variant="h6" noWrap component="div" sx={{flexGrow:'1',textAlign:'center',color:'#0091EA'}}>
                            防雷箱监测控制系统
                        </Typography>
                        <Typography variant="h6" noWrap component="div" sx={{textAlign:'right',color:'#0091EA'}}>
                            <p style={{'margin':'0px'}}>{timeNow}</p>
                            <p style={{'margin':'0px'}}>{dateNow}</p>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}  PaperProps={{
                    sx: {
                        backgroundColor: "#212121"
                    }
                }}>
                    <DrawerHeader sx={{background:"#424242"}}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon color='primary' /> : <ChevronLeftIcon   color='error'/>}
                        </IconButton>
                    </DrawerHeader>
                    <Divider  />
                    <List className="drawList">
                        <Link to="/dashboard">
                            <ListItem>
                                <ListItemIcon>
                                    <AdminPanelSettingsIcon sx={{color:'#00E676'}} />
                                </ListItemIcon>
                                <ListItemText primary="主面板" sx={{color:'#00E676'}} />
                            </ListItem>
                        </Link>

                        <Link to="/deviceStatus">
                            <ListItem>
                                <ListItemIcon>
                                    <RouterIcon sx={{color:'#E0E0E0'}} />
                                </ListItemIcon>
                                <ListItemText primary="设备状态" sx={{color:'#E0E0E0'}} />
                            </ListItem>
                        </Link>

                        <Link  to="/deviceHistory">
                            <ListItem>
                                <ListItemIcon>
                                    <HistoryIcon sx={{color:'#E0E0E0'}}  />
                                </ListItemIcon>
                                <ListItemText primary="历史查询" sx={{color:'#E0E0E0'}} />
                            </ListItem>
                        </Link>

                        <Link to="/deviceMaintain">
                            <ListItem>
                                <ListItemIcon>
                                    <ContactMailIcon  sx={{color:'#E0E0E0'}} />
                                </ListItemIcon>
                                <ListItemText primary="设备管理"  sx={{color:'#E0E0E0'}}  />
                            </ListItem>
                        </Link>

                        <Link  to="/userMaintain">
                            <ListItem>
                                <ListItemIcon>
                                    <AccessibilityIcon sx={{color:'#E0E0E0'}} />
                                </ListItemIcon>
                                <ListItemText primary="用户管理"  sx={{color:'#E0E0E0'}} />
                            </ListItem>
                        </Link>

                        <ListItem onClick={handleQuit}>
                                <ListItemIcon>
                                    <LogoutIcon sx={{color:'#ee6002'}} />
                                </ListItemIcon>
                                <ListItemText primary="退出" sx={{color:'#ee6002'}} />
                        </ListItem>

                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3,marginTop:5 }}>
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