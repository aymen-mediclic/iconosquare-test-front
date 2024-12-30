// ResetButton to reset all the updated values in the LiveChart component
import React from 'react';
import { useLiveChartContext } from '../utils/hooks/useLiveChartContext';
import IconButton from '@mui/material/IconButton';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const ResetButton = () => {
    const { dispatch } = useLiveChartContext();

    const handleReset = () => {
        // Dispatch the reset action
        dispatch({ type: 'reset_events' });
    };

    return (
        <div className="mb-4">
            <IconButton
                onClick={handleReset}
                color="secondary"
                size="large"
                style={{ border: '2px solid #1976d2' }}
            >
                <RestartAltIcon sx={{ color: '#1976d2' }} />
            </IconButton>
        </div>
    );
};

export default ResetButton;
