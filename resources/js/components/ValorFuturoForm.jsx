import { Box, Button, Container, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ResponsiveContainer } from 'recharts';
import { calcularValorFuturo as calcularValorTiempo } from '../services/tasaTipoService';
import CartesianChart from './CartesianChart';
import NumberFormatCustom from './NumberFormatCustom';
import PercentSelect from './PercentSelect';

const ValorFuturoForm = ({ tasaTipos }) => {
    const [valorPresente, setValorPresente] = useState(300000);
    const [tasaInteres, setTasaInteres] = useState(4);
    const [tiempoNumero, setTiempoNumero] = useState(2);
    const [tiempoTipo, setTiempoTipo] = useState(0);
    const [periodoTasa, setPeriodoTasa] = useState(0);
    const [tipoTasa, setTipoTasa] = useState("Simple");
    const [tipoCalculo, setTipoCalculo] = useState("Valor Futuro")

    const [response, setResponse] = useState({});

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
            tipo_tasa: tipoTasa == "Simple",
        }

        calcularValorTiempo(data, tipoCalculo == "Valor Futuro").then((res) => {
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

                <FormControl fullWidth margin="normal">
                    <InputLabel id="tipo-calculo-label">¿Que vas a calcular?</InputLabel>
                    <Select
                        labelId="tipo-calculo-label"
                        id="tipo-calculo-select"
                        value={tipoCalculo}
                        onChange={(e) => setTipoCalculo(e.target.value)}
                    >
                        {["Valor Futuro", "Valor Presente"].map((tipo) => (
                            <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Calcular Valor Presente o Valor Futuro </FormHelperText>
                </FormControl>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label={tipoCalculo == "Valor Futuro" ? "Valor Presente" : "Valor Futuro"}
                            value={valorPresente}
                            onChange={(e) => setValorPresente(e.target.value)}
                            fullWidth
                            margin="normal"
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="tipo-tasa-label">Tipo de Tasa</InputLabel>
                            <Select
                                labelId="tipo-tasa-label"
                                id="tipo-tasa-select"
                                value={tipoTasa}
                                onChange={(e) => setTipoTasa(e.target.value)}
                            >
                                {["Compuesto", "Simple"].map((tipo) => (
                                    <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>Establece el tipo de tasa de interes que deseas aplicar</FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>

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

            {response.segmentos && (
                <>
                    <Typography variant="h5" fontWeight="bold">Valor Futuro</Typography>
                    <Box height={20} width={1} />
                    <CartesianChart data={response.segmentos.map(e => ({
                        X: e.t, Y: e.F, tooltipData: {
                            "Valor Presente": e.P,
                            "Valor Futuro": e.F,
                        }
                    }))} lineLabel="Valor Futuro" XLabel="Periodos" YTickFormatter={formatCurrency} />

                </>
            )
            }
        </Container >
    );
};

export default ValorFuturoForm;