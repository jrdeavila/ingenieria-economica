import { useAsync } from "react-use";
import tasaTiposService from "../services/tasaTipoService";
import { Box, CircularProgress } from "@mui/material";
import React from 'react';
import TasasInteresForm from "../components/TasasInteresForm";
import BaseLayout from "../layouts/BaseLayout";

export default function TasaInteresPage() {
    const { value, loading, error, execute } = useAsync(tasaTiposService, []);

    return (
        <BaseLayout>
            {loading && <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress />
            </Box>}
            {error && <p>Hubo un error</p>}
            {value && (
                <TasasInteresForm tasaTipos={value} />
            )}
        </BaseLayout>
    );
}