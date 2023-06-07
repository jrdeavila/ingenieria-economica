import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

const PercentSelect = ({ title, onChange, value }) => {

    const [inputValue, setInputValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);

    const handleChange = (_, newValue) => {
        setSelectedValue(newValue);
    };

    const handleInputChange = (_, newInputValue) => {
        setInputValue(newInputValue);
        onChange(newInputValue);
    };

    const handleSubmit = () => {
        // Maneja el envío del valor ingresado aquí
        console.log('Valor ingresado:', inputValue);
    };

    return (
        <div>
            <FormControl margin="normal" fullWidth>

                <Autocomplete
                    value={selectedValue}
                    onChange={handleChange}
                    inputValue={inputValue}
                    onInputChange={handleInputChange}
                    freeSolo
                    options={[1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
                    renderInput={(params) => (
                        <TextField {...params} label="Selecciona o ingresa un valor" />
                    )}
                />
                <FormHelperText>Ingrese el valor de la tasa de interes</FormHelperText>
            </FormControl>
        </div>
    );
};

export default PercentSelect;