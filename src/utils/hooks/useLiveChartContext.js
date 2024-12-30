import React, { useContext, useReducer, createContext, useEffect } from "react";
import { createRandomEvent } from "../utils";

const LiveChartContext = createContext();

const initialEvents = Array.from(Array(50)).map((_, ix) =>
  createRandomEvent(ix)
);

const initialData = {
  events: initialEvents,
  paused: false,
};

const liveChartReducer = (state, action) => {
  switch (action.type) {
    case "new_event":
      // Adds a new event unless paused
      if (state.paused) return state;
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case "toggle_pause":
      // Toggles the paused state
      return {
        ...state,
        paused: !state.paused,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const LiveChartProvider = ({ children }) => {
  const [data, dispatch] = useReducer(liveChartReducer, initialData);
  // Set an interval to dispatch new events, unless paused
  useEffect(() => {
    const interval = setInterval(() => {
      if (!data.paused) {
        dispatch({
          type: "new_event",
          payload: createRandomEvent(data.events.length),
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [data.paused, data.events.length]);
  return (
    <LiveChartContext.Provider
      value={{
        data,
        dispatch,
      }}
    >
      {children}
    </LiveChartContext.Provider>
  );
};

const useLiveChartContext = () => {
  const context = useContext(LiveChartContext);
  if (!context) {
    throw new Error(
      "useLiveChartContext should be used within an LiveChartProvider"
    );
  }

  return context;
};

export { LiveChartProvider, useLiveChartContext };
