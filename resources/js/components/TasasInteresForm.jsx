import React, { useEffect, useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Container, Typography, Grid, FormHelperText, InputAdornment, Box } from '@mui/material';
import PercentSelect from './PercentSelect';
import { calcularInteres } from '../services/tasaTipoService';
import NumberFormatCustom from './NumberFormatCustom';
import { NumericFormat } from 'react-number-format';

const TasasInteresForm = ({ tasaTipos }) => {
    const [capital, setCapital] = useState(300000);
    const [tasaInteres, setTasaInteres] = useState(5);
    const [tiempoNumero, setTiempoNumero] = useState(3);
    const [tiempoTipo, setTiempoTipo] = useState(1);
    const [periodoTasa, setPeriodoTasa] = useState(1);
    const [tipoTasa, setTipoTasa] = useState("Simple");

    const [response, setResponse] = useState({});

    useEffect(() => {
        setPeriodoTasa(tasaTipos[0].id);
        setTiempoTipo(tasaTipos[0].id);
    }, [tasaTipos])




    const handleSubmit = (e) => {
        e.preventDefault();

        let data = {
            capital: capital,
            tipo_tasa_id: periodoTasa,
            per_tasa: tasaInteres,
            tiempo: tiempoNumero,
            periodo_id: tiempoTipo,
            tipo_tasa: tipoTasa == "Simple",
        }

        calcularInteres(data).then((res) => {
            setResponse(res);
        });

    };

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">Calcular Interes Simple</Typography>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="Capital"
                            value={capital}
                            onChange={(e) => setCapital(e.target.value)}
                            fullWidth
                            margin="normal"
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />                    </Grid>
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


            <Box width={1} height={40} />


            {response["tasa-nombre"] && response["periodo-nombre"] && (
                <>

                    <Typography variant="h4" fontWeight="bold">Resultados</Typography>
                    <Box height={20} width={1} />
                    <Typography fontWeight="bold" variant="h6">
                        <Grid container justifyContent="space-between">
                            <Grid item>Conversion de:</Grid>
                            <Grid item>
                                Tasa de interes {response["tasa-nombre"]} A {response["periodo-nombre"]}
                            </Grid>
                        </Grid>

                        <Box height={20} width={1} />
                    </Typography>
                </>


            )}
            <Box width={1} height={20} />
            {response.intereses && (
                <Typography fontWeight="bold" variant="h6" component="h2">
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            {"Intereses:"}
                        </Grid>
                        <Grid item >
                            <NumericFormat value={response.intereses} decimalScale={0} displayType='text' thousandSeparator prefix={'$ '} />
                        </Grid>
                    </Grid>
                </Typography>
            )}
        </Container >
    );
};

export default TasasInteresForm;