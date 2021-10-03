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

function createData(name, calories, fat, carbs, protein,protein2) {
    return { name, calories, fat, carbs, protein,protein2 };
}

const rows = [
    createData('Dev001', '分闸', '正常', '有雷击', '正常', 2),
    createData('Dev002', '分闸', '正常', '有雷击', '正常', 2),
    createData('Dev003', '分闸', '裂化', '有雷击', '正常', 2),
    createData('Dev004', '合闸', '裂化', '正常', '报警', 2),
    createData('Dev005', '合闸', '裂化', '正常', '报警', 2),
];

export default function DeviceDataTable() {
    return (
        <div className="DeviceDataTable">
            <h2>设备状态一览表</h2>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>设备识别码</StyledTableCell>
                        <StyledTableCell align="right">空开状态</StyledTableCell>
                        <StyledTableCell align="right">裂化状态&nbsp;</StyledTableCell>
                        <StyledTableCell align="right">雷击状态&nbsp;</StyledTableCell>
                        <StyledTableCell align="right">接地状态&nbsp;</StyledTableCell>
                        <StyledTableCell align="right">雷击次数&nbsp;(次)</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.calories}</StyledTableCell>
                            <StyledTableCell align="right">{row.fat}</StyledTableCell>
                            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                            <StyledTableCell align="right">{row.protein}</StyledTableCell>
                            <StyledTableCell align="right">{row.protein2}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer></div>

    );
}