
import React from 'react';
import { NumericFormat } from 'react-number-format';

const NumberFormatCustom = (props) => {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
        />
    );
}

export default NumberFormatCustom;