import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

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

export class DeviceMaintainTable extends React.Component{

    constructor(props) {
        super(props);
        this.getTime = this.getTime.bind(this);
    }


    getTime(date){
            var now = new Date(date),
                y = now.getFullYear(),
                m = now.getMonth() + 1,
                d = now.getDate();
            return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
    }

    render() {
        return (
            <div>
                <div className="DeviceDataTable">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>设备识别码</StyledTableCell>
                                    <StyledTableCell align="center">设备描述&nbsp;</StyledTableCell>
                                    <StyledTableCell align="center">分组&nbsp;</StyledTableCell>
                                    <StyledTableCell align="center">安装地址&nbsp;</StyledTableCell>
                                    <StyledTableCell align="center">添加日期&nbsp;</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Button size="medium" variant="contained" onClick={this.props.handleShowAddDialog}>新增</Button>
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.rows.map((row) => (
                                    <StyledTableRow key={row.mcuId} onClick={() => this.props.handleShowOnMap(row.longitude,row.latitude)}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.mcuId}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.desc}</StyledTableCell>
                                        <StyledTableCell align="center">{row.group}</StyledTableCell>
                                        <StyledTableCell align="center">{row.address}</StyledTableCell>
                                        <StyledTableCell align="center">{this.getTime(row.installDate)}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Button size="small" variant="contained" onClick={() => this.props.handleUpdate(row)} startIcon={<HighlightOffIcon />}>修改</Button>
                                            <Button size="small" variant="contained" onClick={() => this.props.handleDelete(row.mcuId)} startIcon={<HighlightOffIcon />}>删除</Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer></div>
            </div>
        );
    }
}