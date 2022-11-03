import SearchIcon from '@mui/icons-material/Search';
import { Grid, Paper, Stack } from '@mui/material';
import React, { useContext, useState } from 'react';

import { FormContext } from '../../contexts/FormContext';
import {
    offeredStatusOptions,
    joinedStatusOptions
} from '../../constants'
import CustomSearchSelect from '../form/CustomSearchSelect';
import userRequest from '../../requests/user-request';
import CustomButton from '../form/CustomButton';
import CustomDatePicker from '../form/CustomDatePicker';
import CustomLoadingButton from '../form/CustomLoadingButton';
import CustomDateTimePicker from '../form/CustomDateTimePicker';
import CustomSelect from '../form/CustomSelect';
import CustomTextField from '../form/CustomTextField';


const OfferedFilter = () => {
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
                    <CustomSelect
                        name="offered_status"
                        label="Offer Letter Status"
                        selectedValue={queries.offered_status}
                        onChange={onChangeHandler}
                        options={offeredStatusOptions}
                    />
                </Grid>
                <Grid item xs={4}>
                    <CustomDatePicker
                        name="offered_date_of_joining"
                        label="Date of Joining"
                        value={queries.offered_date_of_joining}
                        onChange={onChangeDate}
                    />
                </Grid>
           
                <Grid item xs={4}>
                    <CustomSearchSelect
                        name="follow_by"
                        label="Follow up By"
                        availableOptions={callingRecruiter}
                        selectedValue={querySelect.follow_by}
                        onChange={onChangeSearchSelect}
                        onTextChange={e => getCallingRecruiter({ name: e && e.target.value })}
                    />
                </Grid>
                <Grid item xs={4}>
                    <CustomSelect
                        name="joined_status"
                        label="Joined Status"
                        selectedValue={queries.joined_status}
                        onChange={onChangeHandler}
                        options={joinedStatusOptions}
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

export default OfferedFilter;
