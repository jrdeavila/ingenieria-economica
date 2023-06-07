import { FormControlLabel, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(
    order,
    orderBy,
) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export default function AnualidadesTable({ data }) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        setRows(data);
    }, [])



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );
    return (
        <>
            <Paper>

                <TableContainer>
                    <Table aria-label="simple table">

                        <TableHead >
                            <TableRow>
                                {["Mes", "Saldo Inicial", "Pago Mensual", "Interes", "Capital Pagado", "Saldo Restante"].map(e => (
                                    <TableCell>{e}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {visibleRows && visibleRows.map(e => (
                                <TableRow
                                    key={e.SaldoRestante}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{e.Mes}</TableCell>
                                    <TableCell>{e.SaldoInicial}</TableCell>
                                    <TableCell>{e.PagoMensual}</TableCell>
                                    <TableCell>{e.Interes}</TableCell>
                                    <TableCell>{e.CapitalPagado}</TableCell>
                                    <TableCell>{e.SaldoRestante}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </Paper>
        </>
    );
}