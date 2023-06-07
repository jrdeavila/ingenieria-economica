import { Box, Button, Container, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { calcularAnualidades, calcularValorFuturo as calcularValorTiempo } from '../services/tasaTipoService';
import NumberFormatCustom from './NumberFormatCustom';
import PercentSelect from './PercentSelect';
import AnualidadesTable from './AmortizacionTable';

const AnualidadesForm = ({ tasaTipos }) => {
    const [valorPresente, setValorPresente] = useState(300000);
    const [tasaInteres, setTasaInteres] = useState(4);
    const [tiempoNumero, setTiempoNumero] = useState(2);
    const [tiempoTipo, setTiempoTipo] = useState(0);
    const [periodoTasa, setPeriodoTasa] = useState(0);

    const [response, setResponse] = useState(null);

    useEffect(() => {
        setPeriodoTasa(tasaTipos[0].id);
        setTiempoTipo(tasaTipos[0].id);
    }, [tasaTipos])







    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            capital: valorPresente,
            tipo_tasa_id: periodoTasa,
            per_tasa: tasaInteres,
            tiempo: tiempoNumero,
            periodo_id: tiempoTipo,
        }

        calcularAnualidades(data).then((res) => {
            console.log(res);
            setResponse(res);
        });
    };

    const formatCurrency = (value) => {
        return `$${value.toLocaleString()}`;
    };

    return (
        <Container>
            <form onSubmit={handleSubmit}>

                <TextField
                    label="Capital"
                    value={valorPresente}
                    onChange={(e) => setValorPresente(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                />


                <Grid container spacing={2}>

                    <Grid item xs={6}>
                        <PercentSelect value={tasaInteres} title="tasa de interes" onChange={e => setTasaInteres(e)} />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="periodo-tasa-label">Periodo de Tasa</InputLabel>
                            <Select
                                labelId="periodo-tasa-label"
                                id="periodo-tasa-select"
                                value={periodoTasa}
                                onChange={(e) => setPeriodoTasa(e.target.value)}
                            >
                                {tasaTipos.map((tasaTipo) => (
                                    <MenuItem key={tasaTipo.id} value={tasaTipo.id}>{tasaTipo.nombre}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>Establece el tipo de tasa de interes que deseas aplicar</FormHelperText>
                        </FormControl>
                    </Grid>

                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField
                            label="Tiempo"
                            helperText="Numero de meses, o a"
                            value={tiempoNumero}
                            onChange={(e) => setTiempoNumero(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={8}>

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="tipo-tasa-label">Periodo</InputLabel>
                            <Select
                                labelId="tipo-tasa-label"
                                id="tipo-tasa-select"
                                value={tiempoTipo}
                                onChange={(e) => setTiempoTipo(e.target.value)}
                            >
                                {tasaTipos.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>{item.nombre}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>Periodo de tiempo en el cual se va aplicar</FormHelperText>
                        </FormControl>

                    </Grid>
                </Grid>


                <Button variant="contained" type="submit">Calcular</Button>
            </form>

            <Box height={200} width={1} />
            <Box padding={10}>


                {
                    response && (
                        <AnualidadesTable data={response} />
                    )
                }
            </Box>
        </Container >
    );
};

export default AnualidadesForm;