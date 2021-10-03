import React, {Component} from "react";
import { styled } from '@mui/material/styles';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AltRouteIcon from '@mui/icons-material/AltRoute';
import {Grid} from "@mui/material";

export default function Dashboard(){
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

        return (
            <Grid container spacing={3}>
                <Grid item xs={6} md={2}>

                    <Item>空开异常</Item>
                </Grid>
                <Grid item xs={6} md={2}>
                    <Item>裂化异常</Item>
                </Grid>
                <Grid item xs={6} md={2}>
                    <Item>雷击异常</Item>
                </Grid>
                <Grid item xs={6} md={5}>
                    <Item>接地异常</Item>
                </Grid>
            </Grid>
        );
}