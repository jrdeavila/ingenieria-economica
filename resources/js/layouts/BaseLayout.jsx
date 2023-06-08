import MoneyIcon from '@mui/icons-material/Money';
import PercentIcon from '@mui/icons-material/Percent';
import WorkIcon from '@mui/icons-material/Work';
import { Box, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import React, { useContext } from 'react';
import Navbar from "../components/Navbar";
import SnackBarContext from "../contexts/SnackBarContext";

export default function BaseLayout({ children }) {

    const { open, handleClose, message } = useContext(SnackBarContext);

    return (
        <>
            <Navbar items={[
                {
                    name: "Tasas de interes",
                    link: "/tasas-interes",
                    icon: <PercentIcon />
                },

                {
                    name: "Valor del dinero en el tiempo",
                    link: "/",
                    icon: <MoneyIcon />
                },
                {
                    name: "Tabla de Amortizacion",
                    link: "/amortizacion",
                    icon: <WorkIcon />
                },
                {
                    name: "Anualidades",
                    link: "/anualidades",
                    icon: <WorkIcon />
                },
            ]} />
            <Box display="flex" justifyContent="center" paddingTop={5} height="100vh">
                {children}
            </Box>



            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <MuiAlert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {message}
                </MuiAlert>
            </Snackbar>

        </>
    )
}