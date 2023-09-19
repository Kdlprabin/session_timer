import React, { createContext } from "react";


interface TimerContextProps {
    currentTime: string;
    currentWorkout: {
        name: string;
        duration: string;
        color?: string;
    };
    startTimeCounter: () => void;
    pauseTimeCounter: () => void;
    nextWorkout: () => void;
    prevWorkout: () => void;
    reset: () => void;
    isTimerRunning: boolean;
    isWorkoutCompleted: boolean;
    isCurrentTimeLessThanFive: boolean;
}
export const TimerContext = createContext<TimerContextProps>({
    currentTime: "00:00",
    currentWorkout: {
        name: "",
        duration: "",
    },
    startTimeCounter: () => { },
    pauseTimeCounter: () => { },
    nextWorkout: () => { },
    prevWorkout: () => { },
    reset: () => { },
    isTimerRunning: false,
    isWorkoutCompleted: false,
    isCurrentTimeLessThanFive: false,
});

const WORKOUT_DATA = [
    {
        name: "High Knees Runs",
        duration: "00:45",
    },
    {
        name: "Rest",
        duration: "00:15",
        color: "bg-green-500"
    },
    {
        name: "Mountain Climbers",
        duration: "00:45",
    },
    {
        name: "Rest",
        duration: "00:15",
        color: "bg-green-500"
    },
    {
        name: "Burpees",
        duration: "00:45",
        color: "bg-green-500"
    }
];

const TimerContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [currentTime, setCurrentTime] = React.useState("00:00");
    const [currentWorkoutId, setCurrentWorkoutId] = React.useState(0);
    const [currentWorkout, setCurrentWorkout] = React.useState(WORKOUT_DATA[currentWorkoutId]);
    const [isTimerRunning, setIsTimerRunning] = React.useState(false);
    const [isWorkoutCompleted, setIsWorkoutCompleted] = React.useState(false);
    const [isCurrentTimeLessThanFive, setIsCurrentTimeLessThanFive] = React.useState(false);

    const startTimeCounter = () => {
        setIsTimerRunning(true);
    }

    const pauseTimeCounter = () => {
        setIsTimerRunning(false);
    }

    React.useEffect(() => {
        setCurrentWorkout(WORKOUT_DATA[currentWorkoutId]);
        setCurrentTime(WORKOUT_DATA[currentWorkoutId].duration);
    }, [currentWorkoutId]);


    React.useEffect(() => {
        if (isTimerRunning) {
            const interval = setInterval(() => {
                const [minutes, seconds] = currentTime.split(":");

                if (Number(minutes) === 0 && Number(seconds) <= 5) {
                    setIsCurrentTimeLessThanFive(true);
                } else {
                    setIsCurrentTimeLessThanFive(false);
                }

                if (Number(seconds) > 0) {
                    setCurrentTime(`${minutes}:${Number(seconds) - 1}`);
                } else if (Number(minutes) > 0 && Number(seconds) === 0) {
                    setCurrentTime(`${Number(minutes) - 1}:59`);
                } else {
                    clearInterval(interval);
                    if (currentWorkoutId < WORKOUT_DATA.length - 1) {
                        setCurrentWorkoutId((prevId) => prevId + 1);
                    }
                    if (currentWorkoutId === WORKOUT_DATA.length - 1) {
                        setIsWorkoutCompleted(true);
                    }
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    })

    const nextWorkout = () => {
        if (currentWorkoutId < WORKOUT_DATA.length - 1) {
            setCurrentWorkoutId((prevId) => prevId + 1);
        } else {
            setIsWorkoutCompleted(true)
        }
    }

    const prevWorkout = () => {
        if (currentWorkoutId > 0) {
            setCurrentWorkoutId((prevId) => prevId - 1);
        }
    }

    const reset = () => {
        setCurrentWorkoutId(0);
        setCurrentTime("00:00");
        setIsTimerRunning(false);
        setIsWorkoutCompleted(false);
    }

    return (
        <TimerContext.Provider value={{ currentTime, currentWorkout, startTimeCounter, pauseTimeCounter, isTimerRunning, nextWorkout, prevWorkout, isWorkoutCompleted, reset, isCurrentTimeLessThanFive }}>
            {children}
        </TimerContext.Provider>
    );
}

export default TimerContextProvider;