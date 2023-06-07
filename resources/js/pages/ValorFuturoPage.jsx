import { useAsync } from "react-use";
import tasaTiposService from "../services/tasaTipoService";
import React from 'react';
import { Box, CircularProgress } from "@mui/material";
import BaseLayout from "../layouts/BaseLayout";
import ValorFuturoForm from "../components/ValorFuturoForm";

export default function ValorFuturoPage() {
    const { value, loading, error, execute } = useAsync(tasaTiposService, []);
    return (
        <BaseLayout>
            {loading && <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress />
            </Box>}
            {error && <p>Hubo un error</p>}
            {value && (
                <ValorFuturoForm tasaTipos={value} />
            )}
        </BaseLayout>
    );
}