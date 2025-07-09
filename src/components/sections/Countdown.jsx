import React from "react";
import Title from "./Title";

const Countdown = ({ now, countdown, quest }) => {
  return (
    <div>
      <div className="mt-3">
        {now <= quest.voteStart && <Title title={"Voting starts on"} />}
        {now > quest.voteStart && now <= quest.voteEnd && (
          <Title title={"Voting ends on"} />
        )}
        {now > quest.voteEnd && now <= quest.executionDelay && (
          <Title title={"Awaiting quest execution"} />
        )}
      </div>
      <div className="flex flex-row gap-2 items-center justify-center mb-6">
        <div className="bg-primary rounded-xl size-16 flex items-center justify-center">
          <h1 className="text-secondary font-semibold text-2xl">
            {countdown.days}d
          </h1>
        </div>
        <div className="text-secondary font-bold">:</div>
        <div className="bg-primary rounded-xl size-16 flex items-center justify-center">
          <h1 className="text-secondary font-semibold text-2xl">
            {countdown.hours}h
          </h1>
        </div>
        <div className="text-secondary font-bold">:</div>
        <div className="bg-primary rounded-xl size-16 flex items-center justify-center">
          <h1 className="text-secondary font-semibold text-2xl">
            {countdown.minutes}m
          </h1>
        </div>
        <div className="text-secondary font-bold">:</div>
        <div className="bg-primary rounded-xl size-16 flex items-center justify-center">
          <h1 className="text-secondary font-semibold text-2xl">
            {countdown.seconds}s
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
