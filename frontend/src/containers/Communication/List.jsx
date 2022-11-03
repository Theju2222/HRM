import querystring from 'query-string';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import CommunicationFilter from '../../components/communication/CommunicationFilter';
import CommunicationTable from '../../components/communication/CommunicationTable';
import LeadRequest from '../../requests/lead-request';
import { FormContext } from '../../contexts/FormContext';
import { useQuery } from '../../hooks/useQuery';
import { vocabResultOption } from '../../constants';
import { getDateFormat } from '../../utils/common';

const List = () => {
    const history = useHistory();
    const searchQuery = useQuery();
    const [lead, setLead] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const communication_result = searchQuery.get('communication_result');
    const [queries, setQueries] = useState({
        calling_recruiter: searchQuery.get('calling_recruiter') || '',
        communication_calling_recruiter: searchQuery.get('communication_calling_recruiter') || '',
        name: searchQuery.get('name') || '',
        email: searchQuery.get('email') || '',
        phone: searchQuery.get('phone') || '',
        communication_date_of_calling: searchQuery.get('communication_date_of_calling') || null,
        communication_interview_status: searchQuery.get('communication_interview_status') || '',
        communication_interview_date: searchQuery.get('communication_interview_date') || null,

        communication_grade: searchQuery.get('communication_grade') || '',
        communication_result: communication_result ? vocabResultOption.filter(s => communication_result.split(',').includes(s.key)) : [],
        vocab_interview_result:"qualified"
    });
    const [querySelect, setQuerySelect] = useState({
        communication_calling_recruiter: JSON.parse(searchQuery.get('communication_calling_recruiter')) || { value: '', keys: '' },
    });
    const [page, setPage] = useState(+searchQuery.get('page') || 1);

    const handleQueryString = ({ page = 1 }) => {
        const queriesObject = {
            ...queries,


            page
        };
        history.replace({
            pathname: 'communication',
            search: querystring.stringify(queriesObject, { skipEmptyString: true, skipNull: true })
        });
        return queriesObject;
    };

    const handlePageChange = (e, value) => {
        handleQueryString({ page: value });
        setPage(value);
    };

    const onChangeHandler = e => {
        const { value, name } = e.target;

        setQueries({
            ...queries,
            [name]: value
        });
    };
    const onChangeDate = (value, name) => {
        setQueries(prev => ({
            ...prev,
            [name]: getDateFormat(value)
        }));
    };
 
    const submitSearch = () => {
        setIsLoading(true);
        setPage(1);
        const queriesObject = handleQueryString({ page: 1 });
        LeadRequest.index({
            ...queriesObject,
            communication_calling_recruiter: querySelect.communication_calling_recruiter.key,
        }).then(response => {
            setLead(response);
            setIsLoading(false);
        });
    };
    const onChangeSearchSelect =(value, name) => {
        setQuerySelect({
            ...querySelect,
            [name]: value
        })

    }
    const clearSearch = () => {
        setIsLoading(true);
        setPage(1);
        LeadRequest.index({ page }).then(response => {
            setLead(response);
            setIsLoading(false);
        });
        setQueries({

            communication_date_of_calling: null,
            communication_interview_status:  '',
            communication_interview_date:  null,

            communication_grade:  '',
            communication_result:  '',
        });
        setQuerySelect({communication_calling_recruiter: {value: '', key: ''}})
        history.replace('/communication');
    };

    useEffect(() => {
        let isSubscribed = true;
        LeadRequest.index({
            ...queries,

            page
        }).then(response => {
            if (isSubscribed) {
                setLead(response);
                setIsLoading(false);
            }
        });
        return () => (isSubscribed = false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return (
        <>
            <FormContext.Provider
                 value={{
                    clearSearch,
                    isLoading,
                    onChangeHandler,
                    onChangeSearchSelect,
                    queries,
                    querySelect,
                    onChangeDate,
                    submitSearch
                }}
            >
                <CommunicationFilter />
            </FormContext.Provider>

            <CommunicationTable
                isLoading={isLoading}
                leads={lead}
                page={page}
                handlePageChange={handlePageChange}
            />
        </>
    );
};

export default List;
