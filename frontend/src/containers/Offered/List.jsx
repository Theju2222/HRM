import querystring from 'query-string';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import OfferedFilter from '../../components/offered/OfferedFilter';
import OfferedTable from '../../components/offered/OfferedTable';
import { FormContext } from '../../contexts/FormContext';
import { useQuery } from '../../hooks/useQuery';
import LeadRequest from '../../requests/lead-request';
import { joinedStatusOptions } from '../../constants';
import { getDateFormat } from '../../utils/common';

const List = () => {
    const history = useHistory();
    const searchQuery = useQuery();
    const [lead, setLead] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const joined_status = searchQuery.get('joined_status');
    const [queries, setQueries] = useState({
        name: searchQuery.get('name') || '',
        email: searchQuery.get('email') || '',
        phone: searchQuery.get('phone') || '',
        offered_date_of_joining: searchQuery.get('offered_date_of_joining') || null,
        offered_status: searchQuery.get('offered_status') || '',
        revised_date_of_joining: searchQuery.get('revised_date_of_joining') || null,
        joined_status: joined_status ? joinedStatusOptions.filter(s => joined_status.split(',').includes(s.key)) : [],
        hr_result:"shortlisted"
    });
    const [querySelect, setQuerySelect] = useState({
        follow_by: JSON.parse(searchQuery.get('follow_by')) || { value: '', keys: '' },
    });
    const [page, setPage] = useState(+searchQuery.get('page') || 1);

    const handleQueryString = ({ page = 1 }) => {
        const queriesObject = {
            ...queries,


            page
        };
        history.replace({
            pathname: 'offered',
            search: querystring.stringify(queriesObject, { skipEmptyString: true, skipNull: true })
        });
        return queriesObject;
    };

    const onChangeSearchSelect =(value, name) => {
        setQuerySelect({
            ...querySelect,
            [name]: value
        })

    }

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
            follow_by: querySelect.follow_by.key,
        }).then(response => {
            setLead(response);
            setIsLoading(false);
        });
    };

    const clearSearch = () => {
        setIsLoading(true);
        setPage(1);
        LeadRequest.index({ page }).then(response => {
            setLead(response);
            setIsLoading(false);
        });
        setQueries({
        
            offered_date_of_joining:  null,
            offered_status:  '',
            revised_date_of_joining:  null,
            joined_status: '',
        });
        setQuerySelect({follow_by: {value: '', key: ''}})

        history.replace('/offered');
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
                <OfferedFilter />
            </FormContext.Provider>

            <OfferedTable
                isLoading={isLoading}
                leads={lead}
                page={page}
                handlePageChange={handlePageChange}
            />
        </>
    );
};

export default List;
