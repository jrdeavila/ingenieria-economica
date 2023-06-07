import { useAsync } from "react-use";
import tasaTiposService from "../services/tasaTipoService";
import React from 'react';
import { Box, CircularProgress } from "@mui/material";
import BaseLayout from "../layouts/BaseLayout";
import ValorTiempoForm from "../components/ValorTiempo";

export default function ValorTiempoPage() {
    const { value, loading, error, execute } = useAsync(tasaTiposService, []);
    return (
        <BaseLayout>
            {loading && <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress />
            </Box>}
            {error && <p>Hubo un error</p>}
            {value && (
                <ValorTiempoForm tasaTipos={value} />
            )}
        </BaseLayout>
    );
}