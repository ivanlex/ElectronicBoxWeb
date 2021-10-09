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
                                    <StyledTableCell align="right">安装地址&nbsp;</StyledTableCell>
                                    <StyledTableCell align="right">添加日期&nbsp;</StyledTableCell>
                                    <StyledTableCell align="right"/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.rows.map((row) => (
                                    <StyledTableRow key={row.mcuId}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.mcuId}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.address}</StyledTableCell>
                                        <StyledTableCell align="right">{row.installDate}</StyledTableCell>
                                        <StyledTableCell align="right">
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