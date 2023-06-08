import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";

export default function AnualidadesTable({ data }) {

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

                            {data && data.map(e => (
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
            </Paper>
        </>
    );
}