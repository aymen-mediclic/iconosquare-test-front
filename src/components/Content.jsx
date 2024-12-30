import React from 'react';
import LiveTable from './LiveTable';
import LiveChart from './LiveChart';
import PausePlayButton from './PausePlayButton';
const Content = () => {
    return (
        <div className="mx-auto max-w-7xl px-8">
            <PausePlayButton />
            <LiveChart />
            <LiveTable />
        </div>
    )
}

export default Content;