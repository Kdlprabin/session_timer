import { useParams } from "react-router-dom";
import { TimerContext } from "../../context/TimerContext";
import { useContext } from "react";
import React from "react";
import { cn } from "../../lib/utils";
import { useNavigate } from "react-router-dom";
import { PauseCircleIcon, PlayCircleIcon } from "@heroicons/react/20/solid";

const Index = () => {
  const { id } = useParams();
  const { currentTime, isTimerRunning, pauseTimeCounter, startTimeCounter, currentWorkout, nextWorkout, prevWorkout, isWorkoutCompleted, isCurrentTimeLessThanFive, reset } = useContext(TimerContext);
  const navigate = useNavigate();


  const Back = () => {
    navigate(-1);
  }
  return (
    <div className="flex flex-col w-full h-full items-center justify-between gap-10 pt-10 pb-10">
      <div className="text-xl text-white uppercase">
        {id}
      </div>
      {
        isWorkoutCompleted ?
          <React.Fragment>
            <div className="text-3xl text-white p-3 rounded uppercase font-semibold">
              Workout Completed
            </div>
            <div
              className="flex gap-5">
              <button
                onClick={reset}
                className="bg-slate-600 pl-10 pr-10 pt-5 pb-5 rounded-lg uppercase text-sm text-white hover:bg-slate-500 font-bold">
                Restart
              </button>
              <button
                onClick={Back}
                className="bg-slate-600 pl-10 pr-10 pt-5 pb-5 rounded-lg uppercase text-sm text-white hover:bg-slate-500 font-bold"
              >
                Back
              </button>
            </div>
          </React.Fragment>
          :
          <React.Fragment>
            <div className={cn("text-9xl text-white bg-slate-800 p-10 rounded-full w-[450px] text-center", currentWorkout?.color, isCurrentTimeLessThanFive && "ring-2 ring-red-500 ring-offset-transparent ring-offset-8")}>
              {
                currentTime
              }
            </div>
            <div className={cn("text-5xl text-white p-3 rounded uppercase", currentWorkout?.color)}>
              {currentWorkout.name}
            </div>
            {
              isTimerRunning ?
                <button
                  title="Pause workout"
                  onClick={pauseTimeCounter}
                  className="bg-slate-600 pl-10 pr-10 pt-5 pb-5 rounded-full uppercase text-sm text-white hover:bg-slate-500 font-semibold">
                  <PauseCircleIcon className="w-8 h-8" />
                </button>
                : <button
                  title="Start workout"
                  onClick={startTimeCounter}
                  className="bg-slate-600 pl-10 pr-10 pt-5 pb-5 rounded-full uppercase text-sm text-white hover:bg-slate-500 font-semibold">
                  <PlayCircleIcon className="w-8 h-8" />
                </button>
            }
            <div className="flex gap-5">
              <button
                title="Go to previous workout"
                onClick={prevWorkout}
                className="bg-slate-600 pl-10 pr-10 pt-5 pb-5 rounded-lg uppercase text-sm text-white hover:bg-slate-500 font-semibold"
              >
                Previous
              </button>
              <button
                title="Skip to next workout"
                onClick={nextWorkout}
                className="bg-slate-600 pl-10 pr-10 pt-5 pb-5 rounded-lg uppercase text-sm text-white hover:bg-slate-500 font-semibold">
                skip
              </button>
            </div>
          </React.Fragment>
      }
    </div >
  );
}

export default Index;
