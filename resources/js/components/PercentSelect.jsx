import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';

const PercentSelect = ({ title, onChange, value }) => {
    const [selectedPercentage, setSelectedPercentage] = useState(value || 1);

    const handleSelectChange = (event) => {
        setSelectedPercentage(event.target.value);
        onChange(event.target.value);
    };

    const renderPercentageOptions = () => {
        const options = [];
        for (let i = 1; i <= 100; i++) {
            options.push(
                <MenuItem key={i} value={i}>
                    {i}%
                </MenuItem>
            );
        }
        return options;
    };

    return (
        <FormControl fullWidth margin="normal">
            <InputLabel id="percentage-select-label">{title}</InputLabel>
            <Select
                labelId="percentage-select-label"
                id="percentage-select"
                value={selectedPercentage}
                onChange={handleSelectChange}
            >
                {renderPercentageOptions()}
            </Select>

            <FormHelperText>Establece el porcentaje de tasa de interes que se va a aplicar</FormHelperText>
        </FormControl>
    );
};

export default PercentSelect;