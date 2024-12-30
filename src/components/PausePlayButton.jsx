// Pause/play button to toggle the pause state of the chart
import React from 'react';
import { useLiveChartContext } from '../utils/hooks/useLiveChartContext';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
const PausePlayButton = () => {
    const { data, dispatch } = useLiveChartContext();
    return (
        <div className="mb-4">
            <IconButton
                onClick={() => dispatch({ type: 'toggle_pause' })}
                color="primary"
                size="large"
                style={{ border: '2px solid #1976d2' }}>
                {data.paused ? <PlayArrowIcon /> : <PauseIcon />}
            </IconButton>
        </div>
    );
};

export default PausePlayButton;
