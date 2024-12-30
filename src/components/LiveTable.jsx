import React, { useState } from 'react';
import { useLiveChartContext } from '../utils/hooks/useLiveChartContext';
import TextField from '@mui/material/TextField';
const LiveTable = props => {
    const { data, dispatch } = useLiveChartContext();
    const nbTotalEvents = data?.events?.length;
    const eventsFiltered = data.events.slice(nbTotalEvents - 20, nbTotalEvents);

    const [editingIndex, setEditingIndex] = useState(null);
    const [newValue, setNewValue] = useState('');
    const [editingField, setEditingField] = useState(''); 

    // Handles click event on a cell to enable editing
    const handleCellClick = (index, value, field) => {
        setEditingIndex(index);
        setNewValue(value);
        setEditingField(field); 
    };

    // Handles blur event to save changes 
    const handleBlur = () => {
        if (editingIndex !== null) {
            const updatedEvents = data.events.map(event =>
                event.index === editingIndex
                    ? {
                        ...event,
                        [editingField]: newValue, 
                    }
                    : event
            );

            dispatch({ type: 'update_events', payload: updatedEvents });
            setEditingIndex(null);
            setEditingField('');
        }
    };

    // Updates the new value in the state during editing
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
                        onClick={() => handleCellClick(event.index, event.value1, 'value1')} // Pass field 'value1'
                    >
                        {editingIndex === event.index && editingField === 'value1' ? (
                            <TextField
                                value={newValue}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                autoFocus
                                variant="standard"
                                fullWidth
                            />
                        ) : (
                            event.value1
                        )}
                    </div>

                    <div
                        className="p-2 border-t border-gray-300"
                        onClick={() => handleCellClick(event.index, event.value2, 'value2')} 
                    >
                        {editingIndex === event.index && editingField === 'value2' ? (
                            <TextField
                                value={newValue}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                autoFocus
                                variant="standard"
                                fullWidth
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