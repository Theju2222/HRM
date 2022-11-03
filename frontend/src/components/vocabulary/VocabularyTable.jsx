import { Box, CircularProgress } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useHistory } from 'react-router';
import { getValueOption } from '../../utils/common';
import { candiadteStatusOption, interviewStatusOption, vocabResultOption } from '../../constants';
import { getDateFormat, getDateTimeFormat, getTimeFormat } from '../../utils/common';

import { StyledTableCell, StyledTableRow } from '../common/StyledTable';
import CustomButton from '../form/CustomButton';
import CustomPagination from '../form/CustomPagination';

export default function LeadsTable(props) {
    const { leads, page, handlePageChange, isLoading } = props;
    const totalPage = leads ? leads.total_pages : 0;
    const perPage = leads ? leads.per_page : 0;
    const count = leads ? leads.count : 0;
    const hasLeads = leads && leads.results && !!leads.results.length;
    const history = useHistory();

    return (
        <>
            {isLoading ? (
                <Box sx={{ display: 'flex', margin: '18px', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : hasLeads ? (
                <TableContainer sx={{ mt: 3 }} component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Sl.No.</StyledTableCell>
                                <StyledTableCell align="center">ID.</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Email</StyledTableCell>
                                <StyledTableCell align="center">Phone Number</StyledTableCell>
                                <StyledTableCell align="center">Calling Recruiter</StyledTableCell>
                                <StyledTableCell align="center">Date of Calling</StyledTableCell>
                                <StyledTableCell align="center">2 Years Agreement</StyledTableCell>
                                <StyledTableCell align="center">Night Shift</StyledTableCell>
                                <StyledTableCell align="center">Liquidated Damage</StyledTableCell>
                                <StyledTableCell align="center">WFO</StyledTableCell>
                                <StyledTableCell align="center">Tutoring</StyledTableCell>
                                <StyledTableCell align="center">Relocate</StyledTableCell>
                                <StyledTableCell align="center"> Vocab Interview Status </StyledTableCell>
                                <StyledTableCell align="center">Vocab Interview Date</StyledTableCell>
                                <StyledTableCell align="center">Vocab Interview Time</StyledTableCell>
                                <StyledTableCell align="center"> Vocab Score </StyledTableCell>
                                <StyledTableCell align="center"> Vocab Interview Result </StyledTableCell>
                                <StyledTableCell align="center">Updated At</StyledTableCell>
                                <StyledTableCell align="center">Updated By</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {leads &&
                                leads.results.map((lead, index) => {
                                    return (
                                        <>
                                            {lead.status === 'shortlisted' && (
                                                <StyledTableRow key={lead.id}>
                                                    <StyledTableCell align="center" component="th" scope="row">
                                                        {perPage * (page - 1) + (1 + index)}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">{lead.id}</StyledTableCell>
                                                    <StyledTableCell
                                                        sx={{ cursor: 'pointer', color: 'blue' }}
                                                        align="center"
                                                        onClick={() =>
                                                            history.push(`/vocabulary/edit/${lead.id}`, {
                                                                id: lead.id
                                                            })
                                                        }
                                                    >
                                                        {lead.name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">{lead.email}</StyledTableCell>
                                                    <StyledTableCell align="center">{lead.phone}</StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {lead?.calling_recruiter?.user_name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {getDateFormat(lead.date_of_calling)}
                                                    </StyledTableCell>

                                                    <StyledTableCell align="center">
                                                        {getValueOption(candiadteStatusOption, lead.years_agreement)}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {getValueOption(candiadteStatusOption, lead.night_shift)}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {getValueOption(candiadteStatusOption, lead.liquidated_damage)}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {getValueOption(candiadteStatusOption, lead.wfo)}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {getValueOption(candiadteStatusOption, lead.tutoring)}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {getValueOption(candiadteStatusOption, lead.relocate)}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {getValueOption(
                                                            interviewStatusOption,
                                                            lead.vocab_interview_status
                                                        )}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {getDateTimeFormat(lead.vocab_interview_date)}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {getTimeFormat(lead.vocab_interview_time)}
                                                    </StyledTableCell>

                                                    <StyledTableCell align="center">{lead.vocab_score}</StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {getValueOption(vocabResultOption, lead.vocab_interview_result)}
                                                    </StyledTableCell>

                                                    <StyledTableCell align="center">
                                                        {getDateTimeFormat(lead.updated_at)}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {lead.updated_by && lead.updated_by.user_name}
                                                        <br />
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            )}
                                        </>
                                    );
                                })}
                        </TableBody>
                    </Table>
                    <CustomPagination
                        page={page}
                        handlePageChange={handlePageChange}
                        totalPage={totalPage}
                        count={count}
                        perPage={perPage}
                    />
                </TableContainer>
            ) : (
                <h3>NO DATA</h3>
            )}
        </>
    );
}
