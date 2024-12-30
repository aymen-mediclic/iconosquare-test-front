import React from 'react';
import LiveTable from './LiveTable';
import LiveChart from './LiveChart';
import PausePlayButton from './PausePlayButton';
import ResetButton from './ResetButton';
const Content = () => {
    return (
        <div className="mx-auto max-w-7xl px-8">
            <div className="flex ml-4 space-x-4">
                <PausePlayButton />
                <ResetButton />
            </div>
            <LiveChart />
            <LiveTable />
        </div>
    )
}

export default Content;