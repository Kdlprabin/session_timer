import React from "react";
import TimerContextProvider from "./context/TimerContext";

const providers = ({ children }: { children: React.ReactNode }) => {
  return <React.Fragment>
    <TimerContextProvider>
      {children}
    </TimerContextProvider>
  </React.Fragment>;
};

export default providers;
