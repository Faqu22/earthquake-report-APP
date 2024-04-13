import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import EventItems from './EventItems.js'
import Pagination from './Pagination.js';
import {Button} from "@nextui-org/react";
import ErrorToast from './ErrorToast.js';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState(null);
    const [urlFilter, setUrlFilter] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            setIsLoading(true); 
            try {
                const query = queryString.stringify(urlFilter);
                const response = await axios.get('http://localhost:3000/api/features?' + query);
                setEvents(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, [urlFilter]);

    return (
        <>
            {isLoading && <div class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" >
            <Button color="primary" variant="shadow" isLoading>
              Loading
            </Button> </div>}
            {events.pagination && <Pagination pagination={events.pagination} setUrlFilter={setUrlFilter} urlFilter={urlFilter}/>}
            {error && <ErrorToast message={`Ocurrió un error: ${error.message}`} onClose={() => setError(null)}/>}
            <div>
            {events.data && <EventItems events={events.data} setUrlFilter={setUrlFilter} urlFilter={urlFilter}/>}
            </div>
        </>
    );
};

export default EventList;