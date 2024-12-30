import React, { useState, useEffect } from 'react';
import { useLiveChartContext } from '../utils/hooks/useLiveChartContext';
import { TextField } from '@mui/material';

const LiveTable = () => {
    const { data, dispatch } = useLiveChartContext();
    const nbTotalEvents = data?.events?.length;
    const eventsFiltered = data.events.slice(nbTotalEvents - 20, nbTotalEvents);

    const [newValue, setNewValue] = useState('');

    // Update newValue when editing state changes
    useEffect(() => {
        if (data.editing) {
            setNewValue(data.editing.value);
        }
    }, [data.editing]);
    // Set the field value for editing on cell click
    const handleCellClick = (event, field) => {
        dispatch({
            type: 'set_edit_event',
            payload: {
                eventIndex: event.index,
                field: field,
                value: event[field],
            },
        });
    };
    // Save changes on input blur and reset editing state
    const handleBlur = () => {
        if (data.editing) {
            const updatedEvents = data.events.map((event) =>
                event.index === data.editing.eventIndex
                    ? {
                        ...event,
                        [data.editing.field]: newValue, 
                    }
                    : event
            );
            dispatch({ type: 'update_events', payload: updatedEvents });
            dispatch({
                type: 'set_edit_event',
                payload: { eventIndex: null, field: '', value: '' },
            });
        }
    };
    // Update newValue as the input changes
    const handleChange = (e) => {
        setNewValue(e.target.value);
    };

    return (
        <div className="flex border border-gray-300 rounded">
            <div>
                <div className="p-2">Index</div>
                <div className="p-2 border-t border-gray-300">Value 1</div>
                <div className="p-2 border-t border-gray-300">Value 2</div>
            </div>
            {eventsFiltered.map((event) => (
                <div key={event.index} className="border-l border-gray-300 flex-1">
                    <div className="p-2">{event.index}</div>

                    <div
                        className="p-2 border-t border-gray-300"
                        onClick={() => handleCellClick(event, 'value1')}
                    >
                        {data.editing?.eventIndex === event.index && data.editing?.field === 'value1' ? (
                            <TextField
                            value={newValue}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            autoFocus
                            variant="standard"
                            fullWidth
                            inputProps={{
                                style: { padding: 0, height: '100%' },
                            }}
                        />
                        ) : (
                            event.value1
                        )}
                    </div>

                    <div
                        className="p-2 border-t border-gray-300"
                        onClick={() => handleCellClick(event, 'value2')}
                    >
                        {data.editing?.eventIndex === event.index && data.editing?.field === 'value2' ? (
                            <TextField
                                value={newValue}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                autoFocus
                                variant="standard"
                                fullWidth
                                inputProps={{
                                    style: { padding: 0, height: '100%' },
                                }}
                            />
                        ) : (
                            event.value2
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

LiveTable.propTypes = {

};

export default LiveTable;