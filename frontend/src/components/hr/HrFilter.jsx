import SearchIcon from '@mui/icons-material/Search';
import { Grid, Paper, Stack } from '@mui/material';
import React, { useContext, useState } from 'react';

import { FormContext } from '../../contexts/FormContext';
import {
    hrResultOption,
    interviewStatusOption,
    
} from '../../constants'
import CustomSearchSelect from '../form/CustomSearchSelect';
import userRequest from '../../requests/user-request';
import CustomButton from '../form/CustomButton';
import CustomDatePicker from '../form/CustomDatePicker';
import CustomLoadingButton from '../form/CustomLoadingButton';
import CustomDateTimePicker from '../form/CustomDateTimePicker';
import CustomSelect from '../form/CustomSelect';
import CustomTextField from '../form/CustomTextField';


const HrFilter = () => {
    const {
        onChangeDate,
        querySelect,
        clearSearch,
        isLoading,
        onChangeHandler,
        onChangeSearchSelect,
        queries,
        submitSearch
    } = useContext(FormContext);

    const [callingRecruiter, setCallingRecruiter] = useState([]);

    const getCallingRecruiter = async filter => {
        const users = await userRequest.index(filter);
        const callingRecruiter = users.results.length
            ? users.results.map(option => {
                  return {
                      key: option.id,
                      value: option.user_name
                  };
              })
            : [];
        setCallingRecruiter(callingRecruiter);
    };
   
    return (
        <Paper component="form" sx={{ p: 4, width: '100%' }}>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={4}>
                    <CustomSearchSelect
                        name="hr_calling_recruiter"
                        label="Calling Recruiter"
                        availableOptions={callingRecruiter}
                        selectedValue={querySelect.hr_calling_recruiter}
                        onChange={onChangeSearchSelect}
                        onTextChange={e => getCallingRecruiter({ name: e && e.target.value })}
                    />
                </Grid>
                <Grid item xs={4}>
                    <CustomDatePicker
                        name="hr_date_of_calling"
                        label="Date of Calling"
                        value={queries.hr_date_of_calling}
                        onChange={onChangeDate}
                    />
                </Grid>
                <Grid item xs={4}>
                    <CustomSelect
                        name="hr_interview_status"
                        label="HR Interview Status"
                        selectedValue={queries.hr_interview_status}
                        onChange={onChangeHandler}
                        options={interviewStatusOption}
                    />
                </Grid>
                
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
            <Grid item xs={4}>
                    <CustomDatePicker
                        name="hr_interview_date"
                        label="HR Interview Date and Time"
                        value={queries.hr_interview_date}
                        onChange={onChangeDate}
                    />
                </Grid>
                
                <Grid item xs={4}>
                    <CustomSelect
                        name="hr_result"
                        label="HR Result"
                        selectedValue={queries.hr_result}
                        onChange={onChangeHandler}
                        options={hrResultOption}
                    />
                </Grid>
               
            </Grid>

           
            
            
                <Grid container spacing={2} marginBottom={2}>
            <Grid item xs={4}>
                    <CustomTextField
                        name="name"
                        label="Name"
                        value= {queries.name}
                        onChange={onChangeHandler}
                    />
                </Grid>
                
                <Grid item xs={4}>
                    <CustomTextField
                        name="email"
                        label="Email"
                        value= {queries.email}
                        onChange={onChangeHandler}
                    />
                </Grid>
                
                <Grid item xs={4}>
                    <CustomTextField
                        name="phone"
                        label="Phone Number"
                        value={queries.phone}
                        onChange={onChangeHandler}
                    />
                </Grid>
            </Grid>
            <Grid container sx={{ mt: 2 }}>
                <Stack spacing={2} direction="row">
                    <CustomLoadingButton
                        onClick={submitSearch}
                        loading={isLoading}
                        startIcon={<SearchIcon />}
                        variant="contained"
                        text="Search"
                    ></CustomLoadingButton>
                    <CustomButton onClick={clearSearch} text="Clear" variant="outlined" />
                </Stack>
            </Grid>
        </Paper>
    );
};

export default HrFilter;
