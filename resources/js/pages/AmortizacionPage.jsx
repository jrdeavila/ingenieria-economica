import { useAsync } from "react-use";
import BaseLayout from "../layouts/BaseLayout";
import React from "react";
import tasaTiposService from "../services/tasaTipoService";
import { Box, CircularProgress } from "@mui/material";
import AnualidadesForm from "../components/Amortizacion";

export default function AnualidadesPage() {
  const { value, loading, error, execute } = useAsync(tasaTiposService, []);
  return (
    <BaseLayout>
      {loading && <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>}
      {error && <p>Hubo un error</p>}
      {value && (
        <AnualidadesForm tasaTipos={value} />
      )}
    </BaseLayout>
  );
}