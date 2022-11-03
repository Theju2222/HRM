import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import React from 'react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { FormHelperText } from '@mui/material';

const CustomTimePicker = props => {
    const { value, onChange, name, label, helperText, error } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
                renderInput={props => <TextField {...props} fullWidth/>}
                label={label}
                value={value}
                onChange= {date => {
                    onChange(date && new Date(date).toISOString(), name);
                }}
            />
            <FormHelperText error={error}>{helperText}</FormHelperText>
        </LocalizationProvider>
    );
};

CustomTimePicker.prototype = {
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default CustomTimePicker;
