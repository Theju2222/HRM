import { Box, Checkbox, CircularProgress } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useHistory } from 'react-router';
import { leadStatusOption } from '../../constants';
import { getValueOption } from '../../utils/common';
import { getDateFormat, getDateTimeFormat } from '../../utils/common';
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
                                <StyledTableCell align="center">No.</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Email</StyledTableCell>
                                <StyledTableCell align="center">DOB</StyledTableCell>
                                <StyledTableCell align="center">Phone</StyledTableCell>
                                <StyledTableCell align="center">Curent City</StyledTableCell>
                                <StyledTableCell align="center">College</StyledTableCell>
                                <StyledTableCell align="center">Degree</StyledTableCell>
                                <StyledTableCell align="center">Branch</StyledTableCell>
                                <StyledTableCell align="center">Year of Graduation</StyledTableCell>
                                <StyledTableCell align="center">Sources</StyledTableCell>
                                <StyledTableCell align="center"> <Checkbox defaultChecked color='default'/> </StyledTableCell>
                                <StyledTableCell align="center">Created At</StyledTableCell>
                                <StyledTableCell align="center">Created By</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {leads.results.map((lead, index) => {
                                return (
                                    <>
                                        {lead.status === 'rejected' && (
                                            <StyledTableRow key={lead.id}>
                                                <StyledTableCell align="center" component="th" scope="row">
                                                    {perPage * (page - 1) + (1 + index)}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{lead.id}</StyledTableCell>
                                                    <StyledTableCell
                                                        sx={{ cursor: 'pointer', color: 'blue' }}
                                                        align="center"
                                                        onClick={() =>
                                                            history.push(`/leads/edit/${lead.id}`, {
                                                                id: lead.id
                                                            })
                                                        }
                                                    >
                                                        {lead.name}
                                                    </StyledTableCell>
                                                <StyledTableCell align="center">{lead.email}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {getDateFormat(lead.date_of_birth)}
                                                </StyledTableCell>

                                                <StyledTableCell align="center">{lead.phone}</StyledTableCell>
                                                <StyledTableCell align="center">{lead.current_city}</StyledTableCell>
                                                <StyledTableCell align="center">{lead.college}</StyledTableCell>
                                                <StyledTableCell align="center">{lead.degree}</StyledTableCell>
                                                <StyledTableCell align="center">{lead.branch}</StyledTableCell>

                                                <StyledTableCell align="center">
                                                    {lead.year_of_graduation}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{lead.sources}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {getValueOption(leadStatusOption, lead.status)}
                                                </StyledTableCell>

                                                <StyledTableCell align="center">
                                                    {getDateTimeFormat(lead.updated_at)}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {lead.created_by && lead.created_by.user_name}
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
