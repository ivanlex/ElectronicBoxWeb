import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./DeviceDataTable.css"
import CircleIcon from '@mui/icons-material/Circle';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import img_box from "../Resource/img_box.png";

// function createData(mcuId, openStatus, crackStatus, groundedStatus, lightningStatus,lightningCount) {
//     return { mcuId, openStatus, crackStatus, groundedStatus, lightningStatus,lightningCount };
// }

// const rows = [
//     createData('Dev001', '分闸', '正常', '有雷击', '正常', 2),
//     createData('Dev002', '分闸', '正常', '有雷击', '正常', 2),
//     createData('Dev003', '分闸', '裂化', '有雷击', '正常', 2),
//     createData('Dev004', '合闸', '裂化', '正常', '报警', 2),
//     createData('Dev005', '合闸', '裂化', '正常', '报警', 2),
// ];

export default function DeviceDataTable({rows}){

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const headerColor = '#E0E0E0';

    return (
        <div>
            <div className="DeviceDataTable">
                <h2 style={{"color":headerColor}}>设备状态一览表</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>设备识别码</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell align="right">设备描述</StyledTableCell>
                                <StyledTableCell align="right">在线状态</StyledTableCell>
                                <StyledTableCell align="right">空开状态</StyledTableCell>
                                <StyledTableCell align="right">裂化状态&nbsp;</StyledTableCell>
                                <StyledTableCell align="right">雷击状态&nbsp;</StyledTableCell>
                                <StyledTableCell align="right">接地状态&nbsp;</StyledTableCell>
                                <StyledTableCell align="right">雷击次数&nbsp;(次)</StyledTableCell>
                                <StyledTableCell align="right" />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.mcuId}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.mcuId}
                                    </StyledTableCell>
                                    <StyledTableCell ><img width="100px" src={img_box}/></StyledTableCell>
                                    <StyledTableCell align="right">{row.description}</StyledTableCell>
                                    <StyledTableCell align="right"><CircleIcon color={row.isOnline == 1 ? "success" : "error"}/>{row.isOnline == 1 ? "在线" : "离线"}</StyledTableCell>
                                    <StyledTableCell align="right"><CircleIcon color={row.isOnline == 1 && row.openStatus == 0 ? "success" : "error"}/>{row.openStatus == 0 ? "合闸" : "分闸"}</StyledTableCell>
                                    <StyledTableCell align="right"><CircleIcon color={row.isOnline == 1 && row.crackStatus == 0 ? "success" : "error"}/>{row.crackStatus == 0 ? "正常" : "裂化"}</StyledTableCell>
                                    <StyledTableCell align="right"><CircleIcon color={row.isOnline == 1 && row.lightningStatus == 0 ? "success" : "error"}/>{row.lightningStatus == 0 ? "正常" : "有雷击"}</StyledTableCell>
                                    <StyledTableCell align="right"><CircleIcon color={row.isOnline == 1 && row.groundedStatus == 0 ? "success" : "error"}/>{row.groundedStatus  == 0 ? "正常" : "报警"}</StyledTableCell>
                                    <StyledTableCell align="right">{row.lightningCount}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Link to={{pathname:"/deviceHistory/" +row.mcuId}}>
                                            <Button size="small" variant="contained" startIcon={<AvTimerIcon />}>历史数据</Button>
                                        </Link>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer></div>
        </div>
    );
}