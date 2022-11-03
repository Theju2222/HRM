import SearchIcon from '@mui/icons-material/Search';
import { Grid, Paper, Stack } from '@mui/material';
import React, { useContext, useState } from 'react';

import { FormContext } from '../../contexts/FormContext';
import {
    candiadteStatusOption,
    interviewStatusOption,
    vocabResultOption
} from '../../constants'
import CustomButton from '../form/CustomButton';
import CustomDatePicker from '../form/CustomDatePicker';
import CustomLoadingButton from '../form/CustomLoadingButton';
import CustomDateTimePicker from '../form/CustomDateTimePicker';
import CustomSearchSelect from '../form/CustomSearchSelect';
import CustomSelect from '../form/CustomSelect';
import CustomTextField from '../form/CustomTextField';
import userRequest from '../../requests/user-request';
import CustomTimePicker from '../form/CustomTimePicker';
import { useEffect } from 'react';


const VocabularyFilter = () => {
    const {
        onChangeDate,
        querySelect,
        clearSearch,
        isLoading,
        onChangeHandler,
        onChangeSearchSelect,
        queries,
        submitSearch,
        onChangeDateTime
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

    const [viTime,setViTime] = useState(new Date());
    const [viDate, setViDate] = useState(new Date());

    const onChangeViTime = (value) => {
        setViTime(value)
    }

    const onChangeViDate = (value) => {
        setViDate(value)
    }
    
    const convertTime = timeStr => {
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') {
           hours = '00';
        }
        if (modifier === 'PM') {
           hours = parseInt(hours, 10) + 12;
        }
        return `${hours}:${minutes}`;
     };
    
    
     useEffect(()=>{

        let datepart = new Date(viDate)
        datepart = datepart.toISOString().split("T")[0]
        let timepart = new Date(viTime)
        let curDate = new Date(timepart);
        const offset = timepart.getTimezoneOffset()
        curDate = new Date(curDate.getTime() - (offset*60*1000))
        timepart = curDate.toISOString().split('T')[1]
        // timepart = timepart.toISOString().split("T")[1]
        // timepart = convertTime(timepart)
        let viDateTime = datepart + "T" + timepart
        console.log("timecheck", viDateTime);
        onChangeDateTime(viDateTime, "vocab_interview_date")
    },[viDate,viTime])

    
   
    return (
        <Paper component="form" sx={{ p: 4, width: '100%' }}>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={3}>
                    <CustomSearchSelect
                        name="calling_recruiter"
                        label="Calling Recruiter"
                        availableOptions={callingRecruiter}
                        selectedValue={querySelect.calling_recruiter}
                        onChange={onChangeSearchSelect}
                        onTextChange={e => getCallingRecruiter({ name: e && e.target.value })}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomDatePicker
                        name="date_of_calling"
                        label="Date of Calling"
                        value={queries.date_of_calling}
                        onChange={onChangeDate}
                    />
                </Grid>
                
                <Grid item xs={3}>
                    <CustomSelect
                        name="years_agreement"
                        label="Years Agreement"
                        selectedValue={queries.years_agreement}
                        onChange={onChangeHandler}
                        options={candiadteStatusOption}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomSelect
                        name="night_shift"
                        label="Night Shift"
                        selectedValue={queries.night_shift}
                        onChange={onChangeHandler}
                        options={candiadteStatusOption}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
            <Grid item xs={3}>
                    <CustomSelect
                        name="liquidated_damage"
                        label="Liquidated Damage "
                        selectedValue={queries.liquidated_damage}
                        onChange={onChangeHandler}
                        options={candiadteStatusOption}
                    />
                </Grid>
                
                <Grid item xs={3}>
                    <CustomSelect
                        name="wfo"
                        label="WFO"
                        selectedValue={queries.wfo}
                        onChange={onChangeHandler}
                        options={candiadteStatusOption}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomSelect
                        name="tutoring"
                        label="Tutoring"
                        selectedValue={queries.tutoring}
                        onChange={onChangeHandler}
                        options={candiadteStatusOption}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomSelect
                        name="relocate"
                        label="Relocate"
                        selectedValue={queries.relocate}
                        onChange={onChangeHandler}
                        options={candiadteStatusOption}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2} marginBottom={2}>
            <Grid item xs={3}>
                    <CustomSelect
                        name="vocab_interview_status"
                        label="Vocab Interview Status"
                        selectedValue={queries.vocab_interview_status}
                        onChange={onChangeHandler}
                        options={interviewStatusOption}
                    />
                </Grid>
                
                <Grid item xs={3}>
                    <CustomDatePicker
                        name="vocab_interview_date"
                        label="Vocab Interview Date"
                        value={viDate}
                        onChange={onChangeViDate}
                    />
                </Grid>

                <Grid item xs={3}>
                    <CustomTimePicker
                        name="vocab_interview_time"
                        label="Vocab Interview Time"
                        value={viTime}
                        onChange={onChangeViTime}
                    />
                </Grid>
                
                <Grid item xs={3}>
                    <CustomTextField
                        name="vocab_score"
                        label="Vocab Score"
                        value={queries.vocab_score}
                        onChange={onChangeHandler}
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomSelect
                        name="vocab_interview_result"
                        label="Vocab Interview Result"
                        selectedValue={queries.vocab_interview_result}
                        onChange={onChangeHandler}
                        options={vocabResultOption}
                    />
                </Grid>
            </Grid>
            
            
                <Grid container spacing={2} marginBottom={2}>
            <Grid item xs={3}>
                    <CustomTextField
                        name="name"
                        label="Name"
                        value= {queries.name}
                        onChange={onChangeHandler}
                    />
                </Grid>
                
                <Grid item xs={3}>
                    <CustomTextField
                        name="email"
                        label="Email"
                        value= {queries.email}
                        onChange={onChangeHandler}
                    />
                </Grid>
                
                <Grid item xs={3}>
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

export default VocabularyFilter;
